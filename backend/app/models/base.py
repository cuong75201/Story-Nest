from datetime import datetime

from sqlalchemy import DateTime, text
from sqlalchemy.orm import Mapped, mapped_column
from pydantic import BaseModel, ConfigDict


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=text("now()"))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=text("now()"))


class SchemaOut(BaseModel):
    """Base for API response DTOs created from SQLAlchemy ORM instances."""

    model_config = ConfigDict(from_attributes=True)
