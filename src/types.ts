export type Page = 
  | 'dashboard'
  | 'resources'
  | 'workflows'
  | 'tasks'
  | 'task_details'
  | 'inspection';

export interface Task {
  id: string;
  name: string;
  status: 'completed' | 'running' | 'failed' | 'pending';
  progress: number;
  workflow: string;
  createdAt: string;
}

export interface Resource {
  id: string;
  name: string;
  type: 'dataset' | 'prompt' | 'knowledge' | 'agent' | 'tool';
  updatedAt: string;
}
