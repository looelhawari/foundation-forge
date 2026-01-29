import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { testimonialsApi, Testimonial, PaginationInfo } from "@/lib/api";
import { Button } from "@/components/ui/button";
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
  DialogFooter,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  Trash2,
  Eye,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Mail,
  Building2,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { format, formatDistanceToNow } from "date-fns";

const statusConfig: Record<
  string,
  { label: string; color: string; icon: React.ReactNode }
> = {
  pending: {
    label: "Pending",
    color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    icon: <Clock className="h-3 w-3" />,
  },
  approved: {
    label: "Approved",
    color: "bg-green-500/10 text-green-500 border-green-500/20",
    icon: <CheckCircle className="h-3 w-3" />,
  },
  declined: {
    label: "Declined",
    color: "bg-red-500/10 text-red-500 border-red-500/20",
    icon: <XCircle className="h-3 w-3" />,
  },
};

export default function AdminTestimonials() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [stats, setStats] = useState<{
    total: number;
    byStatus: Array<{ status: string; count: number }>;
    pendingExpiringSoon: number;
    featured: number;
  } | null>(null);

  const page = parseInt(searchParams.get("page") || "1");
  const status = searchParams.get("status") || "";

  const fetchTestimonials = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await testimonialsApi.getAll({
        page,
        limit: 15,
        status: status || undefined,
      });
      setTestimonials(response.data.testimonials);
      setPagination(response.data.pagination);
    } catch {
      toast.error("Failed to load testimonials");
    } finally {
      setIsLoading(false);
    }
  }, [page, status]);

  const fetchStats = async () => {
    try {
      const response = await testimonialsApi.getStats();
      setStats(response.data);
    } catch {
      // Silent fail for stats
    }
  };

  useEffect(() => {
    fetchTestimonials();
    fetchStats();
  }, [fetchTestimonials]);

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

  const handleApprove = async (id: number, is_featured?: boolean) => {
    try {
      await testimonialsApi.approve(id, is_featured);
      toast.success("Testimonial approved successfully");
      fetchTestimonials();
      fetchStats();
      setSelectedTestimonial(null);
    } catch {
      toast.error("Failed to approve testimonial");
    }
  };

  const handleDecline = async (id: number) => {
    try {
      await testimonialsApi.decline(id);
      toast.success("Testimonial declined and removed");
      fetchTestimonials();
      fetchStats();
      setSelectedTestimonial(null);
    } catch {
      toast.error("Failed to decline testimonial");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await testimonialsApi.delete(deleteId);
      toast.success("Testimonial deleted successfully");
      fetchTestimonials();
      fetchStats();
    } catch {
      toast.error("Failed to delete testimonial");
    } finally {
      setDeleteId(null);
    }
  };

  const toggleFeatured = async (testimonial: Testimonial) => {
    try {
      await testimonialsApi.update(testimonial.id, {
        is_featured: !testimonial.is_featured,
      });
      toast.success(
        `Testimonial ${testimonial.is_featured ? "unfeatured" : "featured"} successfully`,
      );
      fetchTestimonials();
      fetchStats();
    } catch {
      toast.error("Failed to update testimonial");
    }
  };

  const getStatusCount = (statusName: string) => {
    return stats?.byStatus.find((s) => s.status === statusName)?.count || 0;
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i < rating
                ? "fill-yellow-500 text-yellow-500"
                : "text-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">
            Testimonials
          </h1>
          <p className="text-muted-foreground">
            Manage customer reviews and testimonials
          </p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-xl font-bold">{stats.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card
              className={
                getStatusCount("pending") > 0 ? "border-yellow-500/50" : ""
              }
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-yellow-500/10">
                    <Clock className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-xl font-bold">
                      {getStatusCount("pending")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Approved</p>
                    <p className="text-xl font-bold">
                      {getStatusCount("approved")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-yellow-500/10">
                    <Star className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Featured</p>
                    <p className="text-xl font-bold">{stats.featured}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Expiring Soon Warning */}
        {stats && stats.pendingExpiringSoon > 0 && (
          <Card className="border-orange-500/50 bg-orange-500/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <p className="text-sm">
                  <strong>{stats.pendingExpiringSoon}</strong> pending
                  testimonial(s) will expire within 24 hours. Review them before
                  they are automatically deleted.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Label>Filter by Status:</Label>
              <Select
                value={status || "all"}
                onValueChange={(value) => handleFilterChange("status", value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reviewer</TableHead>
                  <TableHead>Testimonial</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-48" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-24 ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : testimonials.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12">
                      <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                      <p className="text-muted-foreground">
                        No testimonials found
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  testimonials.map((testimonial, idx) => (
                    <motion.tr
                      key={testimonial.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className={`border-b cursor-pointer hover:bg-muted/50 ${
                        testimonial.status === "pending"
                          ? "bg-yellow-500/5"
                          : ""
                      }`}
                      onClick={() => setSelectedTestimonial(testimonial)}
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {testimonial.client_name}
                          </p>
                          {testimonial.company_name && (
                            <p className="text-sm text-muted-foreground">
                              {testimonial.position
                                ? `${testimonial.position}, `
                                : ""}
                              {testimonial.company_name}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="line-clamp-2 max-w-xs">
                          {testimonial.content}
                        </p>
                      </TableCell>
                      <TableCell>{renderStars(testimonial.rating)}</TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Badge
                          className={statusConfig[testimonial.status].color}
                        >
                          {statusConfig[testimonial.status].icon}
                          <span className="ml-1">
                            {statusConfig[testimonial.status].label}
                          </span>
                        </Badge>
                        {testimonial.is_featured &&
                          testimonial.status === "approved" && (
                            <Badge variant="outline" className="ml-1">
                              <Star className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
                              Featured
                            </Badge>
                          )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        <div>
                          {format(
                            new Date(testimonial.submitted_at),
                            "MMM d, yyyy",
                          )}
                          {testimonial.status === "pending" &&
                            testimonial.expires_at && (
                              <p className="text-xs text-orange-500">
                                Expires{" "}
                                {formatDistanceToNow(
                                  new Date(testimonial.expires_at),
                                  { addSuffix: true },
                                )}
                              </p>
                            )}
                        </div>
                      </TableCell>
                      <TableCell
                        className="text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-2">
                          {testimonial.status === "pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleApprove(testimonial.id)}
                                className="text-green-500 hover:text-green-600 hover:bg-green-500/10"
                              >
                                <ThumbsUp className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDecline(testimonial.id)}
                                className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                              >
                                <ThumbsDown className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {testimonial.status === "approved" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleFeatured(testimonial)}
                            >
                              <Star
                                className={`h-4 w-4 ${
                                  testimonial.is_featured
                                    ? "fill-yellow-500 text-yellow-500"
                                    : "text-muted-foreground"
                                }`}
                              />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteId(testimonial.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>

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
                  of {pagination.totalItems} testimonials
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

        {/* View Testimonial Dialog */}
        <Dialog
          open={!!selectedTestimonial}
          onOpenChange={() => setSelectedTestimonial(null)}
        >
          <DialogContent className="max-w-lg">
            {selectedTestimonial && (
              <>
                <DialogHeader>
                  <DialogTitle>Testimonial Details</DialogTitle>
                  <DialogDescription>
                    Submitted{" "}
                    {format(
                      new Date(selectedTestimonial.submitted_at),
                      "PPP 'at' p",
                    )}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    {selectedTestimonial.company_logo ? (
                      <img
                        src={selectedTestimonial.company_logo}
                        alt=""
                        className="h-16 w-16 object-contain rounded bg-white p-2 border"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded bg-muted flex items-center justify-center">
                        <User className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-lg">
                        {selectedTestimonial.client_name}
                      </p>
                      {selectedTestimonial.company_name && (
                        <p className="text-muted-foreground">
                          {selectedTestimonial.position
                            ? `${selectedTestimonial.position}, `
                            : ""}
                          {selectedTestimonial.company_name}
                        </p>
                      )}
                      <div className="mt-1">
                        {renderStars(selectedTestimonial.rating)}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="italic">"{selectedTestimonial.content}"</p>
                  </div>

                  {(selectedTestimonial.email || selectedTestimonial.phone) && (
                    <div className="flex flex-wrap gap-4 text-sm">
                      {selectedTestimonial.email && (
                        <a
                          href={`mailto:${selectedTestimonial.email}`}
                          className="flex items-center gap-2 text-primary hover:underline"
                        >
                          <Mail className="h-4 w-4" />
                          {selectedTestimonial.email}
                        </a>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <Badge
                      className={statusConfig[selectedTestimonial.status].color}
                    >
                      {statusConfig[selectedTestimonial.status].icon}
                      <span className="ml-1">
                        {statusConfig[selectedTestimonial.status].label}
                      </span>
                    </Badge>

                    {selectedTestimonial.status === "pending" &&
                      selectedTestimonial.expires_at && (
                        <p className="text-sm text-orange-500">
                          <Clock className="inline h-3 w-3 mr-1" />
                          Expires{" "}
                          {formatDistanceToNow(
                            new Date(selectedTestimonial.expires_at),
                            { addSuffix: true },
                          )}
                        </p>
                      )}
                  </div>

                  {selectedTestimonial.status === "approved" && (
                    <div className="flex items-center gap-2">
                      <Switch
                        id="featured"
                        checked={selectedTestimonial.is_featured}
                        onCheckedChange={() => {
                          toggleFeatured(selectedTestimonial);
                          setSelectedTestimonial({
                            ...selectedTestimonial,
                            is_featured: !selectedTestimonial.is_featured,
                          });
                        }}
                      />
                      <Label htmlFor="featured">Featured Testimonial</Label>
                    </div>
                  )}
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2">
                  {selectedTestimonial.status === "pending" && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => handleDecline(selectedTestimonial.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <ThumbsDown className="h-4 w-4 mr-2" />
                        Decline
                      </Button>
                      <Button
                        onClick={() =>
                          handleApprove(selectedTestimonial.id, true)
                        }
                        variant="outline"
                      >
                        <Star className="h-4 w-4 mr-2" />
                        Approve & Feature
                      </Button>
                      <Button
                        onClick={() => handleApprove(selectedTestimonial.id)}
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                    </>
                  )}
                  {selectedTestimonial.status !== "pending" && (
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setDeleteId(selectedTestimonial.id);
                        setSelectedTestimonial(null);
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  )}
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this testimonial? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
}
