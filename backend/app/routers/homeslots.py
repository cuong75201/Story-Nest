
from fastapi import APIRouter

from app.dependencies import SessionDep
from app.models.homepage_story_slot import HomepageOut
from app.schemas.response import ApiResponse, success_response
from app.services.homeslots_service import list_homepage_story


router = APIRouter(prefix="/api/v1/home-slot", tags=["Home Slot"])


@router.get("", response_model=ApiResponse[HomepageOut])
def get_homepage_story(db: SessionDep) -> ApiResponse[HomepageOut]:
    """Get list stories on home page."""
    homepage = list_homepage_story(db)
    return success_response(homepage, "Homepage stories retrieved.")
