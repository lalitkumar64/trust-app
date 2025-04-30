import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiGrid, 
  FiUsers, 
  FiFileText, 
  FiBell, 
  FiSettings, 
  FiHelpCircle,
  FiShield,
  FiCreditCard,
  FiBarChart2,
  FiFolder
} from 'react-icons/fi';
import { useAuth } from '@/lib/AuthProvider';

const SideBar = ({ collapsed }) => {
  const pathname = usePathname();
  const {user}=useAuth()
  // Navigation items
  const navItems = [
    { 
      icon: <FiGrid size={18} />, 
      label: 'Dashboard', 
      link: '/', 
      description: 'Overview & analytics'
    },
    { 
      icon: <FiUsers size={18} />, 
      label: 'Members', 
      link: '/members', 
      description: 'Trustees & beneficiaries' 
    },
    { 
      icon: <FiCreditCard size={18} />, 
      label: 'Finance', 
      link: '/finance', 
      description: 'Transactions & assets' 
    },
    { 
      icon: <FiBell size={18} />, 
      label: 'Notifications', 
      link: '/notifications', 
      description: 'Alerts & reminders' 
    },
  ];

  const bottomNavItems = [
    { 
      icon: <FiSettings size={18} />, 
      label: 'Settings', 
      link: '/setting', 
      description: 'System preferences' 
    },
    { 
      icon: <FiHelpCircle size={18} />, 
      label: 'Help & Support', 
      link: '/support', 
      description: 'Assistance & resources' 
    },
  ];

  // Check if a link is active
  const isActive = (path) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <aside 
      className={`bg-white shadow-md transition-all duration-300 ease-in-out flex flex-col ${
        collapsed ? 'w-20' : 'w-72'
      } border-r border-gray-200 z-20`}
    >
      {/* Logo Area */}
      <div className="h-16 flex items-center px-4 border-b border-gray-200">
        <div className={`flex items-center transition-all duration-300 ${collapsed ? 'justify-center w-full' : ''}`}>
          <div className="w-10 h-10 bg-primary-blue rounded-lg flex items-center justify-center">
            <FiFolder size={20} className="text-white" />
          </div>
          {!collapsed && (
            <h2 className="ml-3 font-bold text-lg text-gray-800">
              Trust Manager
            </h2>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-grow py-4 overflow-y-auto">
        <div className={`px-4 mb-2 ${collapsed ? 'hidden' : 'block'}`}>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Main Menu</p>
        </div>
        
        <ul className="space-y-1 px-2">
          {navItems.map((item, index) => {
            const active = isActive(item.link);
            return (
              <li key={index}>
                <Link 
                  href={item.link}
                  className={`flex items-center px-3 py-3 rounded-lg transition-all duration-150 ease-in-out group relative
                    ${active 
                      ? 'bg-blue-50 text-primary-blue' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                    ${collapsed ? 'justify-center' : ''}
                  `}
                >
                  <span className={`inline-flex justify-center items-center ${active ? 'text-primary-blue' : 'text-gray-500 group-hover:text-gray-700'}`}>
                    {item.icon}
                  </span>
                  
                  {!collapsed && (
                    <div className="ml-3">
                      <span className="text-sm font-medium">{item.label}</span>
                      <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                    </div>
                  )}
                  
                  {active && (
                    <span className="absolute inset-y-0 left-0 w-1 bg-primary-blue rounded-r-full"></span>
                  )}
                  
                  {collapsed && !active && (
                    <span className="sr-only">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* System section */}
        <div className={`px-4 mt-8 mb-2 ${collapsed ? 'hidden' : 'block'}`}>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">System</p>
        </div>
        
        <ul className="space-y-1 px-2">
          {bottomNavItems.map((item, index) => {
            const active = isActive(item.link);
            return (
              <li key={index}>
                <Link 
                  href={item.link}
                  className={`flex items-center px-3 py-3 rounded-lg transition-all duration-150 ease-in-out group relative
                    ${active 
                      ? 'bg-blue-50 text-primary-blue' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                    ${collapsed ? 'justify-center' : ''}
                  `}
                >
                  <span className={`inline-flex justify-center items-center ${active ? 'text-primary-blue' : 'text-gray-500 group-hover:text-gray-700'}`}>
                    {item.icon}
                  </span>
                  
                  {!collapsed && (
                    <div className="ml-3">
                      <span className="text-sm font-medium">{item.label}</span>
                      <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                    </div>
                  )}
                  
                  {active && (
                    <span className="absolute inset-y-0 left-0 w-1 bg-primary-blue rounded-r-full"></span>
                  )}
                  
                  {collapsed && !active && (
                    <span className="sr-only">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className={`mt-auto border-t border-gray-200 p-4 ${collapsed ? 'hidden' : 'flex'}`}>
        <div className="flex items-center w-full">
          <div className="w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center text-white">
            <FiUsers size={16} />
          </div>
          <div className="ml-3 overflow-hidden">
            <p className="text-sm font-medium text-gray-800 truncate">{user?.username}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;