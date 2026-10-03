import { BLoCStreamEvent, CreateStreamEventParams } from "../types/stream";

let eventSequence = 0;

export const createStreamEvent = (
  params: CreateStreamEventParams,
): BLoCStreamEvent => {
  eventSequence += 1;
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const ms = now.getMilliseconds().toString().padStart(3, "0");

  return {
    id: `evt-${params.projectId}-${eventSequence}`,
    timestamp: `${hours}:${minutes}:${seconds}.${ms}`,
    projectId: params.projectId,
    source: params.source,
    type: params.type,
    tag: params.tag,
    name: params.name,
    stateName: params.stateName,
    details: params.details,
    payload: params.payload,
    latencyMs: params.latencyMs ?? 0.8,
  };
};
