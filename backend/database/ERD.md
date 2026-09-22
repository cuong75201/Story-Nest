# ERD — Story Nest

```mermaid
erDiagram
    USERS {
        uuid id PK
        varchar email UK
        varchar username UK
        user_role role
        account_status status
    }
    GENRES {
        uuid id PK
        varchar name UK
        varchar slug UK
    }
    STORIES {
        uuid id PK
        uuid owner_id FK
        varchar title
        varchar slug UK
        visibility visibility
        story_state state
        publication_status publication_status
    }
    STORY_GENRES {
        uuid story_id PK, FK
        uuid genre_id PK, FK
    }
    CHAPTERS {
        uuid id PK
        uuid story_id FK
        int chapter_number
        publication_status publication_status
    }
    STORY_FOLLOWS {
        uuid user_id PK, FK
        uuid story_id PK, FK
    }
    STORY_FAVORITES {
        uuid user_id PK, FK
        uuid story_id PK, FK
    }
    USER_FOLLOWS {
        uuid follower_id PK, FK
        uuid following_id PK, FK
    }
    READING_PROGRESS {
        uuid user_id PK, FK
        uuid story_id PK, FK
        uuid chapter_id FK
        int position
    }
    STORY_VIEWS {
        uuid id PK
        uuid story_id FK
        uuid chapter_id FK
        uuid user_id FK
    }
    COMMENTS {
        uuid id PK
        uuid author_id FK
        uuid story_id FK
        uuid chapter_id FK
        uuid parent_id FK
        comment_status status
    }
    RATINGS {
        uuid user_id PK, FK
        uuid story_id PK, FK
        smallint score
    }
    NOTIFICATIONS {
        uuid id PK
        uuid recipient_id FK
        uuid actor_id FK
        notification_type type
    }
    REPORTS {
        uuid id PK
        uuid reporter_id FK
        uuid story_id FK
        uuid chapter_id FK
        uuid comment_id FK
        uuid handled_by FK
        report_status status
    }

    USERS ||--o{ STORIES : owns
    STORIES ||--o{ CHAPTERS : contains
    STORIES ||--o{ STORY_GENRES : categorized
    GENRES ||--o{ STORY_GENRES : classifies

    USERS ||--o{ STORY_FOLLOWS : follows
    STORIES ||--o{ STORY_FOLLOWS : followed_by
    USERS ||--o{ STORY_FAVORITES : favorites
    STORIES ||--o{ STORY_FAVORITES : favorited_by
    USERS ||--o{ USER_FOLLOWS : follower
    USERS ||--o{ USER_FOLLOWS : following

    USERS ||--o{ READING_PROGRESS : reads
    STORIES ||--o{ READING_PROGRESS : progress_for
    CHAPTERS ||--o{ READING_PROGRESS : last_chapter
    USERS o|--o{ STORY_VIEWS : makes
    STORIES ||--o{ STORY_VIEWS : receives
    CHAPTERS o|--o{ STORY_VIEWS : viewed_chapter

    USERS ||--o{ COMMENTS : writes
    STORIES o|--o{ COMMENTS : story_comments
    CHAPTERS o|--o{ COMMENTS : chapter_comments
    COMMENTS o|--o{ COMMENTS : replies_to
    USERS ||--o{ RATINGS : gives
    STORIES ||--o{ RATINGS : receives

    USERS ||--o{ NOTIFICATIONS : receives
    USERS o|--o{ NOTIFICATIONS : acts
    USERS ||--o{ REPORTS : submits
    USERS o|--o{ REPORTS : handles
    STORIES o|--o{ REPORTS : reported_story
    CHAPTERS o|--o{ REPORTS : reported_chapter
    COMMENTS o|--o{ REPORTS : reported_comment
```

## Ghi chú

- `STORY_GENRES` là bảng trung gian cho quan hệ nhiều-nhiều giữa truyện và thể loại.
- `STORY_FOLLOWS`, `STORY_FAVORITES`, `USER_FOLLOWS` và `RATINGS` dùng khóa chính ghép để không tạo tương tác trùng lặp.
- Một `COMMENTS` phải thuộc đúng một trong hai đối tượng: `STORIES` hoặc `CHAPTERS`; `parent_id` hỗ trợ bình luận trả lời.
- Một `REPORTS` phải báo cáo đúng một trong ba đối tượng: truyện, chương hoặc bình luận.
- `READING_PROGRESS` lưu chương và vị trí đọc gần nhất cho từng cặp người dùng–truyện.
