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
  const [currentTime, setCurrentTime] = useState(2.35);
  const duration = 8.423;

  const audioList = [
    { id: 'audio_0001.wav', status: 'checked' },
    { id: 'audio_0002.wav', status: 'error' },
    { id: 'audio_0003.wav', status: 'current' },
    { id: 'audio_0004.wav', status: 'pending' },
    { id: 'audio_0005.wav', status: 'pending' },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] -mx-6 -my-6 md:-mx-8 md:-my-8 bg-slate-50 font-sans">
      {/* Top Task Info Bar */}
      <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
        <div className="flex items-center space-x-6">
          <h1 className="text-base font-bold text-slate-900">验收任务：Batch_20260624_ASR_001</h1>
          <div className="hidden md:flex items-center space-x-4 text-sm text-slate-500">
             <span>来源：Batch001</span>
             <span className="w-px h-3 bg-slate-300"></span>
             <span>模块：ASR Agent</span>
          </div>
        </div>
        <button onClick={onNavigate} className="flex items-center px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> 返回任务列表
        </button>
      </div>

      {/* Statistics Bar */}
      <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-6 text-sm font-medium text-slate-600 shrink-0">
        <div className="flex items-center space-x-8">
          <span>抽检数量：<span className="text-slate-900 font-bold">1000</span></span>
          <span>已完成：<span className="text-indigo-600 font-bold">680</span></span>
          <span>正确：<span className="text-emerald-600 font-bold">652</span></span>
          <span>错误：<span className="text-red-600 font-bold">28</span></span>
          <span>准确率：<span className="text-slate-900 font-bold">95.8%</span></span>
          <span>召回率：<span className="text-slate-900 font-bold">94.2%</span></span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Audio List Area */}
        <div className="w-[260px] bg-white border-r border-slate-200 flex flex-col shrink-0 z-0">
          <div className="p-4 border-b border-slate-100 space-y-3">
            <div className="relative">
              <input type="text" placeholder="搜索音频..." className="w-full pl-8 pr-3 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50" />
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
            </div>
            <div className="flex flex-col space-y-2 text-sm text-slate-600">
              <label className="flex items-center cursor-pointer hover:text-indigo-600 transition-colors">
                <input type="checkbox" className="w-3.5 h-3.5 mr-2 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                仅看错误
              </label>
              <label className="flex items-center cursor-pointer hover:text-indigo-600 transition-colors">
                <input type="checkbox" className="w-3.5 h-3.5 mr-2 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                未完成
              </label>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {audioList.map((audio) => (
              <div 
                key={audio.id} 
                className={cn(
                  "px-4 py-3 border-b border-slate-50 cursor-pointer transition-colors flex items-center justify-between group",
                  audio.status === 'current' ? 'bg-indigo-50/80 border-l-4 border-l-indigo-600' : 'hover:bg-slate-50 border-l-4 border-l-transparent'
                )}
              >
                <div className="flex items-center">
                  {audio.status === 'checked' && <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />}
                  {audio.status === 'error' && <X className="w-4 h-4 text-red-500 mr-2 shrink-0" />}
                  {(audio.status === 'pending' || audio.status === 'current') && <div className="w-4 h-4 rounded-full border-2 border-slate-300 mr-2 shrink-0"></div>}
                  <span className={cn("text-sm font-mono truncate", audio.status === 'current' ? 'text-indigo-900 font-semibold' : 'text-slate-700')}>
                    {audio.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Main Working Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50 border-r border-slate-200">
          
          {/* Top: Audio Editor */}
          <div className="bg-white flex flex-col h-72 shrink-0 border-b border-slate-200 shadow-sm relative z-10">
            {/* Toolbar */}
            <div className="h-12 border-b border-slate-100 flex items-center justify-between px-4 shrink-0">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors" title="上一条"><SkipBack className="w-4 h-4" /></button>
                <button 
                  className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors shadow-sm" 
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors" title="下一条"><SkipForward className="w-4 h-4" /></button>
                <div className="w-px h-5 bg-slate-200 mx-2"></div>
                <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors" title="循环"><Repeat className="w-4 h-4" /></button>
                <select className="ml-2 py-1 px-2 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded outline-none focus:border-indigo-500 hover:bg-slate-100 cursor-pointer">
                  <option>0.5x</option>
                  <option selected>1.0x</option>
                  <option>1.5x</option>
                  <option>2.0x</option>
                </select>
                <div className="w-px h-5 bg-slate-200 mx-2"></div>
                <button className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded transition-colors">+ 新增切分线</button>
              </div>
              <div className="flex items-center font-mono text-sm font-semibold text-slate-700">
                <span className="text-indigo-600">00:02.350</span>
                <span className="mx-1 text-slate-400">/</span>
                <span>00:08.423</span>
              </div>
            </div>

            {/* Waveform Editor */}
            <div className="flex-1 bg-slate-900 relative overflow-hidden flex flex-col group cursor-crosshair">
               {/* Time ruler */}
               <div className="h-6 bg-slate-800 border-b border-slate-700 flex items-center px-4 font-mono text-[10px] text-slate-400 relative select-none">
                 <div className="absolute left-[0%]">0s</div>
                 <div className="absolute left-[25%]">2s</div>
                 <div className="absolute left-[62.5%]">5s</div>
                 <div className="absolute left-[100%]">8s</div>
               </div>

               {/* Waveform Area */}
               <div className="flex-1 relative w-full h-full">
                  {/* Grid */}
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(90deg, #64748b 1px, transparent 1px), linear-gradient(#64748b 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                  
                  {/* Center Line */}
                  <div className="absolute left-0 right-0 top-1/2 h-px bg-slate-700"></div>
                  
                  {/* Fake SVG Waveform */}
                  <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none" className="opacity-90">
                    <path d="M0,50 L10,50 L20,30 L30,70 L40,40 L50,60 L60,20 L70,80 L80,10 L90,90 L100,35 L110,65 L120,50 L130,50 L140,40 L150,60 L160,20 L170,80 L180,50 L190,50 L200,30 L210,70 L220,40 L230,60 L240,50 L250,50 L260,20 L270,80 L280,35 L290,65 L300,50" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M300,50 L310,50 L320,30 L330,70 L340,40 L350,60 L360,50 L370,50 L380,10 L390,90 L400,35 L410,65 L420,50 L430,50 L440,40 L450,60 L460,20 L470,80 L480,50 L490,50 L500,30 L510,70 L520,40 L530,60 L540,50 L550,50 L560,20 L570,80 L580,10 L590,90 L600,35 L610,65 L620,50" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M620,50 L630,50 L640,40 L650,60 L660,20 L670,80 L680,50 L690,50 L700,30 L710,70 L720,40 L730,60 L740,50 L750,50 L760,20 L770,80 L780,10 L790,90 L800,35 L810,65 L820,50 L830,50 L840,40 L850,60 L860,20 L870,80 L880,50 L890,50 L900,30 L910,70 L920,40 L930,60 L940,50 L950,50 L960,20 L970,80 L980,50 L990,50 L1000,50" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

                  {/* Slicing Lines */}
                  <div className="absolute top-0 bottom-0 w-px bg-amber-500/80 hover:bg-amber-400 cursor-ew-resize group/slice" style={{ left: '25%' }}>
                    <div className="absolute -top-3 -translate-x-1/2 opacity-0 group-hover/slice:opacity-100 transition-opacity bg-slate-800 text-amber-400 text-[10px] px-1 rounded">2.0s</div>
                  </div>
                  <div className="absolute top-0 bottom-0 w-px bg-amber-500/80 hover:bg-amber-400 cursor-ew-resize group/slice" style={{ left: '62.5%' }}>
                     <div className="absolute -top-3 -translate-x-1/2 opacity-0 group-hover/slice:opacity-100 transition-opacity bg-slate-800 text-amber-400 text-[10px] px-1 rounded">5.0s</div>
                  </div>

                  {/* Playhead */}
                  <div className="absolute top-0 bottom-0 w-[2px] bg-red-500 z-10 pointer-events-none" style={{ left: `${(currentTime / duration) * 100}%` }}></div>
               </div>
            </div>
          </div>

          {/* Bottom: Text Editor Area */}
          <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-slate-50">
            <h3 className="text-sm font-semibold text-slate-800 flex items-center mb-4">
              <FileText className="w-4 h-4 mr-2 text-indigo-600" /> ASR 结果校验
            </h3>
            
            <div className="space-y-6">
              {/* Original */}
              <div>
                <div className="text-xs font-semibold text-slate-500 mb-2">原始结果</div>
                <div className="p-4 bg-white border border-slate-200 rounded-lg text-slate-600 text-sm leading-relaxed shadow-sm">
                   您好请问需要办理什么业务
                </div>
              </div>

              {/* Edit & Diff */}
              <div>
                <div className="flex items-center justify-between mb-2">
                   <div className="text-xs font-semibold text-indigo-600">修改结果 (支持划词标记)</div>
                </div>
                <div className="p-4 bg-white border-2 border-indigo-200 rounded-lg text-slate-900 text-base leading-relaxed shadow-sm min-h-[120px] focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all outline-none" contentEditable suppressContentEditableWarning>
                   您好，<span className="bg-red-100 text-red-800 px-1 py-0.5 rounded border border-red-200 font-medium">【您】</span>需要办理什么业务。
                </div>
                <div className="flex space-x-2 mt-3">
                   <button className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-700 rounded shadow-sm hover:bg-slate-50 transition-colors">标记漏字</button>
                   <button className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-700 rounded shadow-sm hover:bg-slate-50 transition-colors">标记错字</button>
                   <button className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-700 rounded shadow-sm hover:bg-slate-50 transition-colors">标记多字</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Labels & Conclusion Area */}
        <div className="w-[300px] bg-white flex flex-col shrink-0 z-0">
           
           <div className="flex-1 overflow-y-auto flex flex-col">
             {/* Tags Config */}
             <div className="p-5 border-b border-slate-100">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-sm font-semibold text-slate-900">错误标签</h3>
                 <button className="text-indigo-600 hover:text-indigo-700 text-xs font-medium flex items-center"><Plus className="w-3 h-3 mr-1" />新增</button>
               </div>
               
               <div className="grid grid-cols-2 gap-2">
                 <label className="flex items-center p-2.5 border border-red-200 bg-red-50 rounded cursor-pointer transition-colors hover:bg-red-100">
                   <input type="checkbox" defaultChecked className="w-3.5 h-3.5 text-red-600 rounded border-red-300 focus:ring-red-500" />
                   <span className="ml-2 text-xs font-medium text-red-900">漏字</span>
                 </label>
                 <label className="flex items-center p-2.5 border border-slate-200 rounded cursor-pointer transition-colors hover:bg-slate-50">
                   <input type="checkbox" className="w-3.5 h-3.5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                   <span className="ml-2 text-xs text-slate-700">错字</span>
                 </label>
                 <label className="flex items-center p-2.5 border border-slate-200 rounded cursor-pointer transition-colors hover:bg-slate-50">
                   <input type="checkbox" className="w-3.5 h-3.5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                   <span className="ml-2 text-xs text-slate-700">多字</span>
                 </label>
                 <label className="flex items-center p-2.5 border border-slate-200 rounded cursor-pointer transition-colors hover:bg-slate-50">
                   <input type="checkbox" className="w-3.5 h-3.5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                   <span className="ml-2 text-xs text-slate-700">时间戳错误</span>
                 </label>
                 <label className="flex items-center p-2.5 border border-slate-200 rounded cursor-pointer transition-colors hover:bg-slate-50">
                   <input type="checkbox" className="w-3.5 h-3.5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                   <span className="ml-2 text-xs text-slate-700">情感错误</span>
                 </label>
                 <label className="flex items-center p-2.5 border border-slate-200 rounded cursor-pointer transition-colors hover:bg-slate-50">
                   <input type="checkbox" className="w-3.5 h-3.5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                   <span className="ml-2 text-xs text-slate-700">副语言错误</span>
                 </label>
               </div>
             </div>

             {/* Conclusion */}
             <div className="p-5 flex-1 flex flex-col">
               <h3 className="text-sm font-semibold text-slate-900 mb-4">当前数据结论</h3>
               <div className="bg-slate-50 rounded-lg p-3 mb-4 border border-slate-100">
                  <div className="text-xs text-slate-500 mb-1">当前音频</div>
                  <div className="font-mono text-sm font-medium text-slate-800 mb-3">audio_003.wav</div>
                  <div className="text-xs text-slate-500 mb-2">已选标签</div>
                  <div className="flex flex-wrap gap-2">
                     <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-700">漏字</span>
                  </div>
               </div>
               
               <div className="space-y-3 mt-auto">
                 <button className="w-full py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-bold hover:bg-emerald-100 transition-colors flex justify-center items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2" /> 标记为通过
                 </button>
                 <button className="w-full py-2.5 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors flex justify-center items-center shadow-sm">
                    <X className="w-4 h-4 mr-2" /> 标记为有错误
                 </button>
               </div>
             </div>

             {/* Knowledge Base */}
             <div className="p-5 bg-indigo-50/50 border-t border-indigo-100 shrink-0">
               <label className="flex items-start cursor-pointer group">
                 <input type="checkbox" className="mt-0.5 w-4 h-4 text-indigo-600 rounded border-indigo-300 focus:ring-indigo-500" />
                 <div className="ml-2 text-xs">
                   <p className="font-semibold text-indigo-900 mb-1 group-hover:text-indigo-700 transition-colors">加入错误案例库</p>
                   <p className="text-slate-500 leading-relaxed">人工标记的错误数据将记录到知识库中，用于后续模型迭代。</p>
                 </div>
               </label>
             </div>
           </div>
        </div>

      </div>

      {/* Bottom Toolbar */}
      <div className="h-16 bg-white border-t border-slate-200 flex items-center justify-between px-6 shrink-0 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)] z-20 relative">
        <div className="flex items-center space-x-3 text-slate-500 text-sm">
           <button className="px-4 py-2 border border-slate-200 rounded hover:bg-slate-50 font-medium transition-colors">上一条</button>
           <button className="px-4 py-2 border border-slate-200 rounded hover:bg-slate-50 font-medium transition-colors">下一条</button>
        </div>
        <div className="flex items-center space-x-3">
           <button className="px-6 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">退出</button>
           <button className="px-6 py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded hover:bg-slate-50 transition-colors">下载</button>
           <button className="px-6 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded hover:bg-indigo-100 transition-colors">保存当前</button>
           <button className="px-8 py-2 text-sm font-bold text-white bg-indigo-600 rounded shadow-md hover:bg-indigo-700 transition-colors">全部提交</button>
        </div>
      </div>

    </div>
  )
}
