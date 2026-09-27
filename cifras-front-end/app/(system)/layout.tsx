import { Sidebar } from "@/app/components/sidebar/sidebar";
import MobileMenu from "@/app/components/mobileMenu/mobileMenu";

export default function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MobileMenu>
        <Sidebar />
      </MobileMenu>
      <div className="grid md:grid-cols-[16rem_1fr]">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        {children}
      </div>
    </div>
  );
}
