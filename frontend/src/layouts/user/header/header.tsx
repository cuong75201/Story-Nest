import logo from "@/assets/nestStory_logo_2000x2000-removebg-preview.png";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Menu,
  Search,
  // SquarePen,
  X,
} from "lucide-react";

const navigationItems = [
  { label: "Khám Phá", path: "kham-pha", active: true },
  { label: "Bảng Xếp Hạng", path: "bang-xep-hang" },
  { label: "Thể Loại", path: "the-loai", dropdown: true },
  { label: "Danh sách", path: "danh-sach" },
  { label: "Diễn Đàn", path: "dien-dan" },
];

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsMenuOpen(false);
        setIsSearchOpen(true);
      }

      if (event.key === "Escape") {
        setIsSearchOpen(false);
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isSearchOpen) return;

    searchInputRef.current?.focus();
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isMenuOpen && !isSearchOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen, isSearchOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-surface/90 font-body-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-2 px-4 max-[359px]:px-3 sm:gap-4 sm:px-6 lg:gap-space-md lg:px-8">
        <div className="flex shrink-0 items-center gap-3 max-[359px]:gap-1 lg:gap-space-lg">
          <button
            type="button"
            aria-label="Mở danh mục điều hướng"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              setIsSearchOpen(false);
              setIsMenuOpen((isOpen) => !isOpen);
            }}
            className="rounded-lg p-1.5 text-on-surface-variant transition-colors hover:bg-surface-container-high lg:hidden"
          >
            <Menu aria-hidden="true" className="h-6 w-6" />
          </button>

          <a
            href="#"
            data-path="kham-pha"
            className="group flex items-center gap-space-sm no-underline max-[359px]:gap-1"
          >
            <img
              src={logo}
              alt="Story Nest Logo"
              className="h-9 w-auto object-contain max-[359px]:h-7"
            />
            <div className="flex flex-col">
              <span className="font-headline-lg text-headline-lg leading-none tracking-tight text-primary max-sm:text-sm max-[359px]:text-xs">
                Story Nest
              </span>
              <span className="mt-1 hidden font-label-sm text-label-sm font-normal leading-none text-on-surface-variant min-[480px]:inline">
                Thế giới truyện chữ
              </span>
            </div>
          </a>

          <nav
            aria-label="Điều hướng chính"
            className="hidden shrink-0 items-center gap-3 lg:flex xl:gap-space-md"
          >
            {navigationItems.map((item) => (
              <a
                key={item.path}
                href="#"
                data-path={item.path}
                aria-current={item.active ? "page" : undefined}
                className={`inline-flex items-center gap-1 whitespace-nowrap py-space-xs text-sm transition-colors xl:text-base ${
                  item.active
                    ? "font-bold text-primary"
                    : "font-label-md text-label-md text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <span>{item.label}</span>
                {item.dropdown && (
                  <ChevronDown aria-hidden="true" className="h-4 w-4" />
                )}
              </a>
            ))}
          </nav>
        </div>

        <div className="mx-2 hidden min-w-0 max-w-full flex-1 md:block lg:mx-space-sm">
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              setIsSearchOpen(true);
            }}
            aria-label="Mở tìm kiếm"
            aria-haspopup="dialog"
            className="flex h-10 w-full items-center rounded-xl bg-surface-container-low px-3 text-left transition-all hover:bg-surface-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:px-space-md"
          >
            <Search
              aria-hidden="true"
              className="mr-2 h-5 w-5 shrink-0 text-outline lg:mr-space-sm"
            />
            <span className="min-w-0 flex-1 truncate font-body-sm text-body-sm text-outline">
              Tìm kiếm tác phẩm, tác giả, thể loại...
            </span>
            <kbd className="ml-2 hidden shrink-0 rounded border border-outline-variant bg-surface-container-lowest px-1.5 py-0.5 font-label-sm text-[11px] font-medium text-outline lg:inline-block">
              Ctrl K
            </kbd>
          </button>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3 lg:gap-space-md">
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              setIsSearchOpen(true);
            }}
            aria-label="Mở tìm kiếm"
            aria-haspopup="dialog"
            className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface md:hidden"
          >
            <Search aria-hidden="true" className="h-5 w-5" />
          </button>

          {/* <a
            href="#"
            data-path="sang-tac"
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-primary px-3 py-2 font-label-md text-label-md text-on-primary shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition-all hover:bg-surface-container-high hover:text-on-surface max-[359px]:hidden sm:gap-space-xs sm:px-space-md sm:py-2.5"
          >
            <SquarePen aria-hidden="true" className="h-[18px] w-[18px]" />
            <span className="hidden sm:inline">Sáng Tác</span>
          </a>

          <button
            type="button"
            aria-label="Thông báo"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface max-[359px]:hidden sm:h-10 sm:w-10"
          >
            <Bell aria-hidden="true" className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-secondary-container ring-2 ring-surface" />
          </button> */}

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <a
              href="#"
              data-path="dang-nhap"
              className="inline-flex h-9 items-center  bg-surface-container-high  justify-center whitespace-nowrap rounded-lg px-2 font-label-md text-xs text-on-surface transition-colors hover:bg-surface-variant max-[359px]:h-8 max-[359px]:px-1.5 max-[359px]:text-[11px] sm:h-10 sm:px-3 sm:text-label-md"
            >
              Đăng nhập
            </a>
            <a
              href="#"
              data-path="dang-ky"
              className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-lg bg-primary px-2.5 font-label-md text-xs text-on-primary transition-opacity hover:opacity-85 max-[359px]:h-8 max-[359px]:px-1.5 max-[359px]:text-[11px] sm:h-10 sm:px-4 sm:text-label-md"
            >
              Đăng ký
            </a>
          </div>

        </div>
      </div>
      </header>

      <div
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
        className={`fixed inset-0 z-[60] bg-primary/35 backdrop-blur-sm transition-opacity duration-300 ease-out lg:hidden ${
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) setIsMenuOpen(false);
        }}
      >
          <aside
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Danh mục điều hướng"
            className={`flex h-full w-[min(20rem,calc(100%-2rem))] flex-col bg-surface-container-lowest shadow-2xl transition-transform duration-300 ease-out will-change-transform ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex h-20 shrink-0 items-center justify-between border-b border-surface-container-high px-4">
              <a
                href="#"
                data-path="kham-pha"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-space-sm"
              >
                <img
                  src={logo}
                  alt="Story Nest Logo"
                  className="h-9 w-auto object-contain"
                />
                <span className="font-headline-md text-headline-md tracking-tight text-primary">
                  Story Nest
                </span>
              </a>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Đóng danh mục điều hướng"
                className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
              {navigationItems.map((item) => (
                <a
                  key={item.path}
                  href="#"
                  data-path={item.path}
                  aria-current={item.active ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex min-h-12 items-center justify-between rounded-xl px-4 font-label-md text-label-md transition-colors ${
                    item.active
                      ? "bg-primary text-on-primary"
                      : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.dropdown && (
                    <ChevronDown aria-hidden="true" className="h-4 w-4" />
                  )}
                </a>
              ))}
            </nav>

            {/* Tạm ẩn nút sáng tác trong menu mobile.
            <div className="border-t border-surface-container-high p-4">
              <a
                href="#"
                data-path="sang-tac"
                onClick={() => setIsMenuOpen(false)}
                className="flex h-12 w-full items-center justify-center gap-space-sm rounded-xl bg-primary font-label-md text-label-md text-on-primary transition-opacity hover:opacity-85"
              >
                <SquarePen aria-hidden="true" className="h-5 w-5" />
                <span>Bắt đầu sáng tác</span>
              </a>
            </div>
            */}
          </aside>
        </div>

      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-primary/35 px-3 pt-20 backdrop-blur-sm sm:px-6 sm:pt-24"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsSearchOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-dialog-title"
            className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl bg-surface-container-lowest shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-surface-container-high px-4 py-3 sm:px-5">
              <h2
                id="search-dialog-title"
                className="font-headline-md text-headline-md text-on-surface"
              >
                Tìm kiếm
              </h2>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Đóng tìm kiếm"
                className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <form
              className="p-4 sm:p-5"
              onSubmit={(event) => event.preventDefault()}
            >
              <label htmlFor="header-search" className="sr-only">
                Tìm kiếm tác phẩm, tác giả, thể loại
              </label>
              <div className="flex items-center rounded-xl border-2 border-primary bg-surface px-3 shadow-[0_4px_16px_rgba(0,0,0,0.08)] sm:px-4">
                <Search
                  aria-hidden="true"
                  className="mr-3 h-5 w-5 shrink-0 text-on-surface-variant"
                />
                <input
                  ref={searchInputRef}
                  id="header-search"
                  type="search"
                  placeholder="Tìm kiếm tác phẩm, tác giả, thể loại..."
                  className="h-12 min-w-0 flex-1 border-0 bg-transparent font-body-md text-body-md text-on-surface outline-none placeholder:text-outline sm:h-14"
                />
                <button
                  type="submit"
                  aria-label="Tìm kiếm"
                  className="ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary transition-opacity hover:opacity-85 sm:w-auto sm:px-4"
                >
                  <Search aria-hidden="true" className="h-4.5 w-4.5" />
                  <span className="ml-2 hidden font-label-md text-label-md sm:inline">
                    Tìm
                  </span>
                </button>
              </div>
              <p className="mt-3 font-body-sm text-body-sm text-on-surface-variant">
                Nhập tên truyện, tác giả hoặc thể loại bạn muốn tìm.
              </p>
            </form>
          </section>
        </div>
      )}
    </>
  );
}

export default Header;
