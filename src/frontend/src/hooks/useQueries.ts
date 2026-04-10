import { createActor } from "@/backend";
import type {
  AIAnalysis,
  ActivityEntry,
  ContactSubmission,
  CreateScanResult,
  Scan,
  SubmitContactInput,
  SystemStatus,
  ThreatEntry,
  ThreatEntryInput,
  ThreatResult,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useBackendActor() {
  return useActor(createActor);
}

// ── Contact ───────────────────────────────────────────────────────────────────
export function useListContactSubmissions() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ContactSubmission[]>({
    queryKey: ["contactSubmissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listContactSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContact() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: SubmitContactInput) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.submitContact(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contactSubmissions"] });
    },
  });
}

// ── Scans ─────────────────────────────────────────────────────────────────────
export function useListScans() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Scan[]>({
    queryKey: ["scans"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listScans();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000,
  });
}

export function useGetScan(id: bigint | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Scan | null>({
    queryKey: ["scan", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getScan(id);
    },
    enabled: !!actor && !isFetching && id !== null,
    refetchInterval: 3000,
  });
}

export function useCreateScan() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<
    CreateScanResult,
    Error,
    { target: string; scanMode: string }
  >({
    mutationFn: async ({ target, scanMode }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createScan(target, scanMode);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scans"] });
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });
}

export function useUpdateScanStatus() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, { id: bigint; status: string }>({
    mutationFn: async ({ id, status }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateScanStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scans"] });
    },
  });
}

// ── Threats ───────────────────────────────────────────────────────────────────
export function useListThreats() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ThreatEntry[]>({
    queryKey: ["threats"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listThreats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000,
  });
}

export function useLookupThreat() {
  const { actor } = useBackendActor();
  return useMutation<
    ThreatResult,
    Error,
    { indicator: string; indicatorType: string }
  >({
    mutationFn: async ({ indicator, indicatorType }) => {
      if (!actor) throw new Error("Not connected");
      return actor.lookupThreat(indicator, indicatorType);
    },
  });
}

export function useAddThreatEntry() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<ThreatEntry, Error, ThreatEntryInput>({
    mutationFn: async (entry) => {
      if (!actor) throw new Error("Not connected");
      return actor.addThreatEntry(entry);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threats"] });
    },
  });
}

// ── AI Analysis ───────────────────────────────────────────────────────────────
export function useListAnalyses() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<AIAnalysis[]>({
    queryKey: ["analyses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAnalyses();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000,
  });
}

export function useGetAnalysis(id: bigint | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<AIAnalysis | null>({
    queryKey: ["analysis", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getAnalysis(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useAnalyzeTarget() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<
    { result: unknown; ok?: AIAnalysis; err?: string },
    Error,
    { target: string; context: string }
  >({
    mutationFn: async ({ target, context }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.analyzeTarget(target, context);
      if (result.__kind__ === "err") throw new Error(result.err);
      return { result, ok: result.__kind__ === "ok" ? result.ok : undefined };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["analyses"] });
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });
}

// ── Activities ────────────────────────────────────────────────────────────────
export function useListActivities(limit = 20n) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ActivityEntry[]>({
    queryKey: ["activities", limit.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listActivities(limit);
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3000,
  });
}

// ── System Status ─────────────────────────────────────────────────────────────
export function useGetSystemStatus() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<SystemStatus>({
    queryKey: ["systemStatus"],
    queryFn: async () => {
      if (!actor) {
        return {
          activeScans: 0n,
          queueSize: 0n,
          aiEngineStatus: "offline",
          securityScore: 0n,
          apiStatuses: [],
        } as SystemStatus;
      }
      return actor.getSystemStatus();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000,
  });
}
