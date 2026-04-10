import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type CreateScanResult = {
    __kind__: "ok";
    ok: Scan;
} | {
    __kind__: "err";
    err: string;
};
export type Timestamp = bigint;
export interface AIVulnerability {
    title: string;
    description: string;
    severity: string;
    recommendation: string;
}
export interface ContactSubmission {
    id: SubmissionId;
    name: string;
    submittedAt: Timestamp;
    email: string;
    company: string;
    message: string;
}
export type SubmitContactResult = {
    __kind__: "ok";
    ok: SubmissionId;
} | {
    __kind__: "err";
    err: string;
};
export interface ThreatEntry {
    id: ThreatId;
    source: string;
    detectedAt: Timestamp;
    description: string;
    indicatorType: string;
    indicator: string;
    riskLevel: string;
}
export interface Scan {
    id: ScanId;
    status: string;
    completedAt?: Timestamp;
    startedAt: Timestamp;
    mode: string;
    progress: bigint;
    target: string;
    findings: Array<Finding>;
}
export interface ThreatResult {
    found: boolean;
    entry?: ThreatEntry;
    relatedThreats: Array<ThreatEntry>;
}
export interface APIStatus {
    status: string;
    name: string;
    lastChecked: Timestamp;
    responseTime: bigint;
}
export interface AIAnalysis {
    id: AnalysisId;
    completedAt: Timestamp;
    suggestions: Array<string>;
    thinking: string;
    target: string;
    vulnerabilities: Array<AIVulnerability>;
    riskScore: bigint;
}
export type SubmissionId = bigint;
export type AIAnalysisResult = {
    __kind__: "ok";
    ok: AIAnalysis;
} | {
    __kind__: "err";
    err: string;
};
export type ScanId = bigint;
export type ActivityId = bigint;
export type AnalysisId = bigint;
export type ThreatId = bigint;
export interface Finding {
    id: bigint;
    protocol?: string;
    title: string;
    port?: bigint;
    description: string;
    cvssScore: number;
    severity: string;
    findingType: string;
}
export interface ThreatEntryInput {
    source: string;
    description: string;
    indicatorType: string;
    indicator: string;
    riskLevel: string;
}
export interface ActivityEntry {
    id: ActivityId;
    message: string;
    timestamp: Timestamp;
    severity: string;
    eventType: ActivityEventType;
}
export interface SubmitContactInput {
    name: string;
    email: string;
    company: string;
    message: string;
}
export interface SystemStatus {
    aiEngineStatus: string;
    securityScore: bigint;
    apiStatuses: Array<APIStatus>;
    queueSize: bigint;
    activeScans: bigint;
}
export enum ActivityEventType {
    ScanComplete = "ScanComplete",
    VulnFound = "VulnFound",
    ThreatDetected = "ThreatDetected",
    APIHit = "APIHit",
    ScanStarted = "ScanStarted"
}
export interface backendInterface {
    addActivity(eventType: ActivityEventType, message: string, severity: string): Promise<ActivityEntry>;
    addThreatEntry(entry: ThreatEntryInput): Promise<ThreatEntry>;
    analyzeTarget(target: string, context: string): Promise<AIAnalysisResult>;
    createScan(target: string, scanMode: string): Promise<CreateScanResult>;
    getAnalysis(id: AnalysisId): Promise<AIAnalysis | null>;
    getScan(id: ScanId): Promise<Scan | null>;
    getSystemStatus(): Promise<SystemStatus>;
    listActivities(limit: bigint): Promise<Array<ActivityEntry>>;
    listAnalyses(): Promise<Array<AIAnalysis>>;
    listContactSubmissions(): Promise<Array<ContactSubmission>>;
    listScans(): Promise<Array<Scan>>;
    listThreats(): Promise<Array<ThreatEntry>>;
    lookupThreat(indicator: string, indicatorType: string): Promise<ThreatResult>;
    submitContact(input: SubmitContactInput): Promise<SubmitContactResult>;
    updateScanStatus(id: ScanId, status: string): Promise<boolean>;
}
