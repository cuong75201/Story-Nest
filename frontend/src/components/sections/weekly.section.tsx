import logo from "@/assets/nestStory_logo_2000x2000.png";
import Skeleton from "@/components/ui/skeleton.ui";
import type { StoryOut } from "@/response/story.response";
import { Trophy } from "lucide-react";

type WeeklyProps = {
  stories: StoryOut[];
  loading: boolean;
};

const numberFormatter = new Intl.NumberFormat("vi-VN", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const Weekly = ({ stories, loading }: WeeklyProps) => {
  return (
    <section className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col">
      <h3 className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-1.5 mb-space-md">
        <Trophy aria-hidden="true" className="size-5 text-secondary-container" />
        Bảng Xếp Hạng Tuần
      </h3>

      {loading ? (
        <div className="flex flex-col gap-space-xs">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="flex items-center gap-space-sm p-2">
              <Skeleton className="size-6 shrink-0" />
              <Skeleton className="h-14 w-10 shrink-0" />
              <div className="flex-1">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="mt-2 h-3 w-3/5" />
              </div>
            </div>
          ))}
        </div>
      ) : stories.length === 0 ? (
        <div className="min-h-64 flex items-center justify-center px-4 text-center text-on-surface-variant">
          Dữ liệu chưa được cập nhật
        </div>
      ) : (
        <div className="flex flex-col gap-space-xs">
          {stories.map((story, index) => (
            <article
              key={story.id}
              className={`p-2 rounded-lg flex items-center gap-space-sm group cursor-pointer hover:bg-surface-container-low transition-colors min-w-0 ${
                index === 0 ? "bg-surface-container-low/70" : ""
              }`}
            >
              <span
                className={`w-6 h-6 rounded-md font-label-md text-label-md font-extrabold flex items-center justify-center shrink-0 ${
                  index === 0
                    ? "bg-secondary-container text-on-primary"
                    : "bg-surface-container-highest text-on-surface"
                }`}
              >
                {index + 1}
              </span>
              <div className="w-10 h-14 rounded overflow-hidden shrink-0 shadow-sm bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  src={story.cover_image_url || logo}
                  alt={`Ảnh bìa ${story.title}`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-label-md text-label-md font-bold text-primary truncate group-hover:text-secondary-container transition-colors">
                  {story.title}
                </h4>
                <p className="font-body-sm text-xs text-on-surface-variant truncate">
                  {story.author_name}
                </p>
                <span className="font-label-sm text-[11px] font-bold text-secondary-container">
                  {numberFormatter.format(story.view_count)} lượt đọc
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Weekly;
