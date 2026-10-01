import { BookOpen, PenLine } from "lucide-react";

const AuthorStudio = () => {
  return (
    <section className="bg-linear-to-br from-primary-container via-surface-container-highest to-surface-container rounded-xl p-space-lg text-on-primary shadow-md relative overflow-hidden flex flex-col justify-between">
      <div className="relative z-10">
        <span className="font-metadata-badge text-metadata-badge uppercase tracking-wider text-secondary-fixed-dim font-bold block mb-1">
          Dành Cho Nhà Văn &amp; Tác Giả
        </span>
        <h3 className="font-headline-md text-headline-md font-extrabold text-on-primary mb-space-xs leading-snug">
          Gia nhập Story Nest Studio
        </h3>
        <p className="font-body-sm text-body-sm text-on-primary-container mb-space-md leading-relaxed">
          Biến đam mê văn chương thành thu nhập thực tế. Nhuận bút hấp dẫn,
          bảo hộ tác quyền minh bạch cùng cộng đồng độc giả đang chờ đón.
        </p>
        <a
          className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md font-bold hover:bg-secondary-fixed transition-colors shadow-sm"
          href="#"
        >
          <PenLine aria-hidden="true" className="size-4.5" />
          <span>Bắt Đầu Sáng Tác</span>
        </a>
      </div>

      <BookOpen
        aria-hidden="true"
        className="absolute -right-6 -bottom-6 size-36 text-on-primary opacity-15 pointer-events-none"
      />
    </section>
  );
};

export default AuthorStudio;
