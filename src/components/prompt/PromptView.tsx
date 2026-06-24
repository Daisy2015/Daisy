import React, { useState } from 'react';
import { 
  MessageSquare, Search, Plus, Filter, MoreVertical, ArrowLeft, 
  PlayCircle, History, Bot, GitMerge, Check, Code, Play, BarChart2, Save, Send, GitCommit, Settings2, X
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function PromptView() {
  const [selectedPrompt, setSelectedPrompt] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const mockPrompts = [
    { 
      id: '1', 
      name: 'ASR标注Prompt', 
      version: 'v1.3', 
      agentCount: 5,
      updatedAt: '2026-06-24',
      creator: 'admin'
    },
    { 
      id: '2', 
      name: '情感分析Prompt', 
      version: 'v3.1', 
      agentCount: 2,
      updatedAt: '2026-06-22',
      creator: 'admin'
    },
    { 
      id: '3', 
      name: '副语言标注Prompt', 
      version: 'v2.0', 
      agentCount: 1,
      updatedAt: '2026-06-20',
      creator: 'system'
    },
  ];

  return (
    <div className="flex flex-col h-full relative">
      {selectedPrompt ? (
        <PromptDetails prompt={selectedPrompt} onBack={() => setSelectedPrompt(null)} />
      ) : (
        <>
          {/* Toolbar */}
          <div className="h-16 border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
            <h2 className="text-lg font-semibold text-slate-900">Prompt 资源中心</h2>
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 w-64">
                <Search className="w-4 h-4 text-slate-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="搜索Prompt..."
                  className="bg-transparent border-none outline-none text-sm w-full placeholder-slate-400"
                />
              </div>
              <button className="flex items-center px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 shadow-sm">
                <Filter className="w-4 h-4 mr-2" />
                筛选
              </button>
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 shadow-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                新建 Prompt
              </button>
            </div>
          </div>

          {/* List View */}
          <div className="flex-1 overflow-auto p-6 bg-slate-50/50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mockPrompts.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedPrompt(item)}
                  className="group border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer bg-white relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); }} 
                      className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-50 transition-colors"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <h3 className="font-semibold text-slate-900 text-lg mb-1 truncate">{item.name}</h3>
                  
                  <div className="flex items-center text-sm font-medium text-slate-500 mb-4 space-x-4">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">{item.version}</span>
                    <span className="flex items-center"><Bot className="w-4 h-4 mr-1" /> {item.agentCount} 个关联 Agent</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs pt-4 border-t border-slate-100 mt-2">
                    <div className="text-slate-400">
                      更新于 {item.updatedAt}
                    </div>
                    <span className="text-slate-400">
                      创建人: {item.creator}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <NewPromptDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
}

function PromptDetails({ prompt, onBack }: { prompt: any, onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('editor');

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center">
           <button onClick={onBack} className="mr-4 p-1.5 text-slate-400 hover:bg-slate-100 rounded-md transition-colors">
             <ArrowLeft className="w-5 h-5" />
           </button>
           <h2 className="text-xl font-semibold text-slate-900">{prompt.name}</h2>
           <span className="ml-3 px-2 py-0.5 text-xs font-medium border border-slate-200 bg-slate-100 text-slate-700 rounded">
             {prompt.version}
           </span>
        </div>
        <div className="flex space-x-3">
          <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 flex items-center shadow-sm">
            <Check className="w-4 h-4 mr-2" /> 发布新版本
          </button>
        </div>
      </div>
      
      <div className="bg-white border-b border-slate-200 px-6 shrink-0">
        <div className="flex space-x-6">
          <TabButton active={activeTab==='editor'} onClick={()=>setActiveTab('editor')} icon={Code}>编辑器</TabButton>
          <TabButton active={activeTab==='test'} onClick={()=>setActiveTab('test')} icon={Play}>测试台</TabButton>
          <TabButton active={activeTab==='history'} onClick={()=>setActiveTab('history')} icon={History}>历史版本</TabButton>
          <TabButton active={activeTab==='agents'} onClick={()=>setActiveTab('agents')} icon={Bot}>关联Agent</TabButton>
          <TabButton active={activeTab==='analytics'} onClick={()=>setActiveTab('analytics')} icon={BarChart2}>效果分析</TabButton>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden p-6 flex">
         {activeTab === 'editor' && <PromptEditor />}
         {activeTab === 'test' && <PromptTest />}
         {activeTab === 'history' && <PromptHistory />}
         {activeTab === 'agents' && <PromptAgents />}
         {activeTab === 'analytics' && <PromptAnalytics />}
      </div>
    </div>
  )
}

function TabButton({ active, onClick, icon: Icon, children }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "py-3 text-sm font-medium border-b-2 transition-colors flex items-center",
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

function PromptEditor() {
  return (
    <div className="flex flex-col w-full h-full bg-[#1e1e1e] rounded-xl border border-slate-800 shadow-sm overflow-hidden font-mono text-sm">
      <div className="bg-[#2d2d2d] px-4 py-2 border-b border-[#404040] flex items-center justify-between">
        <span className="text-[#cccccc]">prompt.txt</span>
        <div className="flex space-x-2">
           <button className="flex items-center text-xs text-[#cccccc] hover:text-white px-2 py-1 rounded bg-[#404040] transition-colors"><Save className="w-3.5 h-3.5 mr-1" /> 保存草稿</button>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto text-[#d4d4d4] leading-relaxed relative">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#1e1e1e] border-r border-[#404040] flex flex-col items-center pt-4 text-[#858585] text-xs select-none">
          {Array.from({length: 15}).map((_, i) => <div key={i} className="mb-1">{i + 1}</div>)}
        </div>
        <div className="pl-10 outline-none" contentEditable suppressContentEditableWarning>
          <div>你是一名专业ASR标注专家。</div>
          <br/>
          <div>请根据输入音频生成标准文本。</div>
          <br/>
          <div>输出要求：</div>
          <div>1. 保留口语化表达</div>
          <div>2. 去除无意义停顿</div>
          <br/>
          <div>音频文本输入: <span className="text-[#569cd6]">{"{{"}audio_text{"}}"}</span></div>
          <div>参考知识库: <span className="text-[#569cd6]">{"{{"}knowledge{"}}"}</span></div>
          <div>历史对话: <span className="text-[#569cd6]">{"{{"}history{"}}"}</span></div>
        </div>
      </div>
    </div>
  )
}

function PromptTest() {
  return (
    <div className="flex w-full h-full space-x-4">
      {/* Settings Panel */}
      <div className="w-64 bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col space-y-4 shrink-0">
        <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2 mb-2 flex items-center"><Settings2 className="w-4 h-4 mr-2" /> 运行配置</h3>
        
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">模型 (Model)</label>
          <select className="w-full text-sm px-2 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50">
            <option>Gemini 1.5 Pro</option>
            <option>Gemini 1.5 Flash</option>
            <option>GPT-4o</option>
          </select>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-medium text-slate-700">Temperature</label>
            <span className="text-xs text-slate-500">0.2</span>
          </div>
          <input type="range" min="0" max="1" step="0.1" defaultValue="0.2" className="w-full" />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-medium text-slate-700">Top P</label>
            <span className="text-xs text-slate-500">0.8</span>
          </div>
          <input type="range" min="0" max="1" step="0.1" defaultValue="0.8" className="w-full" />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">知识库 (Knowledge)</label>
          <select className="w-full text-sm px-2 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50">
            <option>ASR规范库 V2</option>
            <option>无</option>
          </select>
        </div>
      </div>

      {/* Main Testing Area */}
      <div className="flex-1 flex space-x-4">
        {/* Input Variables */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
             <span className="text-sm font-semibold text-slate-900">变量输入区</span>
             <button className="text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded text-xs font-medium flex items-center transition-colors">
               <Play className="w-3.5 h-3.5 mr-1" /> 运行测试
             </button>
          </div>
          <div className="p-4 flex-1 space-y-4 overflow-y-auto">
            <div>
              <label className="block text-xs font-mono text-indigo-600 mb-1.5 bg-indigo-50 px-2 py-0.5 rounded w-max">{"{{"}audio_text{"}}"}</label>
              <textarea className="w-full h-24 p-3 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none bg-slate-50" defaultValue="今天那个...呃...天气真不错啊。"></textarea>
            </div>
            <div>
              <label className="block text-xs font-mono text-indigo-600 mb-1.5 bg-indigo-50 px-2 py-0.5 rounded w-max">{"{{"}history{"}}"}</label>
              <textarea className="w-full h-24 p-3 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none bg-slate-50" defaultValue="无"></textarea>
            </div>
          </div>
        </div>
        
        {/* Output */}
        <div className="flex-1 bg-slate-900 rounded-xl border border-slate-800 shadow-sm flex flex-col text-slate-300">
          <div className="px-4 py-3 border-b border-slate-800 bg-[#1e1e1e] flex items-center justify-between">
             <span className="text-sm font-semibold text-slate-200">模型输出结果</span>
             <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded font-mono border border-emerald-400/20">842ms</span>
          </div>
          <div className="p-4 flex-1 overflow-y-auto font-mono text-sm leading-relaxed text-slate-100">
            今天天气真不错啊。
          </div>
        </div>
      </div>
    </div>
  )
}

function PromptHistory() {
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const history = [
    { version: 'V1.2', desc: '优化口语化处理', date: '2026-06-20', user: 'admin', active: true },
    { version: 'V1.1', desc: '增加数字规范', date: '2026-06-10', user: 'admin', active: false },
    { version: 'V1.0', desc: '初始版本', date: '2026-05-20', user: 'system', active: false },
  ];
  return (
    <div className="flex w-full h-full space-x-6">
      <div className="w-80 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col shrink-0 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <h3 className="font-semibold text-slate-900">历史版本</h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          {history.map((h, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedVersion(h.version)}
              className={cn(
                "p-4 border-b border-slate-100 cursor-pointer transition-colors relative",
                selectedVersion === h.version ? "bg-indigo-50" : "hover:bg-slate-50"
              )}
            >
              {selectedVersion === h.version && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600"></div>}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <span className="font-semibold text-slate-900 mr-2">{h.version}</span>
                  {h.active && <span className="px-1.5 py-0.5 text-[10px] font-medium bg-emerald-100 text-emerald-700 rounded border border-emerald-200">当前</span>}
                </div>
                <span className="text-xs text-slate-500">{h.date}</span>
              </div>
              <p className="text-sm text-slate-600 mb-2">{h.desc}</p>
              <div className="flex items-center space-x-2">
                 <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700">Diff比较</button>
                 <span className="text-slate-300">|</span>
                 <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700">回滚至此版</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 bg-[#1e1e1e] rounded-xl border border-slate-800 shadow-sm flex flex-col overflow-hidden font-mono text-sm text-slate-300">
         <div className="bg-[#2d2d2d] px-4 py-3 border-b border-[#404040] flex items-center justify-between">
           <div className="flex items-center space-x-4">
             <span className="text-slate-400 font-semibold bg-slate-800 px-2 py-1 rounded">V1.1</span>
             <GitCommit className="w-4 h-4 text-slate-500" />
             <span className="text-emerald-400 font-semibold bg-emerald-900/30 px-2 py-1 rounded border border-emerald-900/50">V1.2</span>
           </div>
           <span className="text-xs text-slate-500">Diff 比较视图</span>
         </div>
         <div className="flex-1 flex overflow-hidden">
            {/* Left Panel */}
            <div className="flex-1 border-r border-[#404040] p-4 overflow-y-auto">
               <div className="text-slate-400">你是一名专业ASR标注专家。</div>
               <br/>
               <div className="text-slate-400">请根据输入音频生成标准文本。</div>
               <br/>
               <div className="text-slate-400">输出要求：</div>
               <div className="text-slate-400">1. 保留口语化表达</div>
               <div className="bg-red-900/30 text-red-200 line-through py-0.5 px-1 -mx-1">2. 保持原样</div>
            </div>
            {/* Right Panel */}
            <div className="flex-1 p-4 overflow-y-auto bg-[#1e1e1e]">
               <div className="text-slate-400">你是一名专业ASR标注专家。</div>
               <br/>
               <div className="text-slate-400">请根据输入音频生成标准文本。</div>
               <br/>
               <div className="text-slate-400">输出要求：</div>
               <div className="text-slate-400">1. 保留口语化表达</div>
               <div className="bg-emerald-900/30 text-emerald-300 py-0.5 px-1 -mx-1">+ 2. 去除无意义停顿 (例如：嗯、啊、那个)</div>
            </div>
         </div>
      </div>
    </div>
  )
}

function PromptAgents() {
  const agents = [
    { name: 'ASR标注Agent_V1', desc: '用于通用场景标注', workflow: '标准标注流程', status: '运行中' },
    { name: 'ASR检查Agent_V2', desc: '用于二次校验', workflow: '质检流程', status: '待机' },
    { name: '情感分析Agent', desc: '用于通话录音的情感提取', workflow: '标准标注流程', status: '运行中' },
  ];
  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
       <div className="p-4 border-b border-slate-100 bg-slate-50">
         <h3 className="font-semibold text-slate-900">当前关联 Agent</h3>
       </div>
       <div className="flex-1 overflow-auto p-0">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-white border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-medium">Agent 名称</th>
                <th className="px-6 py-3 font-medium">描述</th>
                <th className="px-6 py-3 font-medium">所在工作流</th>
                <th className="px-6 py-3 font-medium">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {agents.map((a, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 flex items-center">
                    <Bot className="w-4 h-4 text-orange-500 mr-2" />
                    {a.name}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{a.desc}</td>
                  <td className="px-6 py-4 text-slate-600">{a.workflow}</td>
                  <td className="px-6 py-4">
                     <span className={cn(
                       "px-2 py-1 rounded text-xs font-medium border",
                       a.status === '运行中' ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-slate-50 text-slate-600 border-slate-200"
                     )}>
                       {a.status}
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

function PromptAnalytics() {
  return (
    <div className="w-full h-full space-y-6 overflow-y-auto pr-2">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
           <p className="text-sm font-medium text-slate-500 mb-1">调用总次数</p>
           <p className="text-2xl font-bold text-slate-900">125,042</p>
         </div>
         <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
           <p className="text-sm font-medium text-slate-500 mb-1">平均耗时</p>
           <p className="text-2xl font-bold text-slate-900">842 ms</p>
         </div>
         <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
           <p className="text-sm font-medium text-slate-500 mb-1">成功率</p>
           <p className="text-2xl font-bold text-emerald-600">98.3%</p>
         </div>
         <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
           <p className="text-sm font-medium text-slate-500 mb-1">人工修正率</p>
           <p className="text-2xl font-bold text-amber-600">2.1%</p>
         </div>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col items-center justify-center h-64 text-slate-400">
         <BarChart2 className="w-12 h-12 mb-4 text-slate-300" />
         <p>图表数据加载中...</p>
      </div>
    </div>
  )
}


function NewPromptDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="absolute inset-0 z-50 flex justify-end overflow-hidden">
       <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
       <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col relative z-10 animate-in slide-in-from-right duration-300">
         <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-white">
           <h2 className="text-lg font-semibold text-slate-900">新建 Prompt</h2>
           <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-md transition-colors">
             <X className="w-5 h-5" />
           </button>
         </div>
         <div className="p-6 flex-1 overflow-y-auto space-y-6 bg-white">
           <div>
             <label className="block text-sm font-medium text-slate-700 mb-1.5">Prompt 名称 <span className="text-red-500">*</span></label>
             <input type="text" placeholder="例如：ASR情感标注规范" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm shadow-sm transition-shadow" />
           </div>
           
           <div>
             <label className="block text-sm font-medium text-slate-700 mb-2">创建方式</label>
             <div className="flex space-x-6">
               <label className="flex items-center space-x-2 cursor-pointer">
                 <input type="radio" name="createMode" defaultChecked className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                 <span className="text-sm text-slate-700">在线创建</span>
               </label>
               <label className="flex items-center space-x-2 cursor-pointer">
                 <input type="radio" name="createMode" className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                 <span className="text-sm text-slate-700">上传文件</span>
               </label>
             </div>
           </div>
           
           <div>
             <label className="block text-sm font-medium text-slate-700 mb-2">Prompt 类型</label>
             <div className="space-y-3">
               <label className="flex items-start p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors bg-white">
                 <input type="radio" name="promptType" defaultChecked className="mt-0.5 w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                 <div className="ml-3">
                   <span className="block text-sm font-medium text-slate-900">标注 Prompt</span>
                   <span className="block text-xs text-slate-500 mt-0.5">用于指导Agent从音频中提取或生成特定信息。</span>
                 </div>
               </label>
               <label className="flex items-start p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors bg-white">
                 <input type="radio" name="promptType" className="mt-0.5 w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                 <div className="ml-3">
                   <span className="block text-sm font-medium text-slate-900">检查 Prompt</span>
                   <span className="block text-xs text-slate-500 mt-0.5">用于指导Agent对已有结果进行质量校验或逻辑判断。</span>
                 </div>
               </label>
               <label className="flex items-start p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors bg-white">
                 <input type="radio" name="promptType" className="mt-0.5 w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                 <div className="ml-3">
                   <span className="block text-sm font-medium text-slate-900">通用 Prompt</span>
                   <span className="block text-xs text-slate-500 mt-0.5">基础对话或其他通用场景任务。</span>
                 </div>
               </label>
             </div>
           </div>
           
         </div>
         <div className="px-6 py-4 border-t border-slate-200 flex justify-end space-x-3 bg-slate-50 shrink-0">
           <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 shadow-sm transition-colors">
             取消
           </button>
           <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 shadow-sm transition-colors">
             创建
           </button>
         </div>
       </div>
    </div>
  )
}
