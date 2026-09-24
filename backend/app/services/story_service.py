"""Business logic related to stories."""

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.enums import PublicationStatus, Visibility
from app.models.story import Story


def count_stories(db: Session) -> int:
    """Return the number of stories that have not been soft-deleted."""
    statement = select(func.count()).select_from(Story).where(Story.deleted_at.is_(None))
    return db.scalar(statement) or 0


def list_public_stories(db: Session, page: int, page_size: int) -> tuple[list[Story], int]:
    """Return one page of publicly visible, published stories and their total."""
    filters = (
        Story.deleted_at.is_(None),
        Story.visibility == Visibility.PUBLIC,
        Story.publication_status == PublicationStatus.PUBLISHED,
    )
    total_statement = select(func.count()).select_from(Story).where(*filters)
    stories_statement = (
        select(Story)
        .where(*filters)
        .order_by(Story.published_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
    )

    total = db.scalar(total_statement) or 0
    stories = list(db.scalars(stories_statement))
    return stories, total
