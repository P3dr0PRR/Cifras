import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LogOut as LogOutIcon } from "lucide-react";

async function logout() {
  "use server";

  const cookieStore = await cookies();
  cookieStore.delete("token");
  redirect("/login");
}

export default function Logout() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="flex justify-evenly items-center gap-1 btn-primary cursor-pointer"
      >
        <LogOutIcon className="w-5 h-5" />
        Log out
      </button>
    </form>
  );
}
