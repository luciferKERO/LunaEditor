import os

from fastapi import APIRouter

from ai.bgm import index_bgm_library, load_index, save_index, select_bgm

router = APIRouter(prefix="/api/bgm", tags=["bgm"])

BGM_DIR = os.path.join(os.path.dirname(__file__), "..", "assets", "bgm")
INDEX_PATH = os.path.join(BGM_DIR, "index.json")


@router.get("/")
async def list_bgm():
    """List all BGM tracks."""
    if os.path.exists(INDEX_PATH):
        tracks = load_index(INDEX_PATH)
    else:
        tracks = index_bgm_library(BGM_DIR, probe_duration=False)
    return [
        {
            "id": t.id,
            "title": t.title,
            "category": t.category,
            "duration": t.duration,
            "recommended_styles": t.recommended_styles,
        }
        for t in tracks
    ]


@router.post("/index")
async def rebuild_index():
    """Rebuild BGM index (with duration probing)."""
    tracks = index_bgm_library(BGM_DIR, probe_duration=True)
    path = save_index(tracks, INDEX_PATH)
    return {"count": len(tracks), "path": path}


@router.get("/recommend/{style}")
async def recommend_bgm(style: str, target_duration: float = 0):
    """Get BGM recommendation for a style."""
    if os.path.exists(INDEX_PATH):
        tracks = load_index(INDEX_PATH)
    else:
        tracks = index_bgm_library(BGM_DIR, probe_duration=False)

    track = select_bgm(tracks, style, target_duration)
    if not track:
        return {"track": None}
    return {
        "track": {
            "id": track.id,
            "title": track.title,
            "category": track.category,
            "duration": track.duration,
            "path": track.path,
        }
    }
