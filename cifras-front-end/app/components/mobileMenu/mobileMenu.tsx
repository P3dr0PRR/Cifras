"use client";
import { useState } from "react";
import { HeaderIn } from "@/app/components/bodyEstructure/headerIn";

export default function MobileMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <div>
      <div className="block md:hidden">
        <button onClick={handleMenuClick} className="p-2">
          <HeaderIn />
        </button>
        {isMenuOpen && <div className="fixed bottom-0 top-16 inset-x-0 z-50" onClick={closeMenu}>{children}</div>}
      </div>
    </div>
  );
}
