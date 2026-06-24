import React, { useState } from 'react';
import { ArrowLeft, Database, Bot, CheckCircle2, PlayCircle, AlertCircle, FileText, Terminal, Play, Pause, Square, Trash2, Edit, Save, Activity, CheckSquare, Settings2, BarChart2, Download, Table2, Search, Filter, Plus } from 'lucide-react';
import { Page } from '@/src/types';
import { cn } from '@/src/lib/utils';

interface TaskDetailsProps {
  onNavigate: (page: Page) => void;
}

export function TaskDetails({ onNavigate }: TaskDetailsProps) {
  const [activeTab, setActiveTab] = useState('workflow');

  return (
    <div className="flex flex-col h-full bg-slate-50 -mx-8 -my-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button 
            onClick={() => onNavigate('tasks')}
            className="p-2 mr-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-slate-900 mr-3">Batch001</h1>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">运行中</span>
            </div>
            <p className="text-sm text-slate-500 mt-1">标准标注流程 V1.2 • 创建于 2026-06-24 10:00</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-md transition-colors border border-slate-200 shadow-sm">
            <Pause className="w-4 h-4 mr-2" />
            暂停
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors border border-red-200 shadow-sm">
            <Square className="w-4 h-4 mr-2" />
            停止
          </button>
        </div>
      </div>

      <div className="bg-white border-b border-slate-200 px-2 flex space-x-6 shrink-0 mb-6 rounded-t-xl border-x border-t">
         <TabButton active={activeTab==='overview'} onClick={()=>setActiveTab('overview')} icon={Activity}>概览</TabButton>
         <TabButton active={activeTab==='workflow'} onClick={()=>setActiveTab('workflow')} icon={PlayCircle}>工作流执行</TabButton>
         <TabButton active={activeTab==='logs'} onClick={()=>setActiveTab('logs')} icon={Terminal}>实时日志</TabButton>
         <TabButton active={activeTab==='results'} onClick={()=>setActiveTab('results')} icon={Table2}>数据结果</TabButton>
         <TabButton active={activeTab==='stats'} onClick={()=>setActiveTab('stats')} icon={BarChart2}>统计分析</TabButton>
      </div>

      <div className="flex-1 overflow-hidden">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'workflow' && <WorkflowTab />}
        {activeTab === 'logs' && <LogsTab />}
        {activeTab === 'results' && <ResultsTab />}
        {activeTab === 'stats' && <StatsTab />}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, children }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "py-3 text-sm font-medium border-b-2 transition-colors flex items-center whitespace-nowrap",
        active 
          ? "border-indigo-600 text-indigo-600" 
          : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
      )}
    >
      <Icon className="w-4 h-4 mr-2" />
      {children}
    </button>
  )
}

