import React, { useState } from 'react';
import { Send, PlayCircle, CheckCircle2, Clock, XCircle, Search, Filter, Plus, LayoutGrid, List, Bot, Inbox, Activity, CheckSquare, AlertTriangle } from 'lucide-react';
import { Page } from '@/src/types';
import { cn } from '@/src/lib/utils';

interface TaskCenterProps {
  onNavigate: (page: Page) => void;
}

export function TaskCenter({ onNavigate }: TaskCenterProps) {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [isManualCreateOpen, setIsManualCreateOpen] = useState(false);

  const stats = {
    total: 52,
    running: 8,
    pending_review: 3,
    completed: 39,
    failed: 2
  };

  const runningTasks = [
    { id: 'Batch001', name: '客服录音日常处理', workflow: '标准标注流程V1.2', progress: 65, total: 1000, current: 650 },
    { id: 'Batch005', name: '投诉录音加急分析', workflow: '情感分析流程', progress: 82, total: 200, current: 164 },
  ];

  const reviewTasks = [
    { id: 'Batch002', name: '双十一大促数据', workflow: '验收流程', progress: 100, total: 500, current: 500 },
  ];

  const completedTasks = [
    { id: 'Batch003', name: '历史数据清洗_Q1', workflow: '数据治理流程', progress: 100, total: 5000, current: 5000 },
    { id: 'Batch004', name: '质检抽查_周报', workflow: '标准标注流程V1.2', progress: 100, total: 300, current: 300 },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 -mx-8 -my-6 p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Task Center</h1>
          <p className="text-sm text-slate-500 mt-1">负责任务的创建、运行监控与结果管理，是核心生产中心。</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsManualCreateOpen(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            手动创建任务
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* AI Task Creation */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="p-5 border-b border-slate-100 flex items-center justify-between relative z-10 bg-slate-50/50">
             <div className="flex items-center">
               <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                 <Bot className="w-5 h-5" />
               </div>
               <h2 className="text-lg font-semibold text-slate-900">AI 创建任务</h2>
             </div>
          </div>
          
          <div className="p-6 flex-1 flex flex-col relative z-10 bg-white">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4 text-sm text-slate-700">
              你可以用自然语言告诉我你想做什么任务，例如：<br/>
              <span className="text-indigo-600 font-medium inline-block mt-2">"请对客服录音数据集执行ASR标注和情感标注，完成后进行10%抽检"</span>
            </div>
            
            <div className="relative mt-auto flex items-end bg-white border border-slate-300 rounded-lg shadow-sm focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-shadow">
              <textarea 
                className="w-full max-h-32 min-h-[80px] p-4 bg-transparent border-none outline-none resize-none text-sm placeholder-slate-400"
                placeholder="输入任务描述..."
                defaultValue="我需要对客服语音数据集执行ASR标注和情感标注"
              />
              <div className="p-2">
                <button className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm flex items-center">
                  <Send className="w-4 h-4 mr-1.5" /> 发送
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Task Statistics */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-semibold text-slate-900">任务统计</h2>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-4">
              <StatCard title="全部任务" value={stats.total} icon={Inbox} color="text-slate-600" bg="bg-slate-100" />
              <StatCard title="运行中" value={stats.running} icon={Activity} color="text-blue-600" bg="bg-blue-100" />
              <StatCard title="待验收" value={stats.pending_review} icon={CheckSquare} color="text-amber-600" bg="bg-amber-100" />
              <StatCard title="已完成" value={stats.completed} icon={CheckCircle2} color="text-emerald-600" bg="bg-emerald-100" />
            </div>
            <div className="mt-4 flex items-center p-3 bg-red-50 border border-red-100 rounded-lg text-red-700">
               <AlertTriangle className="w-5 h-5 mr-3 shrink-0" />
               <div className="flex-1">
                 <div className="text-sm font-semibold">失败任务</div>
                 <div className="text-xs mt-0.5 opacity-80">有 {stats.failed} 个任务执行失败，请及时排查</div>
               </div>
               <div className="text-xl font-bold">{stats.failed}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Task List / Kanban */}
      <div className="flex-1 flex flex-col min-h-[500px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">最近任务</h2>
          <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setViewMode('kanban')}
              className={cn("p-1.5 rounded-md transition-colors", viewMode === 'kanban' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700")}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn("p-1.5 rounded-md transition-colors", viewMode === 'list' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700")}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {viewMode === 'kanban' ? (
          <div className="flex-1 flex space-x-6 overflow-x-auto pb-4">
            <KanbanColumn title={`运行中 (${runningTasks.length})`} color="blue">
              {runningTasks.map(t => <TaskCard key={t.id} task={t} onNavigate={onNavigate} status="running" />)}
            </KanbanColumn>
            <KanbanColumn title={`待验收 (${reviewTasks.length})`} color="amber">
              {reviewTasks.map(t => <TaskCard key={t.id} task={t} onNavigate={onNavigate} status="review" />)}
            </KanbanColumn>
            <KanbanColumn title={`已完成 (${completedTasks.length})`} color="emerald">
              {completedTasks.map(t => <TaskCard key={t.id} task={t} onNavigate={onNavigate} status="completed" />)}
            </KanbanColumn>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex-1">
             <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 font-medium text-slate-600">任务名称</th>
                    <th className="px-6 py-3 font-medium text-slate-600">状态</th>
                    <th className="px-6 py-3 font-medium text-slate-600">工作流</th>
                    <th className="px-6 py-3 font-medium text-slate-600 w-1/4">进度</th>
                    <th className="px-6 py-3 font-medium text-slate-600 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[...runningTasks.map(t=>({...t, status: 'running'})), ...reviewTasks.map(t=>({...t, status: 'review'})), ...completedTasks.map(t=>({...t, status: 'completed'}))].map(task => (
                    <tr key={task.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => onNavigate('task_details')}>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{task.id}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{task.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2 py-1 rounded-md text-xs font-medium border",
                          task.status === 'running' ? "bg-blue-50 text-blue-700 border-blue-200" :
                          task.status === 'review' ? "bg-amber-50 text-amber-700 border-amber-200" :
                          "bg-emerald-50 text-emerald-700 border-emerald-200"
                        )}>
                          {task.status === 'running' ? '运行中' : task.status === 'review' ? '待验收' : '已完成'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{task.workflow}</td>
                      <td className="px-6 py-4">
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
                      <td className="px-6 py-4 text-right">
                         <button className="text-indigo-600 font-medium hover:text-indigo-700 text-sm">查看详情</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        )}
      </div>

      <ManualCreateDrawer isOpen={isManualCreateOpen} onClose={() => setIsManualCreateOpen(false)} />
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, bg }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center shadow-sm">
       <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mr-3", bg, color)}>
         <Icon className="w-5 h-5" />
       </div>
       <div>
         <div className="text-xs text-slate-500 mb-0.5 font-medium">{title}</div>
         <div className="text-xl font-bold text-slate-900 leading-none">{value}</div>
       </div>
    </div>
  )
}

