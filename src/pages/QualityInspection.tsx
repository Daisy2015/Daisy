import React, { useState } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, Check, X, FileText, 
  CheckCircle2, ChevronLeft, Bot, Plus, Search, Filter, AlertCircle,
  Database, Tag, Edit3, ZoomIn, ZoomOut, Repeat, FastForward, Activity,
  ChevronRight, ShieldCheck, PieChart, Download, PlusCircle
} from 'lucide-react';
import { Page } from '@/src/types';
import { cn } from '@/src/lib/utils';

export function QualityInspection() {
  const [view, setView] = useState<'list' | 'workbench'>('list');

  if (view === 'list') {
    return <QualityTaskList onNavigate={() => setView('workbench')} />;
  }

  return <QualityWorkbench onNavigate={() => setView('list')} />;
}

function QualityTaskList({ onNavigate }: { onNavigate: () => void }) {
  const tasks = [
    { id: 'QC_Batch001', source: 'Batch001', amount: 1256, progress: 68, time: '2026-06-24 10:30', status: 'running' },
    { id: 'QC_Batch002', source: 'Batch002', amount: 500, progress: 100, time: '2026-06-23 15:20', status: 'completed' },
    { id: 'QC_Batch003', source: 'Batch003', amount: 2000, progress: 0, time: '2026-06-22 11:10', status: 'pending' },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 -mx-8 -my-6 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 flex items-center">
            <ShieldCheck className="w-6 h-6 mr-2 text-indigo-600" />
            Quality Center
          </h1>
          <p className="text-sm text-slate-500 mt-1">质量控制、错误反馈与模型优化的核心平台。</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* AI Task Creation */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="p-5 border-b border-slate-100 flex items-center justify-between relative z-10 bg-slate-50/50">
             <div className="flex items-center">
               <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                 <Bot className="w-5 h-5" />
               </div>
               <h2 className="text-lg font-semibold text-slate-900">AI 创建抽检任务</h2>
             </div>
          </div>
          
          <div className="p-6 flex-1 flex flex-col relative z-10 bg-white">
            <div className="relative mt-auto flex items-end bg-white border border-slate-300 rounded-lg shadow-sm focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-shadow">
              <textarea 
                className="w-full max-h-32 min-h-[80px] p-4 bg-transparent border-none outline-none resize-none text-sm placeholder-slate-400"
                placeholder="例如：对Batch001执行10%抽检，重点检查ASR和情感标注结果。"
                defaultValue="对Batch001执行10%抽检，重点检查ASR和情感标注结果。"
              />
              <div className="p-2">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium">
                  生成抽检
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Manual Creation */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">手动创建</h2>
            <button className="text-indigo-600 hover:text-indigo-700 bg-indigo-50 p-1.5 rounded-md transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-center space-y-4">
             <div>
               <label className="block text-xs font-medium text-slate-500 mb-1">来源任务批次</label>
               <select className="w-full border border-slate-200 rounded-md py-1.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500">
                 <option>Batch001</option>
                 <option>Batch002</option>
               </select>
             </div>
             <div>
               <label className="block text-xs font-medium text-slate-500 mb-1">抽检比例</label>
               <input type="range" className="w-full" min="1" max="100" defaultValue="10" />
               <div className="text-right text-xs text-slate-500 mt-1">10% (~1256条)</div>
             </div>
             <button className="w-full py-2 bg-white border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium mt-2">
               创建任务
             </button>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
         <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
           <h2 className="text-lg font-semibold text-slate-900">抽检任务列表</h2>
           <div className="flex items-center space-x-2">
             <div className="relative">
               <input type="text" placeholder="搜索任务..." className="pl-8 pr-3 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 w-64 bg-white" />
               <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
             </div>
             <button className="p-1.5 border border-slate-200 rounded-md text-slate-500 hover:bg-slate-100 bg-white">
               <Filter className="w-4 h-4" />
             </button>
           </div>
         </div>
         <div className="flex-1 overflow-auto">
           <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-medium text-slate-600">任务名称</th>
                  <th className="px-6 py-3 font-medium text-slate-600">来源任务</th>
                  <th className="px-6 py-3 font-medium text-slate-600">状态</th>
                  <th className="px-6 py-3 font-medium text-slate-600 w-1/4">完成进度</th>
                  <th className="px-6 py-3 font-medium text-slate-600">抽检数量</th>
                  <th className="px-6 py-3 font-medium text-slate-600">创建时间</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tasks.map(task => (
                  <tr key={task.id} className="hover:bg-indigo-50/50 transition-colors cursor-pointer" onClick={onNavigate}>
                    <td className="px-6 py-4 font-semibold text-indigo-900">{task.id}</td>
                    <td className="px-6 py-4 text-slate-600">{task.source}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-1 rounded-md text-xs font-medium border",
                        task.status === 'running' ? "bg-blue-50 text-blue-700 border-blue-200" :
                        task.status === 'completed' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        "bg-slate-50 text-slate-700 border-slate-200"
                      )}>
                        {task.status === 'running' ? '验收中' : task.status === 'completed' ? '已完成' : '待验收'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-slate-700">{task.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={cn("h-1.5 rounded-full", task.status === 'running' ? "bg-blue-500" : task.status === 'completed' ? "bg-emerald-500" : "bg-slate-300")}
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{task.amount}</td>
                    <td className="px-6 py-4 text-slate-500 tabular-nums">{task.time}</td>
                  </tr>
                ))}
              </tbody>
           </table>
         </div>
      </div>
    </div>
  );
}

