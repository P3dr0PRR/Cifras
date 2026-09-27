import Link from "next/link";

import Logout from "@/app/components/logout/component";

export function Sidebar() {
  return (
    <nav className=" w-full md:w-64 h-full bg-lime-700 flex flex-col justify-between py-4 gap-4">
      <div className="flex flex-col gap-2">
        <Link href="/" className="sidebar-btn">
          Home
        </Link>
        <Link href="/goodN" className="sidebar-btn">
          Good Night
        </Link>
        <Link href="/cifras" className="sidebar-btn">
          Cifras
        </Link>
      </div>
      <div className="mx-8">
        <Logout />
      </div>
    </nav>
  );
}
