"""Business logic related to genres."""

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.genre import Genre


def list_active_genres(db: Session) -> list[Genre]:
    """Return all active genres."""
    filters = (Genre.is_active.is_(True),)

    genres_statement = (
        select(Genre)
        .where(*filters)
        .order_by(Genre.name.asc())
    )

    genres = list(db.scalars(genres_statement))

    return genres
