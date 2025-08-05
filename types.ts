export interface Template {
  prefix: string;
  suffix: string;
}

export interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  code: string;
  hasDOMPreview?: boolean;
  initialHTML?: string;
  template?: Template;
}

export type ViewMode = 'edit' | 'preview';

export enum LogType {
  LOG = 'log',
  ALERT = 'alert',
  ERROR = 'error'
}

export interface ConsoleMessage {
  type: LogType;
  message: string;
}