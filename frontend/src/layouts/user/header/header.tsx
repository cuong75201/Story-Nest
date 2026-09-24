import { Link } from "react-router";
import logo from "@/assets/nestStory_logo_2000x2000-removebg-preview.png";
import { Search, Bell } from "lucide-react";

function Header() {
  return (
    <header className="fixed top-0 w-full z-50 pt-[env(safe-area-inset-top,0px)] bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-16 px-gutter flex items-center justify-between">
        <div className="flex items-center gap-space-sm">
          <img
            src={logo}
            alt="Nest Story Logo"
            className="h-8 w-auto object-contain"
          />
          <div className="flex flex-col">
            <span className="font-headline-md text-headline-md tracking-tight text-primary leading-none">
              Story Nest
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant leading-none mt-0.5 truncate ">
              Khám Phá
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <a
            href="#"
            className='"w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors'
          >
            <Search />
          </a>
          <a
            href="#"
            className="relative w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <Bell />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface"></span>
          </a>
          <a
            className="w-11 h-11 flex items-center justify-center pl-1"
            data-path="tai-khoan"
            href="#"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLOIEn0BakeIYBu_lWFJtjSQXft-SDPjUXx_PKshyoKJWgX1roUjmXM8wlQk_UP8srgKlOKBmI0bfzihQTp06lmTDEU8QYDOkEsBzo8UrmULUa0JvX-SuM7A9YdS9Hh26CgcYuoF5DyUT3RvI5Tb6yGnGE0lsndvnlDpsHUMq0ENVQo3mTVzN4ScnqKDsLbXi8rzJRfTYBPBQleUBiGWYPyfu-2IScqjC6oVFkLUsczs3K2mDJAynf"
            />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
