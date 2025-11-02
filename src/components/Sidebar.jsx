// src/components/Sidebar.jsx
import React from "react";
import { FaUser, FaUserPlus, FaClipboardList } from "react-icons/fa";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-[var(--color-primary)] text-white w-64 transform 
      ${isOpen ? "translate-x-0" : "-translate-x-full"} 
      transition-transform duration-300 ease-in-out z-50 md:translate-x-0 md:static`}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
        <h2 className="text-xl font-semibold">NaVsec Admin</h2>
        <button
          onClick={onClose}
          className="text-white md:hidden p-2 focus:outline-none"
        >
          ✕
        </button>
      </div>

      <nav className="flex flex-col mt-4 space-y-2 px-4">
        <a href="#" className="flex items-center gap-2 p-2 rounded hover:bg-gray-700">
          <FaUser /> All Personnel
        </a>
        <a href="#" className="flex items-center gap-2 p-2 rounded hover:bg-gray-700">
          <FaUserPlus /> Create Personnel
        </a>
        <a href="#" className="flex items-center gap-2 p-2 rounded hover:bg-gray-700">
          <FaClipboardList /> Deployments
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;