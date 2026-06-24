import React, { useState } from 'react';
import { 
  Bot, Search, Plus, Filter, MoreVertical, ArrowLeft, 
  Settings, Code, Play, ScrollText, History, GitCommit, 
  BarChart2, CheckCircle2, ShieldAlert, Cpu, BookOpen, 
  Wrench, Database, FileText, Activity, AlertTriangle, PlayCircle
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function AgentView() {
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filterType, setFilterType] = useState('全部');

  const mockAgents = [
    { 
      id: '1', 
      name: 'ASR标注Agent', 
      type: '标注Agent',
      model: 'GPT-4o',
      prompt: 'ASR Prompt V1.3',
      knowledge: 'ASR规范库',
      callCount: 125300,
      system: true
    },
    { 
      id: '2', 
      name: '情感标注Agent', 
      type: '标注Agent',
      model: 'Gemini 1.5 Pro',
      prompt: '情感分析 V2.1',
      knowledge: '情感分类标准',
      callCount: 84200,
      system: true
    },
    { 
      id: '3', 
      name: 'ASR检查Agent', 
      type: '检查Agent',
      model: 'GPT-4o',
      prompt: 'ASR质检 V1.0',
      knowledge: '质检案例库',
      callCount: 45000,
      system: false
    },
    { 
      id: '4', 
      name: '副语言标注Agent', 
      type: '标注Agent',
      model: 'Gemini 1.5 Flash',
      prompt: '副语言提取 V1.1',
      knowledge: '副语言规范',
      callCount: 12000,
      system: false
    },
  ];

  const filteredAgents = mockAgents.filter(a => {
    if (filterType === '全部') return true;
    if (filterType === '系统预置') return a.system;
    if (filterType === '自定义Agent') return !a.system;
    return a.type === filterType;
  });

  return (
    <div className="flex flex-col h-full relative">
      {selectedAgent ? (
        <AgentDetails agent={selectedAgent} onBack={() => setSelectedAgent(null)} />
      ) : (
        <>
          {/* Toolbar */}
          <div className="h-16 border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
            <h2 className="text-lg font-semibold text-slate-900">Agent Hub</h2>
            <div className="flex items-center space-x-3">
              <div className="flex bg-slate-100 p-1 rounded-md">
                 {['全部', '标注Agent', '检查Agent', '系统预置', '自定义Agent'].map(t => (
                   <button 
                     key={t}
                     onClick={() => setFilterType(t)}
                     className={cn(
                       "px-3 py-1 text-xs font-medium rounded-sm transition-colors",
                       filterType === t ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                     )}
                   >
                     {t}
                   </button>
                 ))}
              </div>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 w-64 ml-4">
                <Search className="w-4 h-4 text-slate-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="搜索Agent..."
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
                新建 Agent
              </button>
            </div>
          </div>

          {/* List View */}
          <div className="flex-1 overflow-auto p-6 bg-slate-50/50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredAgents.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedAgent(item)}
                  className="group border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer bg-white relative overflow-hidden flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center border",
                      item.type === '标注Agent' ? "bg-orange-50 text-orange-600 border-orange-100" : "bg-purple-50 text-purple-600 border-purple-100"
                    )}>
                      <Bot className="w-6 h-6" />
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); }} 
                      className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-50 transition-colors"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <h3 className="font-semibold text-slate-900 text-lg mb-1 truncate flex items-center">
                    {item.name}
                    {item.system && <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-slate-100 text-slate-500 rounded border border-slate-200">系统</span>}
                  </h3>
                  
                  <div className="flex items-center text-xs font-medium text-slate-500 mb-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded border mr-2",
                      item.type === '标注Agent' ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-purple-50 text-purple-700 border-purple-200"
                    )}>{item.type}</span>
                  </div>

                  <div className="space-y-2 flex-1 mt-2">
                     <div className="flex items-center justify-between text-xs border-b border-slate-50 pb-1">
                       <span className="text-slate-500 flex items-center"><Cpu className="w-3.5 h-3.5 mr-1.5"/>模型</span>
                       <span className="text-slate-700 font-medium">{item.model}</span>
                     </div>
                     <div className="flex items-center justify-between text-xs border-b border-slate-50 pb-1">
                       <span className="text-slate-500 flex items-center"><FileText className="w-3.5 h-3.5 mr-1.5"/>Prompt</span>
                       <span className="text-slate-700 font-medium truncate max-w-[120px]">{item.prompt}</span>
                     </div>
                     <div className="flex items-center justify-between text-xs pb-1">
                       <span className="text-slate-500 flex items-center"><BookOpen className="w-3.5 h-3.5 mr-1.5"/>知识库</span>
                       <span className="text-slate-700 font-medium truncate max-w-[120px]">{item.knowledge}</span>
                     </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs pt-4 border-t border-slate-100 mt-4">
                    <span className="text-slate-400">
                      调用次数
                    </span>
                    <span className="font-mono font-semibold text-slate-600">
                      {item.callCount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <NewAgentDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
}

