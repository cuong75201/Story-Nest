import { BookOpenText, CloudSync, LogIn } from "lucide-react";

const ContinueReading = () => {
  return (
    <div className="bg-primary-container text-on-primary rounded-xl p-space-md shadow-md relative overflow-hidden flex flex-col justify-between">
      <div className="relative z-10 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-secondary-fixed-dim uppercase tracking-wider font-bold">
            <CloudSync size={18} />
            Đồng Bộ Tủ Sách
          </span>
          <span className="font-metadata-badge text-metadata-badge bg-surface-container-lowest/15 px-2 py-0.5 rounded text-on-primary">
            Dành cho Khách
          </span>
        </div>
        <div>
          <h3 className="font-headline-md text-body-lg font-bold text-on-primary mb-1">
            Đăng nhập để lưu tiến độ
          </h3>
          <p className="font-body-sm text-body-sm text-on-primary-container leading-relaxed">
            Lưu lại chương đang đọc dở trên mọi thiết bị và theo dõi thông báo
            chương mới từ tác giả yêu thích.
          </p>
        </div>
        <a
          className="mt-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md font-bold hover:bg-secondary-fixed transition-colors shadow-sm"
          href="#"
        >
          <LogIn size={18} />
          <span className="">Đăng Nhập Ngay</span>
        </a>
        <p className="text-center font-label-sm text-[11px] text-on-primary-container">
          Chưa có tài khoản?{" "}
          <a
            className="text-secondary-fixed-dim hover:underline font-semibold"
            href="#"
          >
            Đăng ký trong 30 giây
          </a>
        </p>
      </div>
      <div className="absolute -right-6 -bottom-6 opacity-15 pointer-events-none">
        <BookOpenText size={120} className="text-on-primary" />
      </div>
    </div>
  );
};

export default ContinueReading;
