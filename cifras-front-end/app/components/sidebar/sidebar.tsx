import Link from "next/link";

import Logout from "@/app/components/logout/component";

export function Sidebar() {
  return (
    <div className="w-64 h-screen bg-brown-700 flex flex-col justify-between py-4">
      <div className="flex flex-col gap-2">
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
    </div>
  );
}
