import logo from "@/assets/nestStory_logo_2000x2000.png";
import type { StoryOut } from "@/response/story.response";
import { BadgeCheck, Star } from "lucide-react";

type EditorPickProps = {
  editorPicks: StoryOut[];
};

const EditorPick = ({ editorPicks }: EditorPickProps) => {
  if (editorPicks.length === 0) {
    return null;
  }

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm flex-1 justify-center">
      <div className="flex items-center justify-between pb-1">
        <span className="font-headline-md text-body-md font-bold text-primary flex items-center gap-1 truncate">
          <BadgeCheck
            aria-hidden="true"
            className="size-4.5 text-secondary-container shrink-0"
          />
          <span>Lựa Chọn Của Ban Biên Tập</span>
        </span>
        <a
          className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary shrink-0 ml-2"
          href="#"
        >
          Xem thêm
        </a>
      </div>

      {editorPicks.map((story) => {
        const primaryGenre =
          story.genres.find((genre) => genre.is_primary) ?? story.genres[0];

        return (
          <a
            key={story.id}
            href="#"
            className="flex items-center gap-space-sm p-1.5 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group min-w-0"
          >
            <div className="w-12 h-16 rounded overflow-hidden shrink-0 shadow-sm bg-surface-container-high">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                src={story.cover_image_url || logo}
                alt={`Ảnh bìa ${story.title}`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-label-md text-label-md font-bold text-primary truncate group-hover:text-secondary-container transition-colors">
                {story.title}
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                {story.author_name}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                {primaryGenre && (
                  <span className="font-label-sm text-[11px] px-1.5 py-0.5 bg-surface-container-high rounded text-on-surface-variant truncate">
                    {primaryGenre.name}
                  </span>
                )}
                <span className="inline-flex items-center gap-0.5 font-label-sm text-[11px] text-secondary-container font-semibold shrink-0">
                  <Star aria-hidden="true" className="size-3 fill-current" />
                  {story.average_rating !== null
                    ? story.average_rating.toFixed(1)
                    : "—"}
                </span>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default EditorPick;
