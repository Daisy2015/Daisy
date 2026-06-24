import React, { useState } from 'react';
import { 
  Database, Search, Plus, Filter, MoreVertical, FileText, ArrowLeft, 
  PlayCircle, History, AlertTriangle, CheckCircle2, 
  UploadCloud, X, Clock, User, HardDrive, Play, Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { cn } from '@/src/lib/utils';

export function DatasetView() {
  const [selectedDataset, setSelectedDataset] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const mockDatasets = [
    { 
      id: '1', 
      name: '通话录音数据集_V1', 
      count: 12356, 
      size: '8.2 GB', 
      status: '可用',
      format: 'WAV/Text', 
      updatedAt: '2026-06-20',
      creator: 'admin'
    },
    { 
      id: '2', 
      name: '客服语音数据集', 
      count: 5234, 
      size: '3.5 GB', 
      status: '处理中',
      format: 'WAV/JSON', 
      updatedAt: '2026-06-18',
      creator: 'admin'
    },
    { 
      id: '3', 
      name: 'ASR训练数据集', 
      count: 56832, 
      size: '18.0 GB', 
      status: '可用',
      format: 'MP3/CSV', 
      updatedAt: '2026-06-15',
      creator: 'system'
    },
  ];

  return (
    <div className="flex flex-col h-full relative">
      {selectedDataset ? (
        <DatasetDetails dataset={selectedDataset} onBack={() => setSelectedDataset(null)} />
      ) : (
        <>
          {/* Toolbar */}
          <div className="h-16 border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
            <h2 className="text-lg font-semibold text-slate-900">数据集管理</h2>
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 w-64">
                <Search className="w-4 h-4 text-slate-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="搜索数据集..."
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
                新建数据集
              </button>
            </div>
          </div>

          {/* List View */}
          <div className="flex-1 overflow-auto p-6 bg-slate-50/50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mockDatasets.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedDataset(item)}
                  className="group border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer bg-white relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                      <Database className="w-6 h-6" />
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
                    <span>{item.count.toLocaleString()} 条</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span>{item.size}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs pt-4 border-t border-slate-100 mt-2">
                    <div className="text-slate-400">
                      创建于 {item.updatedAt}
                    </div>
                    <span className={cn(
                      "px-2 py-0.5 rounded-md font-medium border",
                      item.status === '可用' ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-blue-50 text-blue-700 border-blue-200"
                    )}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <NewDatasetDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
}

function DatasetDetails({ dataset, onBack }: { dataset: any, onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('preview');

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center">
           <button onClick={onBack} className="mr-4 p-1.5 text-slate-400 hover:bg-slate-100 rounded-md transition-colors">
             <ArrowLeft className="w-5 h-5" />
           </button>
           <h2 className="text-xl font-semibold text-slate-900">{dataset.name}</h2>
           <span className={cn(
              "ml-3 px-2.5 py-1 text-xs font-medium border rounded-md",
              dataset.status === '可用' ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-blue-50 text-blue-700 border-blue-200"
           )}>
             {dataset.status}
           </span>
        </div>
        <div className="flex space-x-3">
          <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-md text-sm font-medium hover:bg-slate-50 shadow-sm">
            导出数据
          </button>
          <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 flex items-center shadow-sm">
            <PlayCircle className="w-4 h-4 mr-2" /> 发起任务
          </button>
        </div>
      </div>
      
      <div className="bg-white border-b border-slate-200 px-6 shrink-0">
        <div className="flex space-x-6">
          <TabButton active={activeTab==='info'} onClick={()=>setActiveTab('info')}>基础信息</TabButton>
          <TabButton active={activeTab==='preview'} onClick={()=>setActiveTab('preview')}>数据预览</TabButton>
          <TabButton active={activeTab==='stats'} onClick={()=>setActiveTab('stats')}>统计分析</TabButton>
          <TabButton active={activeTab==='history'} onClick={()=>setActiveTab('history')}>导入记录</TabButton>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
         {activeTab === 'info' && <DatasetInfo dataset={dataset} />}
         {activeTab === 'preview' && <DatasetPreview dataset={dataset} />}
         {activeTab === 'stats' && <DatasetStats dataset={dataset} />}
         {activeTab === 'history' && <DatasetHistory dataset={dataset} />}
      </div>
    </div>
  )
}

function TabButton({ active, onClick, children }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "py-3 text-sm font-medium border-b-2 transition-colors",
        active 
          ? "border-indigo-600 text-indigo-600" 
          : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
      )}
    >
      {children}
    </button>
  )
}

function DatasetPreview({ dataset }: { dataset: any }) {
  const audios = [
    { id: 'audio_001.wav', duration: '00:15', text: '您好，请问需要办理什么业务？', tags: ['Happy', 'Clear'] },
    { id: 'audio_002.wav', duration: '00:22', text: '我想查询一下套餐，你们现在有什么优惠吗？', tags: ['Neutral'] },
    { id: 'audio_003.wav', duration: '00:08', text: '对，就是这个号码。', tags: ['Neutral', 'Short'] },
    { id: 'audio_004.wav', duration: '00:35', text: '我昨天办理的退款为什么还没有到账，你们效率也太慢了吧！', tags: ['Angry', 'Complaint'] },
    { id: 'audio_005.wav', duration: '00:12', text: '好的，谢谢你的帮助。', tags: ['Happy'] },
  ];
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div className="flex items-center space-x-3">
           <div className="relative">
             <Search className="w-4 h-4 absolute left-3 top-2 text-slate-400" />
             <input type="text" placeholder="搜索文件名或文本..." className="pl-9 pr-3 py-1.5 text-sm border border-slate-200 rounded-md w-72 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white" />
           </div>
           <button className="flex items-center px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50">
              <Filter className="w-4 h-4 mr-2" /> 筛选
           </button>
        </div>
        <div className="text-sm text-slate-500 font-medium">
          共 {dataset.count.toLocaleString()} 条数据
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-0">
        <table className="w-full text-sm text-left">
           <thead className="text-xs text-slate-500 bg-white border-b border-slate-200 sticky top-0 z-10">
             <tr>
               <th className="px-6 py-3 font-medium w-64">文件名</th>
               <th className="px-6 py-3 font-medium w-32">时长</th>
               <th className="px-6 py-3 font-medium">转写文本</th>
               <th className="px-6 py-3 font-medium w-48">标签</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-slate-100">
             {audios.map(a => (
               <tr key={a.id} className="hover:bg-slate-50 group cursor-pointer transition-colors">
                 <td className="px-6 py-4 font-medium text-slate-900 flex items-center">
                   <button className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mr-3 hover:bg-indigo-100 transition-colors shrink-0">
                     <Play className="w-4 h-4 ml-0.5" />
                   </button>
                   <span className="truncate">{a.id}</span>
                 </td>
                 <td className="px-6 py-4 text-slate-500 font-mono text-xs">{a.duration}</td>
                 <td className="px-6 py-4 text-slate-700">{a.text}</td>
                 <td className="px-6 py-4">
                   <div className="flex flex-wrap gap-1">
                     {a.tags.map(t => (
                       <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs border border-slate-200">{t}</span>
                     ))}
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

function DatasetStats({ dataset }: { dataset: any }) {
  const durationData = [
    { name: '0-5s', count: 1200 },
    { name: '5-10s', count: 4500 },
    { name: '10-30s', count: 5100 },
    { name: '30-60s', count: 1200 },
    { name: '>60s', count: 356 },
  ];
  
  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316'];
  const tagData = [
    { name: 'Neutral', value: 6500 },
    { name: 'Happy', value: 2400 },
    { name: 'Angry', value: 1200 },
    { name: 'Sad', value: 900 },
    { name: 'Other', value: 1356 },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <StatCard label="音频数量" value={dataset.count.toLocaleString()} />
         <StatCard label="总时长" value="365 小时" />
         <StatCard label="平均时长" value="18 秒" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
           <h3 className="text-sm font-semibold text-slate-900 mb-4">时长分布</h3>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={durationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                 <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                 <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={50} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
           <h3 className="text-sm font-semibold text-slate-900 mb-4">情感标签分布</h3>
           <div className="h-64 flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie data={tagData} innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value" stroke="none">
                   {tagData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                   ))}
                 </Pie>
                 <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
               </PieChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function DatasetInfo({ dataset }: { dataset: any }) {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-base font-semibold text-slate-900 mb-6">基本信息</h3>
        <div className="grid grid-cols-2 gap-y-6 gap-x-12">
          <InfoItem icon={FileText} label="数据集名称" value={dataset.name} />
          <InfoItem icon={Database} label="音频数量" value={dataset.count.toLocaleString()} />
          <InfoItem icon={HardDrive} label="总容量" value={dataset.size} />
          <InfoItem icon={Clock} label="创建时间" value={dataset.updatedAt} />
          <InfoItem icon={User} label="创建人" value={dataset.creator} />
          <InfoItem icon={Activity} label="状态" value={dataset.status} />
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-semibold text-slate-900">数据质量报告 (自动质检)</h3>
          <span className="px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200 flex items-center">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> 质检完成
          </span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
            <p className="text-xs text-slate-500 mb-1">总文件数</p>
            <p className="text-xl font-semibold text-slate-900">{dataset.count.toLocaleString()}</p>
          </div>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <p className="text-xs text-emerald-600 mb-1">正常文件</p>
            <p className="text-xl font-semibold text-emerald-700">{(dataset.count - 155).toLocaleString()}</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border border-red-100">
            <p className="text-xs text-red-600 mb-1">异常文件</p>
            <p className="text-xl font-semibold text-red-700">155</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <p className="text-xs text-blue-600 mb-1">质量评分</p>
            <p className="text-xl font-semibold text-blue-700">98.7</p>
          </div>
        </div>
        
        <h4 className="text-sm font-medium text-slate-900 mb-3">异常详情</h4>
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-medium">检查项</th>
                <th className="px-4 py-3 font-medium">异常数量</th>
                <th className="px-4 py-3 font-medium">说明</th>
                <th className="px-4 py-3 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="bg-white hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-medium text-slate-900 flex items-center"><AlertTriangle className="w-4 h-4 text-amber-500 mr-2" /> 空文件 (0KB)</td>
                <td className="px-4 py-3 text-amber-600 font-medium">12</td>
                <td className="px-4 py-3 text-slate-500">文件大小为0</td>
                <td className="px-4 py-3 text-right"><button className="text-indigo-600 hover:text-indigo-700 text-xs font-medium">查看</button></td>
              </tr>
              <tr className="bg-white hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-medium text-slate-900 flex items-center"><AlertTriangle className="w-4 h-4 text-red-500 mr-2" /> 损坏文件</td>
                <td className="px-4 py-3 text-red-600 font-medium">3</td>
                <td className="px-4 py-3 text-slate-500">无法解码或播放</td>
                <td className="px-4 py-3 text-right"><button className="text-indigo-600 hover:text-indigo-700 text-xs font-medium">查看</button></td>
              </tr>
              <tr className="bg-white hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-medium text-slate-900 flex items-center"><AlertTriangle className="w-4 h-4 text-amber-500 mr-2" /> 文本缺失</td>
                <td className="px-4 py-3 text-amber-600 font-medium">140</td>
                <td className="px-4 py-3 text-slate-500">对应转写文本为空</td>
                <td className="px-4 py-3 text-right"><button className="text-indigo-600 hover:text-indigo-700 text-xs font-medium">查看</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function InfoItem({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex items-start">
      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 mr-4 text-slate-500 shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500 mb-1">{label}</p>
        <p className="text-sm font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function DatasetHistory({ dataset }: { dataset: any }) {
  const history = [
    { version: 'V3', type: '增量导入', date: '2026-06-25 14:30:00', status: '成功', user: 'admin', changes: '+ 1,200 条' },
    { version: 'V2', type: '增量导入', date: '2026-06-22 09:15:22', status: '成功', user: 'admin', changes: '+ 3,156 条' },
    { version: 'V1', type: '初始导入', date: '2026-06-20 10:00:00', status: '成功', user: 'system', changes: '8,000 条' },
  ];
  return (
    <div className="max-w-4xl bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-slate-500 bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 font-medium">版本</th>
            <th className="px-6 py-4 font-medium">导入类型</th>
            <th className="px-6 py-4 font-medium">数据变化</th>
            <th className="px-6 py-4 font-medium">状态</th>
            <th className="px-6 py-4 font-medium">操作人</th>
            <th className="px-6 py-4 font-medium text-right">时间</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {history.map((h, i) => (
            <tr key={i} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-semibold text-slate-900">{h.version}</td>
              <td className="px-6 py-4 text-slate-600">{h.type}</td>
              <td className="px-6 py-4 text-emerald-600 font-medium">{h.changes}</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200">
                  {h.status}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-500">{h.user}</td>
              <td className="px-6 py-4 text-right text-slate-500 tabular-nums">{h.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function NewDatasetDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="absolute inset-0 z-50 flex justify-end overflow-hidden">
       <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
       <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col relative z-10 animate-in slide-in-from-right duration-300">
         <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-white">
           <h2 className="text-lg font-semibold text-slate-900">新建数据集</h2>
           <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-md transition-colors">
             <X className="w-5 h-5" />
           </button>
         </div>
         <div className="p-6 flex-1 overflow-y-auto space-y-6 bg-white">
           <div>
             <label className="block text-sm font-medium text-slate-700 mb-1.5">数据集名称 <span className="text-red-500">*</span></label>
             <input type="text" placeholder="例如：客服中英文混合录音" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm shadow-sm transition-shadow" />
           </div>
           
           <div>
             <label className="block text-sm font-medium text-slate-700 mb-2">数据来源</label>
             <div className="flex space-x-6">
               <label className="flex items-center space-x-2 cursor-pointer">
                 <input type="radio" name="source" defaultChecked className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                 <span className="text-sm text-slate-700">本地上传</span>
               </label>
               <label className="flex items-center space-x-2 cursor-pointer">
                 <input type="radio" name="source" className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                 <span className="text-sm text-slate-700">服务器路径</span>
               </label>
             </div>
           </div>
           
           <div>
             <label className="block text-sm font-medium text-slate-700 mb-1.5">上传文件</label>
             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors cursor-pointer group bg-slate-50">
               <div className="space-y-2 text-center">
                 <UploadCloud className="mx-auto h-12 w-12 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                 <div className="flex text-sm text-slate-600 justify-center">
                   <span className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-700 focus-within:outline-none">
                     <span>点击选择文件</span>
                   </span>
                   <p className="pl-1">或拖拽文件到此区域</p>
                 </div>
                 <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                   支持 ZIP 压缩包或包含 WAV/MP3 及文本标注的文件夹，单个文件最大 50GB
                 </p>
               </div>
             </div>
           </div>
           
           <div>
             <label className="block text-sm font-medium text-slate-700 mb-1.5">描述 (可选)</label>
             <textarea rows={3} placeholder="简要描述数据集的用途、特征等..." className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-none shadow-sm transition-shadow"></textarea>
           </div>
         </div>
         <div className="px-6 py-4 border-t border-slate-200 flex justify-end space-x-3 bg-slate-50 shrink-0">
           <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 shadow-sm transition-colors">
             取消
           </button>
           <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 shadow-sm transition-colors">
             开始导入
           </button>
         </div>
       </div>
    </div>
  )
}
