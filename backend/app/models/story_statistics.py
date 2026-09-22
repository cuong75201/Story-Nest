import uuid
from decimal import Decimal

from sqlalchemy import Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import SchemaOut


class StoryStatistics(Base):
    """Read-only ORM mapping of the story_statistics PostgreSQL view."""

    __tablename__ = "story_statistics"
    story_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    view_count: Mapped[int] = mapped_column(Integer)
    follower_count: Mapped[int] = mapped_column(Integer)
    favorite_count: Mapped[int] = mapped_column(Integer)
    rating_count: Mapped[int] = mapped_column(Integer)
    average_rating: Mapped[Decimal | None]
    comment_count: Mapped[int] = mapped_column(Integer)


class StoryStatisticsOut(SchemaOut):
    story_id: uuid.UUID
    view_count: int
    follower_count: int
    favorite_count: int
    rating_count: int
    average_rating: Decimal | None
    comment_count: int
