import type { StoryOut } from "./story.response";

export type Homepage = {
  hero: StoryOut | null;
  editor_pick: StoryOut[];
};
