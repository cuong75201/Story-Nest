from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.chapter import Chapter
from app.models.enums import HomepageSlot, PublicationStatus, Visibility
from app.models.homepage_story_slot import HomepageOut, HomepageStorySlot
from app.models.story import Story, StoryOut, to_story_out
from app.models.story_statistics import StoryStatistics
from app.models.user import User
from app.services.genre_service import get_story_genres

EDITOR_PICK_LIMIT = 2


def list_homepage_story(db: Session) -> HomepageOut:
    """Return the public hero and ordered editor picks for the homepage."""
    chapter_counts = (
        select(
            Chapter.story_id,
            func.count(Chapter.id).label("chapter_count"),
        )
        .where(Chapter.publication_status == PublicationStatus.PUBLISHED)
        .group_by(Chapter.story_id)
        .subquery()
    )
    statement = (
        select(
            HomepageStorySlot.slot,
            Story,
            User.display_name,
            StoryStatistics.average_rating,
            StoryStatistics.rating_count,
            StoryStatistics.view_count,
            chapter_counts.c.chapter_count,
        )
        .join(Story, Story.id == HomepageStorySlot.story_id)
        .join(User, User.id == Story.owner_id)
        .outerjoin(StoryStatistics, StoryStatistics.story_id == Story.id)
        .outerjoin(chapter_counts, chapter_counts.c.story_id == Story.id)
        .where(
            Story.deleted_at.is_(None),
            Story.visibility == Visibility.PUBLIC,
            Story.publication_status == PublicationStatus.PUBLISHED,
        )
        .order_by(HomepageStorySlot.position.asc())
    )

    hero: StoryOut | None = None
    editor_pick: list[StoryOut] = []
    story_rows = list(db.execute(statement))
    genres_by_story = get_story_genres(db, [row[1].id for row in story_rows])

    for (
        slot,
        story,
        author_name,
        average_rating,
        rating_count,
        view_count,
        chapter_count,
    ) in story_rows:
        story_out = to_story_out(
            story,
            author_name,
            average_rating,
            rating_count,
            view_count,
            chapter_count,
            genres_by_story.get(story.id, []),
        )
        if slot == HomepageSlot.HERO:
            hero = story_out
        elif slot == HomepageSlot.EDITOR_PICK and len(editor_pick) < EDITOR_PICK_LIMIT:
            editor_pick.append(story_out)

    return HomepageOut(hero=hero, editor_pick=editor_pick)
