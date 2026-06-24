import React, { useState } from 'react';
import { 
  Bot, Wrench, Play, Save, ChevronDown, Plus, Settings2, MoreHorizontal, 
  Search, ArrowLeft, CheckCircle2, ShieldAlert, FileText, LayoutTemplate,
  History, Eye, PlayCircle, Database, Search as SearchIcon, Copy, Trash2, Edit
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function WorkflowCenter() {
  const [currentView, setCurrentView] = useState<'list' | 'studio' | 'test' | 'versions'>('list');
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null);

  const mockWorkflows = [
    { id: '1', name: '标准标注流程', version: 'V1.2', nodes: 5, author: 'admin', updatedAt: '2026-06-24', status: 'published' },
    { id: '2', name: '情感标注流程', version: 'V2.0', nodes: 3, author: 'admin', updatedAt: '2026-06-23', status: 'draft' },
    { id: '3', name: 'ASR检查流程', version: 'V1.0', nodes: 4, author: 'admin', updatedAt: '2026-06-22', status: 'published' },
    { id: '4', name: '数据脱敏流程', version: 'V1.5', nodes: 6, author: 'test_user', updatedAt: '2026-06-21', status: 'published' },
  ];

  if (currentView === 'studio') {
    return <WorkflowStudio onBack={() => setCurrentView('list')} workflow={selectedWorkflow} />;
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 -mx-8 -my-6 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Workflow Studio</h1>
          <p className="text-sm text-slate-500 mt-1">编排数据集、Agent与工具，构建自动化数据处理流水线。</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 shadow-sm">
            <LayoutTemplate className="w-4 h-4 mr-2" />
            模板中心
          </button>
          <button 
            onClick={() => {
              setSelectedWorkflow({ name: '新建工作流', version: 'V1.0' });
              setCurrentView('studio');
            }}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            新建工作流
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col flex-1">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="relative w-64">
            <input 
              type="text" 
              placeholder="搜索工作流..." 
              className="w-full pl-9 pr-3 py-1.5 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <SearchIcon className="absolute left-3 top-2 w-4 h-4 text-slate-400" />
          </div>
          <div className="flex space-x-2">
             <button className="text-sm text-slate-500 hover:text-slate-900 font-medium px-3 py-1.5 bg-white border border-slate-200 rounded-md shadow-sm">全部</button>
             <button className="text-sm text-slate-500 hover:text-slate-900 font-medium px-3 py-1.5 bg-white border border-slate-200 rounded-md shadow-sm">已发布</button>
             <button className="text-sm text-slate-500 hover:text-slate-900 font-medium px-3 py-1.5 bg-white border border-slate-200 rounded-md shadow-sm">草稿</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6 overflow-y-auto">
          {mockWorkflows.map(wf => (
            <div key={wf.id} className="border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all bg-white relative group cursor-pointer" onClick={() => {
              setSelectedWorkflow(wf);
              setCurrentView('studio');
            }}>
               <div className="flex justify-between items-start mb-3">
                 <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
                   <LayoutTemplate className="w-5 h-5" />
                 </div>
                 <span className={cn(
                   "px-2 py-0.5 text-[10px] font-medium rounded border",
                   wf.status === 'published' ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-amber-50 text-amber-600 border-amber-200"
                 )}>
                   {wf.status === 'published' ? '已发布' : '草稿'}
                 </span>
               </div>
               
               <h3 className="font-semibold text-slate-900 text-base mb-1 truncate">{wf.name}</h3>
               <p className="text-xs text-slate-500 mb-4">版本: {wf.version}</p>
               
               <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                 <div className="bg-slate-50 p-2 rounded border border-slate-100">
                   <span className="block text-slate-400 mb-0.5">节点数</span>
                   <span className="font-medium text-slate-700">{wf.nodes}</span>
                 </div>
                 <div className="bg-slate-50 p-2 rounded border border-slate-100">
                   <span className="block text-slate-400 mb-0.5">创建人</span>
                   <span className="font-medium text-slate-700">{wf.author}</span>
                 </div>
               </div>

               <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-100">
                 <span>更新于 {wf.updatedAt}</span>
                 <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="p-1 hover:bg-slate-100 rounded text-slate-500"><Copy className="w-3.5 h-3.5" /></button>
                   <button className="p-1 hover:bg-slate-100 rounded text-slate-500"><Edit className="w-3.5 h-3.5" /></button>
                   <button className="p-1 hover:bg-red-50 rounded text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkflowStudio({ onBack, workflow }: { onBack: () => void, workflow: any }) {
  const [activeTab, setActiveTab] = useState<'canvas' | 'test' | 'history'>('canvas');

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] -mx-8 -my-6 bg-slate-50 relative overflow-hidden">
      {/* Header */}
      <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 z-10">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-3 p-1.5 text-slate-400 hover:bg-slate-100 rounded-md transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
             <h1 className="text-lg font-semibold text-slate-900">{workflow?.name || '未命名工作流'}</h1>
             <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
               {workflow?.version || 'V1.0'}
             </span>
             {workflow?.status === 'published' && (
               <span className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-200">
                 已发布
               </span>
             )}
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
           {/* Center Tabs */}
           <div className="flex space-x-1 bg-slate-100/80 p-1 rounded-lg">
             <TabButton active={activeTab==='canvas'} onClick={()=>setActiveTab('canvas')} icon={LayoutTemplate}>流程画布</TabButton>
             <TabButton active={activeTab==='test'} onClick={()=>setActiveTab('test')} icon={PlayCircle}>测试台</TabButton>
             <TabButton active={activeTab==='history'} onClick={()=>setActiveTab('history')} icon={History}>版本记录</TabButton>
           </div>
           
           <div className="w-px h-6 bg-slate-200"></div>

           <div className="flex items-center space-x-2">
             <button className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center bg-white border border-slate-200 rounded-md shadow-sm">
               <Save className="w-4 h-4 mr-2 text-slate-400" /> 保存
             </button>
             <button className="px-4 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 flex items-center shadow-sm">
               发布
             </button>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {activeTab === 'canvas' && <CanvasView />}
        {activeTab === 'test' && <TestView />}
        {activeTab === 'history' && <HistoryView />}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, children }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
        active 
          ? "bg-white text-indigo-600 shadow-sm" 
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
      )}
    >
      <Icon className="w-4 h-4 mr-1.5" />
      {children}
    </button>
  )
}

