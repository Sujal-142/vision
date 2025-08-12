# Video Captioning and Q&A Backend (Open Source)
# Uses BLIP for video captioning and Llama 2 (via llama-cpp-python) for Q&A

from fastapi import FastAPI, UploadFile, File, Form, BackgroundTasks
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
import cv2
import os
import uuid
import json
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
from llama_cpp import Llama
from concurrent.futures import ProcessPoolExecutor, as_completed

app = FastAPI()
UPLOAD_DIR = "uploads"
FRAME_DIR = "frames"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(FRAME_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Load BLIP model for captioning
blip_processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
blip_model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

# Load Llama 2 (7B) for Q&A (make sure to download weights and set path)
llm = Llama(model_path="llama-2-7b-chat.ggmlv3.q4_0.bin")

# Store chat history in memory (for demo)
chat_histories = {}

def process_frame(args):
    sec, video_path, video_id = args
    vidcap = cv2.VideoCapture(video_path)
    vidcap.set(cv2.CAP_PROP_POS_MSEC, sec * 1000)
    success, image = vidcap.read()
    caption = None
    if success:
        frame_path = os.path.join(FRAME_DIR, f"{video_id}_frame_{sec}.jpg")
        cv2.imwrite(frame_path, image)
        pil_image = Image.open(frame_path).convert("RGB")
        inputs = blip_processor(pil_image, return_tensors="pt")
        out = blip_model.generate(**inputs)
        caption = blip_processor.decode(out[0], skip_special_tokens=True)
    vidcap.release()
    return {"timestamp": sec, "caption": caption} if caption else None

def extract_captions(video_path, video_id, interval=10):
    vidcap = cv2.VideoCapture(video_path)
    fps = vidcap.get(cv2.CAP_PROP_FPS)
    frame_count = int(vidcap.get(cv2.CAP_PROP_FRAME_COUNT))
    duration = frame_count / fps
    vidcap.release()
    captions = []
    processed_secs = set()
    segments = [(sec, video_path, video_id) for sec in range(0, int(duration), interval)]
    with ProcessPoolExecutor() as executor:
        futures = {executor.submit(process_frame, args): args[0] for args in segments}
        for future in as_completed(futures):
            result = future.result()
            if result:
                captions.append(result)
                processed_secs.add(result["timestamp"])
                # Save progress after each frame
                with open(f"{FRAME_DIR}/{video_id}_captions.json", "w") as f:
                    json.dump(captions, f)
    # Final save (in case last frame wasn't saved)
    with open(f"{FRAME_DIR}/{video_id}_captions.json", "w") as f:
        json.dump(captions, f)

@app.get("/caption-progress/{video_id}")
async def caption_progress(video_id: str):
    captions_path = f"{FRAME_DIR}/{video_id}_captions.json"
    if not os.path.exists(captions_path):
        return JSONResponse(content={"progress": 0, "processed": 0, "total": 0, "message": "No captions yet."})
    with open(captions_path, "r") as f:
        captions = json.load(f)
    # Estimate progress
    if len(captions) == 0:
        return JSONResponse(content={"progress": 0, "processed": 0, "total": 0, "message": "No captions yet."})
    last_timestamp = captions[-1]["timestamp"]
    processed = len(captions)
    # Try to get total duration from video file
    video_path = None
    for file in os.listdir(UPLOAD_DIR):
        if file.startswith(video_id):
            video_path = os.path.join(UPLOAD_DIR, file)
            break
    total_duration = None
    if video_path:
        vidcap = cv2.VideoCapture(video_path)
        fps = vidcap.get(cv2.CAP_PROP_FPS)
        frame_count = int(vidcap.get(cv2.CAP_PROP_FRAME_COUNT))
        total_duration = int(frame_count / fps)
        vidcap.release()
    if total_duration is None:
        total_duration = last_timestamp + 10
    total_segments = total_duration // 10
    progress = min((last_timestamp + 10) / total_duration, 1.0) if total_duration > 0 else 0
    return JSONResponse(content={
        "progress": progress,
        "processed": processed,
        "total": total_segments,
        "message": f"Summary is up to {last_timestamp} seconds. For more accuracy, please wait. Processed {processed} of {total_segments} segments. Estimated time left: {max(total_segments-processed,0)*10} seconds."
    })

@app.post("/analyze-video")
async def analyze_video(
    video: UploadFile = File(...),
    prompt: str = Form("Describe this video."),
    background_tasks: BackgroundTasks = None
):
    video_id = str(uuid.uuid4())
    video_filename = f"{video_id}_{video.filename}"
    video_path = os.path.join(UPLOAD_DIR, video_filename)
    with open(video_path, "wb") as buffer:
        buffer.write(await video.read())

    # Analyze first frame for instant feedback
    vidcap = cv2.VideoCapture(video_path)
    success, image = vidcap.read()
    first_caption = ""
    if success:
        first_frame_path = os.path.join(FRAME_DIR, f"{video_id}_frame_0.jpg")
        cv2.imwrite(first_frame_path, image)
        pil_image = Image.open(first_frame_path).convert("RGB")
        inputs = blip_processor(pil_image, return_tensors="pt")
        out = blip_model.generate(**inputs)
        first_caption = blip_processor.decode(out[0], skip_special_tokens=True)
    vidcap.release()

    # Background: extract captions for all frames (interval=10)
    background_tasks.add_task(extract_captions, video_path, video_id, 10)

    return JSONResponse(content={
        "video_id": video_id,
        "video_url": f"/uploads/{video_filename}",
        "first_caption": first_caption,
        "status": "processing"
    })

@app.post("/chat")
async def chat(
    video_id: str = Form(...),
    message: str = Form(...),
    session_id: str = Form(...)
):
    # Load captions
    captions_path = f"{FRAME_DIR}/{video_id}_captions.json"
    if not os.path.exists(captions_path):
        return JSONResponse(content={"error": "Captions not ready yet."}, status_code=400)
    with open(captions_path, "r") as f:
        captions = json.load(f)
    # Prepare context
    context = "\n".join([f"[{c['timestamp']}s] {c['caption']}" for c in captions])
    # Maintain chat history
    if session_id not in chat_histories:
        chat_histories[session_id] = []
    chat_histories[session_id].append({"role": "user", "content": message})
    # Compose prompt for LLM
    full_prompt = f"Video summary:\n{context}\n\nChat history:\n"
    for turn in chat_histories[session_id]:
        full_prompt += f"{turn['role']}: {turn['content']}\n"
    full_prompt += "assistant:"
    # Get LLM response
    response = llm(full_prompt, max_tokens=256, stop=["user:", "assistant:"])
    answer = response["choices"][0]["text"].strip()
    chat_histories[session_id].append({"role": "assistant", "content": answer})
    return JSONResponse(content={"answer": answer, "history": chat_histories[session_id]})
