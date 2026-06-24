import React, { useState } from 'react';
import { 
  BookOpen, Search, Plus, Filter, MoreVertical, ArrowLeft, 
  FileText, Edit3, Play, History, Bot, BarChart2, UploadCloud,
  File, FileArchive, Settings2, Check, GitCommit, GitMerge,
  Trash2, Download, AlertCircle
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function KnowledgeView() {
  const [selectedKnowledge, setSelectedKnowledge] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const mockKnowledge = [
    { 
      id: '1', 
      name: 'ASR标注规范库', 
      type: '规则库', 
      docCount: 12,
      agentCount: 5,
      updatedAt: '2026-06-24',
      creator: 'admin'
    },
    { 
      id: '2', 
      name: '质检案例库', 
      type: '案例库', 
      docCount: 156,
      agentCount: 3,
      updatedAt: '2026-06-22',
      creator: 'system'
    },
    { 
      id: '3', 
      name: '业务术语库', 
      type: '术语库', 
      docCount: 1,
      agentCount: 10,
      updatedAt: '2026-06-20',
      creator: 'admin'
    },
    { 
      id: '4', 
      name: '错误样本库', 
      type: '错误样本库', 
      docCount: 342,
      agentCount: 2,
      updatedAt: '2026-06-19',
      creator: 'qc_team'
    },
  ];

  return (
    <div className="flex flex-col h-full relative">
      {selectedKnowledge ? (
        <KnowledgeDetails knowledge={selectedKnowledge} onBack={() => setSelectedKnowledge(null)} />
      ) : (
        <>
          {/* Toolbar */}
          <div className="h-16 border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
            <h2 className="text-lg font-semibold text-slate-900">Knowledge Hub</h2>
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 w-64">
                <Search className="w-4 h-4 text-slate-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="搜索知识库..."
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
                新建知识库
              </button>
            </div>
          </div>

          {/* List View */}
          <div className="flex-1 overflow-auto p-6 bg-slate-50/50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mockKnowledge.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedKnowledge(item)}
                  className="group border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer bg-white relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); }} 
                      className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-50 transition-colors"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <h3 className="font-semibold text-slate-900 text-lg mb-1 truncate">{item.name}</h3>
                  
                  <div className="flex items-center text-sm font-medium text-slate-500 mb-4 space-x-3">
                    <span className={cn(
                      "px-2 py-0.5 rounded border text-xs",
                      item.type === '错误样本库' ? "bg-red-50 text-red-700 border-red-200" :
                      item.type === '规则库' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      item.type === '案例库' ? "bg-amber-50 text-amber-700 border-amber-200" :
                      "bg-slate-100 text-slate-700 border-slate-200"
                    )}>{item.type}</span>
                    <span className="flex items-center"><FileText className="w-3.5 h-3.5 mr-1 text-slate-400" /> {item.docCount} 文档</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs pt-4 border-t border-slate-100 mt-2">
                    <div className="text-slate-400 flex items-center">
                      <Bot className="w-3.5 h-3.5 mr-1" /> 关联 {item.agentCount} 个
                    </div>
                    <span className="text-slate-400">
                      {item.updatedAt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <NewKnowledgeDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
}

function KnowledgeDetails({ knowledge, onBack }: { knowledge: any, onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('documents');

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center">
           <button onClick={onBack} className="mr-4 p-1.5 text-slate-400 hover:bg-slate-100 rounded-md transition-colors">
             <ArrowLeft className="w-5 h-5" />
           </button>
           <h2 className="text-xl font-semibold text-slate-900">{knowledge.name}</h2>
           <span className="ml-3 px-2 py-0.5 text-xs font-medium border border-slate-200 bg-slate-100 text-slate-700 rounded">
             {knowledge.type}
           </span>
        </div>
        <div className="flex space-x-3">
          <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 flex items-center shadow-sm">
            <Check className="w-4 h-4 mr-2" /> 应用更新
          </button>
        </div>
      </div>
      
      <div className="bg-white border-b border-slate-200 px-6 shrink-0">
        <div className="flex space-x-6">
          <TabButton active={activeTab==='documents'} onClick={()=>setActiveTab('documents')} icon={FileText}>文档管理</TabButton>
          <TabButton active={activeTab==='editor'} onClick={()=>setActiveTab('editor')} icon={Edit3}>在线编辑</TabButton>
          <TabButton active={activeTab==='test'} onClick={()=>setActiveTab('test')} icon={Search}>检索测试</TabButton>
          <TabButton active={activeTab==='history'} onClick={()=>setActiveTab('history')} icon={History}>版本管理</TabButton>
          <TabButton active={activeTab==='agents'} onClick={()=>setActiveTab('agents')} icon={Bot}>引用关系</TabButton>
          <TabButton active={activeTab==='analytics'} onClick={()=>setActiveTab('analytics')} icon={BarChart2}>知识统计</TabButton>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden p-6 flex">
         {activeTab === 'documents' && <KnowledgeDocuments />}
         {activeTab === 'editor' && <KnowledgeEditor />}
         {activeTab === 'test' && <KnowledgeTest />}
         {activeTab === 'history' && <KnowledgeHistory />}
         {activeTab === 'agents' && <KnowledgeAgents />}
         {activeTab === 'analytics' && <KnowledgeAnalytics />}
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

function KnowledgeDocuments() {
  const docs = [
    { name: 'ASR规则V1.docx', type: 'DOCX', size: '1.2 MB', date: '2026-06-20', status: '解析成功' },
    { name: '情感分类规范.pdf', type: 'PDF', size: '3.4 MB', date: '2026-06-21', status: '解析成功' },
    { name: '副语言标注指南.docx', type: 'DOCX', size: '2.1 MB', date: '2026-06-22', status: '解析成功' },
    { name: '错误样本集_06.csv', type: 'CSV', size: '542 KB', date: '2026-06-23', status: '处理中...' },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <h3 className="font-semibold text-slate-900">文档列表</h3>
        <div className="flex space-x-3">
          <button className="flex items-center px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 shadow-sm transition-colors">
            <UploadCloud className="w-4 h-4 mr-2 text-indigo-600" />
            上传文档
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-0">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 bg-white border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-medium">文档名称</th>
              <th className="px-6 py-3 font-medium">格式</th>
              <th className="px-6 py-3 font-medium">大小</th>
              <th className="px-6 py-3 font-medium">上传时间</th>
              <th className="px-6 py-3 font-medium">状态</th>
              <th className="px-6 py-3 font-medium text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {docs.map((d, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900 flex items-center">
                  <File className="w-4 h-4 text-indigo-500 mr-2" />
                  {d.name}
                </td>
                <td className="px-6 py-4 text-slate-500">
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-xs border border-slate-200">{d.type}</span>
                </td>
                <td className="px-6 py-4 text-slate-500">{d.size}</td>
                <td className="px-6 py-4 text-slate-500">{d.date}</td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "text-xs font-medium flex items-center",
                    d.status === '解析成功' ? "text-emerald-600" : "text-amber-600"
                  )}>
                    {d.status === '解析成功' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></div>}
                    {d.status === '处理中...' && <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 animate-pulse"></div>}
                    {d.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="p-1 text-slate-400 hover:text-indigo-600 transition-colors" title="下载"><Download className="w-4 h-4" /></button>
                    <button className="p-1 text-slate-400 hover:text-red-600 transition-colors" title="删除"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function KnowledgeEditor() {
  return (
    <div className="flex flex-col w-full h-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center">
          <FileText className="w-4 h-4 text-slate-400 mr-2" />
          <span className="text-sm font-semibold text-slate-700">ASR数字规范.md</span>
        </div>
        <div className="flex space-x-2">
           <button className="flex items-center text-xs text-white px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 transition-colors font-medium">
             保存修改
           </button>
        </div>
      </div>
      <div className="flex-1 p-6 overflow-y-auto text-slate-700 font-mono text-sm leading-relaxed outline-none" contentEditable suppressContentEditableWarning>
        <h1 className="text-xl font-bold mb-4">ASR数字规范</h1>
        <p className="mb-4">数字统一转写为阿拉伯数字，以保证结果的标准化与一致性。</p>
        <h2 className="text-lg font-semibold mb-2 mt-6">规则示例</h2>
        <div className="bg-slate-50 p-4 rounded-md border border-slate-100 mb-4">
          <p className="text-slate-500 line-through mb-1">一百二十三</p>
          <p className="text-emerald-600 font-medium flex items-center">→ 123</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-md border border-slate-100 mb-4">
          <p className="text-slate-500 line-through mb-1">三点一四</p>
          <p className="text-emerald-600 font-medium flex items-center">→ 3.14</p>
        </div>
        <h2 className="text-lg font-semibold mb-2 mt-6">特殊例外</h2>
        <p className="mb-2">成语或固定搭配中的数字保持汉字：</p>
        <ul className="list-disc pl-5 space-y-1 mb-4">
          <li>十全十美</li>
          <li>乱七八糟</li>
          <li>五颜六色</li>
        </ul>
      </div>
    </div>
  )
}

function KnowledgeTest() {
  return (
    <div className="flex w-full h-full flex-col">
      <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col mb-4">
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
           <span className="text-sm font-semibold text-slate-900 flex items-center"><Search className="w-4 h-4 mr-2" /> 检索查询</span>
           <button className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm">
             执行检索
           </button>
        </div>
        <div className="p-4">
          <textarea 
            className="w-full h-20 p-3 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none bg-slate-50" 
            placeholder="输入测试查询，例如：'数字如何转写？'"
            defaultValue="数字如何转写？"
          ></textarea>
          
          <div className="flex items-center space-x-6 mt-4">
            <div className="flex items-center">
               <label className="text-xs text-slate-500 mr-2">Top K:</label>
               <input type="number" defaultValue={3} className="w-16 border border-slate-200 rounded px-2 py-1 text-xs" />
            </div>
            <div className="flex items-center">
               <label className="text-xs text-slate-500 mr-2">相似度阈值:</label>
               <input type="range" min="0" max="1" step="0.1" defaultValue={0.6} className="w-24" />
               <span className="text-xs text-slate-500 ml-2">0.6</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-slate-50 rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-4 py-3 border-b border-slate-200 bg-white flex items-center justify-between">
           <span className="text-sm font-semibold text-slate-900">命中结果 (Top 2)</span>
        </div>
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
           
           <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:border-indigo-300 transition-colors">
             <div className="flex justify-between items-start mb-2">
               <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded border border-indigo-100 flex items-center">
                 <FileText className="w-3.5 h-3.5 mr-1" /> ASR规则V1.docx
               </span>
               <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">相关度: 0.92</span>
             </div>
             <p className="text-sm text-slate-700 leading-relaxed mt-3 border-l-2 border-indigo-200 pl-3">
               ... <strong className="text-indigo-700 bg-indigo-50">数字统一转写为阿拉伯数字</strong>，以保证结果的标准化与一致性。例如将“一百二十三”转写为“123”。但是成语或固定搭配中的数字保持汉字，例如“十全十美”...
             </p>
           </div>

           <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:border-indigo-300 transition-colors">
             <div className="flex justify-between items-start mb-2">
               <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded border border-indigo-100 flex items-center">
                 <FileText className="w-3.5 h-3.5 mr-1" /> 错误样本集_06.csv
               </span>
               <span className="text-xs font-mono text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">相关度: 0.74</span>
             </div>
             <p className="text-sm text-slate-700 leading-relaxed mt-3 border-l-2 border-indigo-200 pl-3">
               ... 音频内容："我买了三斤苹果"，标注结果："我买了<strong className="text-indigo-700 bg-indigo-50">3</strong>斤苹果" (符合数字转写规范) ...
             </p>
           </div>

        </div>
      </div>
    </div>
  )
}

function KnowledgeHistory() {
  const history = [
    { version: 'V1.2', desc: '增加错误案例', date: '2026-06-22', user: 'qc_team', active: true },
    { version: 'V1.1', desc: '新增数字规范', date: '2026-06-15', user: 'admin', active: false },
    { version: 'V1.0', desc: '初始导入', date: '2026-05-20', user: 'system', active: false },
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
              className={cn(
                "p-4 border-b border-slate-100 cursor-pointer transition-colors relative",
                h.active ? "bg-indigo-50" : "hover:bg-slate-50"
              )}
            >
              {h.active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600"></div>}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <span className="font-semibold text-slate-900 mr-2">{h.version}</span>
                  {h.active && <span className="px-1.5 py-0.5 text-[10px] font-medium bg-emerald-100 text-emerald-700 rounded border border-emerald-200">当前生效</span>}
                </div>
                <span className="text-xs text-slate-500">{h.date}</span>
              </div>
              <p className="text-sm text-slate-600 mb-2">{h.desc}</p>
              <div className="flex items-center justify-between mt-3">
                 <div className="text-xs text-slate-400 flex items-center">
                   <Bot className="w-3 h-3 mr-1"/> {h.user}
                 </div>
                 <div className="flex items-center space-x-2">
                   {!h.active && <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700">回滚</button>}
                   <span className="text-slate-300">|</span>
                   <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700">查看详情</button>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 flex-col">
         <History className="w-12 h-12 mb-4 text-slate-300" />
         <p>选择一个历史版本查看变更记录或Diff比较</p>
      </div>
    </div>
  )
}

function KnowledgeAgents() {
  const agents = [
    { name: 'ASR标注Agent', role: '主要标注', useCount: 45032 },
    { name: 'ASR检查Agent', role: '二次校验', useCount: 12050 },
    { name: '标准标注工作流', role: '流式节点', useCount: 8930 },
  ];
  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
       <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
         <h3 className="font-semibold text-slate-900">当前引用此知识库的组件</h3>
         <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded border border-blue-200">3 个组件正在引用</span>
       </div>
       <div className="flex-1 overflow-auto p-0">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-white border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-medium">组件名称</th>
                <th className="px-6 py-3 font-medium">组件角色</th>
                <th className="px-6 py-3 font-medium">累计触发次数</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {agents.map((a, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 flex items-center">
                    <Bot className="w-4 h-4 text-orange-500 mr-2" />
                    {a.name}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{a.role}</td>
                  <td className="px-6 py-4 text-slate-600 font-mono">{a.useCount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
       </div>
    </div>
  )
}

function KnowledgeAnalytics() {
  return (
    <div className="w-full h-full space-y-6 overflow-y-auto pr-2">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
           <p className="text-sm font-medium text-slate-500 mb-1">包含文档数量</p>
           <p className="text-2xl font-bold text-slate-900">12</p>
         </div>
         <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
           <p className="text-sm font-medium text-slate-500 mb-1">总命中次数</p>
           <p className="text-2xl font-bold text-slate-900">66,012</p>
         </div>
         <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
           <p className="text-sm font-medium text-slate-500 mb-1">平均命中率</p>
           <p className="text-2xl font-bold text-emerald-600">89.4%</p>
         </div>
         <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
           <p className="text-sm font-medium text-slate-500 mb-1">知识块 (Chunks)</p>
           <p className="text-2xl font-bold text-indigo-600">1,204</p>
         </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
           <h3 className="font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">热门检索知识 TOP 5</h3>
           <div className="space-y-4">
             {[
               { rule: '数字转写规范', hits: 15420 },
               { rule: '无效停顿过滤', hits: 12300 },
               { rule: '英文缩写大小写', hits: 8904 },
               { rule: '标点符号规则', hits: 5402 },
               { rule: '语气词保留规则', hits: 3201 },
             ].map((r, i) => (
               <div key={i} className="flex justify-between items-center text-sm">
                 <span className="text-slate-700 flex items-center">
                   <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-xs text-slate-500 mr-2">{i+1}</span>
                   {r.rule}
                 </span>
                 <span className="font-mono text-slate-500">{r.hits.toLocaleString()} 次</span>
               </div>
             ))}
           </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col items-center justify-center text-slate-400">
           <BarChart2 className="w-12 h-12 mb-4 text-slate-300" />
           <p>调用趋势图表加载中...</p>
        </div>
      </div>
    </div>
  )
}

function NewKnowledgeDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="absolute inset-0 z-50 flex justify-end overflow-hidden">
       <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
       <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col relative z-10 animate-in slide-in-from-right duration-300">
         <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-white">
           <h2 className="text-lg font-semibold text-slate-900">新建知识库</h2>
           <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-md transition-colors">
             <AlertCircle className="w-5 h-5" />
           </button>
         </div>
         <div className="p-6 flex-1 overflow-y-auto space-y-6 bg-white">
           <div>
             <label className="block text-sm font-medium text-slate-700 mb-1.5">知识库名称 <span className="text-red-500">*</span></label>
             <input type="text" placeholder="例如：ASR情感标注规范" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm shadow-sm transition-shadow" />
           </div>
           
           <div>
             <label className="block text-sm font-medium text-slate-700 mb-2">类型</label>
             <div className="space-y-3">
               {[
                 { id: 'rule', name: '规则库', desc: '结构化的指导规则，直接干预Agent逻辑。' },
                 { id: 'case', name: '案例库', desc: '最佳实践或参考示例，用于Few-shot。' },
                 { id: 'doc', name: '文档库', desc: '长篇幅的操作手册或说明文档。' },
                 { id: 'error', name: '错误样本库', desc: '质检中发现的典型错误，防止Agent再犯。' },
                 { id: 'term', name: '术语库', desc: '行业特定名词、缩写对照表。' },
               ].map(t => (
                 <label key={t.id} className="flex items-start p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors bg-white">
                   <input type="radio" name="kbType" defaultChecked={t.id === 'rule'} className="mt-0.5 w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                   <div className="ml-3">
                     <span className="block text-sm font-medium text-slate-900">{t.name}</span>
                     <span className="block text-xs text-slate-500 mt-0.5">{t.desc}</span>
                   </div>
                 </label>
               ))}
             </div>
           </div>

           <div>
             <label className="block text-sm font-medium text-slate-700 mb-1.5">描述</label>
             <textarea 
               className="w-full h-24 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm shadow-sm transition-shadow resize-none"
               placeholder="简述该知识库的用途..."
             ></textarea>
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
