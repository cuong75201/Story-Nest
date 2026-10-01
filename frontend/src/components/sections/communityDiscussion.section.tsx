import { Construction, MessageCircle } from "lucide-react";

const CommunityDiscussion = () => {
  return (
    <section className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
      <div className="flex items-center justify-between pb-1">
        <h3 className="font-headline-md text-body-lg font-bold text-primary flex items-center gap-1.5">
          <MessageCircle aria-hidden="true" className="size-4.5 text-outline" />
          Góc Thảo Luận Sôi Nổi
        </h3>
        <span
          aria-label="Đang hoạt động"
          className="w-2 h-2 rounded-full bg-secondary-container"
        />
      </div>

      <div className="min-h-32 rounded-lg bg-surface-container-low flex flex-col items-center justify-center gap-2 px-4 text-center">
        <Construction
          aria-hidden="true"
          className="size-7 text-secondary-container"
        />
        <p className="font-label-md text-label-md font-semibold text-primary">
          Tính năng đang được phát triển
        </p>
        <p className="font-body-sm text-xs text-on-surface-variant">
          Góc thảo luận sẽ sớm được ra mắt.
        </p>
      </div>
    </section>
  );
};

export default CommunityDiscussion;
