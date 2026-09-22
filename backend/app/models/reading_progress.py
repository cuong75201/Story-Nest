import uuid
from datetime import datetime

from pydantic import Field
from sqlalchemy import CheckConstraint, DateTime, ForeignKey, Integer, text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import SchemaOut


class ReadingProgress(Base):
    __tablename__ = "reading_progress"
    __table_args__ = (CheckConstraint("position >= 0", name="reading_progress_position_nonnegative"),)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    story_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("stories.id", ondelete="CASCADE"), primary_key=True)
    chapter_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("chapters.id", ondelete="CASCADE"))
    position: Mapped[int] = mapped_column(Integer, server_default=text("0"))
    last_read_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=text("now()"))


class ReadingProgressBase(SchemaOut):
    story_id: uuid.UUID
    chapter_id: uuid.UUID
    position: int = Field(default=0, ge=0)


class ReadingProgressIn(ReadingProgressBase):
    pass


class ReadingProgressOut(ReadingProgressBase):
    user_id: uuid.UUID
    last_read_at: datetime
