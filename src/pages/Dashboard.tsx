import React from 'react';
import { Database, Bot, Network, CheckSquare, ListTodo, Plus, ArrowRight, PlayCircle, CheckCircle2, AlertCircle, BookOpen, Activity, PieChart as PieChartIcon } from 'lucide-react';
import { Page } from '@/src/types';
import { cn } from '@/src/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const globalStats = [
    { label: '今日处理数据', value: '12,563', color: 'text-slate-900' },
    { label: '运行中任务', value: '8', color: 'text-blue-600' },
    { label: '待验收任务', value: '2', color: 'text-amber-600' },
    { label: '异常数据', value: '15', color: 'text-red-600' },
    { label: '准确率', value: '98.2%', color: 'text-emerald-600' },
  ];

  const todos = [
    { id: '1', text: 'Batch003待验收', type: 'review', page: 'inspection' as Page },
    { id: '2', text: 'Batch001存在15条异常', type: 'warning', page: 'tasks' as Page },
    { id: '3', text: 'Batch005执行失败', type: 'error', page: 'tasks' as Page },
  ];

  const recentTasks = [
    { id: 'Batch001', status: 'running', progress: 65, statusLabel: '运行中' },
    { id: 'Batch002', status: 'completed', progress: 100, statusLabel: '已完成' },
    { id: 'Batch003', status: 'review', progress: 100, statusLabel: '待验收' },
  ];

  const quickLinks = [
    { label: '创建任务', icon: Plus, page: 'tasks' as Page },
    { label: '人工质检', icon: CheckSquare, page: 'inspection' as Page },
    { label: '数据集', icon: Database, page: 'workflows' as Page }, // Assuming workflows or resources
    { label: '工作流', icon: Network, page: 'workflows' as Page },
    { label: 'Agent', icon: Bot, page: 'workflows' as Page }, // Placeholder
    { label: '知识库', icon: BookOpen, page: 'workflows' as Page }, // Placeholder
  ];

  const trendData = [
    { name: '06-18', value: 95.2 },
    { name: '06-19', value: 96.1 },
    { name: '06-20', value: 95.8 },
    { name: '06-21', value: 97.5 },
    { name: '06-22', value: 98.0 },
    { name: '06-23', value: 97.9 },
    { name: '06-24', value: 98.2 },
  ];

  const errorData = [
    { name: '漏字', value: 45 },
    { name: '错字', value: 30 },
    { name: '情感识别错误', value: 15 },
    { name: '副语言错误', value: 10 },
  ];
  const COLORS = ['#ef4444', '#f59e0b', '#8b5cf6', '#3b82f6'];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative overflow-hidden flex justify-between items-end">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">欢迎回来，张三</h1>
          <p className="text-slate-500 mt-1">今日有 3 个任务待处理，2 个任务待验收</p>
        </div>
        <div className="relative z-10 text-slate-500 font-medium">
          2026-06-24
        </div>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-5 gap-4">
        {globalStats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm text-center">
            <div className="text-sm font-medium text-slate-500 mb-2">{stat.label}</div>
            <div className={cn("text-2xl font-bold", stat.color)}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* My To-Dos */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-64">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h2 className="text-base font-semibold text-slate-900">我的待办</h2>
            </div>
            <div className="p-4 flex-1 overflow-y-auto space-y-3">
              {todos.map((todo) => (
                <div 
                  key={todo.id} 
                  className={cn(
                    "flex items-center p-3 rounded-lg border cursor-pointer hover:shadow-sm transition-all",
                    todo.type === 'error' ? "bg-red-50 border-red-100 hover:border-red-300" :
                    todo.type === 'warning' ? "bg-amber-50 border-amber-100 hover:border-amber-300" :
                    "bg-indigo-50 border-indigo-100 hover:border-indigo-300"
                  )}
                  onClick={() => onNavigate(todo.page)}
                >
                  <div className={cn(
                    "w-2 h-2 rounded-full mr-3 shrink-0",
                    todo.type === 'error' ? "bg-red-500" :
                    todo.type === 'warning' ? "bg-amber-500" :
                    "bg-indigo-500"
                  )} />
                  <span className={cn(
                    "text-sm font-medium",
                    todo.type === 'error' ? "text-red-900" :
                    todo.type === 'warning' ? "text-amber-900" :
                    "text-indigo-900"
                  )}>{todo.text}</span>
                  <ArrowRight className={cn(
                    "w-4 h-4 ml-auto opacity-50",
                    todo.type === 'error' ? "text-red-700" :
                    todo.type === 'warning' ? "text-amber-700" :
                    "text-indigo-700"
                  )} />
                </div>
              ))}
            </div>
          </div>

          {/* Quality Trend */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-72">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h2 className="text-base font-semibold text-slate-900 flex items-center">
                <Activity className="w-4 h-4 mr-2 text-indigo-600" /> 质量趋势
              </h2>
              <span className="text-xs text-slate-500">近7天准确率</span>
            </div>
            <div className="p-4 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis domain={['dataMin - 1', 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#4f46e5', fontWeight: 600 }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#ffffff' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Tasks */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-64">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h2 className="text-base font-semibold text-slate-900">最近任务</h2>
              <button 
                onClick={() => onNavigate('tasks')}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center"
              >
                查看全部 <ArrowRight className="w-3 h-3 ml-1" />
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-slate-500 sticky top-0 bg-white shadow-[0_1px_0_0_#f1f5f9]">
                  <tr>
                    <th className="px-4 py-3 font-medium">任务</th>
                    <th className="px-4 py-3 font-medium">状态</th>
                    <th className="px-4 py-3 font-medium w-1/3">进度</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentTasks.map((task) => (
                    <tr key={task.id} className="hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => onNavigate('task_details')}>
                      <td className="px-4 py-4 font-medium text-slate-900">{task.id}</td>
                      <td className="px-4 py-4">
                        <span className={cn(
                          "px-2 py-1 rounded-md text-xs font-medium border",
                          task.status === 'running' ? "bg-blue-50 text-blue-700 border-blue-200" :
                          task.status === 'review' ? "bg-amber-50 text-amber-700 border-amber-200" :
                          "bg-emerald-50 text-emerald-700 border-emerald-200"
                        )}>
                          {task.statusLabel}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-slate-700">{task.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={cn("h-1.5 rounded-full", task.status === 'running' ? "bg-blue-500" : task.status === 'review' ? "bg-amber-500" : "bg-emerald-500")}
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Exception Distribution */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-72">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h2 className="text-base font-semibold text-slate-900 flex items-center">
                <PieChartIcon className="w-4 h-4 mr-2 text-red-500" /> 异常分布
              </h2>
              <span className="text-xs text-slate-500">错误类型统计</span>
            </div>
            <div className="p-4 flex-1 flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={errorData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {errorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                     contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                     itemStyle={{ fontWeight: 500 }}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Custom Legend */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 space-y-3">
                {errorData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center text-xs">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-slate-600 w-20">{entry.name}</span>
                    <span className="font-semibold text-slate-900">{entry.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <h2 className="text-base font-semibold text-slate-900">快捷入口</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {quickLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => onNavigate(link.page)}
                className="flex flex-col items-center justify-center p-4 bg-white border border-slate-100 rounded-xl hover:border-indigo-200 hover:bg-indigo-50/50 hover:shadow-sm hover:text-indigo-700 transition-all text-slate-700 group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-3 group-hover:bg-indigo-100 group-hover:text-indigo-600 text-slate-500 transition-colors">
                  <link.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">{link.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
