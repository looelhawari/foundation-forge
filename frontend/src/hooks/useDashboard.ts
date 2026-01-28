import { useState, useEffect, useCallback } from "react";
import { dashboardApi, DashboardStats } from "@/lib/api";
import { toast } from "sonner";

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await dashboardApi.getStats();
      setStats(response.data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch dashboard stats";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, isLoading, error, refetch: fetchStats };
}

export function useSettings() {
  const [settings, setSettings] = useState<
    Record<string, string | number | boolean>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await dashboardApi.getSettings();
        // Convert array of settings to object
        const settingsObj: Record<string, string | number | boolean> = {};
        response.data.settings.forEach((s) => {
          settingsObj[s.key] =
            s.value === "true" ? true : s.value === "false" ? false : s.value;
        });
        setSettings(settingsObj);
      } catch {
        // Silent fail
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const updateSettings = async (
    newSettings: Record<string, string | number | boolean>,
  ): Promise<boolean> => {
    setIsSaving(true);
    try {
      const response = await dashboardApi.updateSettings(newSettings);
      // Convert array of settings to object
      const settingsObj: Record<string, string | number | boolean> = {};
      response.data.settings.forEach((s) => {
        settingsObj[s.key] =
          s.value === "true" ? true : s.value === "false" ? false : s.value;
      });
      setSettings(settingsObj);
      toast.success("Settings updated successfully");
      return true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update settings";
      toast.error(message);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return { settings, isLoading, isSaving, updateSettings };
}