function CanvasView() {
  return (
    <div className="flex h-full w-full">
      {/* Left Sidebar - Components */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 z-10 shadow-sm">
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <input 
              type="text" 
              placeholder="搜索节点组件..." 
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <SearchIcon className="absolute left-2.5 top-2 w-4 h-4 text-slate-400" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2 flex items-center">
               <Database className="w-3.5 h-3.5 mr-1.5" /> 数据输入
            </h3>
            <div className="space-y-1">
              <ComponentItem icon={Database} name="语音数据集" color="text-emerald-600" bg="bg-emerald-50" border="border-emerald-100" />
              <ComponentItem icon={FileText} name="文本数据集" color="text-emerald-600" bg="bg-emerald-50" border="border-emerald-100" />
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2 flex items-center">
               <Bot className="w-3.5 h-3.5 mr-1.5" /> Agent 节点
            </h3>
            <div className="space-y-1">
              <ComponentItem icon={Bot} name="ASR Agent" color="text-blue-600" bg="bg-blue-50" border="border-blue-100" />
              <ComponentItem icon={Bot} name="情感标注 Agent" color="text-blue-600" bg="bg-blue-50" border="border-blue-100" />
              <ComponentItem icon={Bot} name="拼音 Agent" color="text-blue-600" bg="bg-blue-50" border="border-blue-100" />
              <ComponentItem icon={Bot} name="副语言 Agent" color="text-blue-600" bg="bg-blue-50" border="border-blue-100" />
              <ComponentItem icon={Bot} name="质检 Agent" color="text-blue-600" bg="bg-blue-50" border="border-blue-100" />
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2 flex items-center">
               <Wrench className="w-3.5 h-3.5 mr-1.5" /> 工具节点
            </h3>
            <div className="space-y-1">
              <ComponentItem icon={Wrench} name="数据脱敏工具" color="text-slate-600" bg="bg-slate-100" border="border-slate-200" />
              <ComponentItem icon={Wrench} name="音频加噪工具" color="text-slate-600" bg="bg-slate-100" border="border-slate-200" />
              <ComponentItem icon={Wrench} name="入库通知工具" color="text-slate-600" bg="bg-slate-100" border="border-slate-200" />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2 flex items-center">
               <Eye className="w-3.5 h-3.5 mr-1.5" /> 人工与输出
            </h3>
            <div className="space-y-1">
              <ComponentItem icon={Eye} name="人工质检" color="text-amber-600" bg="bg-amber-50" border="border-amber-100" />
              <ComponentItem icon={Save} name="结果输出" color="text-indigo-600" bg="bg-indigo-50" border="border-indigo-100" />
            </div>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 bg-[#f8fafc] relative overflow-hidden bg-grid-slate-200 flex items-center justify-center cursor-move" 
           style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        
        {/* Mock Canvas Graph */}
        <div className="relative flex flex-col items-center">
          <Node title="客服语音数据集" icon={Database} type="start" desc="输入源" />
          <Arrow />
          
          <Node title="ASR Agent" icon={Bot} type="agent" desc="语音转写" />
          <Arrow />
          
          <div className="flex mt-8 mb-8 relative">
            <div className="absolute top-[-32px] left-[50%] w-[160px] h-[32px] border-l-2 border-t-2 border-slate-300 rounded-tl-lg" style={{ marginLeft: '1px' }}></div>
            <div className="absolute top-[-32px] right-[50%] w-[160px] h-[32px] border-r-2 border-t-2 border-slate-300 rounded-tr-lg" style={{ marginRight: '1px' }}></div>
            
            <div className="mx-8 relative">
               <div className="absolute top-[-32px] left-[50%] w-0.5 h-[32px] bg-slate-300"></div>
               <div className="absolute top-[-8px] left-[50%] ml-[-4px] w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-400"></div>
               <Node title="情感 Agent" icon={Bot} type="agent" desc="7分类情感识别" />
            </div>
            <div className="mx-8 relative">
               <div className="absolute top-[-32px] left-[50%] w-0.5 h-[32px] bg-slate-300"></div>
               <div className="absolute top-[-8px] left-[50%] ml-[-4px] w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-400"></div>
               <Node title="副语言 Agent" icon={Bot} type="agent" desc="笑声/叹气检测" />
            </div>
          </div>
          
          <div className="relative h-[32px] w-[320px]">
             <div className="absolute bottom-0 left-[0%] w-[160px] h-[32px] border-l-2 border-b-2 border-slate-300 rounded-bl-lg" style={{ marginLeft: '1px' }}></div>
             <div className="absolute bottom-0 right-[0%] w-[160px] h-[32px] border-r-2 border-b-2 border-slate-300 rounded-br-lg" style={{ marginRight: '1px' }}></div>
             <div className="absolute bottom-[-16px] left-[50%] w-0.5 h-[16px] bg-slate-300"></div>
          </div>
          <Arrow short />
          
          <Node title="检查 Agent" icon={Bot} type="agent" desc="逻辑校验与合并" />
          <Arrow />
          
          <Node title="结果输出" icon={Save} type="end" desc="输出为JSON" />
        </div>

        {/* Validation Error mock */}
        <div className="absolute top-6 right-6 bg-white border border-red-200 shadow-md rounded-lg p-3 flex items-start w-64">
           <ShieldAlert className="w-5 h-5 text-red-500 mr-2 shrink-0 mt-0.5" />
           <div>
             <h4 className="text-sm font-semibold text-slate-900">流程校验提示</h4>
             <p className="text-xs text-slate-600 mt-1">存在孤立节点：<span className="font-medium text-slate-800">脱敏工具</span> 未连接到主流程。</p>
           </div>
        </div>

        {/* Zoom controls */}
        <div className="absolute bottom-6 left-6 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center p-1">
          <button className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-50 rounded font-medium">-</button>
          <span className="text-xs font-medium px-3 text-slate-600 border-x border-slate-100">100%</span>
          <button className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-50 rounded font-medium">+</button>
        </div>
      </div>

      {/* Right Sidebar - Node Config */}
      <div className="w-80 bg-white border-l border-slate-200 flex flex-col shrink-0 z-10 shadow-sm relative">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h2 className="text-sm font-semibold text-slate-900">节点配置</h2>
          <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-4 h-4" /></button>
        </div>
        <div className="p-5 space-y-6 overflow-y-auto">
          <div>
            <div className="flex items-center mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 mr-3 shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">ASR Agent</h3>
                <p className="text-xs text-slate-500 mt-0.5">ID: node_asr_01</p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">节点名称</label>
              <input type="text" defaultValue="ASR Agent" className="w-full text-sm px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">引用的 Agent 资产</label>
              <select className="w-full text-sm px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white">
                <option>基础 ASR Agent V1.2</option>
                <option>通用 ASR Agent V2.0</option>
              </select>
            </div>
            
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-semibold text-slate-700 mb-2">输入参数映射 (Input)</label>
              <div className="bg-slate-50 border border-slate-200 rounded-md p-3 space-y-3">
                <div className="flex flex-col space-y-1.5">
                  <span className="text-slate-700 font-mono text-xs">audio_file</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400 text-xs">←</span>
                    <select className="flex-1 text-xs px-2 py-1.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white">
                      <option>数据集输入.audio</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">高级设置</label>
              <button className="w-full flex items-center justify-between text-sm px-3 py-2 border border-slate-200 rounded-md hover:bg-slate-50 text-slate-600 transition-colors">
                <span className="flex items-center"><Settings2 className="w-4 h-4 mr-2"/> 展开配置</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ComponentItem({ icon: Icon, name, color, bg, border }: any) {
  return (
    <div className="flex items-center p-2 rounded-lg hover:bg-slate-50 cursor-grab border border-transparent hover:border-slate-200 transition-colors group">
      <div className={`w-7 h-7 rounded-md ${bg} ${color} ${border} border flex items-center justify-center mr-3 group-hover:scale-105 transition-transform`}>
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-sm font-medium text-slate-700">{name}</span>
    </div>
  );
}

function Node({ title, icon: Icon, type, desc }: any) {
  const isAgent = type === 'agent';
  const isStart = type === 'start';
  const isEnd = type === 'end';
  const isTool = type === 'tool';
  const isHuman = type === 'human';

  const config = {
    start: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', outline: 'border-emerald-500' },
    end: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', outline: 'border-indigo-500' },
    agent: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', outline: 'border-blue-500' },
    tool: { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200', outline: 'border-slate-500' },
    human: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', outline: 'border-amber-500' }
  }[type as 'start' | 'end' | 'agent' | 'tool' | 'human'];
  
  return (
    <div className={cn(
      "w-52 bg-white border rounded-xl p-3 z-10 relative group transition-all cursor-pointer shadow-sm hover:shadow-md",
      isStart || isEnd ? "border-dashed" : "border-solid",
      `hover:${config?.outline}`
    )}>
      <div className="flex items-start">
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mr-3 mt-0.5 border shrink-0", config?.bg, config?.text, config?.border)}>
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
          {desc && <p className="text-xs text-slate-500 mt-0.5 leading-tight">{desc}</p>}
        </div>
      </div>
      
      {(!isStart && !isEnd) && (
         <>
           <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-slate-300 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center shadow-sm cursor-crosshair">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
           </div>
           <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-slate-300 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center shadow-sm cursor-crosshair">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
           </div>
         </>
      )}
    </div>
  );
}

function Arrow({ short }: { short?: boolean }) {
  return (
    <div className={`flex flex-col items-center ${short ? 'h-8' : 'h-12'}`}>
      <div className="w-0.5 h-full bg-slate-300"></div>
      <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-400 -mt-1.5"></div>
    </div>
  );
}

function TestView() {
  return (
    <div className="flex h-full p-6 space-x-6">
       <div className="w-1/3 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
         <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
           <h3 className="font-semibold text-slate-900">测试配置</h3>
           <button className="px-4 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 flex items-center shadow-sm">
             <Play className="w-3.5 h-3.5 mr-1.5" /> 运行流程
           </button>
         </div>
         <div className="p-5 flex-1 overflow-y-auto space-y-5">
           <div>
             <label className="block text-sm font-medium text-slate-700 mb-2">选择测试数据集</label>
             <select className="w-full text-sm px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
               <option>sample_audio_001.wav</option>
               <option>sample_audio_002.wav</option>
             </select>
           </div>
           <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
             <div className="flex items-center text-sm text-slate-600 mb-2">
               <FileText className="w-4 h-4 mr-2" /> audio_meta.json
             </div>
             <pre className="text-xs font-mono text-slate-500 overflow-x-auto">
{`{
  "id": "audio_001",
  "duration": 12.5,
  "format": "wav"
}`}
             </pre>
           </div>
         </div>
       </div>

       <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
         <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
           <h3 className="font-semibold text-slate-900">执行轨迹与结果</h3>
           <div className="flex items-center space-x-2 text-sm text-slate-500">
             <span>耗时: 1.2s</span>
             <span>|</span>
             <span className="text-emerald-600 font-medium">执行成功</span>
           </div>
         </div>
         <div className="flex-1 overflow-auto bg-slate-50/50 flex">
           {/* Trace */}
           <div className="w-64 border-r border-slate-100 bg-white p-5 overflow-y-auto">
             <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
               
               <TraceNode title="数据集输入" status="success" time="10ms" />
               <TraceNode title="ASR Agent" status="success" time="850ms" />
               <TraceNode title="情感 Agent" status="success" time="320ms" />
               <TraceNode title="检查 Agent" status="success" time="15ms" />
               <TraceNode title="结果输出" status="success" time="5ms" isLast />

             </div>
           </div>
           
           {/* Result detail */}
           <div className="flex-1 p-6 flex flex-col">
             <h4 className="text-sm font-semibold text-slate-900 mb-4">最终输出 JSON</h4>
             <div className="flex-1 bg-[#1e1e1e] rounded-lg border border-slate-800 p-4 overflow-auto font-mono text-sm leading-relaxed text-slate-300">
               <div className="text-[#9cdcfe]">"text"<span className="text-slate-400">:</span> <span className="text-[#ce9178]">"好的，您的账户余额还有五百元。"</span>,</div>
               <div className="text-[#9cdcfe]">"emotion"<span className="text-slate-400">:</span> <span className="text-[#ce9178]">"neutral"</span>,</div>
               <div className="text-[#9cdcfe]">"confidence"<span className="text-slate-400">:</span> <span className="text-[#b5cea8]">0.98</span>,</div>
               <div className="text-[#9cdcfe]">"check_status"<span className="text-slate-400">:</span> <span className="text-[#ce9178]">"passed"</span></div>
             </div>
           </div>
         </div>
       </div>
    </div>
  )
}

function TraceNode({ title, status, time, isLast }: any) {
  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-6">
      <div className={cn(
        "flex items-center justify-center w-6 h-6 rounded-full border-2 bg-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10",
        status === 'success' ? "border-emerald-500 text-emerald-500" : "border-slate-300 text-slate-300"
      )}>
        <CheckCircle2 className="w-3.5 h-3.5" />
      </div>
      <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] bg-white p-3 rounded border border-slate-100 shadow-sm ml-4 md:ml-0 flex flex-col">
         <span className="text-xs font-semibold text-slate-900">{title}</span>
         <span className="text-[10px] text-slate-500 font-mono mt-0.5">{time}</span>
      </div>
    </div>
  )
}

function HistoryView() {
  const history = [
    { version: 'V1.2', date: '2026-06-24 10:20', desc: '增加副语言 Agent 节点，支持笑声检测', active: true, author: 'admin' },
    { version: 'V1.1', date: '2026-06-20 14:15', desc: '修改并行执行逻辑，提升效率', active: false, author: 'admin' },
    { version: 'V1.0', date: '2026-06-15 09:30', desc: '初始版本：ASR -> 情感 -> 检查', active: false, author: 'admin' },
  ];
  return (
    <div className="flex w-full h-full p-6 space-x-6">
      <div className="w-96 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col shrink-0 h-full overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">版本历史</h3>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">对比版本</button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {history.map((h, i) => (
            <div 
              key={i} 
              className={cn(
                "p-4 border-b border-slate-100 cursor-pointer transition-colors relative",
                h.active ? "bg-indigo-50/50" : "hover:bg-slate-50"
              )}
            >
              {h.active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600"></div>}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="font-semibold text-slate-900 mr-2">{h.version}</span>
                  {h.active && <span className="px-1.5 py-0.5 text-[10px] font-medium bg-emerald-100 text-emerald-700 rounded border border-emerald-200">当前生效</span>}
                </div>
                <span className="text-xs text-slate-500">{h.date}</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">{h.desc}</p>
              <div className="flex items-center justify-between">
                 <span className="text-xs text-slate-400">更新人: {h.author}</span>
                 {!h.active && <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700">回滚至此版本</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
         <LayoutTemplate className="w-12 h-12 mb-4 text-slate-300" />
         <p>选择历史版本查看画布快照</p>
      </div>
    </div>
  )
}

