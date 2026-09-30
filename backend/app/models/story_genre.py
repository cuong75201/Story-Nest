import uuid

from sqlalchemy import ForeignKey, text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import SchemaOut


class StoryGenre(Base):
    __tablename__ = "story_genres"
    story_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("stories.id", ondelete="CASCADE"), primary_key=True)
    genre_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("genres.id", ondelete="RESTRICT"), primary_key=True)
    is_primary: Mapped[bool] = mapped_column(default=False, server_default=text("false"))


class StoryGenreBase(SchemaOut):
    story_id: uuid.UUID
    genre_id: uuid.UUID
    is_primary: bool = False


class StoryGenreIn(StoryGenreBase):
    pass


class StoryGenreOut(StoryGenreBase):
    pass
