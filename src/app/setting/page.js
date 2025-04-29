"use client";

import React, { useState } from 'react';
import Contact from '@/components/screen/settings/Contact';
import Organization from '@/components/screen/settings/organization';
import TeamMembers from '@/components/screen/settings/TeamMembers';
import { 
  BsBank2, 
  BsShieldLock, 
  BsBell, 
  BsHeadset, 
  BsQuestionCircle, 
  BsInfoCircle,
  BsPeople,
  BsGear,
  BsChevronRight
} from 'react-icons/bs';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('organization');
  const [activeSubTab, setActiveSubTab] = useState(null);

  const menuItems = [
    {
      key: 'organization',
      icon: <BsBank2 size={18} />,
      label: 'Organization',
      description: 'Manage trust details and profile',
      subItems: [
        { key: 'org-details', label: 'Trust Details' },
        { key: 'org-roles', label: 'Roles & Permissions' },
      ]
    },
    {
      key: 'teams',
      icon: <BsPeople size={18} />,
      label: 'Team Members',
      description: 'Manage your organization members',
    },
    {
      key: 'security',
      icon: <BsShieldLock size={18} />,
      label: 'Security',
      description: 'Secure your account and data',
      subItems: [
        { key: 'security-password', label: 'Password' },
        { key: 'security-2fa', label: '2FA Authentication' },
        { key: 'security-sessions', label: 'Active Sessions' },
      ]
    },
    {
      key: 'notifications',
      icon: <BsBell size={18} />,
      label: 'Notifications',
      description: 'Configure email and app alerts',
    },
    {
      key: 'preferences',
      icon: <BsGear size={18} />,
      label: 'Preferences',
      description: 'Set your personal preferences',
    },
    {
      key: 'contact',
      icon: <BsHeadset size={18} />,
      label: 'Contact Support',
      description: 'Get help from our team',
    },
    {
      key: 'help',
      icon: <BsQuestionCircle size={18} />,
      label: 'Help Center',
      description: 'Browse tutorials and FAQs',
    },
    {
      key: 'about',
      icon: <BsInfoCircle size={18} />,
      label: 'About',
      description: 'System information and updates',
    },
  ];

  const handleTabClick = (key) => {
    setActiveTab(key);
    setActiveSubTab(null);
  };

  const handleSubTabClick = (key) => {
    setActiveSubTab(key);
  };

  const getTabTitle = () => {
    const activeMenuItem = menuItems.find(item => item.key === activeTab);
    
    if (activeSubTab && activeMenuItem?.subItems) {
      const activeSubItem = activeMenuItem.subItems.find(item => item.key === activeSubTab);
      return activeSubItem ? activeSubItem.label : activeMenuItem.label;
    }
    
    return activeMenuItem ? activeMenuItem.label : '';
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'organization':
        return <Organization />;
      case 'contact':
        return <Contact />;
      case 'teams':
        return <TeamMembers />;
      case 'security':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Security Settings</h3>
            <p className="text-gray-500">Configure your account security options and privacy settings.</p>
            
            {activeSubTab === 'security-password' && (
              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-700 mb-4">Password Management</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input 
                      type="password" 
                      className="w-full max-w-md px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input 
                      type="password" 
                      className="w-full max-w-md px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input 
                      type="password" 
                      className="w-full max-w-md px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                    />
                  </div>
                  <div className="pt-2">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeSubTab === 'security-2fa' && (
              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-700 mb-4">Two-Factor Authentication</h4>
                <div className="p-5 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
                        <BsShieldLock size={20} />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h5 className="text-base font-medium text-gray-800">Enhance Your Account Security</h5>
                      <p className="text-sm text-gray-600 mt-1">
                        Two-factor authentication adds an extra layer of security to your account by requiring both your password and a verification code.
                      </p>
                      <button className="mt-3 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeSubTab === 'security-sessions' && (
              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-700 mb-4">Active Sessions</h4>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <div className="grid grid-cols-12 text-sm font-medium text-gray-500">
                      <div className="col-span-4">Device</div>
                      <div className="col-span-3">Location</div>
                      <div className="col-span-3">Last Active</div>
                      <div className="col-span-2">Action</div>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="px-4 py-3">
                      <div className="grid grid-cols-12">
                        <div className="col-span-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M13.5 3h-11a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-9.975 8.5v-7h8.95v7h-8.95z"/>
                                <path d="M7.5 12.5h1v1h-1z"/>
                              </svg>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-700">Chrome on Windows</div>
                              <div className="text-xs text-gray-500">Current session</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-3 flex items-center text-sm text-gray-600">New York, USA</div>
                        <div className="col-span-3 flex items-center text-sm text-gray-600">Just now</div>
                        <div className="col-span-2 flex items-center">
                          <span className="px-2.5 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3">
                      <div className="grid grid-cols-12">
                        <div className="col-span-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>
                                <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                              </svg>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-700">Safari on iPhone</div>
                              <div className="text-xs text-gray-500">Mobile device</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-3 flex items-center text-sm text-gray-600">Austin, USA</div>
                        <div className="col-span-3 flex items-center text-sm text-gray-600">2 days ago</div>
                        <div className="col-span-2 flex items-center">
                          <button className="text-sm text-red-500 hover:text-red-700 transition-colors">Revoke</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {!activeSubTab && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {menuItems.find(item => item.key === 'security')?.subItems.map((subItem) => (
                  <div 
                    key={subItem.key}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleSubTabClick(subItem.key)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
                          <BsShieldLock size={16} />
                        </div>
                        <div className="ml-3">
                          <h5 className="text-base font-medium text-gray-800">{subItem.label}</h5>
                        </div>
                      </div>
                      <BsChevronRight className="text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center h-[calc(100vh-240px)]">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mb-4">
              {menuItems.find(item => item.key === activeTab)?.icon}
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              {getTabTitle()}
            </h3>
            <p className="text-gray-500 text-center max-w-md">
              This section is under development. Please check back soon for updates.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-[calc(100vh-64px)]">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 flex items-center">
            <BsGear className="text-blue-500 mr-2" size={20} />
            Settings
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Configure your trust management system
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-4">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <div key={item.key} className="mb-1">
                <button
                  onClick={() => handleTabClick(item.key)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.key
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span 
                    className={`mr-3 ${activeTab === item.key ? 'text-blue-600' : 'text-gray-500'}`}
                  >
                    {item.icon}
                  </span>
                  <div className="flex-1">
                    <span className="block font-medium">{item.label}</span>
                    <span className="block text-xs text-gray-500 mt-0.5">
                      {item.description}
                    </span>
                  </div>
                  {item.subItems && (
                    <BsChevronRight 
                      size={14} 
                      className={`transition-transform ${
                        activeTab === item.key ? 'rotate-90 text-blue-600' : 'text-gray-400'
                      }`} 
                    />
                  )}
                </button>
                
                {item.subItems && activeTab === item.key && (
                  <div className="ml-10 mt-1 space-y-1 border-l-2 border-gray-100 pl-3">
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.key}
                        onClick={() => handleSubTabClick(subItem.key)}
                        className={`w-full text-left py-2 px-3 rounded-md text-sm transition-colors ${
                          activeSubTab === subItem.key
                            ? 'text-blue-700 bg-blue-50 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-800 mb-1">Need help?</h4>
            <p className="text-xs text-blue-700">
              Contact our support team for assistance with settings and configuration.
            </p>
            <button className="mt-2 text-xs font-medium text-blue-700 hover:text-blue-800 flex items-center">
              Contact Support <BsChevronRight size={12} className="ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-8 overflow-y-auto">
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span>Settings</span>
            <BsChevronRight size={12} className="mx-2" />
            <span>{getTabTitle()}</span>
            {activeSubTab && (
              <>
                <BsChevronRight size={12} className="mx-2" />
                <span>
                  {menuItems.find(item => item.key === activeTab)?.subItems?.find(subItem => subItem.key === activeSubTab)?.label}
                </span>
              </>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-800">{getTabTitle()}</h1>
        </div>
        
        {renderContent()}
      </div>
    </div>
  );
};

export default SettingsPage;