import { cookies } from "next/headers";

export async function CifrasMenu() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <div className="w-full min-h-screen bg-gray-950 flex flex-col">
      <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative overflow-hidden">
        Oi
      </section>
    </div>
  );
}
