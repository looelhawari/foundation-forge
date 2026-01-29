import { useState, useEffect, useCallback } from "react";
import {
  projectsApi,
  Project,
  ProjectFormData,
  Category,
  PaginationInfo,
} from "@/lib/api";
import { toast } from "sonner";

interface UseProjectsOptions {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
  search?: string;
  featured?: boolean;
  isLegacy?: boolean;
}

export function useProjects(options: UseProjectsOptions = {}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await projectsApi.getAll(options);
      setProjects(response.data.projects);
      setPagination(response.data.pagination);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch projects";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [
    options.page,
    options.limit,
    options.category,
    options.status,
    options.search,
    options.featured,
    options.isLegacy,
  ]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, pagination, isLoading, error, refetch: fetchProjects };
}

export function useProject(identifier: string | number | undefined) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!identifier) {
      setIsLoading(false);
      return;
    }

    const fetchProject = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await projectsApi.getById(identifier);
        setProject(response.data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch project";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [identifier]);

  return { project, isLoading, error };
}

export function useProjectMutations() {
  const [isLoading, setIsLoading] = useState(false);

  const createProject = async (
    data: ProjectFormData,
  ): Promise<Project | null> => {
    setIsLoading(true);
    try {
      const response = await projectsApi.create(data);
      toast.success("Project created successfully");
      return response.data;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create project";
      toast.error(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProject = async (
    id: number,
    data: Partial<ProjectFormData>,
  ): Promise<Project | null> => {
    setIsLoading(true);
    try {
      const response = await projectsApi.update(id, data);
      toast.success("Project updated successfully");
      return response.data;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update project";
      toast.error(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (id: number): Promise<boolean> => {
    setIsLoading(true);
    try {
      await projectsApi.delete(id);
      toast.success("Project deleted successfully");
      return true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete project";
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { createProject, updateProject, deleteProject, isLoading };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await projectsApi.getCategories();
        setCategories(response.data);
      } catch {
        // Silent fail - categories will be empty
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading };
}

export function useProjectStats() {
  const [stats, setStats] = useState<{
    total: number;
    featured: number;
    byCategory: Array<{ category: string; count: number }>;
    byStatus: Array<{ status: string; count: number }>;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await projectsApi.getStats();
        setStats(response.data);
      } catch {
        // Silent fail
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, isLoading };
}
