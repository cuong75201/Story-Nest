"""HTTP endpoints for genres."""

from app.dependencies import SessionDep
from app.models.genre import GenreOut
from app.schemas.response import ApiResponse, success_response
from app.services.genre_service import list_active_genres
from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/genres", tags=["Genres"])


@router.get("", response_model=ApiResponse[list[GenreOut]])
def get_active_genres(db: SessionDep) -> ApiResponse[list[GenreOut]]:
    """Get all genres."""
    genres = list_active_genres(db)
    genre_items = [GenreOut.model_validate(genre) for genre in genres]

    return success_response(genre_items, "Genres retrieved.")
