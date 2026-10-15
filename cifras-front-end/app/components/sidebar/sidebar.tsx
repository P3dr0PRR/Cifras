import Link from "next/link";
import {cookies} from "next/headers";
import { jwtDecode } from "jwt-decode";
import { USERS_TYPES } from "@/app/constants/usersTypes";
import Logout from "@/app/components/logout/component";
import type { usersTokenPayload } from "@/app/types";

export async function Sidebar() {
  const userCookies = await cookies ();
  const token = userCookies.get("token")?.value;
 const tokenPayload = token ? jwtDecode<usersTokenPayload>(token) : null;
const isAdministrator = tokenPayload?.accountType === USERS_TYPES.SUPER_ADMIN;

  return (
    <nav className=" w-full md:w-64 h-full bg-lime-700 flex flex-col justify-between py-4 gap-4">
      <div className="flex flex-col gap-2">
        <Link href="/" className="sidebar-btn">
          Home
        </Link>
        <Link href="/goodN" className="sidebar-btn">
          Good Night
        </Link>
        {isAdministrator && (<Link href="/cifras" className="sidebar-btn">
          Cifras
        </Link>)}
      </div>
      <div className="mx-8">
        <Logout />
      </div>
    </nav>
  );
}
