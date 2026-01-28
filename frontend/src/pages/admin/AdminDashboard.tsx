import { useState, useMemo } from "react";
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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FolderKanban,
  MessageSquare,
  TrendingUp,
  Activity,
  Plus,
  Users,
  Calendar,
  Target,
  BarChart3,
  PieChart,
  Eye,
  FileText,
  Download,
  ArrowUpRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  Area,
  AreaChart,
  Legend,
} from "recharts";

// Chart colors
const COLORS = [
  "#f59e0b",
  "#3b82f6",
  "#10b981",
  "#8b5cf6",
  "#ef4444",
  "#06b6d4",
  "#f97316",
  "#84cc16",
];

export default function AdminDashboard() {
  const { stats, isLoading } = useDashboard();
  const [timeRange, setTimeRange] = useState("7d");

  // Process data for charts
  const categoryChartData = useMemo(() => {
    if (!stats?.projects.byCategory) return [];
    return stats.projects.byCategory.map((cat, index) => ({
      name:
        cat.category.length > 15
          ? cat.category.substring(0, 15) + "..."
          : cat.category,
      fullName: cat.category,
      value: cat.count,
      fill: COLORS[index % COLORS.length],
    }));
  }, [stats]);

  const projectsTotal = stats?.projects.total || 0;
  const messagesNew = stats?.contacts.new || 0;
  const messagesRecent = stats?.contacts.recent7days || 0;

  // Mock monthly data for trend chart (in real app, this would come from API)
  const monthlyTrendData = [
    { month: "Jan", projects: 3, messages: 12 },
    { month: "Feb", projects: 5, messages: 18 },
    { month: "Mar", projects: 4, messages: 15 },
    { month: "Apr", projects: 7, messages: 22 },
    { month: "May", projects: 6, messages: 19 },
    { month: "Jun", projects: 8, messages: 25 },
  ];

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

  const getActionIcon = (action: string) => {
    if (action.includes("PROJECT"))
      return <FolderKanban className="h-3.5 w-3.5" />;
    if (action.includes("CONTACT") || action.includes("MESSAGE"))
      return <MessageSquare className="h-3.5 w-3.5" />;
    if (action.includes("LOGIN") || action.includes("LOGOUT"))
      return <Users className="h-3.5 w-3.5" />;
    return <Activity className="h-3.5 w-3.5" />;
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
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Custom tooltip for charts
  interface TooltipPayload {
    value: number;
    name: string;
    color: string;
  }

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: TooltipPayload[];
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <AdminLayout>
      <div className="admin-panel space-y-6">
        {/* Header with Quick Actions */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Dashboard Overview
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Track your projects, messages, and business performance
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
              <Button size="sm" asChild>
                <Link to="/admin/projects/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Actions Bar - Prominent placement */}
          <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20">
            <CardContent className="py-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground mr-2">
                  Quick Actions:
                </span>
                <Button size="sm" variant="default" asChild>
                  <Link to="/admin/projects/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Project
                  </Link>
                </Button>
                <Button size="sm" variant="secondary" asChild>
                  <Link to="/admin/messages">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Messages
                    {messagesNew > 0 && (
                      <Badge variant="destructive" className="ml-2 text-[10px]">
                        {messagesNew}
                      </Badge>
                    )}
                  </Link>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/admin/projects">
                    <FolderKanban className="mr-2 h-4 w-4" />
                    All Projects
                  </Link>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/admin/settings">
                    <FileText className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </Button>
                <Button size="sm" variant="ghost" asChild>
                  <Link to="/" target="_blank">
                    <Eye className="mr-2 h-4 w-4" />
                    View Site
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full -mr-10 -mt-10" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Projects
                </CardTitle>
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FolderKanban className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <>
                    <div className="text-3xl font-bold tracking-tight">
                      {projectsTotal}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Badge
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        {stats?.projects.byCategory.length || 0} categories
                      </Badge>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* New Messages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -mr-10 -mt-10" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  New Messages
                </CardTitle>
                <div className="h-9 w-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <>
                    <div className="text-3xl font-bold tracking-tight">
                      {messagesNew}
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span>{messagesRecent} this week</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Years of Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -mr-10 -mt-10" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Years Experience
                </CardTitle>
                <div className="h-9 w-9 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <>
                    <div className="text-3xl font-bold tracking-tight">
                      {stats?.settings?.years_experience ||
                        new Date().getFullYear() - 2017}
                      +
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Since 2017
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Happy Clients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -mr-10 -mt-10" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Happy Clients
                </CardTitle>
                <div className="h-9 w-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-500" />
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <>
                    <div className="text-3xl font-bold tracking-tight">
                      {stats?.settings?.satisfied_clients || 45}+
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Satisfied customers
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-7">
          {/* Projects Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-4"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Performance Overview
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Monthly projects and inquiries trend
                  </CardDescription>
                </div>
                <Tabs
                  value={timeRange}
                  onValueChange={setTimeRange}
                  className="w-auto"
                >
                  <TabsList className="h-8">
                    <TabsTrigger value="7d" className="text-xs px-2 h-6">
                      7D
                    </TabsTrigger>
                    <TabsTrigger value="30d" className="text-xs px-2 h-6">
                      30D
                    </TabsTrigger>
                    <TabsTrigger value="90d" className="text-xs px-2 h-6">
                      90D
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyTrendData}>
                      <defs>
                        <linearGradient
                          id="colorProjects"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#f59e0b"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#f59e0b"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorMessages"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#3b82f6"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#3b82f6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="month"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="projects"
                        name="Projects"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorProjects)"
                      />
                      <Area
                        type="monotone"
                        dataKey="messages"
                        name="Inquiries"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorMessages)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="lg:col-span-3"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  Projects by Category
                </CardTitle>
                <CardDescription className="text-xs">
                  Distribution across {categoryChartData.length} categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[240px] flex items-center justify-center">
                    <Skeleton className="h-40 w-40 rounded-full" />
                  </div>
                ) : (
                  <div className="h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPie>
                        <Pie
                          data={categoryChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {categoryChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number) => [value, "Projects"]}
                        />
                      </RechartsPie>
                    </ResponsiveContainer>
                  </div>
                )}
                {/* Legend */}
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {categoryChartData.slice(0, 6).map((cat, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-xs"
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                        style={{ backgroundColor: cat.fill }}
                      />
                      <span className="truncate text-muted-foreground">
                        {cat.name}
                      </span>
                      <span className="font-medium ml-auto">{cat.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Latest system actions and updates
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-9 w-9 rounded-lg" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-3/4 mb-1" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {stats?.recentActivity
                      .slice(0, 7)
                      .map((activity, index) => (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                            {getActionIcon(activity.action)}
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
                          <Badge
                            variant="outline"
                            className="text-[10px] font-normal"
                          >
                            {activity.entity_type || "System"}
                          </Badge>
                        </motion.div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            {/* Performance Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground">Response Rate</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground">
                      Project Completion
                    </span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground">
                      Client Satisfaction
                    </span>
                    <span className="font-medium">98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Category Breakdown Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Projects Distribution by Category
              </CardTitle>
              <CardDescription className="text-xs">
                Detailed breakdown of all project categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </div>
              ) : (
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={categoryChartData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                        horizontal={true}
                        vertical={false}
                      />
                      <XAxis
                        type="number"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        width={95}
                      />
                      <Tooltip
                        formatter={(value: number) => [
                          value + " projects",
                          "Count",
                        ]}
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {categoryChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
