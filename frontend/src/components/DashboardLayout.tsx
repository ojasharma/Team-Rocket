"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboardIcon,
  CalendarIcon,
  ClipboardListIcon,
  LogOutIcon,
  UserIcon,
  BookIcon,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
  studentInfo?: { studentId: string; roomNumber: string } | null;
  onLogout?: () => void;
}

const DashboardLayout = ({
  children,
  studentInfo,
  onLogout,
}: DashboardLayoutProps) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
          <h1 className="text-base sm:text-lg font-semibold text-gray-900">
            Hostel Service Hub
          </h1>

          {studentInfo ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center text-xs sm:text-sm text-gray-700 max-w-[120px] sm:max-w-none truncate">
                <UserIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                <span className="truncate">ID: {studentInfo.studentId}</span>
              </div>
              <Button
                onClick={onLogout}
                variant="ghost"
                size="sm"
                className="text-gray-700 p-1 sm:p-2"
              >
                <LogOutIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="sr-only sm:not-sr-only sm:ml-1">Logout</span>
              </Button>
            </div>
          ) : (
            <div>
              <Button variant="outline" size="sm">
                Login
              </Button>
            </div>
          )}
        </div>
      </header>

      {studentInfo && (
        <div className="flex flex-1 flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="w-64 bg-white shadow-sm hidden md:block">
            <nav className="px-3 py-4 sticky top-16">
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/"
                    className={`flex items-center px-4 py-2 rounded-md text-sm ${
                      pathname === "/"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <LayoutDashboardIcon className="w-5 h-5 mr-3" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/records"
                    className={`flex items-center px-4 py-2 rounded-md text-sm ${
                      pathname === "/records"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <ClipboardListIcon className="w-5 h-5 mr-3" />
                    Service History
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className={`flex items-center px-4 py-2 rounded-md text-sm ${
                      pathname === "/blogs"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <BookIcon className="w-5 h-5 mr-3" />
                    My Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className={`flex items-center px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100`}
                  >
                    <CalendarIcon className="w-5 h-5 mr-3" />
                    Book New Service
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Mobile Navigation */}
          <div className="md:hidden flex justify-around w-full bg-white border-b py-2 sticky top-[52px] z-10 overflow-x-auto">
            <Link
              href="/"
              className={`flex flex-col items-center p-2 rounded-md text-xs min-w-[64px] ${
                pathname === "/" ? "text-blue-700" : "text-gray-500"
              }`}
            >
              <LayoutDashboardIcon className="w-5 h-5 mb-1" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/records"
              className={`flex flex-col items-center p-2 rounded-md text-xs min-w-[64px] ${
                pathname === "/records" ? "text-blue-700" : "text-gray-500"
              }`}
            >
              <ClipboardListIcon className="w-5 h-5 mb-1" />
              <span>History</span>
            </Link>
            <Link
              href="/blogs"
              className={`flex flex-col items-center p-2 rounded-md text-xs min-w-[64px] ${
                pathname === "/blogs" ? "text-blue-700" : "text-gray-500"
              }`}
            >
              <BookIcon className="w-5 h-5 mb-1" />
              <span>Blogs</span>
            </Link>
            <Link
              href="/"
              className={`flex flex-col items-center p-2 rounded-md text-xs min-w-[64px] text-gray-500`}
            >
              <CalendarIcon className="w-5 h-5 mb-1" />
              <span>Book</span>
            </Link>
          </div>

          {/* Main Content */}
          <main className="flex-1 p-3 sm:p-6 lg:p-8 overflow-auto pb-16 md:pb-8">
            <div className="max-w-full mx-auto">{children}</div>
          </main>
        </div>
      )}

      {!studentInfo && (
        <main className="flex-1 p-3 sm:p-6 lg:p-8 flex items-center justify-center">
          <div className="w-full max-w-md">{children}</div>
        </main>
      )}
    </div>
  );
};

export default DashboardLayout;
