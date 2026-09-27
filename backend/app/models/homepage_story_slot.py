import uuid
from datetime import datetime

from pydantic import Field, model_validator
from sqlalchemy import CheckConstraint, Enum as SqlEnum, ForeignKey, SmallInteger, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import SchemaOut, TimestampMixin
from app.models.enums import HomepageSlot
from app.models.story import StoryOut


class HomepageStorySlot(TimestampMixin, Base):
    __tablename__ = "homepage_story_slots"
    __table_args__ = (
        UniqueConstraint("slot", "story_id", name="homepage_story_slots_slot_story_id_key"),
        CheckConstraint("slot IN ('HERO', 'EDITOR_PICK')", name="homepage_story_slots_slot_check"),
        CheckConstraint("position > 0", name="homepage_story_slots_position_positive"),
        CheckConstraint("slot <> 'HERO' OR position = 1", name="homepage_story_slots_hero_position"),
    )

    slot: Mapped[HomepageSlot] = mapped_column(
        SqlEnum(HomepageSlot, native_enum=False, create_constraint=False, length=20),
        primary_key=True,
    )
    position: Mapped[int] = mapped_column(
        SmallInteger,
        primary_key=True,
        default=1,
        server_default="1",
    )
    story_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("stories.id", ondelete="CASCADE"))
    selected_by: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="SET NULL"),
    )


class HomepageStorySlotBase(SchemaOut):
    slot: HomepageSlot
    position: int = Field(default=1, ge=1)
    story_id: uuid.UUID

    @model_validator(mode="after")
    def validate_hero_position(self) -> "HomepageStorySlotBase":
        if self.slot == HomepageSlot.HERO and self.position != 1:
            raise ValueError("HERO must use position 1.")
        return self


class HomepageStorySlotIn(HomepageStorySlotBase):
    pass


class HomepageStorySlotOut(HomepageStorySlotBase):
    selected_by: uuid.UUID | None
    created_at: datetime
    updated_at: datetime


class HomepageOut(SchemaOut):
    hero: StoryOut | None = None
    editor_pick: list[StoryOut] = Field(default_factory=list)
