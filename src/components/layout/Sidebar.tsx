import React from 'react';
import { 
  LayoutDashboard, 
  Database, 
  Workflow, 
  ListTodo, 
  CheckSquare, 
  Headphones
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Page } from '@/src/types';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: '工作台', icon: LayoutDashboard },
    { id: 'resources', label: '资源中心', icon: Database },
    { id: 'workflows', label: '工作流中心', icon: Workflow },
    { id: 'tasks', label: '任务中心', icon: ListTodo },
    { id: 'inspection', label: '人工质检中心', icon: CheckSquare },
  ] as const;

  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen border-r border-slate-800">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 text-white font-semibold text-lg tracking-wide">
        <Headphones className="w-6 h-6 mr-3 text-indigo-400" />
        音库Agent平台
      </div>
      
      <nav className="flex-1 py-6 px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "w-full flex items-center px-3 py-2.5 rounded-md transition-colors duration-200 text-sm font-medium",
              currentPage === item.id || (currentPage === 'task_details' && item.id === 'tasks')
                ? "bg-indigo-600/10 text-indigo-400"
                : "hover:bg-slate-800 hover:text-white"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 mr-3",
               currentPage === item.id || (currentPage === 'task_details' && item.id === 'tasks')
                 ? "text-indigo-400"
                 : "text-slate-500"
            )} />
            {item.label}
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-medium text-white">
            A
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-slate-500">System Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
