"""Business logic related to stories."""

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.chapter import Chapter
from app.models.enums import PublicationStatus, Visibility
from app.models.story import Story, StoryOut, to_story_out
from app.models.story_statistics import StoryStatistics
from app.models.user import User
from app.services.genre_service import get_story_genres


def count_stories(db: Session) -> int:
    """Return the number of stories that have not been soft-deleted."""
    statement = select(func.count()).select_from(Story).where(Story.deleted_at.is_(None))
    return db.scalar(statement) or 0


def list_public_stories(db: Session, page: int, page_size: int) -> tuple[list[StoryOut], int]:
    """Return one page of publicly visible, published stories and their total."""
    filters = (
        Story.deleted_at.is_(None),
        Story.visibility == Visibility.PUBLIC,
        Story.publication_status == PublicationStatus.PUBLISHED,
    )
    chapter_counts = (
        select(
            Chapter.story_id,
            func.count(Chapter.id).label("chapter_count"),
        )
        .where(Chapter.publication_status == PublicationStatus.PUBLISHED)
        .group_by(Chapter.story_id)
        .subquery()
    )
    total_statement = select(func.count()).select_from(Story).where(*filters)
    stories_statement = (
        select(
            Story,
            User.display_name,
            StoryStatistics.average_rating,
            StoryStatistics.rating_count,
            StoryStatistics.view_count,
            chapter_counts.c.chapter_count,
        )
        .join(User, User.id == Story.owner_id)
        .outerjoin(StoryStatistics, StoryStatistics.story_id == Story.id)
        .outerjoin(chapter_counts, chapter_counts.c.story_id == Story.id)
        .where(*filters)
        .order_by(Story.published_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
    )

    total = db.scalar(total_statement) or 0
    story_rows = list(db.execute(stories_statement))
    genres_by_story = get_story_genres(db, [row[0].id for row in story_rows])
    stories = [
        to_story_out(
            story,
            author_name,
            average_rating,
            rating_count,
            view_count,
            chapter_count,
            genres_by_story.get(story.id, []),
        )
        for (
            story,
            author_name,
            average_rating,
            rating_count,
            view_count,
            chapter_count,
        ) in story_rows
    ]
    return stories, total
