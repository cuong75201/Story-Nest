import uuid
from datetime import datetime

from pydantic import Field
from sqlalchemy import CheckConstraint, DateTime, Enum as SqlEnum, ForeignKey, Integer, String, Text, UniqueConstraint, text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import SchemaOut, TimestampMixin
from app.models.enums import PublicationStatus


class Chapter(TimestampMixin, Base):
    __tablename__ = "chapters"
    __table_args__ = (
        UniqueConstraint("story_id", "chapter_number", name="chapters_story_id_chapter_number_key"),
        CheckConstraint("chapter_number > 0", name="chapters_number_positive"),
        CheckConstraint("btrim(title) <> ''", name="chapters_title_not_blank"),
        CheckConstraint("(publication_status = 'PUBLISHED' AND published_at IS NOT NULL) OR publication_status <> 'PUBLISHED'", name="chapters_published_date"),
    )
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    story_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("stories.id", ondelete="CASCADE"))
    title: Mapped[str] = mapped_column(String(300))
    content: Mapped[str] = mapped_column(Text, server_default=text("''"))
    chapter_number: Mapped[int] = mapped_column(Integer)
    publication_status: Mapped[PublicationStatus] = mapped_column(SqlEnum(PublicationStatus, name="publication_status", create_type=False), server_default=text("'DRAFT'"))
    published_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))


class ChapterBase(SchemaOut):
    title: str = Field(min_length=1, max_length=300)
    content: str = ""
    chapter_number: int = Field(gt=0)


class ChapterIn(ChapterBase):
    publication_status: PublicationStatus = PublicationStatus.DRAFT


class ChapterOut(ChapterBase):
    id: uuid.UUID
    story_id: uuid.UUID
    publication_status: PublicationStatus
    published_at: datetime | None
    created_at: datetime
    updated_at: datetime
