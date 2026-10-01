import Skeleton from "@/components/ui/skeleton.ui";
import type { StoryOut } from "@/response/story.response";
import { Clock3 } from "lucide-react";

type RecentlyUpdatedProps = {
  stories: StoryOut[];
  loading: boolean;
};

const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  dateStyle: "short",
  timeStyle: "short",
});

const RecentlyUpdated = ({ stories, loading }: RecentlyUpdatedProps) => {
  return (
    <section className="flex flex-col gap-space-md">
      <div className="flex items-center gap-space-sm">
        <div className="w-2.5 h-6 bg-tertiary-container rounded-full" />
        <h3 className="font-headline-lg text-lg sm:text-headline-lg text-primary font-bold tracking-tight">
          Truyện Mới Cập Nhật
        </h3>
      </div>

      {loading ? (
        <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
          {Array.from({ length: 5 }, (_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 border-b border-outline-variant/20 last:border-b-0"
            >
              <Skeleton className="h-6 w-20 shrink-0" />
              <div className="min-w-0 flex-1">
                <Skeleton className="h-4 w-3/5" />
                <Skeleton className="mt-2 h-3 w-2/5" />
              </div>
              <Skeleton className="h-4 w-24 shrink-0" />
            </div>
          ))}
        </div>
      ) : stories.length === 0 ? (
        <div className="min-h-64 rounded-xl bg-surface-container-lowest flex items-center justify-center px-4 text-center text-on-surface-variant">
          Dữ liệu chưa được cập nhật
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm divide-y divide-outline-variant/20">
          {stories.map((story, index) => {
            const primaryGenre =
              story.genres.find((genre) => genre.is_primary) ?? story.genres[0];
            const formattedDate = dateFormatter.format(
              new Date(story.updated_at),
            );

            return (
              <article
                key={story.id}
                className={`flex items-center justify-between gap-3 min-w-0 p-3 sm:p-space-md hover:bg-surface-container-low transition-colors group cursor-pointer ${
                  index % 2 === 1 ? "bg-surface-container-lowest/60" : ""
                }`}
              >
                <div className="flex items-center gap-2.5 sm:gap-space-md min-w-0 flex-1 overflow-hidden">
                  {primaryGenre && (
                    <span
                      title={primaryGenre.name}
                      className="max-w-20 sm:max-w-28 truncate font-label-sm text-[11px] sm:text-xs px-2 py-1 rounded bg-surface-container-high text-on-surface-variant shrink-0 font-medium"
                    >
                      {primaryGenre.name}
                    </span>
                  )}

                  <div className="min-w-0 flex-1 overflow-hidden">
                    <h4
                      title={story.title}
                      className="truncate font-headline-md text-sm sm:text-body-lg font-bold text-primary group-hover:text-secondary-container transition-colors"
                    >
                      {story.title}
                    </h4>
                    <p
                      title={`${story.author_name} · ${story.chapter_count} chương`}
                      className="truncate font-body-sm text-xs sm:text-body-sm text-on-surface-variant"
                    >
                      {story.author_name} · {story.chapter_count} chương
                    </p>
                  </div>
                </div>

                <time
                  dateTime={story.updated_at}
                  title={formattedDate}
                  className="flex max-w-[35%] shrink-0 items-center gap-1 overflow-hidden font-label-sm text-xs text-outline font-medium"
                >
                  <Clock3 aria-hidden="true" className="size-3.5 shrink-0" />
                  <span className="truncate">{formattedDate}</span>
                </time>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default RecentlyUpdated;