function KanbanColumn({ title, color, children }: any) {
  return (
    <div className="flex-1 min-w-[320px] bg-slate-100/50 rounded-xl border border-slate-200 p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

function TaskCard({ task, onNavigate, status }: any) {
  const isRunning = status === 'running';
  return (
    <div 
      className="bg-white border border-slate-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
      onClick={() => onNavigate('task_details')}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="font-mono text-xs font-semibold text-slate-500">{task.id}</span>
        <button className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontalIcon className="w-4 h-4" />
        </button>
      </div>
      <h4 className="font-semibold text-slate-900 mb-1">{task.name}</h4>
      <p className="text-xs text-slate-500 mb-4">{task.workflow}</p>
      
      <div>
        <div className="flex justify-between items-end mb-1.5">
          <span className="text-2xl font-bold text-slate-900 leading-none">{task.progress}%</span>
          <span className="text-[10px] text-slate-500">{task.current} / {task.total}</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div 
            className={cn("h-full rounded-full", status === 'running' ? "bg-blue-500" : status === 'review' ? "bg-amber-500" : "bg-emerald-500", isRunning && "relative")}
            style={{ width: `${task.progress}%` }}
          >
             {isRunning && <div className="absolute inset-0 bg-white/20" style={{ backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem' }}></div>}
          </div>
        </div>
      </div>
    </div>
  )
}

function MoreHorizontalIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
}

function ManualCreateDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex justify-end overflow-hidden">
       <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
       <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col relative z-10 animate-in slide-in-from-right duration-300">
         <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-white">
           <h2 className="text-lg font-semibold text-slate-900">手动创建任务</h2>
           <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-md transition-colors">
             <XCircle className="w-5 h-5" />
           </button>
         </div>
         
         <div className="p-6 flex-1 overflow-y-auto space-y-6">
           <div>
             <label className="block text-sm font-medium text-slate-700 mb-1.5">任务名称 <span className="text-red-500">*</span></label>
             <input type="text" placeholder="例如：日常抽检任务" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-sm" />
           </div>
           
           <div>
             <label className="block text-sm font-medium text-slate-700 mb-1.5">数据集 <span className="text-red-500">*</span></label>
             <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-sm bg-white">
               <option>客服语音数据集_最新</option>
               <option>投诉录音集合</option>
             </select>
           </div>
           
           <div>
             <label className="block text-sm font-medium text-slate-700 mb-1.5">工作流 <span className="text-red-500">*</span></label>
             <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-sm bg-white">
               <option>标准标注流程V1.2</option>
               <option>情感标注流程</option>
             </select>
           </div>

           <div>
             <label className="block text-sm font-medium text-slate-700 mb-1.5">优先级</label>
             <div className="grid grid-cols-4 gap-2">
               {['低', '中', '高', '紧急'].map(p => (
                 <button key={p} className={cn("py-2 text-sm font-medium rounded-md border", p === '中' ? "bg-indigo-50 border-indigo-200 text-indigo-700 ring-1 ring-indigo-500" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50")}>
                   {p}
                 </button>
               ))}
             </div>
           </div>

           <div>
             <label className="block text-sm font-medium text-slate-700 mb-1.5">执行资源</label>
             <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-sm bg-white">
               <option>默认计算集群</option>
               <option>高优 GPU 集群</option>
             </select>
           </div>
         </div>
         
         <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end space-x-3 shrink-0">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 shadow-sm">取消</button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 shadow-sm">创建任务</button>
         </div>
       </div>
    </div>
  )
}

