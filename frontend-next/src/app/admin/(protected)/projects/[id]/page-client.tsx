"use client";

import { useParams, Link, useNavigate } from "@/lib/router-compat";
import { motion } from "framer-motion";
import { useProject, useProjectMutations } from "@/hooks/useProjects";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
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
import {
  ArrowLeft,
  Pencil,
  Trash2,
  ExternalLink,
  MapPin,
  Calendar,
  Building2,
  User,
  Ruler,
  DollarSign,
  Wrench,
  Users,
  Star,
  Clock,
  Image as ImageIcon,
  FolderKanban,
} from "lucide-react";
import { useState } from "react";

export default function AdminProjectView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { project, isLoading, error } = useProject(id);
  const { deleteProject, isLoading: isDeleting } = useProjectMutations();
  const [selectedImage, setSelectedImage] = useState(0);

  const handleDelete = async () => {
    if (!project) return;
    const success = await deleteProject(project.id);
    if (success) {
      navigate("/admin/projects");
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: "bg-green-500/10 text-green-500 border-green-500/20",
      completed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      in_progress: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      archived: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    };
    return colors[status] || colors.active;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-96 w-full rounded-xl" />
              <Skeleton className="h-32 w-full rounded-xl" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-64 w-full rounded-xl" />
              <Skeleton className="h-48 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !project) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <FolderKanban className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Project Not Found</h2>
          <p className="text-muted-foreground mb-6">
            {error || "The project you're looking for doesn't exist."}
          </p>
          <Button asChild>
            <Link to="/admin/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>
      </AdminLayout>
    );
  }

  const detailItems = [
    { icon: MapPin, label: "Location", value: project.location },
    { icon: Calendar, label: "Year", value: project.year },
    { icon: User, label: "Client", value: project.client },
    {
      icon: Building2,
      label: "Main Contractor",
      value: project.main_contractor,
    },
    { icon: Users, label: "Consultant", value: project.consultant },
    {
      icon: Ruler,
      label: "Area",
      value: project.area ? `${project.area} sqm` : null,
    },
    {
      icon: DollarSign,
      label: "Value",
      value: project.value
        ? `QAR ${Number(project.value).toLocaleString()}`
        : null,
    },
  ].filter((item) => item.value);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link to="/admin/projects">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight">
                  {project.title}
                </h1>
                {project.featured && (
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    <Star className="h-3 w-3 mr-1 fill-primary" />
                    Featured
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                ID: {project.id} • Slug: {project.slug}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/projects/${project.slug}`} target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Public
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to={`/admin/projects/${project.id}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Project</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{project.title}"? This
                    action cannot be undone.
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
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-primary" />
                    Project Images
                    <Badge variant="secondary" className="ml-auto">
                      {project.images?.length || 0} images
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {project.images && project.images.length > 0 ? (
                    <div className="space-y-4">
                      {/* Main Image */}
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                        <img
                          src={project.images[selectedImage]}
                          alt={`${project.title} - Image ${selectedImage + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {selectedImage === 0 && (
                          <Badge className="absolute top-3 left-3 bg-primary">
                            <Star className="h-3 w-3 mr-1" />
                            Poster
                          </Badge>
                        )}
                      </div>
                      {/* Thumbnail Grid */}
                      {project.images.length > 1 && (
                        <div className="grid grid-cols-6 gap-2">
                          {project.images.map((img, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedImage(idx)}
                              className={`relative aspect-video rounded-md overflow-hidden border-2 transition-all ${
                                selectedImage === idx
                                  ? "border-primary ring-2 ring-primary/20"
                                  : "border-transparent hover:border-primary/50"
                              }`}
                            >
                              <img
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                              {idx === 0 && (
                                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                  <Star className="h-3 w-3 text-primary fill-primary" />
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No images uploaded</p>
                        <Button
                          variant="link"
                          size="sm"
                          asChild
                          className="mt-2"
                        >
                          <Link to={`/admin/projects/${project.id}/edit`}>
                            Add images
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  {project.description ? (
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                      {project.description}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No description provided
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Status & Category</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Status
                    </span>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Category
                    </span>
                    <Badge variant="outline">{project.category}</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Featured
                    </span>
                    <Badge variant={project.featured ? "default" : "secondary"}>
                      {project.featured ? "Yes" : "No"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Project Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-primary" />
                    Project Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {detailItems.length > 0 ? (
                    <div className="space-y-4">
                      {detailItems.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                            <item.icon className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground">
                              {item.label}
                            </p>
                            <p className="text-sm font-medium truncate">
                              {item.value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No details available
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Metadata
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Created</p>
                    <p className="text-sm">{formatDate(project.created_at)}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Last Updated
                    </p>
                    <p className="text-sm">{formatDate(project.updated_at)}</p>
                  </div>
                  {project.created_by_name && (
                    <>
                      <Separator />
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Created By
                        </p>
                        <p className="text-sm">{project.created_by_name}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
