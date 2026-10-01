import AuthorStudio from "@/components/sections/authorStudio.section";
import CommunityDiscussion from "@/components/sections/communityDiscussion.section";
import ContinueReading from "@/components/sections/continueReading.section";
import EditorPick from "@/components/sections/editorPick.section";
import HeroSection from "@/components/sections/hero.section";
import RecentlyUpdated from "@/components/sections/recentlyUpdated.section";
import Trending from "@/components/sections/trending.section";
import Weekly from "@/components/sections/weekly.section";
import Skeleton from "@/components/ui/skeleton.ui";
import { useCallApi } from "@/hook/useCallApi";
import type { Homepage } from "@/response/homepage.response";
import type { StoryOut } from "@/response/story.response";
import { getHomePageSlot } from "@/services/homepage.service";
import {
  getRecentlyUpdatedStories,
  getTrendingStories,
  getWeeklyStories,
} from "@/services/stories.service";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { execute: executeHomepage, loading: homepageLoading } = useCallApi(true);
  const { execute: executeTrending, loading: trendingLoading } = useCallApi(true);
  const { execute: executeWeekly, loading: weeklyLoading } = useCallApi(true);
  const { execute: executeRecent, loading: recentLoading } = useCallApi(true);
  const [homepage, setHomepage] = useState<Homepage | null>(null);
  const [trending, setTrending] = useState<StoryOut[]>([]);
  const [weekly, setWeekly] = useState<StoryOut[]>([]);
  const [recent, setRecent] = useState<StoryOut[]>([]);

  const loadHomepage = async () => {
    const response = await executeHomepage(() => getHomePageSlot());
    if (response?.status) {
      setHomepage(response.data);
    }
  };

  const loadTrending = async () => {
    const response = await executeTrending(() =>
      getTrendingStories({ page_size: 4 }),
    );
    if (response?.status && response.data) {
      setTrending(response.data.items);
    }
  };

  const loadWeekly = async () => {
    const response = await executeWeekly(() =>
      getWeeklyStories({ page_size: 5 }),
    );
    if (response?.status && response.data) {
      setWeekly(response.data.items);
    }
  };

  const loadRecent = async () => {
    const response = await executeRecent(() =>
      getRecentlyUpdatedStories({ page_size: 5 }),
    );
    if (response?.status && response.data) {
      setRecent(response.data.items);
    }
  };

  // Chỉ tải dữ liệu một lần khi trang Home được mount.
  // oxlint-disable react-hooks/exhaustive-deps
  useEffect(() => {
    void loadHomepage();
    void loadTrending();
    void loadWeekly();
    void loadRecent();
  }, []);
  // oxlint-enable react-hooks/exhaustive-deps

  return (
    <main className="relative flex min-h-screen w-full flex-col bg-surface pb-24 pt-28 md:pt-16">
      <div className="flex w-full flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-space-lg w-full flex flex-col gap-8 sm:gap-space-xl">
          {/* <!-- Hero Spotlight & Continue Reading Row --> */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-stretch">
            {homepageLoading ? (
              <Skeleton className="lg:col-span-8 min-h-96 rounded-xl" />
            ) : homepage?.hero ? (
              <HeroSection hero={homepage.hero} />
            ) : (
              <div className="lg:col-span-8 min-h-96 rounded-xl bg-surface-container-lowest flex items-center justify-center text-on-surface-variant">
                Dữ liệu chưa được cập nhật
              </div>
            )}
            {/* <!-- Right Column: Continue Reading & Editor Picks (Right 4 Cols) --> */}
            <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-space-md justify-between">
              <ContinueReading />
              {homepageLoading ? (
                <Skeleton className="min-h-52 rounded-xl" />
              ) : homepage?.editor_pick?.length ? (
                <EditorPick editorPicks={homepage.editor_pick} />
              ) : (
                <div className="min-h-52 rounded-xl bg-surface-container-lowest flex items-center justify-center px-4 text-center text-on-surface-variant">
                  Dữ liệu chưa được cập nhật
                </div>
              )}
            </div>
          </section>
          {/* <!-- Main Responsive Grid: 8 Cols Left / 4 Cols Right, stacked gracefully on mobile/tablet --> */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
            {/* <!-- ================= LEFT COLUMN (8 Cols) ================= --> */}
            <div className="lg:col-span-8 flex flex-col gap-6 sm:gap-space-xl min-w-0">
              <Trending stories={trending} loading={trendingLoading} />
              <RecentlyUpdated stories={recent} loading={recentLoading} />
            </div>
            <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-space-xl min-w-0">
              <Weekly stories={weekly} loading={weeklyLoading} />
              <CommunityDiscussion />
              <AuthorStudio />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
