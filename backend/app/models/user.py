import uuid
from datetime import datetime

from pydantic import Field
from sqlalchemy import DateTime, Enum as SqlEnum, String, Text, text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import SchemaOut, TimestampMixin
from app.models.enums import AccountStatus, UserRole


class User(TimestampMixin, Base):
    __tablename__ = "users"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    email: Mapped[str] = mapped_column(String(320), unique=True)
    username: Mapped[str] = mapped_column(String(50), unique=True)
    password_hash: Mapped[str] = mapped_column(Text)
    display_name: Mapped[str] = mapped_column(String(100))
    avatar_url: Mapped[str | None] = mapped_column(Text)
    bio: Mapped[str | None] = mapped_column(Text)
    role: Mapped[UserRole] = mapped_column(SqlEnum(UserRole, name="user_role", create_type=False), server_default=text("'USER'"))
    status: Mapped[AccountStatus] = mapped_column(SqlEnum(AccountStatus, name="account_status", create_type=False), server_default=text("'ACTIVE'"))
    email_verified_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    last_login_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))


class UserBase(SchemaOut):
    email: str
    username: str = Field(min_length=3, max_length=50)
    display_name: str = Field(min_length=1, max_length=100)
    avatar_url: str | None = None
    bio: str | None = None


class UserIn(UserBase):
    password: str = Field(min_length=8, max_length=128)


class UserOut(UserBase):
    id: uuid.UUID
    role: UserRole
    status: AccountStatus
    created_at: datetime
    updated_at: datetime
