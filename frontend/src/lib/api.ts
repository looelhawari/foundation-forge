// API configuration
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

// Generic fetch wrapper with error handling
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem("admin_token");

  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    // Handle token expiration
    if (response.status === 401) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      window.location.href = "/admin/login";
    }
    throw new Error(data.message || "An error occurred");
  }

  return data;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginationInfo {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ProjectsListResponse {
  projects: Project[];
  pagination: PaginationInfo;
}

export interface ContactListResponse {
  submissions: ContactSubmission[];
  pagination: PaginationInfo;
}

export interface SettingsResponse {
  settings: Array<{ key: string; value: string }>;
}

// Admin Types
export interface Admin {
  id: number;
  email: string;
  name: string;
  created_at?: string;
  last_login?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  admin: Admin;
}

// Project Types
export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  category: string;
  location: string | null;
  client: string | null;
  main_contractor: string | null;
  consultant: string | null;
  area: string | null;
  value: string | null;
  year: string | null;
  status: "active" | "completed" | "in_progress" | "archived";
  featured: boolean;
  images: string[];
  created_at: string;
  updated_at: string;
  created_by?: number;
  created_by_name?: string;
}

export interface ProjectFormData {
  title: string;
  description?: string;
  category: string;
  location?: string;
  client?: string;
  mainContractor?: string;
  consultant?: string;
  area?: string;
  value?: string;
  year?: string;
  status?: string;
  featured?: boolean;
  images?: string[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
  is_active: boolean;
  project_count: number;
}

// Contact Types
export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  status: "new" | "read" | "responded" | "archived";
  created_at: string;
  updated_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
}

// Dashboard Types
export interface DashboardStats {
  projects: {
    total: number;
    byCategory: Array<{ category: string; count: number }>;
  };
  contacts: {
    new: number;
    recent7days: number;
  };
  recentActivity: Array<{
    id: number;
    admin_id: number;
    admin_name: string;
    action: string;
    entity_type: string | null;
    entity_id: number | null;
    details: Record<string, unknown> | null;
    created_at: string;
  }>;
  settings: Record<string, string | number | boolean>;
}

// Auth API
export const authApi = {
  login: (credentials: LoginCredentials) =>
    fetchApi<ApiResponse<LoginResponse>>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  getProfile: () => fetchApi<ApiResponse<Admin>>("/auth/me"),

  updateProfile: (data: Partial<Admin>) =>
    fetchApi<ApiResponse<Admin>>("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    fetchApi<ApiResponse<null>>("/auth/password", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  verifyToken: () =>
    fetchApi<ApiResponse<{ valid: boolean; admin: Admin }>>("/auth/verify"),

  logout: () =>
    fetchApi<ApiResponse<null>>("/auth/logout", {
      method: "POST",
    }),
};

// Projects API
export const projectsApi = {
  getAll: (params?: {
    page?: number;
    limit?: number;
    category?: string;
    status?: string;
    search?: string;
    featured?: boolean;
    sortBy?: string;
    sortOrder?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(key, String(value));
        }
      });
    }
    return fetchApi<ApiResponse<ProjectsListResponse>>(
      `/projects?${searchParams.toString()}`,
    );
  },

  getById: (id: number | string) =>
    fetchApi<ApiResponse<Project>>(`/projects/${id}`),

  getBySlug: (slug: string) =>
    fetchApi<ApiResponse<Project>>(`/projects/${slug}`),

  create: (data: ProjectFormData) =>
    fetchApi<ApiResponse<Project>>("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: number, data: Partial<ProjectFormData>) =>
    fetchApi<ApiResponse<Project>>(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    fetchApi<ApiResponse<null>>(`/projects/${id}`, {
      method: "DELETE",
    }),

  getCategories: () =>
    fetchApi<ApiResponse<Category[]>>("/projects/categories"),

  getStats: () =>
    fetchApi<
      ApiResponse<{
        total: number;
        featured: number;
        byCategory: Array<{ category: string; count: number }>;
        byStatus: Array<{ status: string; count: number }>;
      }>
    >("/projects/stats"),
};

// Contact API
export const contactApi = {
  submit: (data: ContactFormData) =>
    fetchApi<ApiResponse<{ id: number }>>("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getAll: (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(key, String(value));
        }
      });
    }
    return fetchApi<ApiResponse<ContactListResponse>>(
      `/contact?${searchParams.toString()}`,
    );
  },

  getById: (id: number) =>
    fetchApi<ApiResponse<ContactSubmission>>(`/contact/${id}`),

  updateStatus: (id: number, status: string) =>
    fetchApi<ApiResponse<ContactSubmission>>(`/contact/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  delete: (id: number) =>
    fetchApi<ApiResponse<null>>(`/contact/${id}`, {
      method: "DELETE",
    }),

  getStats: () =>
    fetchApi<
      ApiResponse<{
        total: number;
        recent24h: number;
        byStatus: Array<{ status: string; count: number }>;
      }>
    >("/contact/stats"),
};

// Dashboard API
export const dashboardApi = {
  getStats: () => fetchApi<ApiResponse<DashboardStats>>("/dashboard/stats"),

  getActivityLogs: (params?: {
    page?: number;
    limit?: number;
    action?: string;
    adminId?: number;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(key, String(value));
        }
      });
    }
    return fetchApi<ApiResponse<unknown>>(
      `/dashboard/activity?${searchParams.toString()}`,
    );
  },

  getSettings: () =>
    fetchApi<ApiResponse<SettingsResponse>>("/dashboard/settings"),

  updateSettings: (settings: Record<string, string | number | boolean>) =>
    fetchApi<ApiResponse<SettingsResponse>>("/dashboard/settings", {
      method: "PUT",
      body: JSON.stringify(settings),
    }),
};

export default {
  auth: authApi,
  projects: projectsApi,
  contact: contactApi,
  dashboard: dashboardApi,
};
