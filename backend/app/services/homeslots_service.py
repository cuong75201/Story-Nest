from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.enums import HomepageSlot, PublicationStatus, Visibility
from app.models.homepage_story_slot import HomepageOut, HomepageStorySlot
from app.models.story import Story, StoryOut


def list_homepage_story(db: Session) -> HomepageOut:
    """Return the public hero and ordered editor picks for the homepage."""
    statement = (
        select(HomepageStorySlot.slot, Story)
        .join(Story, Story.id == HomepageStorySlot.story_id)
        .where(
            Story.deleted_at.is_(None),
            Story.visibility == Visibility.PUBLIC,
            Story.publication_status == PublicationStatus.PUBLISHED,
        )
        .order_by(HomepageStorySlot.position.asc())
    )

    hero: StoryOut | None = None
    editor_pick: list[StoryOut] = []

    for slot, story in db.execute(statement):
        story_out = StoryOut.model_validate(story)
        if slot == HomepageSlot.HERO:
            hero = story_out
        elif slot == HomepageSlot.EDITOR_PICK:
            editor_pick.append(story_out)

    return HomepageOut(hero=hero, editor_pick=editor_pick)
