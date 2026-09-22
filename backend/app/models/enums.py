import enum


class UserRole(str, enum.Enum):
    USER = "USER"
    ADMIN = "ADMIN"


class AccountStatus(str, enum.Enum):
    ACTIVE = "ACTIVE"
    SUSPENDED = "SUSPENDED"
    DELETED = "DELETED"


class Visibility(str, enum.Enum):
    PUBLIC = "PUBLIC"
    PRIVATE = "PRIVATE"


class StoryState(str, enum.Enum):
    DRAFT = "DRAFT"
    ONGOING = "ONGOING"
    COMPLETED = "COMPLETED"
    HIATUS = "HIATUS"


class PublicationStatus(str, enum.Enum):
    DRAFT = "DRAFT"
    PUBLISHED = "PUBLISHED"
    HIDDEN = "HIDDEN"
    REMOVED = "REMOVED"


class CommentStatus(str, enum.Enum):
    ACTIVE = "ACTIVE"
    HIDDEN = "HIDDEN"
    REMOVED = "REMOVED"


class ReportStatus(str, enum.Enum):
    PENDING = "PENDING"
    REVIEWING = "REVIEWING"
    RESOLVED = "RESOLVED"
    DISMISSED = "DISMISSED"


class NotificationType(str, enum.Enum):
    NEW_CHAPTER = "NEW_CHAPTER"
    STORY_UPDATED = "STORY_UPDATED"
    NEW_FOLLOWER = "NEW_FOLLOWER"
    COMMENT = "COMMENT"
    REPORT_RESOLVED = "REPORT_RESOLVED"
    SYSTEM = "SYSTEM"
