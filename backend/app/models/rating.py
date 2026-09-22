import uuid
from datetime import datetime

from pydantic import Field
from sqlalchemy import CheckConstraint, SmallInteger, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import SchemaOut, TimestampMixin


class Rating(TimestampMixin, Base):
    __tablename__ = "ratings"
    __table_args__ = (CheckConstraint("score BETWEEN 1 AND 5", name="ratings_score_range"),)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    story_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("stories.id", ondelete="CASCADE"), primary_key=True)
    score: Mapped[int] = mapped_column(SmallInteger)
    review: Mapped[str | None] = mapped_column(Text)


class RatingBase(SchemaOut):
    score: int = Field(ge=1, le=5)
    review: str | None = None


class RatingIn(RatingBase):
    pass


class RatingOut(RatingBase):
    user_id: uuid.UUID
    story_id: uuid.UUID
    created_at: datetime
    updated_at: datetime
