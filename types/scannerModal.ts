// Type definitions for Scanner Modal components

export enum ScanStatus {
  IDLE = 'idle',
  ANALYZING = 'analyzing',
  COMPLETE = 'complete',
  ERROR = 'error',
}

export enum ThreatLevel {
  SAFE = 'Safe',
  SUSPICIOUS = 'Suspicious',
  DANGER = 'Danger',
}

export interface ScanResult {
  threatLevel: ThreatLevel;
  summary: string;
  advice: string;
}
