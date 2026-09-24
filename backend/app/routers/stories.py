"""HTTP endpoints for stories."""

from fastapi import APIRouter, Query

from app.dependencies import SessionDep
from app.models.story import StoryCountOut, StoryListOut, StoryOut
from app.schemas import ApiResponse, success_response
from app.services.story_service import count_stories, list_public_stories

router = APIRouter(prefix="/api/v1/stories", tags=["Stories"])


@router.get("", response_model=ApiResponse[StoryListOut])
def get_stories(
    db: SessionDep,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
) -> ApiResponse[StoryListOut]:
    """Get a paginated list of public, published stories."""
    stories, total = list_public_stories(db, page, page_size)
    story_items = [StoryOut.model_validate(story) for story in stories]
    data = StoryListOut.model_validate(
        {
            "items": story_items,
            "total": total,
            "page": page,
            "page_size": page_size,
        }
    )
    return success_response(data, "Stories retrieved.")


@router.get("/count", response_model=ApiResponse[StoryCountOut])
def get_story_count(db: SessionDep) -> ApiResponse[StoryCountOut]:
    """Get the number of stories not marked as deleted."""
    return success_response(StoryCountOut(count=count_stories(db)), "Story count retrieved.")
