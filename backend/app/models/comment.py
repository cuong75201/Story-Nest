import uuid
from datetime import datetime

from pydantic import Field, model_validator
from sqlalchemy import CheckConstraint, Enum as SqlEnum, ForeignKey, Text, text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import SchemaOut, TimestampMixin
from app.models.enums import CommentStatus


class Comment(TimestampMixin, Base):
    __tablename__ = "comments"
    __table_args__ = (
        CheckConstraint("num_nonnulls(story_id, chapter_id) = 1", name="comments_one_target"),
        CheckConstraint("btrim(body) <> ''", name="comments_body_not_blank"),
    )
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    author_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="RESTRICT"))
    story_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("stories.id", ondelete="CASCADE"))
    chapter_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("chapters.id", ondelete="CASCADE"))
    parent_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("comments.id", ondelete="CASCADE"))
    body: Mapped[str] = mapped_column(Text)
    status: Mapped[CommentStatus] = mapped_column(SqlEnum(CommentStatus, name="comment_status", create_type=False), server_default=text("'ACTIVE'"))


class CommentBase(SchemaOut):
    story_id: uuid.UUID | None = None
    chapter_id: uuid.UUID | None = None
    parent_id: uuid.UUID | None = None
    body: str = Field(min_length=1)

    @model_validator(mode="after")
    def exactly_one_target(self) -> "CommentBase":
        if (self.story_id is None) == (self.chapter_id is None):
            raise ValueError("Exactly one of story_id or chapter_id is required.")
        return self


class CommentIn(CommentBase):
    pass


class CommentOut(CommentBase):
    id: uuid.UUID
    author_id: uuid.UUID
    status: CommentStatus
    created_at: datetime
    updated_at: datetime
