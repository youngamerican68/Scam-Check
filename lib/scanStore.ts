// lib/scanStore.ts
// Shared scan record storage (in-memory for dev, swap to Vercel KV for prod)

export interface ScanRecord {
  id: string;
  userId: string;
  source: "email_forward" | "clipboard" | "share_extension" | "manual";
  subjectSnippet: string;
  fromDomain: string;
  messageId: string;
  verdict: string;
  summary: string;
  tactics: string[];
  safeSteps: string[];
  confidence: number;
  createdAt: string;
}

// Use globalThis to persist across hot reloads in dev
const globalStore = globalThis as typeof globalThis & {
  __scanRecords?: ScanRecord[];
};

if (!globalStore.__scanRecords) {
  globalStore.__scanRecords = [];
}

/**
 * Store a scan record
 */
export function storeScanRecord(record: ScanRecord): void {
  globalStore.__scanRecords!.push(record);
  console.log("Stored scan record:", record.id, "Total:", globalStore.__scanRecords!.length);
}

/**
 * Get all scan records for a user
 */
export function getScanRecordsForUser(userId: string): ScanRecord[] {
  return globalStore.__scanRecords!.filter(r => r.userId === userId);
}

/**
 * Get all scan records (for debugging)
 */
export function getAllScanRecords(): ScanRecord[] {
  return globalStore.__scanRecords!;
}

/**
 * Check if a scan already exists for this user + messageId (dedupe)
 */
export function scanExistsForMessage(userId: string, messageId: string): boolean {
  if (!messageId) return false; // Can't dedupe without messageId
  return globalStore.__scanRecords!.some(
    r => r.userId === userId && r.messageId === messageId
  );
}

/**
 * Clear all records (for testing)
 */
export function clearAllScanRecords(): void {
  globalStore.__scanRecords = [];
}
