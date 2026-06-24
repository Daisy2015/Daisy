/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { Dashboard } from './pages/Dashboard';
import { ResourceCenter } from './pages/ResourceCenter';
import { WorkflowCenter } from './pages/WorkflowCenter';
import { TaskCenter } from './pages/TaskCenter';
import { TaskDetails } from './pages/TaskDetails';
import { QualityInspection } from './pages/QualityInspection';
import { Page } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'resources':
        return <ResourceCenter />;
      case 'workflows':
        return <WorkflowCenter />;
      case 'tasks':
        return <TaskCenter onNavigate={setCurrentPage} />;
      case 'task_details':
        return <TaskDetails onNavigate={setCurrentPage} />;
      case 'inspection':
        return <QualityInspection />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

