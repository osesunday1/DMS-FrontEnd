// src/components/NavbarToggle.jsx
import React from "react";
import { FaBars } from "react-icons/fa";

const NavbarToggle = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed top-4 left-4 z-40 p-3 bg-[var(--color-secondary)] text-gray-950 rounded-full shadow-lg md:hidden"
  >
    <FaBars size={20} />
  </button>
);

export default NavbarToggle;