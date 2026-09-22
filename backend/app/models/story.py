import uuid
from datetime import datetime
from typing import Any

from pydantic import Field
from sqlalchemy import CheckConstraint, Computed, DateTime, Enum as SqlEnum, ForeignKey, String, Text, text
from sqlalchemy.dialects.postgresql import TSVECTOR, UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import SchemaOut, TimestampMixin
from app.models.enums import PublicationStatus, StoryState, Visibility


class Story(TimestampMixin, Base):
    __tablename__ = "stories"
    __table_args__ = (
        CheckConstraint("btrim(title) <> ''", name="stories_title_not_blank"),
        CheckConstraint("(publication_status = 'PUBLISHED' AND published_at IS NOT NULL) OR publication_status <> 'PUBLISHED'", name="stories_published_date"),
    )
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    owner_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="RESTRICT"))
    title: Mapped[str] = mapped_column(String(300))
    slug: Mapped[str] = mapped_column(String(350), unique=True)
    summary: Mapped[str | None] = mapped_column(Text)
    cover_image_url: Mapped[str | None] = mapped_column(Text)
    visibility: Mapped[Visibility] = mapped_column(SqlEnum(Visibility, name="visibility", create_type=False), server_default=text("'PRIVATE'"))
    state: Mapped[StoryState] = mapped_column(SqlEnum(StoryState, name="story_state", create_type=False), server_default=text("'DRAFT'"))
    publication_status: Mapped[PublicationStatus] = mapped_column(SqlEnum(PublicationStatus, name="publication_status", create_type=False), server_default=text("'DRAFT'"))
    published_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    search_vector: Mapped[Any] = mapped_column(TSVECTOR, Computed("to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(summary, ''))"))


class StoryBase(SchemaOut):
    title: str = Field(min_length=1, max_length=300)
    slug: str = Field(min_length=1, max_length=350)
    summary: str | None = None
    cover_image_url: str | None = None
    visibility: Visibility = Visibility.PRIVATE
    state: StoryState = StoryState.DRAFT


class StoryIn(StoryBase):
    genre_ids: list[uuid.UUID] = []


class StoryOut(StoryBase):
    id: uuid.UUID
    owner_id: uuid.UUID
    publication_status: PublicationStatus
    published_at: datetime | None
    created_at: datetime
    updated_at: datetime
