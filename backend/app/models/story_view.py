import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import SchemaOut


class StoryView(Base):
    __tablename__ = "story_views"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    story_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("stories.id", ondelete="CASCADE"))
    chapter_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("chapters.id", ondelete="SET NULL"))
    user_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"))
    viewed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=text("now()"))


class StoryViewBase(SchemaOut):
    story_id: uuid.UUID
    chapter_id: uuid.UUID | None = None


class StoryViewIn(StoryViewBase):
    pass


class StoryViewOut(StoryViewBase):
    id: uuid.UUID
    user_id: uuid.UUID | None
    viewed_at: datetime
