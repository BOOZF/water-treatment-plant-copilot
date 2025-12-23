
export enum ModuleType {
  ALARM_INTELLIGENCE = 'ALARM_INTELLIGENCE',
  PREDICTIVE_MAINTENANCE = 'PREDICTIVE_MAINTENANCE',
  KNOWLEDGE_COPILOT = 'KNOWLEDGE_COPILOT'
}

export interface AlarmSituation {
  id: string;
  title: string;
  riskScore: number; // 0-100
  criticalCount: number;
  warningCount: number;
  symptomCount: number;
  status: 'active' | 'investigating' | 'confirmed';
}

export interface AlarmItem {
  id: string;
  timestamp: string;
  assetName: string;
  description: string;
  isRootCause: boolean;
  type: 'CRITICAL' | 'WARNING' | 'SYMPTOM';
  explanation: string;
}

export interface AssetHealth {
  id: string;
  name: string;
  healthScore: number;
  direction: 'improving' | 'degrading' | 'stable';
  riskLevel: 'Low' | 'Medium' | 'High';
  operatingWindow: string; // e.g. "15-20 days"
  drivers: DegradationDriver[];
  lastTraining: string;
  modelVersion: string;
  confidence: number;
}

export interface DegradationDriver {
  name: string;
  currentValue: string;
  baseline: string;
  deviation: number;
  importance: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
