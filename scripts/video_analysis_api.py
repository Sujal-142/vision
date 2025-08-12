from fastapi import FastAPI, UploadFile, File, Form, BackgroundTasks
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from ultralytics import YOLO
import cv2
import os
import uuid
import json
from math import ceil

app = FastAPI()
model = YOLO("yolov8x.pt")  # largest YOLOv8 model

UPLOAD_DIR = "uploads"
FRAME_DIR = "frames"
STATUS_DIR = "status"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(FRAME_DIR, exist_ok=True)
os.makedirs(STATUS_DIR, exist_ok=True)

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")


def update_status(video_id, processed, total, done=False):
    """Write or update status.json for a given job."""
    status_path = os.path.join(STATUS_DIR, f"{video_id}_status.json")
    data = {
        "processed_frames": processed,
        "total_frames": total,
        "status": "done" if done else "processing"
    }
    with open(status_path, "w") as f:
        json.dump(data, f)


def extract_and_analyze_frames(video_path, video_id, interval):
    vidcap = cv2.VideoCapture(video_path)
    fps = vidcap.get(cv2.CAP_PROP_FPS) or 30
    frame_count = int(vidcap.get(cv2.CAP_PROP_FRAME_COUNT))
    total_to_process = ceil(frame_count / interval)

    results = []
    batch_size = 16
    batch_images = []
    batch_indices = []
    processed_count = 0

    while True:
        frame_idx = int(vidcap.get(cv2.CAP_PROP_POS_FRAMES))
        success, image = vidcap.read()
        if not success:
            break

        if frame_idx % interval == 0:
            batch_images.append(image)
            batch_indices.append(frame_idx)

            if len(batch_images) == batch_size:
                yolo_results = model(batch_images)
                for i, yolo_result in enumerate(yolo_results):
                    detections = yolo_result.boxes.data.tolist()
                    results.append({"frame_idx": batch_indices[i], "detections": detections})

                processed_count += len(batch_images)
                update_status(video_id, processed_count, total_to_process)
                batch_images.clear()
                batch_indices.clear()

    # Final batch
    if batch_images:
        yolo_results = model(batch_images)
        for i, yolo_result in enumerate(yolo_results):
            detections = yolo_result.boxes.data.tolist()
            results.append({"frame_idx": batch_indices[i], "detections": detections})

        processed_count += len(batch_images)
        update_status(video_id, processed_count, total_to_process)

    vidcap.release()

    # Save detections
    with open(f"{FRAME_DIR}/{video_id}_results.json", "w") as f:
        json.dump(results, f)

    update_status(video_id, processed_count, total_to_process, done=True)


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

    # Decide frame interval based on video length
    vidcap = cv2.VideoCapture(video_path)
    fps = vidcap.get(cv2.CAP_PROP_FPS) or 30
    frame_count = int(vidcap.get(cv2.CAP_PROP_FRAME_COUNT))
    duration_sec = frame_count / fps
    vidcap.release()

    interval = 1 if duration_sec <= 300 else int(fps)  # every frame if <=5min, else 1 fps

    # First frame quick preview
    vidcap = cv2.VideoCapture(video_path)
    success, image = vidcap.read()
    first_frame_detections = []
    if success:
        yolo_result = model(image)
        first_frame_detections = yolo_result[0].boxes.data.tolist()
    vidcap.release()

    update_status(video_id, 0, ceil(frame_count / interval))

    background_tasks.add_task(extract_and_analyze_frames, video_path, video_id, interval)

    return JSONResponse(content={
        "video_id": video_id,
        "video_url": f"http://localhost:8000/uploads/{video_filename}",
        "first_frame_analysis": {
            "detections": first_frame_detections
        },
        "status": "processing",
        "interval": interval
    })


@app.get("/video-analysis-status/{video_id}")
async def get_video_analysis_status(video_id: str):
    status_path = os.path.join(STATUS_DIR, f"{video_id}_status.json")
    result_path = os.path.join(FRAME_DIR, f"{video_id}_results.json")

    if os.path.exists(status_path):
        with open(status_path, "r") as f:
            status = json.load(f)
    else:
        return JSONResponse(content={"status": "not_found"})

    if status["status"] == "done" and os.path.exists(result_path):
        with open(result_path, "r") as f:
            results = json.load(f)
        return JSONResponse(content={"status": "done", "progress": status, "results": results})

    return JSONResponse(content={"status": "processing", "progress": status})
