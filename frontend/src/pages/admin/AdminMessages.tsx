import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { contactApi, ContactSubmission, PaginationInfo } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Building2,
  MoreHorizontal,
  MessageSquare,
  CheckCircle,
  Archive,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export default function AdminMessages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] =
    useState<ContactSubmission | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const page = parseInt(searchParams.get("page") || "1");
  const status = searchParams.get("status") || "";

  const fetchSubmissions = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await contactApi.getAll({
        page,
        limit: 15,
        status: status || undefined,
        search: search || undefined,
      });
      setSubmissions(response.data.submissions);
      setPagination(response.data.pagination);
    } catch {
      toast.error("Failed to load messages");
    } finally {
      setIsLoading(false);
    }
  }, [page, status, search]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (search) {
        params.set("search", search);
        params.set("page", "1");
      } else {
        params.delete("search");
      }
      setSearchParams(params);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, searchParams, setSearchParams]);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    setSearchParams(params);
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await contactApi.updateStatus(id, newStatus);
      toast.success("Status updated");
      fetchSubmissions();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await contactApi.delete(deleteId);
      toast.success("Message deleted");
      fetchSubmissions();
    } catch {
      toast.error("Failed to delete message");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const viewMessage = async (submission: ContactSubmission) => {
    setSelectedMessage(submission);
    if (submission.status === "new") {
      // Mark as read
      await handleStatusChange(submission.id, "read");
    }
  };

  const getStatusBadge = (messageStatus: string) => {
    const config: Record<
      string,
      {
        variant: "default" | "secondary" | "outline" | "destructive";
        icon: React.ReactNode;
      }
    > = {
      new: {
        variant: "default",
        icon: <MessageSquare className="h-3 w-3 mr-1" />,
      },
      read: { variant: "secondary", icon: <Eye className="h-3 w-3 mr-1" /> },
      responded: {
        variant: "outline",
        icon: <CheckCircle className="h-3 w-3 mr-1" />,
      },
      archived: {
        variant: "destructive",
        icon: <Archive className="h-3 w-3 mr-1" />,
      },
    };
    const { variant, icon } = config[messageStatus] || config.new;
    return (
      <Badge variant={variant} className="flex items-center">
        {icon}
        {messageStatus}
      </Badge>
    );
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">
            Messages
          </h1>
          <p className="text-muted-foreground">
            Contact form submissions and inquiries
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select
                value={status || "all"}
                onValueChange={(value) => handleFilterChange("status", value)}
              >
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="responded">Responded</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Messages Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">From</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    [...Array(5)].map((_, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <div className="space-y-1">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-40" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-48" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-24" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-5 w-16" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-8 w-8 ml-auto" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : submissions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-12">
                        <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                        <p className="text-muted-foreground">
                          No messages found
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    submissions.map((submission, idx) => (
                      <motion.tr
                        key={submission.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className={`border-b cursor-pointer hover:bg-muted/50 ${
                          submission.status === "new" ? "bg-primary/5" : ""
                        }`}
                        onClick={() => viewMessage(submission)}
                      >
                        <TableCell>
                          <div>
                            <p className="font-medium">{submission.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {submission.email}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="line-clamp-1">
                            {submission.subject ||
                              submission.message.substring(0, 50)}
                            ...
                          </p>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(submission.created_at)}
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          {getStatusBadge(submission.status)}
                        </TableCell>
                        <TableCell
                          className="text-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => viewMessage(submission)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(submission.id, "read")
                                }
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                Mark as Read
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(submission.id, "responded")
                                }
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark as Responded
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(submission.id, "archived")
                                }
                              >
                                <Archive className="mr-2 h-4 w-4" />
                                Archive
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => setDeleteId(submission.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </motion.tr>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Showing{" "}
                  {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}{" "}
                  to{" "}
                  {Math.min(
                    pagination.currentPage * pagination.itemsPerPage,
                    pagination.totalItems,
                  )}{" "}
                  of {pagination.totalItems} messages
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={!pagination.hasPrevPage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={!pagination.hasNextPage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Message Detail Modal */}
      <Dialog
        open={!!selectedMessage}
        onOpenChange={() => setSelectedMessage(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
            <DialogDescription>
              Received{" "}
              {selectedMessage && formatDate(selectedMessage.created_at)}
            </DialogDescription>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{selectedMessage.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                </div>
                {selectedMessage.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a
                        href={`tel:${selectedMessage.phone}`}
                        className="font-medium"
                      >
                        {selectedMessage.phone}
                      </a>
                    </div>
                  </div>
                )}
                {selectedMessage.company && (
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Company</p>
                      <p className="font-medium">{selectedMessage.company}</p>
                    </div>
                  </div>
                )}
              </div>

              {selectedMessage.subject && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Subject</p>
                  <p className="font-medium">{selectedMessage.subject}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground mb-1">Message</p>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                {getStatusBadge(selectedMessage.status)}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleStatusChange(selectedMessage.id, "responded")
                    }
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark Responded
                  </Button>
                  <Button size="sm" asChild>
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || "Your Inquiry"}`}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Reply via Email
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