function QualityWorkbench({ onNavigate }: { onNavigate: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(1.256);
  const duration = 8.423;

  const audioList = [
    { id: 'audio_001.wav', status: 'error', errors: 2, duration: '8.4s' },
    { id: 'audio_002.wav', status: 'checked', errors: 0, duration: '3.2s' },
    { id: 'audio_003.wav', status: 'current', errors: 0, duration: '5.1s' },
    { id: 'audio_004.wav', status: 'pending', errors: 0, duration: '12.0s' },
    { id: 'audio_005.wav', status: 'pending', errors: 0, duration: '4.5s' },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] -mx-8 -my-6 bg-slate-100">
      {/* Workbench Header */}
      <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 shadow-sm z-10">
        <div className="flex items-center">
          <button onClick={onNavigate} className="mr-3 p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <div className="flex items-center">
               <h1 className="text-sm font-bold text-slate-900 mr-3">QC_Batch001</h1>
               <span className="text-xs text-slate-500 font-mono bg-slate-100 px-1.5 py-0.5 rounded">1256 items</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 mr-4 border-r border-slate-200 pr-4">
             <button className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded" title="批量通过"><CheckCircle2 className="w-4 h-4" /></button>
             <button className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded" title="批量驳回"><X className="w-4 h-4" /></button>
             <button className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded" title="下载"><Download className="w-4 h-4" /></button>
          </div>
          <button className="px-4 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 flex items-center shadow-sm">
            提交验收结果
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Audio List */}
        <div className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 z-0">
          <div className="p-3 border-b border-slate-100 bg-slate-50">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-slate-600">验收队列</span>
              <span className="text-xs font-mono text-slate-500">2/1256</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {audioList.map((audio) => (
              <div 
                key={audio.id} 
                className={cn(
                  "px-4 py-3 border-b border-slate-100 cursor-pointer transition-colors flex flex-col relative group",
                  audio.status === 'current' ? 'bg-indigo-50/50 border-l-4 border-l-indigo-600' : 'hover:bg-slate-50 border-l-4 border-l-transparent'
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={cn("text-sm font-mono truncate", audio.status === 'current' ? 'text-indigo-900 font-semibold' : 'text-slate-700')}>
                    {audio.id}
                  </span>
                  {audio.status === 'checked' && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                  {audio.status === 'error' && <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{audio.duration}</span>
                  {audio.errors > 0 && <span className="text-red-600 bg-red-50 px-1.5 rounded">{audio.errors} 处错误</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Main Working Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
          
          {/* Top: Toolbar & Waveform */}
          <div className="bg-white border-b border-slate-200 flex flex-col h-72 shrink-0">
            {/* Toolbar */}
            <div className="h-10 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between px-3 shrink-0">
              <div className="flex items-center space-x-1">
                <button className="p-1.5 text-slate-600 hover:bg-slate-200 rounded transition-colors"><SkipBack className="w-4 h-4" /></button>
                <button className="p-1.5 text-slate-600 hover:bg-slate-200 rounded transition-colors" onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button className="p-1.5 text-slate-600 hover:bg-slate-200 rounded transition-colors"><SkipForward className="w-4 h-4" /></button>
                <div className="w-px h-4 bg-slate-300 mx-2"></div>
                <button className="p-1.5 text-slate-600 hover:bg-slate-200 rounded transition-colors"><ZoomIn className="w-4 h-4" /></button>
                <button className="p-1.5 text-slate-600 hover:bg-slate-200 rounded transition-colors"><ZoomOut className="w-4 h-4" /></button>
                <button className="p-1.5 text-slate-600 hover:bg-slate-200 rounded transition-colors"><Repeat className="w-4 h-4" /></button>
                <button className="px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded transition-colors bg-white border border-slate-200 shadow-sm ml-2">1.0x</button>
              </div>
              <div className="flex items-center space-x-3 font-mono text-xs text-slate-500">
                <span>00:01.256</span>
                <span>/</span>
                <span>00:08.423</span>
              </div>
            </div>

            {/* Waveform Editor */}
            <div className="flex-1 bg-[#1e1e1e] relative overflow-hidden flex flex-col group cursor-crosshair">
               {/* Time ruler */}
               <div className="h-6 bg-[#2d2d2d] border-b border-slate-700 flex items-center px-4 font-mono text-[10px] text-slate-400 relative">
                 <div className="absolute left-[0%]">0s</div>
                 <div className="absolute left-[25%]">2s</div>
                 <div className="absolute left-[50%]">4s</div>
                 <div className="absolute left-[75%]">6s</div>
                 <div className="absolute left-[100%]">8s</div>
               </div>

               {/* Waveform */}
               <div className="flex-1 relative w-full h-full">
                  {/* Grid */}
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(90deg, #475569 1px, transparent 1px), linear-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                  
                  {/* Center Line */}
                  <div className="absolute left-0 right-0 top-1/2 h-px bg-slate-700"></div>
                  
                  {/* Fake SVG Waveform */}
                  <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none" className="opacity-90">
                    <path d="M0,50 L10,50 L20,30 L30,70 L40,40 L50,60 L60,20 L70,80 L80,10 L90,90 L100,35 L110,65 L120,50 L130,50 L140,40 L150,60 L160,20 L170,80 L180,50 L190,50 L200,30 L210,70 L220,40 L230,60 L240,50 L250,50 L260,20 L270,80 L280,35 L290,65 L300,50" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M300,50 L310,50 L320,30 L330,70 L340,40 L350,60 L360,50 L370,50 L380,10 L390,90 L400,35 L410,65 L420,50 L430,50 L440,40 L450,60 L460,20 L470,80 L480,50 L490,50 L500,30 L510,70 L520,40 L530,60 L540,50 L550,50 L560,20 L570,80 L580,10 L590,90 L600,35 L610,65 L620,50" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M620,50 L630,50 L640,40 L650,60 L660,20 L670,80 L680,50 L690,50 L700,30 L710,70 L720,40 L730,60 L740,50 L750,50 L760,20 L770,80 L780,10 L790,90 L800,35 L810,65 L820,50 L830,50 L840,40 L850,60 L860,20 L870,80 L880,50 L890,50 L900,30 L910,70 L920,40 L930,60 L940,50 L950,50 L960,20 L970,80 L980,50 L990,50 L1000,50" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  
                  {/* Segmentation Regions (Mock) */}
                  <div className="absolute top-0 bottom-0 border-l border-r border-emerald-500 bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors" style={{ left: '15%', width: '30%' }}>
                     <div className="absolute -top-6 left-1 text-[10px] text-emerald-400">您好，请问您...</div>
                  </div>
                  <div className="absolute top-0 bottom-0 border-l border-r border-amber-500 bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors" style={{ left: '50%', width: '25%' }}>
                     <div className="absolute -top-6 left-1 text-[10px] text-amber-400">需要办理...</div>
                  </div>

                  {/* Playhead */}
                  <div className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10" style={{ left: `${(currentTime / duration) * 100}%` }}>
                    <div className="absolute -top-1 -ml-1.5 w-3 h-3 rounded-full bg-red-500 shadow-md"></div>
                  </div>
               </div>
            </div>
          </div>

          {/* Bottom: Text Editor & Comparison */}
          <div className="flex-1 flex flex-col p-6 overflow-y-auto">
            <h3 className="text-sm font-semibold text-slate-800 flex items-center mb-4">
              <Edit3 className="w-4 h-4 mr-2 text-indigo-600" /> 多结果对比与编辑
            </h3>
            
            <div className="grid grid-cols-2 gap-6 h-full">
              {/* Agent Original */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden opacity-80">
                <div className="px-4 py-2 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                   <span className="text-xs font-semibold text-slate-600">Agent 结果 (原值)</span>
                </div>
                <div className="p-4 flex-1 text-slate-500 leading-relaxed text-sm">
                   您好，请问需要办理什么业务？
                </div>
              </div>

              {/* Human Edit */}
              <div className="bg-white rounded-xl border border-indigo-200 shadow-sm flex flex-col overflow-hidden ring-1 ring-indigo-500/10">
                <div className="px-4 py-2 border-b border-indigo-100 bg-indigo-50/50 flex justify-between items-center">
                   <span className="text-xs font-semibold text-indigo-900">人工验收结果 (修改)</span>
                   <button className="text-xs text-indigo-600 hover:underline">撤销</button>
                </div>
                <div className="p-4 flex-1 text-slate-800 leading-relaxed text-sm bg-white focus-within:bg-slate-50/30 transition-colors relative">
                   <textarea className="w-full h-full resize-none border-none outline-none bg-transparent">您好，请问您需要办理什么业务？</textarea>
                   
                   {/* Diff Highlight Mock Overlay (in a real app, this would be a contenteditable or similar) */}
                   <div className="absolute inset-4 pointer-events-none text-transparent">
                      您好，请问<span className="bg-red-200 text-slate-900 px-0.5 rounded">您</span>需要办理什么业务？
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Labels & Knowledge */}
        <div className="w-80 bg-white border-l border-slate-200 flex flex-col shrink-0 z-0 overflow-hidden">
           
           <div className="flex-1 overflow-y-auto flex flex-col">
             {/* Tags Config */}
             <div className="p-5 border-b border-slate-100">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-sm font-semibold text-slate-900 flex items-center">
                   <Tag className="w-4 h-4 mr-2 text-indigo-600" /> 错误标签
                 </h3>
                 <button className="text-slate-400 hover:text-indigo-600"><PlusCircle className="w-4 h-4" /></button>
               </div>
               
               <div className="space-y-3">
                 <label className="flex items-center p-2.5 border border-red-200 bg-red-50/50 rounded-lg cursor-pointer transition-colors hover:bg-red-50">
                   <input type="checkbox" defaultChecked className="w-4 h-4 text-red-600 rounded border-red-300 focus:ring-red-500" />
                   <span className="ml-3 text-sm font-medium text-red-900">漏字</span>
                 </label>
                 <label className="flex items-center p-2.5 border border-slate-200 rounded-lg cursor-pointer transition-colors hover:bg-slate-50">
                   <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                   <span className="ml-3 text-sm text-slate-700">错字</span>
                 </label>
                 <label className="flex items-center p-2.5 border border-slate-200 rounded-lg cursor-pointer transition-colors hover:bg-slate-50">
                   <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                   <span className="ml-3 text-sm text-slate-700">情感错误</span>
                 </label>
                 <label className="flex items-center p-2.5 border border-slate-200 rounded-lg cursor-pointer transition-colors hover:bg-slate-50">
                   <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                   <span className="ml-3 text-sm text-slate-700">副语言错误</span>
                 </label>
               </div>
             </div>

             {/* Error Log */}
             <div className="p-5 border-b border-slate-100 flex-1">
               <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center">
                 <AlertCircle className="w-4 h-4 mr-2 text-amber-500" /> 当前错误记录
               </h3>
               <div className="space-y-2">
                 <div className="bg-slate-50 border border-slate-200 rounded-md p-2.5 text-sm flex justify-between items-start">
                    <div>
                      <span className="font-semibold text-red-700 text-xs bg-red-100 px-1.5 py-0.5 rounded mr-2">漏字</span>
                      <span className="text-slate-700">Agent漏识别“您”</span>
                    </div>
                    <button className="text-slate-400 hover:text-red-500"><X className="w-3.5 h-3.5" /></button>
                 </div>
               </div>
               <button className="mt-3 w-full py-1.5 border border-dashed border-slate-300 text-slate-500 rounded text-xs font-medium hover:bg-slate-50 transition-colors">
                 + 添加新记录
               </button>
             </div>
           </div>

           {/* Knowledge Feedback Button */}
           <div className="p-5 bg-indigo-50 border-t border-indigo-100 shrink-0">
             <div className="flex items-start mb-3 text-indigo-900">
               <Database className="w-5 h-5 mr-2 shrink-0 text-indigo-600" />
               <div className="text-xs">
                 <p className="font-semibold mb-0.5">知识回流中心</p>
                 <p className="opacity-80">将此错误案例同步至知识库，用于后续 Prompt 与模型优化。</p>
               </div>
             </div>
             <button className="w-full py-2.5 bg-indigo-600 text-white rounded-lg shadow-sm text-sm font-medium hover:bg-indigo-700 transition-colors flex justify-center items-center">
                加入错误案例库
             </button>
           </div>
        </div>

      </div>

      {/* Footer Stats Bar */}
      <div className="h-10 bg-slate-900 text-slate-300 flex items-center justify-between px-6 text-xs font-mono shrink-0 z-10">
        <div className="flex items-center space-x-6">
          <span className="flex items-center"><PieChart className="w-3.5 h-3.5 mr-1.5 text-slate-400" /> 总样本: 1256</span>
          <span className="text-emerald-400">已完成: 865</span>
        </div>
        <div className="flex items-center space-x-6">
          <span>准确率: 98.1%</span>
          <span>召回率: 97.5%</span>
          <span className="text-red-400">错误率: 1.9%</span>
        </div>
      </div>

    </div>
  )
}
