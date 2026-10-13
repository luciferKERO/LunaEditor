import os

import aiofiles
from fastapi import APIRouter, UploadFile

from schemas import UploadOut

router = APIRouter(prefix="/api/upload", tags=["upload"])

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "..", "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/", response_model=UploadOut)
async def upload_file(file: UploadFile):
    dest = os.path.join(UPLOAD_DIR, file.filename)
    async with aiofiles.open(dest, "wb") as f:
        content = await file.read()
        await f.write(content)
    return UploadOut(filename=file.filename, size=len(content), message="ok")
