import logo from "@/assets/nestStory_logo_2000x2000.png";
import Skeleton from "@/components/ui/skeleton.ui";
import type { StoryOut } from "@/response/story.response";
import { Star } from "lucide-react";

type TrendingProps = {
  stories: StoryOut[];
  loading: boolean;
};

const numberFormatter = new Intl.NumberFormat("vi-VN");

const Trending = ({ stories, loading }: TrendingProps) => {
  return (
    <section className="flex flex-col gap-space-md">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-space-sm">
          <div className="w-2.5 h-6 bg-secondary-container rounded-full" />
          <h3 className="font-headline-lg text-lg sm:text-headline-lg text-primary font-bold tracking-tight">
            Top Thịnh Hành
          </h3>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="rounded-xl bg-surface-container-lowest p-2.5 sm:p-space-sm"
            >
              <Skeleton className="aspect-2/3 w-full rounded-xl" />
              <Skeleton className="mt-3 h-5 w-4/5" />
              <Skeleton className="mt-2 h-4 w-3/5" />
              <Skeleton className="mt-3 h-7 w-full" />
            </div>
          ))}
        </div>
      ) : stories.length === 0 ? (
        <div className="min-h-64 rounded-xl bg-surface-container-lowest flex items-center justify-center px-4 text-center text-on-surface-variant">
          Dữ liệu chưa được cập nhật
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {stories.map((story, index) => {
            const primaryGenre =
              story.genres.find((genre) => genre.is_primary) ?? story.genres[0];

            return (
              <article
                key={story.id}
                className="bg-surface-container-lowest rounded-xl p-2.5 sm:p-space-sm flex flex-col shadow-sm hover:shadow-md transition-all group cursor-pointer relative min-w-0"
              >
                <div className="relative aspect-2/3 w-full rounded-xl overflow-hidden mb-space-sm bg-surface-container">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={story.cover_image_url || logo}
                    alt={`Ảnh bìa ${story.title}`}
                  />
                  <span className="absolute top-2 left-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-secondary-container text-on-primary font-label-md text-xs sm:text-label-md font-extrabold flex items-center justify-center shadow-md">
                    {index + 1}
                  </span>
                  <span className="absolute bottom-2 right-2 px-1.5 sm:px-2 py-0.5 rounded bg-inverse-surface/80 text-inverse-on-surface font-label-sm text-[11px] backdrop-blur-sm">
                    {numberFormatter.format(story.chapter_count)}C
                  </span>
                </div>

                <h4 className="font-headline-md text-sm sm:text-body-lg font-bold text-primary truncate group-hover:text-secondary-container transition-colors">
                  {story.title}
                </h4>
                <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant truncate">
                  {story.author_name}
                </p>

                <div className="flex items-center justify-between mt-2 pt-2 bg-surface-container-low/50 -mx-2.5 -mb-2.5 sm:-mx-space-sm sm:-mb-space-sm px-2.5 sm:px-space-sm py-1.5 rounded-b-xl">
                  <div className="flex items-center text-secondary-container text-label-sm font-semibold">
                    <Star aria-hidden="true" className="size-3.5 fill-current" />
                    <span className="ml-0.5 text-xs sm:text-sm">
                      {story.average_rating?.toFixed(1) ?? "—"}
                    </span>
                  </div>
                  {primaryGenre && (
                    <span className="font-metadata-badge text-[11px] text-on-surface-variant font-medium truncate ml-2">
                      {primaryGenre.name}
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Trending;