function OverviewTab() {
  return (
    <div className="grid grid-cols-2 gap-6 h-full overflow-y-auto pb-6">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
        <h2 className="text-sm font-semibold text-slate-900 mb-6 border-b border-slate-100 pb-2">基础信息</h2>
        <div className="space-y-6 flex-1">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">任务名称</label>
              <p className="text-sm font-semibold text-slate-900">Batch001</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">状态</label>
              <p className="text-sm font-medium text-blue-600">运行中</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">工作流</label>
              <p className="text-sm font-medium text-slate-900">标准标注流程 V1.2</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">数据集</label>
              <p className="text-sm font-medium text-slate-900">客服语音数据集</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">开始时间</label>
              <p className="text-sm font-medium text-slate-900">2026-06-24 10:00</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">预计完成时间</label>
              <p className="text-sm font-medium text-slate-900">2026-06-24 12:30</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
        <h2 className="text-sm font-semibold text-slate-900 mb-6 border-b border-slate-100 pb-2">总进度</h2>
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex justify-between items-end mb-3">
            <span className="text-slate-500 text-sm">已处理 <span className="font-semibold text-slate-900">650</span> / 1000</span>
            <span className="text-4xl font-bold text-slate-900">65%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-4 mb-4 overflow-hidden border border-slate-200">
            <div 
              className="h-4 rounded-full bg-blue-500 relative transition-all duration-500" 
              style={{ width: '65%' }}
            >
              <div className="absolute inset-0 bg-white/20" style={{ backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)' , backgroundSize: '1rem 1rem'}}></div>
            </div>
          </div>
          <div className="text-sm text-slate-500 text-center">
             预计剩余时间: <span className="font-medium text-slate-700">12分钟</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function WorkflowTab() {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="flex h-full space-x-6 pb-6 relative">
      {/* Execution Flow */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden relative">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
           <h2 className="text-sm font-semibold text-slate-900">执行节点状态</h2>
           <button 
             onClick={() => setIsEditOpen(true)}
             className="px-3 py-1.5 text-sm font-medium text-indigo-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 shadow-sm flex items-center"
           >
             <Edit className="w-4 h-4 mr-1.5" /> 动态调整工作流
           </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 bg-[#f8fafc] bg-grid-slate-200" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
          <div className="relative max-w-lg mx-auto flex flex-col items-center">
            
            <div className="w-64 bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative z-10 flex items-center">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mr-4 shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div className="flex-1">
                 <h3 className="font-semibold text-slate-900 text-sm">数据集</h3>
                 <p className="text-xs text-slate-500 mt-0.5">1000条数据准备就绪</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            </div>

            <div className="w-px h-8 bg-slate-300"></div>
            <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-400"></div>
            
            <div className="w-64 bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative z-10">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mr-4 shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="flex-1">
                   <h3 className="font-semibold text-slate-900 text-sm">ASR Agent</h3>
                   <p className="text-xs text-slate-500 mt-0.5">100% (1000/1000)</p>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                 <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div className="w-px h-8 bg-slate-300"></div>
            <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-400"></div>
            
            <div className="w-64 bg-white border border-blue-400 rounded-xl p-4 shadow-md relative z-10 ring-1 ring-blue-400 ring-offset-2">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mr-4 shrink-0 relative">
                  <Bot className="w-5 h-5" />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full">
                    <PlayCircle className="w-4 h-4 text-blue-500 animate-pulse" />
                  </div>
                </div>
                <div className="flex-1">
                   <h3 className="font-semibold text-slate-900 text-sm">情感 Agent</h3>
                   <p className="text-xs text-slate-500 mt-0.5">70% (700/1000)</p>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                 <div className="h-full bg-blue-500 rounded-full relative" style={{ width: '70%' }}>
                    <div className="absolute inset-0 bg-white/20" style={{ backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem' }}></div>
                 </div>
              </div>
            </div>

            <div className="w-px h-8 bg-slate-300"></div>
            <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-400"></div>

            <div className="w-64 bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative z-10 opacity-70">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-lg bg-slate-50 text-slate-500 border border-slate-200 flex items-center justify-center mr-4 shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="flex-1">
                   <h3 className="font-semibold text-slate-900 text-sm">检查 Agent</h3>
                   <p className="text-xs text-slate-500 mt-0.5">等待处理</p>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                 <div className="h-full bg-slate-300 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Node Stats Sidebar */}
      <div className="w-80 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
           <h3 className="text-sm font-semibold text-slate-900 flex items-center">
             <Activity className="w-4 h-4 mr-2 text-indigo-600" />
             节点统计: 情感 Agent
           </h3>
        </div>
        <div className="p-5 space-y-6">
           <div>
             <div className="text-xs text-slate-500 mb-1">输入数量</div>
             <div className="text-xl font-bold text-slate-900">1000</div>
           </div>
           <div className="grid grid-cols-2 gap-4">
             <div>
               <div className="text-xs text-slate-500 mb-1">成功数量</div>
               <div className="text-lg font-bold text-emerald-600">700</div>
             </div>
             <div>
               <div className="text-xs text-slate-500 mb-1">失败数量</div>
               <div className="text-lg font-bold text-red-600">0</div>
             </div>
           </div>
           <div>
             <div className="text-xs text-slate-500 mb-1">平均耗时</div>
             <div className="text-lg font-bold text-slate-900 font-mono">1.2s <span className="text-xs text-slate-500 font-sans">/ 条</span></div>
           </div>
        </div>
      </div>

      {/* Edit Workflow Drawer overlay */}
      {isEditOpen && (
        <div className="absolute inset-0 z-50 flex justify-end overflow-hidden">
           <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity" onClick={() => setIsEditOpen(false)}></div>
           <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col relative z-10 animate-in slide-in-from-right duration-300">
             <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-white">
               <h2 className="text-lg font-semibold text-slate-900">动态调整工作流</h2>
               <button onClick={() => setIsEditOpen(false)} className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-md transition-colors">
                 &times;
               </button>
             </div>
             <div className="p-6 flex-1 overflow-y-auto">
               <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-3 rounded-lg mb-6 flex items-start">
                  <AlertCircle className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
                  <p>您正在修改运行中的工作流，<strong>新增的节点仅对未执行的数据生效</strong>。</p>
               </div>
               
               <div className="space-y-4">
                 <h3 className="text-sm font-semibold text-slate-900 mb-2">添加新节点</h3>
                 <div className="border border-slate-200 rounded-lg p-3 cursor-pointer hover:border-indigo-400 hover:shadow-sm transition-all flex items-center group">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mr-3">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900">副语言 Agent</div>
                      <div className="text-xs text-slate-500">检测笑声、叹气等</div>
                    </div>
                    <button className="p-1 text-slate-400 group-hover:text-indigo-600"><Plus className="w-4 h-4" /></button>
                 </div>
               </div>
             </div>
             <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end space-x-3">
               <button onClick={() => setIsEditOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50">取消</button>
               <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700">应用修改</button>
             </div>
           </div>
        </div>
      )}
    </div>
  )
}

function LogsTab() {
  return (
    <div className="h-full bg-[#1e1e1e] rounded-xl border border-slate-800 shadow-sm flex flex-col overflow-hidden pb-6">
      <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-[#2d2d2d]">
        <div className="flex items-center">
          <Terminal className="w-4 h-4 text-slate-400 mr-2" />
          <h2 className="text-sm font-medium text-slate-200">实时日志</h2>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input type="text" placeholder="搜索日志..." className="pl-8 pr-3 py-1 text-xs bg-[#1e1e1e] border border-slate-700 rounded text-slate-300 focus:outline-none focus:border-slate-500" />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1.5" />
          </div>
          <button className="text-xs font-medium text-slate-400 hover:text-white flex items-center"><Filter className="w-3.5 h-3.5 mr-1" /> 过滤</button>
          <button className="text-xs font-medium text-slate-400 hover:text-white flex items-center"><Download className="w-3.5 h-3.5 mr-1" /> 导出</button>
        </div>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto font-mono text-xs text-slate-300 space-y-2">
        <p className="text-emerald-400">[10:20:00] [ASR Agent] [SUCCESS] audio_001.wav processed.</p>
        <p className="text-slate-400">[10:20:01] [Emotion Agent] [INFO] Loading audio_001.wav...</p>
        <p className="text-emerald-400">[10:20:02] [Emotion Agent] [SUCCESS] audio_001.wav - result: neutral</p>
        <p className="text-slate-400">[10:20:02] [ASR Agent] [INFO] Loading audio_002.wav...</p>
        <p className="text-red-400">[10:20:05] [ASR Agent] [ERROR] audio_002.wav - Failed to parse format, retrying...</p>
        <p className="text-emerald-400">[10:20:08] [ASR Agent] [SUCCESS] audio_002.wav processed on retry.</p>
        <p className="text-blue-400 animate-pulse">[10:20:10] [Emotion Agent] [INFO] Processing batch 45...</p>
      </div>
    </div>
  )
}

function ResultsTab() {
  const results = [
    { id: 'audio_001.wav', asr: '您好，请问需要办理什么业务？', emotion: '积极', check: '通过' },
    { id: 'audio_002.wav', asr: '我不办了，直接退款吧。', emotion: '愤怒', check: '拦截' },
    { id: 'audio_003.wav', asr: '好的，谢谢。', emotion: '中立', check: '通过' },
  ];

  return (
    <div className="h-full bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden pb-6">
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">数据结果</h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input type="text" placeholder="搜索内容..." className="pl-8 pr-3 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 w-64 bg-white" />
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
          </div>
          <button className="flex items-center px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 shadow-sm">
            <Filter className="w-4 h-4 mr-2" />
            筛选
          </button>
          <button className="flex items-center px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 shadow-sm">
            <Download className="w-4 h-4 mr-2" />
            导出
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
            <tr>
              <th className="px-6 py-3 font-medium">文件ID</th>
              <th className="px-6 py-3 font-medium">ASR 结果</th>
              <th className="px-6 py-3 font-medium w-32">情感标注</th>
              <th className="px-6 py-3 font-medium w-32">质检结果</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {results.map((r, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-mono text-xs text-indigo-600">{r.id}</td>
                <td className="px-6 py-4 text-slate-700">{r.asr}</td>
                <td className="px-6 py-4">
                   <span className={cn(
                     "px-2 py-1 rounded text-xs font-medium border",
                     r.emotion === '积极' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                     r.emotion === '愤怒' ? "bg-red-50 text-red-700 border-red-200" :
                     "bg-slate-100 text-slate-700 border-slate-200"
                   )}>{r.emotion}</span>
                </td>
                <td className="px-6 py-4">
                   <span className={cn("flex items-center text-xs font-medium", r.check === '通过' ? "text-emerald-600" : "text-amber-600")}>
                     {r.check === '通过' ? <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> : <AlertCircle className="w-3.5 h-3.5 mr-1" />}
                     {r.check}
                   </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StatsTab() {
  return (
    <div className="h-full bg-slate-50/50 rounded-xl border border-slate-200 border-dashed flex flex-col items-center justify-center pb-6">
       <BarChart2 className="w-12 h-12 text-slate-300 mb-4" />
       <h3 className="text-lg font-medium text-slate-900 mb-1">统计分析</h3>
       <p className="text-sm text-slate-500">任务完成后将自动生成统计报表，包括准确率、召回率及耗时分析等指标。</p>
    </div>
  )
}
