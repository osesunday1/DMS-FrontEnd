import { useState, useEffect, useRef } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaUserPlus,
  FaMapMarkedAlt,
  FaNetworkWired,
  FaBars,
} from "react-icons/fa";
import { MdOutlineMilitaryTech } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";

// ✅ Sidebar navigation config
const adminLinks = [
  { label: "Dashboard", path: "/admin", icon: <FaTachometerAlt /> },
  {
    label: "Officers",
    icon: <FaUser />,
    children: [
      { label: "All Officers", path: "/admin/officers" },
      { label: "Add Officer", path: "/admin/officers/add" },
    ],
  },
  {
    label: "Deployments",
    icon: <MdOutlineMilitaryTech />,
    children: [
      { label: "Deployment List", path: "/admin/deployments" },
      { label: "Add Deployment", path: "/admin/deployments/add" },
    ],
  },
  {
    label: "Locations",
    icon: <FaMapMarkedAlt />,
    children: [
      { label: "All Locations", path: "/admin/locations" },
      { label: "Add Location", path: "/admin/locations/add" },
    ],
  },
  {
    label: "Branches",
    icon: <FaNetworkWired />,
    children: [
      { label: "Branch List", path: "/admin/branches" },
      { label: "Add Branch", path: "/admin/branches/add" },
    ],
  },
];

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // for mobile
  const [collapsed, setCollapsed] = useState(false); // for desktop collapse
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const popoutRef = useRef();

  // ✅ Automatically close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoutRef.current && !popoutRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Close sidebar when navigating on mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* =================== SIDEBAR =================== */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[var(--color-primary)] text-white transition-all duration-300 flex flex-col shadow-lg z-50
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0
        ${collapsed ? "w-20" : "w-64"}
      `}
      >
        {/* Collapse button (desktop only) */}
        <div className="hidden md:flex justify-end">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-3 text-white bg-[var(--color-secondary)] m-4 rounded flex items-center justify-center hover:bg-opacity-90 transition"
          >
            <FaBars />
          </button>
        </div>

        {/* App Title */}
        <div className="p-4 text-center border-b border-gray-600">
          {collapsed ? (
            <span className="font-bold text-[var(--color-secondary)]">M</span>
          ) : (
            <h2 className="font-bold text-lg text-[var(--color-secondary)]">
              NAVSEC
            </h2>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col p-4 gap-2">
          {adminLinks.map(({ label, path, icon, children }) => {
            const isDropdownOpen = openDropdown === label;
            const hasChildren = children && children.length > 0;
            const isActive =
              location.pathname === path ||
              (hasChildren &&
                children.some((child) =>
                  location.pathname.startsWith(child.path)
                ));

            const handleParentClick = () => {
              if (hasChildren) {
                setOpenDropdown(isDropdownOpen ? null : label);
              } else {
                setOpenDropdown(null);
                navigate(path);
              }
            };

            return (
              <div key={label} className="relative">
                {/* Parent Item */}
                <div
                  onClick={handleParentClick}
                  className={`flex items-center justify-between gap-3 p-2 rounded cursor-pointer transition-colors duration-200
                    ${
                      isActive
                        ? "bg-[var(--color-secondary)] text-[var(--color-primary)] font-semibold"
                        : "hover:bg-gray-700 text-gray-100"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{icon}</span>
                    {!collapsed && <span>{label}</span>}
                  </div>

                  {hasChildren && !collapsed && (
                    <span
                      className={`transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    >
                      <FiChevronDown />
                    </span>
                  )}
                </div>

                {/* Dropdown for expanded sidebar */}
                {hasChildren && !collapsed && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isDropdownOpen ? "max-h-40 mt-1" : "max-h-0"
                    }`}
                  >
                    {children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={`ml-8 block py-2 px-3 text-sm rounded hover:bg-gray-700 transition ${
                          location.pathname === child.path
                            ? "text-[var(--color-secondary)] font-semibold"
                            : "text-gray-300"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Pop-out for collapsed sidebar */}
                {hasChildren && collapsed && isDropdownOpen && (
                  <div
                    ref={popoutRef}
                    className="absolute left-20 top-0 z-10 bg-white text-[var(--color-primary)] shadow-lg rounded px-4 py-2 w-48"
                  >
                    {children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown(null);
                        }}
                        className={`block py-2 px-3 text-sm rounded hover:bg-gray-100 transition ${
                          location.pathname === child.path
                            ? "text-[var(--color-secondary)] font-semibold"
                            : "text-gray-700"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* =================== FLOATING BUTTON (Mobile Only) =================== */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-40 p-3 bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-full shadow-lg md:hidden"
      >
        <FaBars size={20} />
      </button>

      {/* =================== MAIN CONTENT =================== */}
      <main
        className={`flex-1 overflow-y-auto p-6 transition-all duration-300 bg-[var(--color-primary-100)] ${
          collapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;