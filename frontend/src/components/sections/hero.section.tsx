import type { StoryOut } from "@/response/story.response";
import logo from "@/assets/nestStory_logo_2000x2000.png";
import { BookOpen, BookmarkPlus, Share2, Star } from "lucide-react";

type HeroSectionProps = {
  hero: StoryOut | null;
};

const stateLabels: Record<StoryOut["state"], string> = {
  DRAFT: "Bản nháp",
  ONGOING: "Đang ra",
  COMPLETED: "Hoàn thành",
  HIATUS: "Tạm ngưng",
};

const numberFormatter = new Intl.NumberFormat("vi-VN");

const HeroSection = ({ hero }: HeroSectionProps) => {
  if (!hero) {
    return null;
  }

  const primaryGenre = hero.genres.find((genre) => genre.is_primary);

  return (
    <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl shadow-md p-5 sm:p-space-lg relative overflow-hidden flex flex-col justify-between group">
      <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-linear-to-br from-secondary-container/10 via-primary/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-center sm:items-start relative z-10">
        <div className="w-40 sm:w-44 md:w-48 xl:w-56 shrink-0 aspect-2/3 rounded-xl overflow-hidden shadow-lg relative bg-surface-container-high">
          <img
            src={hero.cover_image_url || logo}
            alt={`Ảnh bìa ${hero.title}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-primary/80 to-transparent p-2.5 sm:p-space-sm pt-6 text-on-primary">
            <span className="font-label-sm text-label-sm font-semibold">
              {numberFormatter.format(hero.chapter_count)} Chương
            </span>
          </div>
        </div>
           <div className="flex-1 min-w-0 flex flex-col justify-between py-1 text-center sm:text-left">
                                <div>
                                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-2 flex-wrap">
                                        {primaryGenre && (
                                          <span
                                            className="px-2.5 py-0.5 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface-variant font-medium">
                                            {primaryGenre.name}
                                          </span>
                                        )}
                                        <span
                                            className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">
                                            {stateLabels[hero.state]}
                                        </span>
                                        <div
                                            className="flex items-center gap-1 text-secondary-container sm:ml-auto font-label-sm text-label-sm font-bold">
                                            <Star aria-hidden="true" className="size-4 fill-current" />
                                            <span>
                                              {hero.average_rating !== null
                                                ? hero.average_rating.toFixed(1)
                                                : "—"}
                                            </span>
                                            <span className="text-on-surface-variant font-normal">
                                              ({numberFormatter.format(hero.rating_count)} đánh giá)
                                            </span>
                                        </div>
                                    </div>
                                    <h2
                                        className="font-headline-xl text-2xl sm:text-headline-xl text-primary tracking-tight font-extrabold mb-1">
                                        {hero.title}
                                    </h2>
                                    <p
                                        className="font-label-md text-label-md text-on-surface-variant mb-3 flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                                        <span>Tác giả: <strong className="text-on-surface">{hero.author_name}</strong></span>
                                        <span className="inline-block w-1 h-1 rounded-full bg-outline-variant"></span>
                                        <span>{numberFormatter.format(hero.view_count)} Lượt đọc</span>
                                    </p>
                                    <p
                                        className="font-body-md text-body-md text-on-surface-variant line-clamp-3 leading-relaxed mb-5">
                                        {hero.summary}
                                    </p>
                                </div>
                                {/* Action CTAs */}
                                <div
                                    className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-space-md pt-1">
                                    <a className="inline-flex items-center justify-center gap-2 px-4 sm:px-space-lg py-2.5 sm:py-3 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-bold shadow-md hover:bg-surface-container-high hover:text-on-surface transition-all flex-1 sm:flex-none"
                                        href="#">
                                        <BookOpen aria-hidden="true" className="size-5" />
                                        <span>Đọc Ngay Chương 1</span>
                                    </a>
                                    <button
                                        className="inline-flex items-center justify-center gap-2 px-3 sm:px-space-md py-2.5 sm:py-3 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-variant transition-colors flex-1 sm:flex-none">
                                        <BookmarkPlus aria-hidden="true" className="size-4.5" />
                                        <span>Thêm vào Tủ Sách</span>
                                    </button>
                                    <button
                                        className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-colors shrink-0"
                                        title="Chia sẻ tác phẩm">
                                        <Share2 aria-hidden="true" className="size-5 " />
                                    </button>
                                </div>
                            </div>
      </div>
    </div>
  );
};

export default HeroSection;
