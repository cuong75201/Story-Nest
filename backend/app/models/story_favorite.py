import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import SchemaOut


class StoryFavorite(Base):
    __tablename__ = "story_favorites"
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    story_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("stories.id", ondelete="CASCADE"), primary_key=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=text("now()"))


class StoryFavoriteBase(SchemaOut):
    story_id: uuid.UUID


class StoryFavoriteIn(StoryFavoriteBase):
    pass


class StoryFavoriteOut(StoryFavoriteBase):
    user_id: uuid.UUID
    created_at: datetime
