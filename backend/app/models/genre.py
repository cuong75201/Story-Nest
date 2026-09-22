import uuid
from datetime import datetime

from pydantic import Field
from sqlalchemy import String, Text, text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import SchemaOut, TimestampMixin


class Genre(TimestampMixin, Base):
    __tablename__ = "genres"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    name: Mapped[str] = mapped_column(String(80), unique=True)
    slug: Mapped[str] = mapped_column(String(100), unique=True)
    description: Mapped[str | None] = mapped_column(Text)
    is_active: Mapped[bool] = mapped_column(server_default=text("true"))


class GenreBase(SchemaOut):
    name: str = Field(min_length=1, max_length=80)
    slug: str = Field(min_length=1, max_length=100)
    description: str | None = None


class GenreIn(GenreBase):
    is_active: bool = True


class GenreOut(GenreBase):
    id: uuid.UUID
    is_active: bool
    created_at: datetime
    updated_at: datetime
