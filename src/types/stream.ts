export type StreamEventType =
  | "bloc_event"
  | "bloc_state"
  | "bridge_call"
  | "sqlite_queue"
  | "telemetry";

export interface BLoCStreamEvent {
  id: string;
  timestamp: string; // e.g. "14:22:01.342"
  projectId: string;
  source: string; // e.g. "NcdsScreen", "PintoScreen", "PosScreen"
  type: StreamEventType;
  tag: string; // e.g. "EVENT", "STATE", "BRIDGE", "SQLITE"
  name: string; // e.g. "UpdateGlucoseEvent"
  stateName?: string; // e.g. "RiskEvaluatedState"
  details: string; // concise description of values
  payload?: Record<string, unknown>;
  latencyMs?: number;
}

export interface CreateStreamEventParams {
  projectId: string;
  source: string;
  type: StreamEventType;
  tag: string;
  name: string;
  stateName?: string;
  details: string;
  payload?: Record<string, unknown>;
  latencyMs?: number;
}
