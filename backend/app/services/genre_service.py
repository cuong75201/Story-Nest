"""Business logic related to genres."""

import uuid
from collections import defaultdict

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.genre import Genre, GenreSummaryOut
from app.models.story_genre import StoryGenre


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


def get_story_genres(
    db: Session,
    story_ids: list[uuid.UUID],
) -> dict[uuid.UUID, list[GenreSummaryOut]]:
    """Return active genres grouped by story using one query."""
    if not story_ids:
        return {}

    statement = (
        select(StoryGenre.story_id, StoryGenre.is_primary, Genre)
        .join(Genre, Genre.id == StoryGenre.genre_id)
        .where(
            StoryGenre.story_id.in_(story_ids),
            Genre.is_active.is_(True),
        )
        .order_by(
            StoryGenre.story_id,
            StoryGenre.is_primary.desc(),
            Genre.name.asc(),
        )
    )
    genres_by_story: defaultdict[uuid.UUID, list[GenreSummaryOut]] = defaultdict(list)

    for story_id, is_primary, genre in db.execute(statement):
        genres_by_story[story_id].append(
            GenreSummaryOut.model_validate(
                {
                    "id": genre.id,
                    "name": genre.name,
                    "slug": genre.slug,
                    "is_primary": is_primary,
                }
            )
        )

    return dict(genres_by_story)
