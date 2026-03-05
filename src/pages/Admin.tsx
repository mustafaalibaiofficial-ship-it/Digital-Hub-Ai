import React from 'react';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import { LayoutDashboard, Wrench, FolderTree, Inbox, Users, LogOut, Plus } from 'lucide-react';

// Mock components for now
const AdminDashboard = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold">Dashboard Overview</h1>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[
        { label: 'Total Tools', value: '124', icon: <Wrench className="text-primary" /> },
        { label: 'Categories', value: '12', icon: <FolderTree className="text-emerald-500" /> },
        { label: 'Subscribers', value: '1,240', icon: <Users className="text-indigo-500" /> },
        { label: 'Pending Submissions', value: '8', icon: <Inbox className="text-orange-500" /> },
      ].map((stat, i) => (
        <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">{stat.icon}</div>
          </div>
          <div className="text-2xl font-bold">{stat.value}</div>
          <div className="text-sm text-slate-500">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
);

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true); // For demo

  if (!isAuthenticated) return <Navigate to="/admin/login" />;

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Tools', path: '/admin/tools', icon: <Wrench size={20} /> },
    { name: 'Categories', path: '/admin/categories', icon: <FolderTree size={20} /> },
    { name: 'Submissions', path: '/admin/submissions', icon: <Inbox size={20} /> },
    { name: 'Newsletter', path: '/admin/newsletter', icon: <Users size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden md:block">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <Link to="/" className="flex items-center gap-2">
            <img src="https://i.postimg.cc/CLLLkmML/logo-BXra-F-pp-removebg-preview.png" className="h-8" alt="Logo" />
            <span className="font-bold">Admin Panel</span>
          </Link>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary transition-colors"
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors mt-10">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="tools" element={<div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Tools Management</h1>
              <button className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold flex items-center gap-2">
                <Plus size={20} /> Add New Tool
              </button>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <th className="px-6 py-4 text-sm font-bold">Tool</th>
                    <th className="px-6 py-4 text-sm font-bold">Category</th>
                    <th className="px-6 py-4 text-sm font-bold">Pricing</th>
                    <th className="px-6 py-4 text-sm font-bold">Status</th>
                    <th className="px-6 py-4 text-sm font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    { name: 'ChatGPT', category: 'AI Chatbots', pricing: 'Freemium', status: 'Featured' },
                    { name: 'Midjourney', category: 'AI Image Generators', pricing: 'Paid', status: 'Trending' },
                  ].map((tool, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 font-medium">{tool.name}</td>
                      <td className="px-6 py-4 text-slate-500">{tool.category}</td>
                      <td className="px-6 py-4">{tool.pricing}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 text-xs font-bold">
                          {tool.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-primary hover:underline mr-4">Edit</button>
                        <button className="text-rose-500 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>} />
          {/* Add other admin routes as needed */}
        </Routes>
      </main>
    </div>
  );
};

export default AdminLayout;
