"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "@/lib/router-compat";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { contactApi, ContactSubmission } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Trash2,
  Mail,
  Phone,
  Building2,
  Calendar,
  Clock,
  User,
  MessageSquare,
  CheckCircle,
  Archive,
  Eye,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export default function AdminMessageView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState<ContactSubmission | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessage = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const response = await contactApi.getById(parseInt(id));
        setMessage(response.data);
      } catch (error) {
        toast.error("Failed to load message");
        navigate("/admin/messages");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessage();
  }, [id, navigate]);

  const handleStatusChange = async (newStatus: string) => {
    if (!message) return;
    try {
      const response = await contactApi.updateStatus(message.id, newStatus);
      setMessage(response.data);
      toast.success("Status updated successfully");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!message) return;
    setIsDeleting(true);
    try {
      await contactApi.delete(message.id);
      toast.success("Message deleted successfully");
      navigate("/admin/messages");
    } catch {
      toast.error("Failed to delete message");
    } finally {
      setIsDeleting(false);
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success(`${field} copied to clipboard`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const getStatusConfig = (status: string) => {
    const configs: Record<
      string,
      {
        variant: "default" | "secondary" | "outline" | "destructive";
        icon: React.ReactNode;
        label: string;
        color: string;
      }
    > = {
      new: {
        variant: "default",
        icon: <MessageSquare className="h-4 w-4" />,
        label: "New",
        color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      },
      read: {
        variant: "secondary",
        icon: <Eye className="h-4 w-4" />,
        label: "Read",
        color: "bg-gray-500/10 text-gray-500 border-gray-500/20",
      },
      responded: {
        variant: "outline",
        icon: <CheckCircle className="h-4 w-4" />,
        label: "Responded",
        color: "bg-green-500/10 text-green-500 border-green-500/20",
      },
      archived: {
        variant: "destructive",
        icon: <Archive className="h-4 w-4" />,
        label: "Archived",
        color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      },
    };
    return configs[status] || configs.new;
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-8 w-64" />
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Skeleton className="h-96" />
            </div>
            <div>
              <Skeleton className="h-64" />
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!message) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Message Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The message you're looking for doesn't exist or has been deleted.
          </p>
          <Button asChild>
            <Link to="/admin/messages">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Messages
            </Link>
          </Button>
        </div>
      </AdminLayout>
    );
  }

  const statusConfig = getStatusConfig(message.status);

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/admin/messages">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Message Details</h1>
              <p className="text-sm text-muted-foreground">ID: #{message.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" disabled={isDeleting}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Message</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this message? This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Message Card */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">
                      {message.subject || "No Subject"}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      From {message.name}
                    </CardDescription>
                  </div>
                  <Badge className={statusConfig.color}>
                    {statusConfig.icon}
                    <span className="ml-1">{statusConfig.label}</span>
                  </Badge>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <div className="bg-muted/50 rounded-lg p-6 whitespace-pre-wrap text-foreground leading-relaxed">
                    {message.message}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    onClick={() =>
                      window.open(
                        `mailto:${message.email}?subject=Re: ${message.subject || "Your Inquiry"}`,
                      )
                    }
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Reply via Email
                  </Button>
                  {message.phone && (
                    <Button
                      variant="outline"
                      onClick={() => window.open(`tel:${message.phone}`)}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(message.email, "Email")}
                  >
                    {copiedField === "Email" ? (
                      <Check className="h-4 w-4 mr-2" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    Copy Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        Name
                      </p>
                      <p className="font-medium">{message.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        Email
                      </p>
                      <a
                        href={`mailto:${message.email}`}
                        className="font-medium text-primary hover:underline break-all"
                      >
                        {message.email}
                      </a>
                    </div>
                  </div>

                  {message.phone && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Phone className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          Phone
                        </p>
                        <a
                          href={`tel:${message.phone}`}
                          className="font-medium text-primary hover:underline"
                        >
                          {message.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {message.company && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Building2 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          Company
                        </p>
                        <p className="font-medium">{message.company}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Status & Meta Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Status & Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                    Status
                  </p>
                  <Select
                    value={message.status}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-blue-500" />
                          New
                        </div>
                      </SelectItem>
                      <SelectItem value="read">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-gray-500" />
                          Read
                        </div>
                      </SelectItem>
                      <SelectItem value="responded">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Responded
                        </div>
                      </SelectItem>
                      <SelectItem value="archived">
                        <div className="flex items-center gap-2">
                          <Archive className="h-4 w-4 text-orange-500" />
                          Archived
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Received</p>
                      <p className="text-sm font-medium">
                        {format(new Date(message.created_at), "PPP 'at' p")}
                      </p>
                    </div>
                  </div>

                  {message.updated_at !== message.created_at && (
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Last Updated
                        </p>
                        <p className="text-sm font-medium">
                          {format(new Date(message.updated_at), "PPP 'at' p")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
}
