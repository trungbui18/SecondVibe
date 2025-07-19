"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { logout } from "@/lib/redux/slice/authSlice";
import authApi from "@/services/auth";
const AccountDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const id = user?.id;
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    authApi.logout();
    dispatch(logout());
    sessionStorage.removeItem("token");
    localStorage.removeItem("persist:root");

    setOpen(false);
    window.location.href = "/login";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center cursor-pointer select-none hover:bg-gray-200 p-2 rounded-md transition-colors duration-300"
        onClick={() => setOpen(!open)}
      >
        {user ? (
          <img
            src={user.avatar || "/default-avatar.png"}
            alt="User Avatar"
            onError={(e) => {
              e.currentTarget.src = "/default-avatar.png";
            }}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <MdOutlineAccountCircle className="w-10 h-10 text-gray-500" />
        )}
        <div className="flex items-center text text-gray-700 space-x-8">
          <span className="ml-2">{user ? user.fullName : "Account"}</span>
          <FaChevronDown
            className={`ml-1 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {open && (
        <div className="absolute right-0 mt-5 w-40 bg-white border border-gray-200 z-50 rounded shadow-md">
          {user ? (
            <>
              <Link
                href={`/profile/${id}`}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link
                href="/purchases"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                My Purchases
              </Link>
              <Link
                href="/manage/dashboard"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Manage Listing
              </Link>
              <Link
                href="/settings/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
