import { cookies } from "next/headers";

export async function CifrasMenu() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <div className="div-page">
      <section className="section-page">
        Oi
      </section>
    </div>
  );
}
