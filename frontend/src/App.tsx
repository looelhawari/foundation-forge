import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";
import ConsentBanner from "./components/ConsentBanner";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import { LanguageProvider } from "./i18n/LanguageContext";

// Public Pages - Index loaded immediately
import Index from "./pages/Index";

// Lazy load non-critical public pages for better performance
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Clients = lazy(() => import("./pages/Clients"));
const Contact = lazy(() => import("./pages/Contact"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Certificates = lazy(() => import("./pages/Certificates"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Lazy load Admin Pages
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminProjects = lazy(() => import("./pages/admin/AdminProjects"));
const AdminProjectView = lazy(() => import("./pages/admin/AdminProjectView"));
const ProjectForm = lazy(() => import("./pages/admin/ProjectForm"));
const AdminMessages = lazy(() => import("./pages/admin/AdminMessages"));
const AdminMessageView = lazy(() => import("./pages/admin/AdminMessageView"));
const AdminClients = lazy(() => import("./pages/admin/AdminClients"));
const AdminTestimonials = lazy(() => import("./pages/admin/AdminTestimonials"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-pulse text-primary text-lg">Loading...</div>
  </div>
);

const App = () => (
  <LanguageProvider>
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/certificates" element={<Certificates />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/projects"
                  element={
                    <ProtectedRoute>
                      <AdminProjects />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/projects/new"
                  element={
                    <ProtectedRoute>
                      <ProjectForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/projects/:id"
                  element={
                    <ProtectedRoute>
                      <AdminProjectView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/projects/:id/edit"
                  element={
                    <ProtectedRoute>
                      <ProjectForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/messages"
                  element={
                    <ProtectedRoute>
                      <AdminMessages />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/messages/:id"
                  element={
                    <ProtectedRoute>
                      <AdminMessageView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/clients"
                  element={
                    <ProtectedRoute>
                      <AdminClients />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/testimonials"
                  element={
                    <ProtectedRoute>
                      <AdminTestimonials />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/settings"
                  element={
                    <ProtectedRoute>
                      <AdminSettings />
                    </ProtectedRoute>
                  }
                />

                {/* Catch all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <ConsentBanner />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
  </LanguageProvider>
);

export default App;
