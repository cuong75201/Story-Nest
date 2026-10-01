"""Business logic related to stories."""

from datetime import datetime, timedelta, timezone

from sqlalchemy import case, func, select
from sqlalchemy.orm import Session

from app.models.chapter import Chapter
from app.models.enums import PublicationStatus, Visibility
from app.models.story import Story, StoryOut, to_story_out
from app.models.story_statistics import StoryStatistics
from app.models.story_view import StoryView
from app.models.user import User
from app.services.genre_service import get_story_genres


def count_stories(db: Session) -> int:
    """Return the number of stories that have not been soft-deleted."""
    statement = (
        select(func.count()).select_from(Story).where(Story.deleted_at.is_(None))
    )
    return db.scalar(statement) or 0


def list_public_stories(
    db: Session, page: int, page_size: int
) -> tuple[list[StoryOut], int]:
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


def list_recently_updated_stories(
    db: Session, page: int, page_size: int
) -> tuple[list[StoryOut], int]:
    """Return public stories ordered by their latest published chapter."""
    filters = (
        Story.deleted_at.is_(None),
        Story.visibility == Visibility.PUBLIC,
        Story.publication_status == PublicationStatus.PUBLISHED,
    )
    chapter_updates = (
        select(
            Chapter.story_id,
            func.count(Chapter.id).label("chapter_count"),
            func.max(Chapter.published_at).label("latest_chapter_published_at"),
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
            chapter_updates.c.chapter_count,
        )
        .join(User, User.id == Story.owner_id)
        .outerjoin(StoryStatistics, StoryStatistics.story_id == Story.id)
        .outerjoin(chapter_updates, chapter_updates.c.story_id == Story.id)
        .where(*filters)
        .order_by(
            func.coalesce(
                chapter_updates.c.latest_chapter_published_at,
                Story.published_at,
            ).desc(),
            Story.id,
        )
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


def list_public_trending(
    db: Session, page: int, page_size: int
) -> tuple[list[StoryOut], int]:
    """Return stories ranked by recency-weighted views from the last 7 days."""
    now = datetime.now(timezone.utc)
    one_day_ago = now - timedelta(days=1)
    three_days_ago = now - timedelta(days=3)
    seven_days_ago = now - timedelta(days=7)

    recent_views = (
        select(
            StoryView.story_id,
            func.sum(
                case(
                    (StoryView.viewed_at >= one_day_ago, 3),
                    (StoryView.viewed_at >= three_days_ago, 2),
                    else_=1,
                )
            ).label("trending_score"),
        )
        .where(StoryView.viewed_at >= seven_days_ago)
        .group_by(StoryView.story_id)
        .subquery()
    )
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

    total_statement = (
        select(func.count())
        .select_from(Story)
        .join(recent_views, recent_views.c.story_id == Story.id)
        .where(*filters)
    )
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
        .join(recent_views, recent_views.c.story_id == Story.id)
        .outerjoin(StoryStatistics, StoryStatistics.story_id == Story.id)
        .outerjoin(chapter_counts, chapter_counts.c.story_id == Story.id)
        .where(*filters)
        .order_by(
            recent_views.c.trending_score.desc(),
            Story.published_at.desc(),
        )
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


def list_public_weekly(
    db: Session, page: int, page_size: int
) -> tuple[list[StoryOut], int]:
    """Return stories ranked by views since Monday 00:00 UTC."""
    now = datetime.now(timezone.utc)
    week_start = (now - timedelta(days=now.weekday())).replace(
        hour=0, minute=0, second=0, microsecond=0
    )

    weekly_views = (
        select(
            StoryView.story_id,
            func.count(StoryView.id).label("weekly_view_count"),
        )
        .where(StoryView.viewed_at >= week_start)
        .group_by(StoryView.story_id)
        .subquery()
    )
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

    total_statement = (
        select(func.count())
        .select_from(Story)
        .join(weekly_views, weekly_views.c.story_id == Story.id)
        .where(*filters)
    )
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
        .join(weekly_views, weekly_views.c.story_id == Story.id)
        .outerjoin(StoryStatistics, StoryStatistics.story_id == Story.id)
        .outerjoin(chapter_counts, chapter_counts.c.story_id == Story.id)
        .where(*filters)
        .order_by(
            weekly_views.c.weekly_view_count.desc(),
            Story.published_at.desc(),
        )
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
