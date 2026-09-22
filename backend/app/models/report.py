import uuid
from datetime import datetime

from pydantic import Field, model_validator
from sqlalchemy import CheckConstraint, DateTime, Enum as SqlEnum, ForeignKey, String, Text, text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import SchemaOut
from app.models.enums import ReportStatus


class Report(Base):
    __tablename__ = "reports"
    __table_args__ = (CheckConstraint("num_nonnulls(story_id, chapter_id, comment_id) = 1", name="reports_one_target"),)
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    reporter_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="RESTRICT"))
    story_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("stories.id", ondelete="CASCADE"))
    chapter_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("chapters.id", ondelete="CASCADE"))
    comment_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("comments.id", ondelete="CASCADE"))
    reason: Mapped[str] = mapped_column(String(100))
    details: Mapped[str | None] = mapped_column(Text)
    status: Mapped[ReportStatus] = mapped_column(SqlEnum(ReportStatus, name="report_status", create_type=False), server_default=text("'PENDING'"))
    handled_by: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"))
    resolution_note: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=text("now()"))
    handled_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))


class ReportBase(SchemaOut):
    story_id: uuid.UUID | None = None
    chapter_id: uuid.UUID | None = None
    comment_id: uuid.UUID | None = None
    reason: str = Field(min_length=1, max_length=100)
    details: str | None = None

    @model_validator(mode="after")
    def exactly_one_target(self) -> "ReportBase":
        if sum(value is not None for value in (self.story_id, self.chapter_id, self.comment_id)) != 1:
            raise ValueError("Exactly one report target is required.")
        return self


class ReportIn(ReportBase):
    pass


class ReportOut(ReportBase):
    id: uuid.UUID
    reporter_id: uuid.UUID
    status: ReportStatus
    handled_by: uuid.UUID | None
    resolution_note: str | None
    created_at: datetime
    handled_at: datetime | None
