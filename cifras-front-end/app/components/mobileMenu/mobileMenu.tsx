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

  return (
    <div>
      <div className="block md:hidden">
        <button onClick={handleMenuClick} className="p-2">
          <HeaderIn />
        </button>
        {isMenuOpen && children}
      </div>
    </div>
  );
}
