import { api } from "@/libs/api";
import type { StoryListOut } from "@/response/story.response";

export type StoryListParams = {
  page?: number;
  page_size?: number;
};

export const getStoryList = async (
  url: string = "/stories",
  params?: StoryListParams,
) => {
  const response = await api.get<StoryListOut>(url, { params });
  return response;
};

export const getTrendingStories = async (params?: StoryListParams) => {
  const response = await getStoryList("/stories/trending", params);
  return response;
};

export const getWeeklyStories = async (params?: StoryListParams) => {
  const response = await getStoryList("/stories/weekly", params);
  return response;
};

export const getRecentlyUpdatedStories = async (params?: StoryListParams) => {
  const response = await getStoryList("/stories/recently-updated", params);
  return response;
};
