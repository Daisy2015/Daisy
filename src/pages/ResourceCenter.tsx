import React, { useState } from 'react';
import { Database, MessageSquare, BookOpen, Bot, Wrench, Search, Plus, Filter, MoreVertical, FileText } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { DatasetView } from '../components/dataset/DatasetView';
import { PromptView } from '../components/prompt/PromptView';
import { KnowledgeView } from '../components/knowledge/KnowledgeView';
import { AgentView } from '../components/agent/AgentView';
import { ToolView } from '../components/tool/ToolView';

type Tab = 'dataset' | 'prompt' | 'knowledge' | 'agent' | 'tool';

export function ResourceCenter() {
  const [activeTab, setActiveTab] = useState<Tab>('dataset');

  const tabs = [
    { id: 'dataset', label: '数据集', icon: Database, count: 125 },
    { id: 'prompt', label: 'Prompt', icon: MessageSquare, count: 36 },
    { id: 'knowledge', label: '知识库', icon: BookOpen, count: 15 },
    { id: 'agent', label: 'Agent', icon: Bot, count: 22 },
    { id: 'tool', label: '工具箱', icon: Wrench, count: 48 },
  ] as const;

  const mockData = {
    agent: [
      { id: '1', name: 'ASR_Base_Agent', desc: '基础语音转文本，支持多语种自动识别', version: 'v2.1.0' },
      { id: '2', name: 'Emotion_Detect_Agent', desc: '音频情感基调提取，支持7种基础情感', version: 'v1.4.2' },
    ]
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] -mx-8 -my-6">
      {/* Sidebar */}
      <div className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-sm font-semibold text-slate-900 tracking-wide uppercase">资源类型</h2>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-colors text-sm font-medium",
                activeTab === tab.id
                  ? "bg-white text-indigo-600 shadow-sm border border-slate-200/60"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent"
              )}
            >
              <div className="flex items-center">
                <tab.icon className={cn("w-4 h-4 mr-3", activeTab === tab.id ? "text-indigo-500" : "text-slate-400")} />
                {tab.label}
              </div>
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                activeTab === tab.id ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-500"
              )}>
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
        {activeTab === 'dataset' ? (
          <DatasetView />
        ) : activeTab === 'prompt' ? (
          <PromptView />
        ) : activeTab === 'knowledge' ? (
          <KnowledgeView />
        ) : activeTab === 'agent' ? (
          <AgentView />
        ) : activeTab === 'tool' ? (
          <ToolView />
        ) : (
          <>
            {/* Toolbar for other tabs */}
            <div className="h-16 border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 w-80">
                <Search className="w-4 h-4 text-slate-400 mr-2" />
                <input 
                  type="text" 
                  placeholder={`搜索${tabs.find(t => t.id === activeTab)?.label}...`}
                  className="bg-transparent border-none outline-none text-sm w-full placeholder-slate-400"
                />
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 shadow-sm">
                  <Filter className="w-4 h-4 mr-2" />
                  筛选
                </button>
                <button className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 shadow-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  新建资源
                </button>
              </div>
            </div>

            {/* List View for other tabs */}
            <div className="flex-1 overflow-auto p-6 bg-slate-50/30">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {activeTab === 'agent' && mockData.agent.map((item) => (
                  <div key={item.id} className="group border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer bg-white flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
                        <Bot className="w-5 h-5" />
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-md bg-slate-100 text-slate-600">
                        {item.version}
                      </span>
                    </div>
                    <h3 className="font-semibold text-slate-900 text-lg mb-2">{item.name}</h3>
                    <p className="text-sm text-slate-500 flex-1">{item.desc}</p>
                  </div>
                ))}

                {/* Empty state for others */}
                {(activeTab !== 'agent') && (
                  <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 border border-slate-100">
                      <BookOpen className="w-8 h-8 text-slate-300" />
                    </div>
                    <p>暂无数据，请先创建资源</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
