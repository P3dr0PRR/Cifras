import { Sidebar } from "@/app/components/sidebar/sidebar";
import MobileMenu from "@/app/components/mobileMenu/mobileMenu";

export default function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      <MobileMenu>
        <Sidebar />
      </MobileMenu>
      <div className="grid md:grid-cols-[16rem_1fr] flex-1 min-h-0">
        <div className="hidden md:block ">
          <Sidebar />
        </div>
        <main className="overflow-y-auto min-h-0">
           {children}
        </main>
       
      </div>
    </div>
  );
}
