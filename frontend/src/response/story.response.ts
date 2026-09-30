export type Visibility = "PUBLIC" | "PRIVATE";

export type StoryState =
  | "DRAFT"
  | "ONGOING"
  | "COMPLETED"
  | "HIATUS";

export type PublicationStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "HIDDEN"
  | "REMOVED";

export type GenreSummary = {
  id: string;
  name: string;
  slug: string;
  is_primary: boolean;
};

export type StoryOut = {
  id: string;
  owner_id: string;
  author_name: string;
  average_rating: number | null;
  rating_count: number;
  view_count: number;
  chapter_count: number;
  genres: GenreSummary[];
  title: string;
  slug: string;
  summary: string | null;
  cover_image_url: string | null;
  visibility: Visibility;
  state: StoryState;
  publication_status: PublicationStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}
