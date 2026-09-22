"""One table per module. Import models with `from app.models import User, Story`."""

from app.models.chapter import Chapter, ChapterBase, ChapterIn, ChapterOut
from app.models.comment import Comment, CommentBase, CommentIn, CommentOut
from app.models.enums import (
    AccountStatus,
    CommentStatus,
    NotificationType,
    PublicationStatus,
    ReportStatus,
    StoryState,
    UserRole,
    Visibility,
)
from app.models.genre import Genre, GenreBase, GenreIn, GenreOut
from app.models.notification import Notification, NotificationBase, NotificationIn, NotificationOut
from app.models.rating import Rating, RatingBase, RatingIn, RatingOut
from app.models.reading_progress import ReadingProgress, ReadingProgressBase, ReadingProgressIn, ReadingProgressOut
from app.models.report import Report, ReportBase, ReportIn, ReportOut
from app.models.story import Story, StoryBase, StoryIn, StoryOut
from app.models.story_favorite import StoryFavorite, StoryFavoriteBase, StoryFavoriteIn, StoryFavoriteOut
from app.models.story_follow import StoryFollow, StoryFollowBase, StoryFollowIn, StoryFollowOut
from app.models.story_genre import StoryGenre, StoryGenreBase, StoryGenreIn, StoryGenreOut
from app.models.story_statistics import StoryStatistics, StoryStatisticsOut
from app.models.story_view import StoryView, StoryViewBase, StoryViewIn, StoryViewOut
from app.models.user import User, UserBase, UserIn, UserOut
from app.models.user_follow import UserFollow, UserFollowBase, UserFollowIn, UserFollowOut
