from fastapi import FastAPI, UploadFile, File, Form, BackgroundTasks
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from ultralytics import YOLO
import cv2
import os
import uuid
import json

app = FastAPI()
model = YOLO("yolov8x.pt")  # Use the largest model, you have the VRAM!
UPLOAD_DIR = "uploads"
FRAME_DIR = "frames"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(FRAME_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

def extract_and_analyze_frames(video_path, video_id, interval=1):
    vidcap = cv2.VideoCapture(video_path)
    fps = vidcap.get(cv2.CAP_PROP_FPS)
    frame_count = int(vidcap.get(cv2.CAP_PROP_FRAME_COUNT))
    results = []
    frame_idx = 0
    batch_size = 16  # Use GPU efficiently
    batch_images = []
    batch_paths = []
    while True:
        success, image = vidcap.read()
        if not success:
            break
        if frame_idx % interval == 0:
            frame_path = os.path.join(FRAME_DIR, f"{video_id}_frame_{frame_idx}.jpg")
            cv2.imwrite(frame_path, image)
            batch_images.append(frame_path)
            batch_paths.append((frame_idx, frame_path))
            if len(batch_images) == batch_size:
                yolo_results = model(batch_images)
                for i, yolo_result in enumerate(yolo_results):
                    detections = yolo_result.boxes.data.tolist()
                    idx, path = batch_paths[i]
                    results.append({"frame_idx": idx, "frame": path, "detections": detections})
                batch_images = []
                batch_paths = []
        frame_idx += 1
    # Process any remaining frames
    if batch_images:
        yolo_results = model(batch_images)
        for i, yolo_result in enumerate(yolo_results):
            detections = yolo_result.boxes.data.tolist()
            idx, path = batch_paths[i]
            results.append({"frame_idx": idx, "frame": path, "detections": detections})
    vidcap.release()
    with open(f"{FRAME_DIR}/{video_id}_results.json", "w") as f:
        json.dump(results, f)

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

    # Immediate: analyze first frame only
    vidcap = cv2.VideoCapture(video_path)
    success, image = vidcap.read()
    first_frame_path = os.path.join(FRAME_DIR, f"{video_id}_frame_0.jpg")
    if success:
        cv2.imwrite(first_frame_path, image)
        yolo_result = model(first_frame_path)
        detections = yolo_result[0].boxes.data.tolist()
    else:
        detections = []
    vidcap.release()

    # Background: analyze all frames (interval=1 for every frame)
    background_tasks.add_task(extract_and_analyze_frames, video_path, video_id, 1)

    return JSONResponse(content={
        "video_id": video_id,
        "video_url": f"http://localhost:8000/uploads/{video_filename}",
        "first_frame_analysis": {
            "frame": first_frame_path,
            "detections": detections
        },
        "status": "processing"
    })

@app.get("/video-analysis-status/{video_id}")
async def get_video_analysis_status(video_id: str):
    result_path = f"{FRAME_DIR}/{video_id}_results.json"
    if os.path.exists(result_path):
        with open(result_path, "r") as f:
            results = json.load(f)
        return JSONResponse(content={"status": "done", "results": results})
    else:
        return JSONResponse(content={"status": "processing"})
