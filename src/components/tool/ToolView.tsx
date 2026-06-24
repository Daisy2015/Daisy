import React, { useState } from 'react';
import { 
  Wrench, Search, Plus, Filter, MoreVertical, ArrowLeft, 
  Settings, Code, Play, ScrollText, History, GitCommit, 
  Database, PlayCircle, ShieldAlert, CheckCircle2, 
  FileJson, Terminal, Globe, Table2, Link as LinkIcon
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function ToolView() {
  const [selectedTool, setSelectedTool] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filterType, setFilterType] = useState('全部');

  const mockTools = [
    { 
      id: '1', 
      name: '脱敏工具', 
      type: 'Python 脚本',
      category: '数据治理',
      callCount: 12532,
      updatedAt: '2026-06-24',
      system: true
    },
    { 
      id: '2', 
      name: '音频加噪工具', 
      type: 'Shell 脚本',
      category: '数据处理',
      callCount: 8420,
      updatedAt: '2026-06-22',
      system: true
    },
    { 
      id: '3', 
      name: '业务词典检索', 
      type: 'HTTP API',
      category: '系统集成',
      callCount: 45000,
      updatedAt: '2026-06-20',
      system: false
    },
    { 
      id: '4', 
      name: '错音纠正规则', 
      type: 'Excel 规则',
      category: '数据治理',
      callCount: 1200,
      updatedAt: '2026-06-19',
      system: false
    },
  ];

  const categories = ['全部', '数据处理', '数据治理', '系统集成', 'AI能力', '系统预置', '自定义'];

  const filteredTools = mockTools.filter(t => {
    if (filterType === '全部') return true;
    if (filterType === '系统预置') return t.system;
    if (filterType === '自定义') return !t.system;
    return t.category === filterType;
  });

  return (
    <div className="flex flex-col h-full relative">
      {selectedTool ? (
        <ToolDetails tool={selectedTool} onBack={() => setSelectedTool(null)} />
      ) : (
        <>
          {/* Toolbar */}
          <div className="h-16 border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
            <h2 className="text-lg font-semibold text-slate-900">Tool Hub</h2>
            <div className="flex items-center space-x-3">
              <div className="flex bg-slate-100 p-1 rounded-md overflow-x-auto max-w-[500px]">
                 {categories.map(c => (
                   <button 
                     key={c}
                     onClick={() => setFilterType(c)}
                     className={cn(
                       "px-3 py-1 text-xs font-medium rounded-sm transition-colors whitespace-nowrap",
                       filterType === c ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                     )}
                   >
                     {c}
                   </button>
                 ))}
              </div>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 w-64 ml-4">
                <Search className="w-4 h-4 text-slate-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="搜索工具..."
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
                新建工具
              </button>
            </div>
          </div>

          {/* List View */}
          <div className="flex-1 overflow-auto p-6 bg-slate-50/50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTools.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedTool(item)}
                  className="group border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer bg-white relative overflow-hidden flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center border",
                      item.type === 'Python 脚本' ? "bg-blue-50 text-blue-600 border-blue-100" :
                      item.type === 'Shell 脚本' ? "bg-slate-50 text-slate-600 border-slate-200" :
                      item.type === 'HTTP API' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                      "bg-amber-50 text-amber-600 border-amber-100"
                    )}>
                      {item.type === 'Python 脚本' && <Terminal className="w-6 h-6" />}
                      {item.type === 'Shell 脚本' && <Code className="w-6 h-6" />}
                      {item.type === 'HTTP API' && <Globe className="w-6 h-6" />}
                      {item.type === 'Excel 规则' && <Table2 className="w-6 h-6" />}
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
                    {item.system && <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-slate-100 text-slate-500 rounded border border-slate-200">预置</span>}
                  </h3>
                  
                  <div className="flex items-center text-xs font-medium text-slate-500 mb-4 space-x-2">
                    <span className="px-2 py-0.5 rounded border bg-slate-50 text-slate-700 border-slate-200">{item.category}</span>
                    <span className="px-2 py-0.5 rounded border bg-slate-50 text-slate-700 border-slate-200">{item.type}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs pt-4 border-t border-slate-100 mt-auto">
                    <span className="text-slate-400">
                      更新于 {item.updatedAt}
                    </span>
                    <span className="font-mono font-semibold text-slate-600">
                      {item.callCount.toLocaleString()} 次
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <NewToolDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
}

function ToolDetails({ tool, onBack }: { tool: any, onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('editor');

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center">
           <button onClick={onBack} className="mr-4 p-1.5 text-slate-400 hover:bg-slate-100 rounded-md transition-colors">
             <ArrowLeft className="w-5 h-5" />
           </button>
           <h2 className="text-xl font-semibold text-slate-900">{tool.name}</h2>
           <span className="ml-3 px-2 py-0.5 text-xs font-medium border border-slate-200 bg-slate-100 text-slate-700 rounded">
             {tool.type}
           </span>
           <span className="ml-2 px-2 py-0.5 text-xs font-medium border border-slate-200 bg-slate-100 text-slate-700 rounded">
             v1.2
           </span>
        </div>
        <div className="flex space-x-3">
          <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 flex items-center shadow-sm">
            <CheckCircle2 className="w-4 h-4 mr-2" /> 发布版本
          </button>
        </div>
      </div>
      
      <div className="bg-white border-b border-slate-200 px-6 shrink-0">
        <div className="flex space-x-6 overflow-x-auto">
          <TabButton active={activeTab==='config'} onClick={()=>setActiveTab('config')} icon={Settings}>基础配置</TabButton>
          <TabButton active={activeTab==='editor'} onClick={()=>setActiveTab('editor')} icon={Code}>在线编辑器</TabButton>
          <TabButton active={activeTab==='schema'} onClick={()=>setActiveTab('schema')} icon={FileJson}>输入输出</TabButton>
          <TabButton active={activeTab==='test'} onClick={()=>setActiveTab('test')} icon={Play}>测试台</TabButton>
          <TabButton active={activeTab==='logs'} onClick={()=>setActiveTab('logs')} icon={ScrollText}>调用日志</TabButton>
          <TabButton active={activeTab==='history'} onClick={()=>setActiveTab('history')} icon={History}>版本管理</TabButton>
          <TabButton active={activeTab==='refs'} onClick={()=>setActiveTab('refs')} icon={LinkIcon}>引用关系</TabButton>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden p-6 flex">
         {activeTab === 'config' && <ToolConfig tool={tool} />}
         {activeTab === 'editor' && <ToolEditor tool={tool} />}
         {activeTab === 'schema' && <ToolSchema />}
         {activeTab === 'test' && <ToolTest tool={tool} />}
         {activeTab === 'logs' && <ToolLogs />}
         {activeTab === 'history' && <ToolHistory />}
         {activeTab === 'refs' && <ToolRefs />}
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

function ToolConfig({ tool }: { tool: any }) {
  return (
    <div className="w-full max-w-2xl bg-white rounded-xl border border-slate-200 shadow-sm p-6">
       <h3 className="text-base font-semibold text-slate-900 mb-6 border-b border-slate-100 pb-2">基础配置</h3>
       
       <div className="space-y-6">
         <div className="grid grid-cols-2 gap-6">
           <div>
             <label className="block text-sm font-medium text-slate-500 mb-1">工具名称</label>
             <p className="text-sm font-semibold text-slate-900">{tool.name}</p>
           </div>
           <div>
             <label className="block text-sm font-medium text-slate-500 mb-1">工具类型</label>
             <p className="text-sm font-medium text-slate-900">{tool.type}</p>
           </div>
         </div>
         
         <div className="grid grid-cols-2 gap-6">
           <div>
             <label className="block text-sm font-medium text-slate-500 mb-1">所属分类</label>
             <p className="text-sm font-medium text-slate-900">{tool.category}</p>
           </div>
           <div>
             <label className="block text-sm font-medium text-slate-500 mb-1">创建人</label>
             <p className="text-sm font-medium text-slate-900">admin</p>
           </div>
         </div>

         <div className="grid grid-cols-2 gap-6">
           <div>
             <label className="block text-sm font-medium text-slate-500 mb-1">状态</label>
             <p className="text-sm font-medium text-emerald-600 flex items-center">
               <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
               已发布
             </p>
           </div>
         </div>

         <div>
           <label className="block text-sm font-medium text-slate-500 mb-1">工具描述</label>
           <p className="text-sm text-slate-700 leading-relaxed">
             删除文本中的敏感信息，如手机号、身份证号等。主要使用正则表达式进行匹配和替换。
           </p>
         </div>
       </div>
    </div>
  )
}

function ToolEditor({ tool }: { tool: any }) {
  const isPython = tool.type === 'Python 脚本';
  
  return (
    <div className="flex flex-col w-full h-full bg-[#1e1e1e] rounded-xl border border-slate-800 shadow-sm overflow-hidden font-mono text-sm">
      <div className="bg-[#2d2d2d] px-4 py-2 border-b border-[#404040] flex items-center justify-between">
        <div className="flex items-center space-x-2">
           {isPython ? <Terminal className="w-4 h-4 text-blue-400" /> : <Globe className="w-4 h-4 text-emerald-400" />}
           <span className="text-[#cccccc]">{isPython ? 'main.py' : 'API Configuration'}</span>
        </div>
        <div className="flex space-x-2">
           <button className="text-xs text-[#cccccc] hover:text-white px-3 py-1.5 rounded bg-[#404040] transition-colors font-medium">保存修改</button>
        </div>
      </div>
      
      {isPython ? (
        <div className="flex-1 p-4 overflow-y-auto text-[#d4d4d4] leading-relaxed relative flex">
          <div className="w-12 border-r border-[#404040] flex flex-col items-end pr-4 text-[#858585] text-xs select-none h-max">
            {Array.from({length: 15}).map((_, i) => <div key={i} className="mb-1">{i + 1}</div>)}
          </div>
          <div className="flex-1 pl-4 outline-none" contentEditable suppressContentEditableWarning>
            <div><span className="text-[#c586c0]">import</span> <span className="text-[#4ec9b0]">re</span></div>
            <br/>
            <div><span className="text-[#c586c0]">def</span> <span className="text-[#dcdcaa]">run</span>(text):</div>
            <div className="pl-4 text-[#6a9955]">"""脱敏执行逻辑"""</div>
            <div className="pl-4">text = re.<span className="text-[#dcdcaa]">sub</span>(</div>
            <div className="pl-8"><span className="text-[#ce9178]">r'1[3-9]\d{"{9}"}'</span>,</div>
            <div className="pl-8"><span className="text-[#ce9178]">'***********'</span>,</div>
            <div className="pl-8">text</div>
            <div className="pl-4">)</div>
            <br/>
            <div className="pl-4"><span className="text-[#c586c0]">return</span> text</div>
          </div>
        </div>
      ) : (
        <div className="flex-1 p-6 bg-slate-50 font-sans flex items-center justify-center text-slate-400">
           <p>非代码类工具编辑视图加载中...</p>
        </div>
      )}
    </div>
  )
}

function ToolSchema() {
  return (
    <div className="flex w-full h-full space-x-6">
       <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <span className="font-semibold text-slate-900 text-sm">输入参数 (Input)</span>
            <button className="text-indigo-600 text-xs font-medium">添加参数</button>
          </div>
          <div className="p-4 flex-1">
             <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-2 font-medium text-slate-600">参数名</th>
                      <th className="px-4 py-2 font-medium text-slate-600">类型</th>
                      <th className="px-4 py-2 font-medium text-slate-600">必填</th>
                      <th className="px-4 py-2 font-medium text-slate-600">描述</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-4 py-3 font-mono text-indigo-600">text</td>
                      <td className="px-4 py-3 font-mono text-slate-500">string</td>
                      <td className="px-4 py-3">是</td>
                      <td className="px-4 py-3 text-slate-600">需要处理的原始文本</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-indigo-600">level</td>
                      <td className="px-4 py-3 font-mono text-slate-500">number</td>
                      <td className="px-4 py-3">否</td>
                      <td className="px-4 py-3 text-slate-600">脱敏级别 (1-3)</td>
                    </tr>
                  </tbody>
                </table>
             </div>
          </div>
       </div>

       <div className="flex items-center text-slate-300">
          <ArrowLeft className="w-8 h-8 rotate-180" />
       </div>

       <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <span className="font-semibold text-slate-900 text-sm">输出参数 (Output)</span>
            <button className="text-indigo-600 text-xs font-medium">添加参数</button>
          </div>
          <div className="p-4 flex-1">
             <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-2 font-medium text-slate-600">参数名</th>
                      <th className="px-4 py-2 font-medium text-slate-600">类型</th>
                      <th className="px-4 py-2 font-medium text-slate-600">描述</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-4 py-3 font-mono text-emerald-600">result</td>
                      <td className="px-4 py-3 font-mono text-slate-500">string</td>
                      <td className="px-4 py-3 text-slate-600">处理后的文本</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-emerald-600">status</td>
                      <td className="px-4 py-3 font-mono text-slate-500">string</td>
                      <td className="px-4 py-3 text-slate-600">执行状态 (success/error)</td>
                    </tr>
                  </tbody>
                </table>
             </div>
          </div>
       </div>
    </div>
  )
}

function ToolTest({ tool }: { tool: any }) {
  return (
    <div className="flex w-full h-full space-x-6">
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
           <span className="text-sm font-semibold text-slate-900">输入参数 (Input)</span>
           <button className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm flex items-center">
             <Play className="w-3.5 h-3.5 mr-1" /> 运行测试
           </button>
        </div>
        <div className="p-4 flex-1 space-y-4">
           <div>
             <label className="block text-xs font-mono text-indigo-600 mb-1.5 bg-indigo-50 px-2 py-0.5 rounded w-max">text: string</label>
             <textarea 
               className="w-full h-32 p-3 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none bg-slate-50" 
               defaultValue="你好，我的手机号是13812345678，请联系我。"
             ></textarea>
           </div>
           <div>
             <label className="block text-xs font-mono text-indigo-600 mb-1.5 bg-indigo-50 px-2 py-0.5 rounded w-max">level: number (optional)</label>
             <input type="number" defaultValue="1" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50" />
           </div>
        </div>
      </div>

      <div className="flex-1 bg-slate-900 rounded-xl border border-slate-800 shadow-sm flex flex-col text-slate-300 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800 bg-[#1e1e1e] flex items-center justify-between">
           <span className="text-sm font-semibold text-slate-200">执行结果 (Output)</span>
           <div className="flex space-x-2">
             <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded font-mono border border-emerald-400/20">Status: 200 OK</span>
             <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono border border-slate-700">45ms</span>
           </div>
        </div>
        <div className="p-4 flex-1 overflow-y-auto font-mono text-sm leading-relaxed">
          <div className="text-[#9cdcfe]">"result"<span className="text-slate-400">:</span> <span className="text-[#ce9178]">"你好，我的手机号是***********，请联系我。"</span></div>
          <div className="text-[#9cdcfe] mt-2">"status"<span className="text-slate-400">:</span> <span className="text-[#ce9178]">"success"</span></div>
          
          <div className="mt-8 pt-4 border-t border-slate-800">
             <span className="text-xs text-slate-500 font-semibold mb-2 block uppercase">Console Logs</span>
             <div className="text-slate-400 text-xs">[INFO] Started processing text (length: 22)</div>
             <div className="text-slate-400 text-xs">[INFO] Found 1 sensitive pattern match</div>
             <div className="text-slate-400 text-xs">[INFO] Execution completed successfully</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ToolLogs() {
  const logs = [
    { time: '2026-06-24 10:21:45', agent: 'ASR标注Agent', input: '{"text":"..."}', output: '{"result":"..."}', status: 'success', duration: '45ms' },
    { time: '2026-06-24 10:21:12', agent: 'ASR标注Agent', input: '{"text":""}', output: '{"error":"empty"}', status: 'error', duration: '12ms' },
    { time: '2026-06-24 10:20:55', agent: '测试台', input: '{"text":"..."}', output: '{"result":"..."}', status: 'success', duration: '42ms' },
  ];

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
       <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
         <h3 className="font-semibold text-slate-900">调用日志</h3>
         <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">刷新</button>
       </div>
       <div className="flex-1 overflow-auto p-0">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-white border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-medium">执行时间</th>
                <th className="px-6 py-3 font-medium">调用来源</th>
                <th className="px-6 py-3 font-medium">输入参数</th>
                <th className="px-6 py-3 font-medium">耗时</th>
                <th className="px-6 py-3 font-medium">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((l, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-slate-500 whitespace-nowrap">{l.time}</td>
                  <td className="px-6 py-4 font-medium text-slate-700">{l.agent}</td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-600 truncate max-w-[150px]">{l.input}</td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-600">{l.duration}</td>
                  <td className="px-6 py-4">
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

function ToolHistory() {
  const history = [
    { version: 'V1.2', date: '2026-06-24', desc: '增加邮箱脱敏逻辑', active: true },
    { version: 'V1.1', date: '2026-06-15', desc: '增加身份证脱敏逻辑', active: false },
    { version: 'V1.0', date: '2026-05-01', desc: '初始版本，支持手机号', active: false },
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
                  {h.active && <span className="px-1.5 py-0.5 text-[10px] font-medium bg-emerald-100 text-emerald-700 rounded border border-emerald-200">当前</span>}
                </div>
                <span className="text-xs text-slate-500">{h.date}</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">{h.desc}</p>
              <div className="flex items-center space-x-2">
                 {!h.active && <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700">回滚</button>}
                 <span className="text-slate-300">|</span>
                 <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700">查看 Diff</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-slate-400">
         <GitCommit className="w-12 h-12 mb-4 text-slate-300" />
         <p>选择历史版本查看代码或配置差异</p>
      </div>
    </div>
  )
}

function ToolRefs() {
  const refs = [
    { name: 'ASR标注Agent', type: 'Agent', count: 12530 },
    { name: '情感标注Agent', type: 'Agent', count: 420 },
    { name: '清洗预处理工作流', type: 'Workflow', count: 8900 },
  ];
  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
       <div className="p-4 border-b border-slate-100 bg-slate-50">
         <h3 className="font-semibold text-slate-900">当前引用关系</h3>
       </div>
       <div className="flex-1 overflow-auto p-0">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-white border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-medium">引用方名称</th>
                <th className="px-6 py-3 font-medium">组件类型</th>
                <th className="px-6 py-3 font-medium text-right">累计调用次数</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {refs.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 flex items-center">
                    <LinkIcon className="w-4 h-4 text-slate-400 mr-2" />
                    {r.name}
                  </td>
                  <td className="px-6 py-4">
                     <span className="px-2 py-1 rounded text-xs font-medium border bg-slate-50 text-slate-700 border-slate-200">
                       {r.type}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-mono text-right">{r.count.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
       </div>
    </div>
  )
}

function NewToolDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [type, setType] = useState('Python脚本');

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex justify-end overflow-hidden">
       <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
       <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col relative z-10 animate-in slide-in-from-right duration-300">
         <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-white">
           <h2 className="text-lg font-semibold text-slate-900">新建工具 (Tool)</h2>
           <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-md transition-colors">
             &times;
           </button>
         </div>
         
         <div className="p-6 flex-1 overflow-y-auto bg-white">
           
           <div className="flex items-center mb-8">
              <div className={cn("flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold", step >= 1 ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400")}>1</div>
              <div className={cn("flex-1 h-1 mx-2 rounded", step >= 2 ? "bg-indigo-600" : "bg-slate-100")}></div>
              <div className={cn("flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold", step >= 2 ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400")}>2</div>
           </div>

           {step === 1 && (
             <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
               <h3 className="font-medium text-slate-900 mb-4">第一步：选择工具类型</h3>
               
               {[
                 { id: 'Python脚本', icon: Terminal, desc: '使用 Python 编写处理逻辑，适合文本处理、正则匹配。', color: 'blue' },
                 { id: 'Shell脚本', icon: Code, desc: '执行系统命令，适合文件格式转换、音频处理。', color: 'slate' },
                 { id: 'Excel规则', icon: Table2, desc: '通过表格配置映射关系或校验规则。', color: 'amber' },
                 { id: 'HTTP API', icon: Globe, desc: '调用外部网络接口或企业内部服务。', color: 'emerald' },
               ].map(t => (
                 <label key={t.id} className={cn(
                   "flex p-4 border rounded-xl cursor-pointer transition-all",
                   type === t.id ? "border-indigo-600 ring-1 ring-indigo-600 bg-indigo-50/30" : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                 )} onClick={() => setType(t.id)}>
                   <div className={`w-10 h-10 rounded-full bg-${t.color}-50 flex items-center justify-center text-${t.color}-600 mr-4 shrink-0 border border-${t.color}-100`}>
                     <t.icon className="w-5 h-5" />
                   </div>
                   <div>
                     <span className="block font-semibold text-slate-900 mb-1">{t.id}</span>
                     <span className="block text-xs text-slate-500 leading-relaxed">{t.desc}</span>
                   </div>
                   <input type="radio" checked={type === t.id} onChange={() => {}} className="hidden" />
                 </label>
               ))}
             </div>
           )}

           {step === 2 && (
             <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
               <h3 className="font-medium text-slate-900 mb-4">第二步：填写基本信息</h3>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1.5">工具名称 <span className="text-red-500">*</span></label>
                 <input type="text" placeholder="例如：脱敏工具" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm shadow-sm" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1.5">所属分类</label>
                 <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm shadow-sm">
                   <option>数据治理</option>
                   <option>数据处理</option>
                   <option>系统集成</option>
                   <option>AI能力</option>
                 </select>
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1.5">工具描述</label>
                 <textarea 
                   className="w-full h-24 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm shadow-sm resize-none"
                   placeholder="简述该工具的功能和用途..."
                 ></textarea>
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
