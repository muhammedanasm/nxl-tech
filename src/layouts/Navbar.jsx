import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, User, LogOut } from "lucide-react";
import useTaskStore from "../store/useTaskStore";
import Swal from "sweetalert2";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useTaskStore();

  const getPageLabel = () => {
    switch (pathname) {
      case "/dashboard":
        return "Task Board";
      case "/tasks":
        return "Tasks List";
      case "/settings":
        return "Settings";
      default:
        return "Overview";
    }
  };

  //   const handleLogout = () => {
  //     logout();
  //     navigate("/");
  //   };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your session!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Logout!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      background: "#ffffff",
      borderRadius: "20px",
      customClass: {
        popup: "premium-swal-popup",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/");
      }
    });
  };

  return (
    <nav className="h-16 border-b bg-white flex items-center justify-between px-8 py-8 sticky top-0 z-20 shadow-sm">
      {/* Left Side: Breadcrumb Style Heading */}
      <div className="flex items-center text-sm text-gray-500">
        <span className="hover:text-indigo-600 cursor-pointer transition-colors">
          Dashboard
        </span>
        <span className="mx-2 text-gray-300">/</span>
        <span className="text-gray-900 font-semibold capitalize tracking-tight">
          {getPageLabel()}
        </span>
      </div>

      {/* Actions & Profile */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all relative group">
          <Bell size={19} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white group-hover:animate-pulse"></span>
        </button>

        {/* User Profile Section */}
        <div className="flex items-center gap-3 border-l pl-4 ml-2">
          <div className="text-right hidden sm:block">
            <p className="text-[11px] font-bold text-gray-900 leading-none mb-1 uppercase tracking-wider">
              {user?.name || "Muhammed Anas"}
            </p>
            <p className="text-[10px] text-gray-400 font-medium">
              {user?.email || "admin@taskflow.com"}
            </p>
          </div>

          {/* Avatar Icon */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-600 border border-indigo-100 flex items-center justify-center text-white shadow-md shadow-indigo-100">
            <User size={18} />
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="ml-2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
