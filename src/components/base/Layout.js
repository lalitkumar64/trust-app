"use client";
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from "@/lib/AuthProvider";
import TopBar from './TopBar';
import SideBar from './SideBar';
import { db } from '@/lib/firebase';
import { doc } from 'firebase/firestore';

export default function CustomDashboardLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Paths that should NOT use the dashboard layout
  const withoutLayout = ["/auth/login"];

  // Redirect to login if not authenticated and not on login page
  useEffect(() => {
    if (!loading && !user && !withoutLayout.includes(pathname)) {
      router.replace("/auth/login");
    }
  }, [user, loading, pathname, router]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (showNotifications || showUserMenu) {
        if (
          !e.target.closest('.notification-trigger') &&
          !e.target.closest('.user-menu-trigger') &&
          !e.target.closest('.notification-content') &&
          !e.target.closest('.user-menu-content')
        ) {
          setShowNotifications(false);
          setShowUserMenu(false);
        }
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showNotifications, showUserMenu]);




  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary-blue border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-gray-600 text-lg font-medium">Loading...</div>
        </div>
      </div>
    );
  }

  // If on a page that doesn't use the dashboard layout, just render children
  if (withoutLayout.includes(pathname)) {
    return children;
  }

  // If not authenticated, don't render anything (redirect handled in useEffect)
  if (!user) {
    return null;
  }

  // Authenticated: show dashboard layout
  return (
    <div className="flex h-screen bg-gray-50">
      <SideBar collapsed={sidebarCollapsed} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          sidebarCollapsed={sidebarCollapsed}
          toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          showNotifications={showNotifications}
          toggleNotifications={() => {
            setShowNotifications(!showNotifications);
            if (showUserMenu) setShowUserMenu(false);
          }}
          showUserMenu={showUserMenu}
          toggleUserMenu={() => {
            setShowUserMenu(!showUserMenu);
            if (showNotifications) setShowNotifications(false);
          }}
        />
        <main className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}