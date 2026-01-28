import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDashboard } from "@/hooks/useDashboard";
import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FolderKanban,
  MessageSquare,
  TrendingUp,
  Clock,
  ArrowRight,
  Activity,
  Building2,
  Plus,
} from "lucide-react";

export default function AdminDashboard() {
  const { stats, isLoading } = useDashboard();

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      LOGIN: "Logged in",
      LOGOUT: "Logged out",
      CREATE_PROJECT: "Created project",
      UPDATE_PROJECT: "Updated project",
      DELETE_PROJECT: "Deleted project",
      UPDATE_CONTACT_STATUS: "Updated message status",
      DELETE_CONTACT: "Deleted message",
      UPDATE_SETTINGS: "Updated settings",
      UPDATE_PROFILE: "Updated profile",
      CHANGE_PASSWORD: "Changed password",
    };
    return labels[action] || action;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold tracking-tight">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your projects.
            </p>
          </div>
          <Button asChild>
            <Link to="/admin/projects/new">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Projects
                </CardTitle>
                <FolderKanban className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">
                      {stats?.projects.total || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {stats?.projects.byCategory.length || 0} categories
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  New Messages
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">
                      {stats?.contacts.new || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {stats?.contacts.recent7days || 0} in last 7 days
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Years Experience
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">
                      {stats?.settings?.years_experience ||
                        new Date().getFullYear() - 2017}
                    </div>
                    <p className="text-xs text-muted-foreground">Since 2017</p>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Happy Clients
                </CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">
                      {stats?.settings?.satisfied_clients || 45}+
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Satisfied customers
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Projects by Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderKanban className="h-5 w-5" />
                  Projects by Category
                </CardTitle>
                <CardDescription>
                  Distribution of projects across categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton key={i} className="h-8 w-full" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {stats?.projects.byCategory.map((cat) => (
                      <div
                        key={cat.category}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{cat.category}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{
                                width: `${(cat.count / (stats?.projects.total || 1)) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8 text-right">
                            {cat.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <Button variant="ghost" className="w-full mt-4" asChild>
                  <Link to="/admin/projects">
                    View all projects
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest actions in the system</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-3/4 mb-1" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {stats?.recentActivity.slice(0, 6).map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center gap-3"
                      >
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Clock className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {getActionLabel(activity.action)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.admin_name} •{" "}
                            {formatDate(activity.created_at)}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {activity.entity_type || "System"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/admin/projects/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Project
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/admin/messages">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  View Messages
                  {stats?.contacts.new ? (
                    <Badge variant="destructive" className="ml-2">
                      {stats.contacts.new}
                    </Badge>
                  ) : null}
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/admin/settings">Settings</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/" target="_blank">
                  View Website
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
