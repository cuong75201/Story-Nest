"""HTTP endpoints for stories."""

from fastapi import APIRouter, Query

from app.dependencies import SessionDep
from app.models.story import StoryCountOut, StoryListOut
from app.schemas import ApiResponse, success_response
from app.services.story_service import (
    count_stories,
    list_public_stories,
    list_public_trending,
    list_public_weekly,
    list_recently_updated_stories,
)

router = APIRouter(prefix="/api/v1/stories", tags=["Stories"])


@router.get("", response_model=ApiResponse[StoryListOut])
def get_stories(
    db: SessionDep,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
) -> ApiResponse[StoryListOut]:
    """Get a paginated list of public, published stories."""
    stories, total = list_public_stories(db, page, page_size)
    data = StoryListOut.model_validate(
        {
            "items": stories,
            "total": total,
            "page": page,
            "page_size": page_size,
        }
    )
    return success_response(data, "Stories retrieved.")


@router.get("/recently-updated", response_model=ApiResponse[StoryListOut])
def get_recently_updated_stories(
    db: SessionDep,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
) -> ApiResponse[StoryListOut]:
    """Get public stories ordered by their latest published chapter."""
    stories, total = list_recently_updated_stories(db, page, page_size)
    data = StoryListOut.model_validate(
        {
            "items": stories,
            "total": total,
            "page": page,
            "page_size": page_size,
        }
    )
    return success_response(data, "Recently updated stories retrieved.")


@router.get("/count", response_model=ApiResponse[StoryCountOut])
def get_story_count(db: SessionDep) -> ApiResponse[StoryCountOut]:
    """Get the number of stories not marked as deleted."""
    return success_response(
        StoryCountOut(count=count_stories(db)), "Story count retrieved."
    )


@router.get("/trending", response_model=ApiResponse[StoryListOut])
def get_stories_trending(
    db: SessionDep,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
) -> ApiResponse[StoryListOut]:
    """Get public stories trending during the rolling last 7 days."""
    stories, total = list_public_trending(db, page, page_size)
    data = StoryListOut.model_validate(
        {
            "items": stories,
            "total": total,
            "page": page,
            "page_size": page_size,
        }
    )
    return success_response(data, "Trending stories retrieved.")


@router.get("/weekly", response_model=ApiResponse[StoryListOut])
def get_stories_weekly(
    db: SessionDep,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
) -> ApiResponse[StoryListOut]:
    """Get public stories ranked by views since Monday 00:00 UTC."""
    stories, total = list_public_weekly(db, page, page_size)
    data = StoryListOut.model_validate(
        {
            "items": stories,
            "total": total,
            "page": page,
            "page_size": page_size,
        }
    )
    return success_response(data, "Weekly story ranking retrieved.")
