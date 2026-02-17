import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  ListTodo,
  Settings,
  ChevronLeft,
  X,
  Menu,
  PieChart,
} from "lucide-react";
import "./sidebar.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const navItems = [
    {
      icon: <LayoutDashboard size={22} />,
      label: "Task Board",
      path: "/dashboard",
    },
    {
      icon: <ListTodo size={22} />,
      label: "My Tasks",
      path: "/tasks",
    },
    {
      icon: <PieChart size={22} />,
      label: "Analytics",
      path: "/analytics",
    },
  ];

  return (
    <>
      {/* Mobile Menu Trigger */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md text-gray-600"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-[70] bg-white border-r transition-all duration-300 ease-in-out 
        ${isCollapsed ? "w-20" : "w-64"} 
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          {!isCollapsed && (
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                T
              </div>
              <span className="font-bold text-gray-800 tracking-tight text-lg">
                TASKFLOW
              </span>
            </div>
          )}
          {isCollapsed && (
            <div className="w-full flex justify-center">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                T
              </div>
            </div>
          )}

          <button
            onClick={() =>
              isMobileOpen
                ? setIsMobileOpen(false)
                : setIsCollapsed(!isCollapsed)
            }
            className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"
          >
            {isMobileOpen ? (
              <X size={20} />
            ) : isCollapsed ? (
              <Menu size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className="block"
            >
              <NavItem
                icon={item.icon}
                label={item.label}
                active={pathname === item.path}
                collapsed={isCollapsed}
              />
            </Link>
          ))}
        </nav>

        {/* Bottom Section (Settings) */}
        <div className="absolute bottom-4 left-0 w-full px-3">
          <Link to="/settings" onClick={() => setIsMobileOpen(false)}>
            <NavItem
              icon={<Settings size={22} />}
              label="Settings"
              active={pathname === "/settings"}
              collapsed={isCollapsed}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

// Reusable NavItem Component
const NavItem = ({ icon, label, active, collapsed }) => (
  <div
    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group cursor-pointer
    ${active ? "bg-indigo-50 text-indigo-600" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"} 
    ${collapsed ? "justify-center" : ""}`}
    title={collapsed ? label : ""}
  >
    <div
      className={`${active ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"}`}
    >
      {icon}
    </div>
    {!collapsed && (
      <span className="font-medium text-sm tracking-wide">{label}</span>
    )}

    {/* Active Indicator Pin */}
    {active && !collapsed && (
      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
    )}
  </div>
);

export default Sidebar;
