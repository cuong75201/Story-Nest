import uuid
from datetime import datetime
from typing import Any

from pydantic import Field
from sqlalchemy import DateTime, Enum as SqlEnum, ForeignKey, String, Text, text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import SchemaOut
from app.models.enums import NotificationType


class Notification(Base):
    __tablename__ = "notifications"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    recipient_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    actor_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"))
    type: Mapped[NotificationType] = mapped_column(SqlEnum(NotificationType, name="notification_type", create_type=False))
    title: Mapped[str] = mapped_column(String(300))
    body: Mapped[str | None] = mapped_column(Text)
    data: Mapped[dict[str, Any]] = mapped_column(JSONB, server_default=text("'{}'::jsonb"))
    read_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=text("now()"))


class NotificationBase(SchemaOut):
    type: NotificationType
    title: str = Field(min_length=1, max_length=300)
    body: str | None = None
    data: dict[str, Any] = Field(default_factory=dict)


class NotificationIn(NotificationBase):
    recipient_id: uuid.UUID
    actor_id: uuid.UUID | None = None


class NotificationOut(NotificationBase):
    id: uuid.UUID
    recipient_id: uuid.UUID
    actor_id: uuid.UUID | None
    read_at: datetime | None
    created_at: datetime
