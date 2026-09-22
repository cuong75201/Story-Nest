import uuid
from datetime import datetime

from sqlalchemy import CheckConstraint, DateTime, ForeignKey, text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import SchemaOut


class UserFollow(Base):
    __tablename__ = "user_follows"
    __table_args__ = (CheckConstraint("follower_id <> following_id", name="user_follows_no_self_follow"),)
    follower_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    following_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=text("now()"))


class UserFollowBase(SchemaOut):
    following_id: uuid.UUID


class UserFollowIn(UserFollowBase):
    pass


class UserFollowOut(UserFollowBase):
    follower_id: uuid.UUID
    created_at: datetime