function AgentDetails({ agent, onBack }: { agent: any, onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('config');

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center">
           <button onClick={onBack} className="mr-4 p-1.5 text-slate-400 hover:bg-slate-100 rounded-md transition-colors">
             <ArrowLeft className="w-5 h-5" />
           </button>
           <h2 className="text-xl font-semibold text-slate-900">{agent.name}</h2>
           <span className={cn(
              "ml-3 px-2 py-0.5 text-xs font-medium border rounded",
              agent.type === '标注Agent' ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-purple-50 text-purple-700 border-purple-200"
           )}>
             {agent.type}
           </span>
           <span className="ml-2 px-2 py-0.5 text-xs font-medium border border-slate-200 bg-slate-100 text-slate-700 rounded">
             v1.4
           </span>
        </div>
        <div className="flex space-x-3">
          <button className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 shadow-sm">
            保存草稿
          </button>
          <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 flex items-center shadow-sm">
            <CheckCircle2 className="w-4 h-4 mr-2" /> 发布版本
          </button>
        </div>
      </div>
      
      <div className="bg-white border-b border-slate-200 px-6 shrink-0">
        <div className="flex space-x-6 overflow-x-auto">
          <TabButton active={activeTab==='config'} onClick={()=>setActiveTab('config')} icon={Settings}>配置中心</TabButton>
          <TabButton active={activeTab==='schema'} onClick={()=>setActiveTab('schema')} icon={Code}>输出Schema</TabButton>
          <TabButton active={activeTab==='test'} onClick={()=>setActiveTab('test')} icon={Play}>测试台</TabButton>
          <TabButton active={activeTab==='logs'} onClick={()=>setActiveTab('logs')} icon={ScrollText}>运行日志</TabButton>
          <TabButton active={activeTab==='history'} onClick={()=>setActiveTab('history')} icon={History}>版本管理</TabButton>
          <TabButton active={activeTab==='refs'} onClick={()=>setActiveTab('refs')} icon={Database}>引用关系</TabButton>
          <TabButton active={activeTab==='analytics'} onClick={()=>setActiveTab('analytics')} icon={BarChart2}>统计分析</TabButton>
          <TabButton active={activeTab==='eval'} onClick={()=>setActiveTab('eval')} icon={CheckCircle2}>Agent评测</TabButton>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden p-6 flex">
         {activeTab === 'config' && <AgentConfig agent={agent} />}
         {activeTab === 'schema' && <AgentSchema />}
         {activeTab === 'test' && <AgentTest agent={agent} />}
         {activeTab === 'logs' && <AgentLogs agent={agent} />}
         {activeTab === 'history' && <AgentHistory />}
         {activeTab === 'refs' && <AgentRefs />}
         {activeTab === 'analytics' && <AgentAnalytics />}
         {activeTab === 'eval' && <AgentEval />}
      </div>
    </div>
  )
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

function AgentConfig({ agent }: { agent: any }) {
  return (
    <div className="flex w-full h-full space-x-6">
       {/* Left: Configuration Form */}
       <div className="w-1/2 flex flex-col space-y-6 overflow-y-auto pr-2">
          
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-base font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">基础信息</h3>
            <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Agent 名称</label>
                 <input type="text" defaultValue={agent.name} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-slate-50" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Agent 类型</label>
                 <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-slate-50">
                    <option>{agent.type}</option>
                    <option>{agent.type === '标注Agent' ? '检查Agent' : '标注Agent'}</option>
                 </select>
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">描述</label>
                 <textarea className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-slate-50 h-20 resize-none" defaultValue="负责处理音频数据的初步转写和标注工作。"></textarea>
               </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-base font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">核心能力配置</h3>
            <div className="space-y-4">
               <div>
                 <label className="flex items-center text-sm font-medium text-slate-700 mb-1">
                   <FileText className="w-4 h-4 mr-1.5 text-indigo-500" /> Prompt (提示词)
                 </label>
                 <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white">
                    <option>{agent.prompt}</option>
                    <option>ASR Prompt V1.2</option>
                    <option>通用提取 Prompt V2.0</option>
                 </select>
               </div>
               <div>
                 <label className="flex items-center text-sm font-medium text-slate-700 mb-1">
                   <Cpu className="w-4 h-4 mr-1.5 text-amber-500" /> 模型 (Model)
                 </label>
                 <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white">
                    <option>{agent.model}</option>
                    <option>Gemini 1.5 Pro</option>
                    <option>Claude 3.5 Sonnet</option>
                 </select>
               </div>
               <div>
                 <label className="flex items-center text-sm font-medium text-slate-700 mb-1">
                   <BookOpen className="w-4 h-4 mr-1.5 text-emerald-500" /> 知识库 (Knowledge)
                 </label>
                 <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white">
                    <option>{agent.knowledge}</option>
                    <option>无</option>
                    <option>全局标注规范库</option>
                 </select>
               </div>
               <div>
                 <label className="flex items-center text-sm font-medium text-slate-700 mb-1">
                   <Wrench className="w-4 h-4 mr-1.5 text-slate-500" /> 工具 (Tools)
                 </label>
                 <div className="border border-slate-200 rounded-md p-3 bg-slate-50">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-xs text-slate-500">已选 1 个工具</span>
                       <button className="text-xs text-indigo-600 font-medium">添加</button>
                    </div>
                    <div className="bg-white border border-slate-200 px-3 py-2 rounded flex items-center justify-between text-sm">
                       <div className="flex items-center"><Search className="w-3.5 h-3.5 mr-2 text-slate-400"/> 业务词典检索</div>
                       <button className="text-red-500 hover:bg-red-50 p-1 rounded">移除</button>
                    </div>
                 </div>
               </div>
            </div>
          </div>

       </div>

       {/* Right: Architecture Diagram */}
       <div className="w-1/2 bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2 w-[calc(100%-3rem)]">Agent 能力编排视图</h3>
          
          <div className="flex flex-col items-center w-full max-w-sm mt-8 space-y-2">
            
            <div className="w-full bg-slate-50 border border-indigo-200 rounded-lg p-3 flex flex-col items-center shadow-sm relative">
               <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1">Context Builder</span>
               <div className="flex space-x-2 w-full mt-1">
                 <div className="flex-1 bg-white border border-slate-200 rounded py-2 px-2 flex flex-col items-center">
                    <FileText className="w-4 h-4 text-indigo-500 mb-1" />
                    <span className="text-[10px] text-slate-600 font-medium">Prompt</span>
                    <span className="text-[10px] text-slate-400 truncate w-full text-center">{agent.prompt}</span>
                 </div>
                 <div className="flex-1 bg-white border border-slate-200 rounded py-2 px-2 flex flex-col items-center">
                    <BookOpen className="w-4 h-4 text-emerald-500 mb-1" />
                    <span className="text-[10px] text-slate-600 font-medium">Knowledge</span>
                    <span className="text-[10px] text-slate-400 truncate w-full text-center">{agent.knowledge}</span>
                 </div>
               </div>
            </div>

            <div className="h-6 w-0 border-l-2 border-dashed border-slate-300"></div>

            <div className="w-full bg-slate-50 border border-amber-200 rounded-lg p-3 flex flex-col items-center shadow-sm">
               <Cpu className="w-6 h-6 text-amber-500 mb-1" />
               <span className="text-sm font-bold text-amber-700 mb-0.5">LLM Engine</span>
               <span className="text-xs text-amber-600/80">{agent.model}</span>
               
               {/* Tools attached to LLM */}
               <div className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center">
                  <div className="w-6 h-0 border-t-2 border-dashed border-slate-300"></div>
                  <div className="bg-white border border-slate-200 rounded-lg p-2 flex flex-col items-center shadow-sm">
                    <Wrench className="w-4 h-4 text-slate-500 mb-1" />
                    <span className="text-[10px] text-slate-600">词典检索</span>
                  </div>
               </div>
            </div>

            <div className="h-6 w-0 border-l-2 border-dashed border-slate-300"></div>

            <div className="w-full bg-slate-50 border border-purple-200 rounded-lg p-3 flex flex-col items-center shadow-sm">
               <Code className="w-5 h-5 text-purple-500 mb-1" />
               <span className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-1">Output Schema</span>
               <span className="text-[10px] text-slate-500 font-mono">JSON Structured</span>
            </div>

          </div>
       </div>
    </div>
  )
}

function AgentSchema() {
  return (
    <div className="flex flex-col w-full h-full bg-[#1e1e1e] rounded-xl border border-slate-800 shadow-sm overflow-hidden font-mono text-sm">
      <div className="bg-[#2d2d2d] px-4 py-3 border-b border-[#404040] flex items-center justify-between">
        <div className="flex items-center space-x-2">
           <Code className="w-4 h-4 text-purple-400" />
           <span className="text-[#cccccc] font-semibold text-sm">输出结构定义 (Output Schema)</span>
        </div>
        <div className="flex space-x-3">
           <button className="text-xs text-[#cccccc] hover:text-white px-2 py-1 rounded bg-[#404040] transition-colors">生成类型定义</button>
           <button className="text-xs text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded transition-colors font-medium">保存格式</button>
        </div>
      </div>
      <div className="flex-1 flex">
         {/* Left: Editor */}
         <div className="flex-1 p-4 overflow-y-auto text-[#d4d4d4] leading-relaxed relative border-r border-[#404040]">
           <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#1e1e1e] border-r border-[#404040] flex flex-col items-center pt-4 text-[#858585] text-xs select-none">
             {Array.from({length: 15}).map((_, i) => <div key={i} className="mb-1">{i + 1}</div>)}
           </div>
           <div className="pl-10 outline-none" contentEditable suppressContentEditableWarning>
             <div><span className="text-[#ce9178]">{"{"}</span></div>
             <div className="pl-4"><span className="text-[#9cdcfe]">"text"</span>: <span className="text-[#ce9178]">"string"</span>, <span className="text-[#6a9955]">// 最终转写文本</span></div>
             <div className="pl-4"><span className="text-[#9cdcfe]">"confidence"</span>: <span className="text-[#ce9178]">"number"</span>, <span className="text-[#6a9955]">// 结果置信度 (0-1)</span></div>
             <div className="pl-4"><span className="text-[#9cdcfe]">"has_noise"</span>: <span className="text-[#ce9178]">"boolean"</span>, <span className="text-[#6a9955]">// 是否包含明显噪音</span></div>
             <div className="pl-4"><span className="text-[#9cdcfe]">"words"</span>: <span className="text-[#ce9178]">"array"</span>, <span className="text-[#6a9955]">// 分词与时间戳</span></div>
             <div className="pl-4">...</div>
             <div><span className="text-[#ce9178]">{"}"}</span></div>
           </div>
         </div>
         {/* Right: Docs */}
         <div className="w-80 bg-[#252526] p-4 overflow-y-auto">
            <h4 className="text-slate-300 font-semibold mb-4 text-sm border-b border-[#404040] pb-2">Schema 说明</h4>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">定义 Agent 返回结果的 JSON 结构。工作流引擎将严格校验输出格式是否符合此 Schema。</p>
            <div className="bg-[#1e1e1e] p-3 rounded border border-[#404040] mb-4">
              <span className="text-xs text-amber-400 font-semibold mb-1 block">注意</span>
              <p className="text-slate-400 text-xs">如果是"检查Agent"，强烈建议包含 <code className="text-indigo-400">confidence</code> 和 <code className="text-red-400">error_reason</code> 字段以便后续进行流转控制。</p>
            </div>
         </div>
      </div>
    </div>
  )
}

function AgentTest({ agent }: { agent: any }) {
  return (
    <div className="flex flex-col w-full h-full space-y-4">
      {/* Top: Inputs & Execution */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col shrink-0">
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
           <span className="text-sm font-semibold text-slate-900 flex items-center"><PlayCircle className="w-4 h-4 mr-2 text-indigo-600" /> 测试控制台</span>
           <button className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm flex items-center">
             <Play className="w-3.5 h-3.5 mr-1" /> 运行 Agent
           </button>
        </div>
        <div className="p-4 grid grid-cols-2 gap-6">
           <div>
             <label className="block text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wide">输入数据 (Input)</label>
             <div className="bg-slate-50 border border-slate-200 rounded-md p-3 flex items-center justify-between">
               <div className="flex items-center text-sm font-medium text-slate-700">
                 <PlayCircle className="w-5 h-5 text-slate-400 mr-2" /> audio_sample_001.wav
               </div>
               <span className="text-xs text-slate-400">2.4MB</span>
             </div>
             <p className="text-xs text-slate-500 mt-2">（模拟工作流传递给 Agent 的原始 Payload）</p>
           </div>
           <div>
             <label className="block text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wide">模型响应 (Output)</label>
             <div className="bg-[#1e1e1e] rounded-md p-3 font-mono text-sm h-32 overflow-y-auto">
               <div className="text-[#9cdcfe]">"text"<span className="text-slate-300">:</span> <span className="text-[#ce9178]">"今天天气不错，我们去打球吧。"</span>,</div>
               <div className="text-[#9cdcfe]">"confidence"<span className="text-slate-300">:</span> <span className="text-[#b5cea8]">0.98</span>,</div>
               <div className="text-[#9cdcfe]">"has_noise"<span className="text-slate-300">:</span> <span className="text-[#569cd6]">false</span></div>
             </div>
           </div>
        </div>
      </div>

      {/* Bottom: Trace Debugging */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <div className="px-4 py-2 border-b border-slate-100 bg-slate-50 flex items-center">
           <span className="text-sm font-semibold text-slate-900">调用链路追踪 (Trace)</span>
           <span className="ml-3 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-mono">Total: 1.2s</span>
        </div>
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
           {/* Trace Steps */}
           <div className="flex items-start">
             <div className="w-24 text-right pr-4 text-xs font-mono text-slate-400 pt-1">0ms</div>
             <div className="flex-1 border-l-2 border-indigo-200 pl-4 pb-4">
                <div className="flex items-center mb-1">
                   <div className="w-2 h-2 rounded-full bg-indigo-500 -ml-[21px] mr-3"></div>
                   <span className="text-sm font-semibold text-slate-800">组装 Prompt</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded p-2 text-xs text-slate-600 font-mono">Loaded template: {agent.prompt}</div>
             </div>
           </div>
           <div className="flex items-start">
             <div className="w-24 text-right pr-4 text-xs font-mono text-slate-400 pt-1">120ms</div>
             <div className="flex-1 border-l-2 border-indigo-200 pl-4 pb-4">
                <div className="flex items-center mb-1">
                   <div className="w-2 h-2 rounded-full bg-indigo-500 -ml-[21px] mr-3"></div>
                   <span className="text-sm font-semibold text-slate-800">检索知识库</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded p-2 text-xs text-slate-600">
                  命中规则: "语气词处理规范" (Score: 0.89)
                </div>
             </div>
           </div>
           <div className="flex items-start">
             <div className="w-24 text-right pr-4 text-xs font-mono text-slate-400 pt-1">350ms</div>
             <div className="flex-1 border-l-2 border-indigo-200 pl-4 pb-4">
                <div className="flex items-center mb-1">
                   <div className="w-2 h-2 rounded-full bg-amber-500 -ml-[21px] mr-3"></div>
                   <span className="text-sm font-semibold text-slate-800">模型推理 ({agent.model})</span>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded p-2 text-xs text-amber-800 font-mono">
                  Tokens In: 1,204 | Tokens Out: 45
                </div>
             </div>
           </div>
           <div className="flex items-start">
             <div className="w-24 text-right pr-4 text-xs font-mono text-slate-400 pt-1">1200ms</div>
             <div className="flex-1 border-l-2 border-transparent pl-4">
                <div className="flex items-center mb-1">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 -ml-[21px] mr-3"></div>
                   <span className="text-sm font-semibold text-slate-800">解析与输出验证</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 rounded p-2 text-xs text-emerald-700">
                  Schema 验证通过
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}

function AgentLogs({ agent }: { agent: any }) {
  const isCheckAgent = agent.type === '检查Agent';
  const logs = [
    { time: '2026-06-24 10:21:45', input: 'audio_8492.wav', output: isCheckAgent ? '{"confidence": 0.4, "has_error": true}' : '{"text": "明天开会"}', status: 'success', conf: isCheckAgent ? 0.4 : 0.98, error: isCheckAgent ? '漏字' : '-' },
    { time: '2026-06-24 10:21:12', input: 'audio_8491.wav', output: 'Format Error', status: 'error', conf: null, error: 'JSON解析失败' },
    { time: '2026-06-24 10:20:55', input: 'audio_8490.wav', output: isCheckAgent ? '{"confidence": 0.95, "has_error": false}' : '{"text": "收到请回复"}', status: 'success', conf: isCheckAgent ? 0.95 : 0.92, error: '-' },
  ];

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
       <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
         <h3 className="font-semibold text-slate-900">近期运行日志 (最后 100 条)</h3>
         <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">导出日志</button>
       </div>
       <div className="flex-1 overflow-auto p-0">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-white border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-medium">执行时间</th>
                <th className="px-6 py-3 font-medium">输入 (Input)</th>
                <th className="px-6 py-3 font-medium">输出概览</th>
                {isCheckAgent && <th className="px-6 py-3 font-medium">检查置信度</th>}
                {isCheckAgent && <th className="px-6 py-3 font-medium">错误原因</th>}
                <th className="px-6 py-3 font-medium">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((l, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 font-mono text-xs text-slate-500 whitespace-nowrap">{l.time}</td>
                  <td className="px-6 py-3 font-medium text-slate-700">{l.input}</td>
                  <td className="px-6 py-3 font-mono text-xs text-slate-600 truncate max-w-xs">{l.output}</td>
                  {isCheckAgent && <td className="px-6 py-3 font-mono text-xs">{l.conf}</td>}
                  {isCheckAgent && <td className="px-6 py-3 text-red-600 text-xs">{l.error !== '-' ? l.error : ''}</td>}
                  <td className="px-6 py-3">
                     {l.status === 'success' ? (
                       <span className="flex items-center text-emerald-600 text-xs font-medium"><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> 成功</span>
                     ) : (
                       <span className="flex items-center text-red-600 text-xs font-medium"><ShieldAlert className="w-3.5 h-3.5 mr-1" /> 失败</span>
                     )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
       </div>
    </div>
  )
}

function AgentHistory() {
  const history = [
    { version: 'V1.4', date: '2026-06-24', changes: ['Prompt 升级至 V1.3', '引入 ASR规范库'], user: 'admin', active: true },
    { version: 'V1.3', date: '2026-06-15', changes: ['模型切换为 GPT-4o'], user: 'admin', active: false },
    { version: 'V1.0', date: '2026-05-01', changes: ['初始 Agent 创建'], user: 'system', active: false },
  ];
  return (
    <div className="flex w-full h-full space-x-6">
      <div className="w-80 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col shrink-0 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <h3 className="font-semibold text-slate-900">版本历史</h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          {history.map((h, i) => (
            <div 
              key={i} 
              className={cn(
                "p-4 border-b border-slate-100 cursor-pointer transition-colors relative",
                h.active ? "bg-indigo-50" : "hover:bg-slate-50"
              )}
            >
              {h.active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600"></div>}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="font-semibold text-slate-900 mr-2">{h.version}</span>
                  {h.active && <span className="px-1.5 py-0.5 text-[10px] font-medium bg-emerald-100 text-emerald-700 rounded border border-emerald-200">当前运行中</span>}
                </div>
                <span className="text-xs text-slate-500">{h.date}</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1 mb-3 list-disc pl-4">
                {h.changes.map((c, j) => <li key={j}>{c}</li>)}
              </ul>
              <div className="flex items-center space-x-2">
                 {!h.active && <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700">回滚至此</button>}
                 <span className="text-slate-300">|</span>
                 <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700">查看 Diff</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-slate-400">
         <GitCommit className="w-12 h-12 mb-4 text-slate-300" />
         <p>选择历史版本查看组件配置差异</p>
      </div>
    </div>
  )
}

function AgentRefs() {
  const refs = [
    { name: '标准 ASR 标注工作流', status: '活跃', count: 12 },
    { name: '复杂音频混合处理流', status: '维护中', count: 4 },
  ];
  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
       <div className="p-4 border-b border-slate-100 bg-slate-50">
         <h3 className="font-semibold text-slate-900">引用此 Agent 的工作流</h3>
       </div>
       <div className="flex-1 overflow-auto p-0">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-white border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-medium">工作流名称</th>
                <th className="px-6 py-3 font-medium">状态</th>
                <th className="px-6 py-3 font-medium text-right">包含节点数</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {refs.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 flex items-center">
                    <Activity className="w-4 h-4 text-indigo-500 mr-2" />
                    {r.name}
                  </td>
                  <td className="px-6 py-4">
                     <span className={cn(
                       "px-2 py-1 rounded text-xs font-medium border",
                       r.status === '活跃' ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"
                     )}>
                       {r.status}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-mono text-right">{r.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
       </div>
    </div>
  )
}

function AgentAnalytics() {
  return (
    <div className="w-full h-full space-y-6 overflow-y-auto pr-2">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
           <p className="text-xs font-medium text-slate-500 mb-1">总调用次数</p>
           <p className="text-xl font-bold text-slate-900">125,300</p>
         </div>
         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
           <p className="text-xs font-medium text-slate-500 mb-1">成功率</p>
           <p className="text-xl font-bold text-emerald-600">99.1%</p>
         </div>
         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
           <p className="text-xs font-medium text-slate-500 mb-1">平均耗时</p>
           <p className="text-xl font-bold text-slate-900">1.2s</p>
         </div>
         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
           <p className="text-xs font-medium text-slate-500 mb-1">Token 消耗</p>
           <p className="text-xl font-bold text-indigo-600">14.2M</p>
         </div>
         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
           <p className="text-xs font-medium text-slate-500 mb-1 flex items-center">
             人工修正率 <AlertTriangle className="w-3 h-3 ml-1 text-amber-500"/>
           </p>
           <p className="text-xl font-bold text-amber-600">3.4%</p>
         </div>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col items-center justify-center h-64 text-slate-400">
         <BarChart2 className="w-12 h-12 mb-4 text-slate-300" />
         <p>运行监控图表 (QPS、耗时分布、错误类型统计)</p>
      </div>
    </div>
  )
}

function AgentEval() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white rounded-xl border border-slate-200 border-dashed text-slate-400 shadow-sm">
        <CheckCircle2 className="w-16 h-16 mb-4 text-indigo-200" />
        <h3 className="text-lg font-semibold text-slate-700 mb-2">Agent 自动评测中心 (P1规划)</h3>
        <p className="text-sm text-slate-500 text-center max-w-md">
          未来将支持选择标准测试集（如 ASR-Test-1000），一键运行评测任务，<br/>
          自动计算准确率、召回率、F1 分数，用于新版本发布前的质量卡点校验。
        </p>
        <button className="mt-6 px-4 py-2 bg-slate-100 text-slate-600 rounded-md font-medium text-sm hover:bg-slate-200 transition-colors">
          了解更多
        </button>
    </div>
  )
}


function NewAgentDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [type, setType] = useState('标注Agent');

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex justify-end overflow-hidden">
       <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
       <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col relative z-10 animate-in slide-in-from-right duration-300">
         <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-white">
           <h2 className="text-lg font-semibold text-slate-900">新建 Agent (数字员工)</h2>
           <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-md transition-colors">
             &times;
           </button>
         </div>
         
         <div className="p-6 flex-1 overflow-y-auto bg-white">
           
           {/* Step Indicator */}
           <div className="flex items-center mb-8">
              <div className={cn("flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold", step >= 1 ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400")}>1</div>
              <div className={cn("flex-1 h-1 mx-2 rounded", step >= 2 ? "bg-indigo-600" : "bg-slate-100")}></div>
              <div className={cn("flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold", step >= 2 ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400")}>2</div>
           </div>

           {step === 1 && (
             <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
               <h3 className="font-medium text-slate-900 mb-4">第一步：选择 Agent 职责类型</h3>
               
               <label className={cn(
                 "flex p-4 border rounded-xl cursor-pointer transition-all",
                 type === '标注Agent' ? "border-indigo-600 ring-1 ring-indigo-600 bg-indigo-50/30" : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
               )} onClick={() => setType('标注Agent')}>
                 <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-4 shrink-0">
                   <Bot className="w-5 h-5" />
                 </div>
                 <div>
                   <span className="block font-semibold text-slate-900 mb-1">标注 Agent</span>
                   <span className="block text-xs text-slate-500 leading-relaxed">作为主要处理节点，从原始数据中提取、生成标注结果。通常位于工作流的起始或中间环节。</span>
                 </div>
                 <input type="radio" checked={type === '标注Agent'} onChange={() => {}} className="hidden" />
               </label>

               <label className={cn(
                 "flex p-4 border rounded-xl cursor-pointer transition-all",
                 type === '检查Agent' ? "border-indigo-600 ring-1 ring-indigo-600 bg-indigo-50/30" : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
               )} onClick={() => setType('检查Agent')}>
                 <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-4 shrink-0">
                   <ShieldAlert className="w-5 h-5" />
                 </div>
                 <div>
                   <span className="block font-semibold text-slate-900 mb-1">检查 Agent (质检)</span>
                   <span className="block text-xs text-slate-500 leading-relaxed">专门用于校验前置节点的产出。主要输出置信度分数和错误原因，指导工作流是否进入人工环节。</span>
                 </div>
                 <input type="radio" checked={type === '检查Agent'} onChange={() => {}} className="hidden" />
               </label>
             </div>
           )}

           {step === 2 && (
             <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
               <h3 className="font-medium text-slate-900 mb-4">第二步：基础信息定义</h3>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1.5">Agent 名称 <span className="text-red-500">*</span></label>
                 <input type="text" placeholder="例如：ASR情感标注Agent" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm shadow-sm" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1.5">Agent 描述</label>
                 <textarea 
                   className="w-full h-24 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm shadow-sm resize-none"
                   placeholder="简述该 Agent 的具体职责和预期输出..."
                 ></textarea>
               </div>
               <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-xs text-slate-600">
                  <span className="font-semibold text-slate-800 block mb-1">下一步建议</span>
                  创建成功后，您需要在配置中心为其关联具体的 Prompt、Model 和 知识库。
               </div>
             </div>
           )}
           
         </div>
         <div className="px-6 py-4 border-t border-slate-200 flex justify-end space-x-3 bg-slate-50 shrink-0">
           {step === 1 ? (
             <>
                <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 shadow-sm transition-colors">
                  取消
                </button>
                <button onClick={() => setStep(2)} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 shadow-sm transition-colors">
                  下一步
                </button>
             </>
           ) : (
             <>
                <button onClick={() => setStep(1)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 shadow-sm transition-colors">
                  上一步
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 shadow-sm transition-colors">
                  完成创建
                </button>
             </>
           )}
         </div>
       </div>
    </div>
  )
}
