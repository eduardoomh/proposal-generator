import { Link } from "@remix-run/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function DesktopLayout() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="px-4 py-2 bg-primary">
      <div className="max-w-[1250px] mx-auto flex items-center justify-between">
        <Link to="/" className="cursor-pointer">
          <img
            src="/IP-Insight-Support-Logo.png"
            width="220"
            alt="IP-Insight-Support-Logo.webp"
            className="mb-2"
          />
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-4 text-black">
          <li>
            <Link
              to="/proposals"
              className="font-medium text-sm p-2 rounded hover:bg-hoverPrimary"
            >
              Proposals
            </Link>
          </li>
          <li>
            <Link
              to="/templates"
              className="font-medium text-sm p-2 rounded hover:bg-hoverPrimary"
            >
              Templates
            </Link>
          </li>
          <li>
            <Link
              to="/pdf-content"
              className="font-medium text-sm p-2 rounded hover:bg-hoverPrimary"
            >
              PDF Content
            </Link>
          </li>
        </ul>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-black"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <ul className="md:hidden mt-2 space-y-2 bg-primary rounded text-black">
          <li>
            <Link
              to="/proposals"
              className="block font-medium text-sm p-2 rounded hover:bg-hoverPrimary"
              onClick={toggleMenu}
            >
              Proposals
            </Link>
          </li>
          <li>
            <Link
              to="/templates"
              className="block font-medium text-sm p-2 rounded hover:bg-hoverPrimary"
              onClick={toggleMenu}
            >
              Templates
            </Link>
          </li>
          <li>
            <Link
              to="/pdf-content"
              className="block font-medium text-sm p-2 rounded hover:bg-hoverPrimary"
              onClick={toggleMenu}
            >
              PDF Content
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}