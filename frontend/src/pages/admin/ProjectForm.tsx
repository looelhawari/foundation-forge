import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  useProject,
  useProjectMutations,
  useCategories,
} from "@/hooks/useProjects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Save,
  Loader2,
  Upload,
  X,
  Image as ImageIcon,
  Star,
  Trash2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { ProjectFormData, uploadApi, UploadedImage } from "@/lib/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ImageWithMeta {
  url: string;
  publicId?: string;
  isPoster: boolean;
  isUploading?: boolean;
  error?: string;
}

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { project, isLoading: isLoadingProject } = useProject(id);
  const { categories } = useCategories();
  const {
    createProject,
    updateProject,
    isLoading: isSaving,
  } = useProjectMutations();

  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    category: "",
    location: "",
    client: "",
    mainContractor: "",
    consultant: "",
    area: "",
    value: "",
    year: "",
    status: "completed",
    featured: false,
    isLegacy: false,
    images: [],
  });

  const [images, setImages] = useState<ImageWithMeta[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (project && isEdit) {
      setFormData({
        title: project.title || "",
        description: project.description || "",
        category: project.category || "",
        location: project.location || "",
        client: project.client || "",
        mainContractor: project.main_contractor || "",
        consultant: project.consultant || "",
        area: project.area || "",
        value: project.value || "",
        year: project.year || "",
        status: project.status || "completed",
        featured: project.featured || false,
        isLegacy: project.is_legacy || false,
        images: project.images || [],
      });

      // Parse existing images
      if (project.images && project.images.length > 0) {
        const existingImages: ImageWithMeta[] = project.images.map(
          (url, index) => {
            // Check if it's a full image object or just URL
            if (typeof url === "string") {
              return {
                url,
                isPoster: index === 0,
              };
            }
            return url as unknown as ImageWithMeta;
          },
        );
        setImages(existingImages);
      }
    }
  }, [project, isEdit]);

  const handleChange = (
    field: keyof ProjectFormData,
    value: string | boolean | string[],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = async (files: File[]) => {
    // Filter for image files only
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name),
    );

    if (imageFiles.length === 0) {
      toast.error(
        "Please select valid image files (jpg, jpeg, png, gif, webp)",
      );
      return;
    }

    if (imageFiles.length > 20) {
      toast.error("Maximum 20 images allowed at once");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate progress while uploading
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const response = await uploadApi.uploadImages(imageFiles);

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (response.data.images) {
        const newImages: ImageWithMeta[] = response.data.images.map(
          (img: UploadedImage, index: number) => ({
            url: img.url,
            publicId: img.publicId,
            isPoster: images.length === 0 && index === 0, // First image is poster if no images exist
          }),
        );

        setImages((prev) => [...prev, ...newImages]);
        toast.success(`${newImages.length} image(s) uploaded successfully`);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to upload images",
      );
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = async (index: number) => {
    const imageToRemove = images[index];

    // If image has publicId (uploaded to Cloudinary), delete it
    if (imageToRemove.publicId) {
      try {
        await uploadApi.deleteImage(imageToRemove.publicId);
      } catch (error) {
        console.error("Failed to delete image from Cloudinary:", error);
        // Continue with local removal even if cloud deletion fails
      }
    }

    setImages((prev) => {
      const newImages = prev.filter((_, i) => i !== index);
      // If removed image was poster, make first image the poster
      if (imageToRemove.isPoster && newImages.length > 0) {
        newImages[0].isPoster = true;
      }
      return newImages;
    });

    toast.success("Image removed");
  };

  const handleSetPoster = (index: number) => {
    setImages((prev) =>
      prev.map((img, i) => ({
        ...img,
        isPoster: i === index,
      })),
    );
    toast.success("Poster image updated");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare images data - reorder so poster is first
    const sortedImages = [...images].sort((a, b) => {
      if (a.isPoster) return -1;
      if (b.isPoster) return 1;
      return 0;
    });

    const imageUrls = sortedImages.map((img) => img.url);

    const submitData = {
      ...formData,
      images: imageUrls,
    };

    let result;
    if (isEdit && id) {
      result = await updateProject(parseInt(id), submitData);
    } else {
      result = await createProject(submitData);
    }

    if (result) {
      navigate("/admin/projects");
    }
  };

  if (isEdit && isLoadingProject) {
    return (
      <AdminLayout>
        <div className="admin-panel space-y-6 max-w-4xl">
          <Skeleton className="h-10 w-64" />
          <Card>
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="admin-panel space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => navigate("/admin/projects")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {isEdit ? "Edit Project" : "New Project"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isEdit
                  ? "Update project details"
                  : "Create a new construction project"}
              </p>
            </div>
          </div>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Project
              </>
            )}
          </Button>
        </div>

        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
            <CardDescription>Main details about the project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="e.g., Ministry of Education Parking Area"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Detailed description of the project..."
                  rows={4}
                />
              </div>

              {!formData.isLegacy && (
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  placeholder="e.g., Doha, Qatar"
                />
              </div>

              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) => handleChange("year", e.target.value)}
                  placeholder="e.g., 2023 or 2022-2023"
                />
              </div>

              <div className="flex items-center gap-3 sm:col-span-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) =>
                    handleChange("featured", checked)
                  }
                />
                <Label htmlFor="featured" className="cursor-pointer">
                  Featured project (displayed on Projects page)
                </Label>
              </div>

              <div className="flex items-center gap-3 sm:col-span-2">
                <Switch
                  id="isLegacy"
                  checked={formData.isLegacy}
                  onCheckedChange={(checked) => {
                    handleChange("isLegacy", checked);
                    // Clear category when marking as legacy
                    if (checked) {
                      handleChange("category", "");
                    }
                  }}
                />
                <Label htmlFor="isLegacy" className="cursor-pointer">
                  <span className="font-medium">Old Project</span>
                  <span className="text-muted-foreground ml-2 text-sm">
                    (Legacy project without category)
                  </span>
                </Label>
              </div>

              {formData.isLegacy && (
                <div className="sm:col-span-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    ⚠️ This project will be displayed in the "Old Projects" section without a category.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Client Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Client & Contractor</CardTitle>
            <CardDescription>Project stakeholders information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="client">Client</Label>
                <Input
                  id="client"
                  value={formData.client}
                  onChange={(e) => handleChange("client", e.target.value)}
                  placeholder="e.g., Ministry of Education"
                />
              </div>

              <div>
                <Label htmlFor="mainContractor">Main Contractor</Label>
                <Input
                  id="mainContractor"
                  value={formData.mainContractor}
                  onChange={(e) =>
                    handleChange("mainContractor", e.target.value)
                  }
                  placeholder="e.g., Mesopotamia For General Contracting"
                />
              </div>

              <div>
                <Label htmlFor="consultant">Consultant</Label>
                <Input
                  id="consultant"
                  value={formData.consultant}
                  onChange={(e) => handleChange("consultant", e.target.value)}
                  placeholder="e.g., Engineering Consultants LLC"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Project Details</CardTitle>
            <CardDescription>Technical specifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="area">Area</Label>
                <Input
                  id="area"
                  value={formData.area}
                  onChange={(e) => handleChange("area", e.target.value)}
                  placeholder="e.g., 11,400 m²"
                />
              </div>

              <div>
                <Label htmlFor="value">Project Value</Label>
                <Input
                  id="value"
                  value={formData.value}
                  onChange={(e) => handleChange("value", e.target.value)}
                  placeholder="e.g., 950,000 QR"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Project Images</CardTitle>
            <CardDescription>
              Upload images for the project gallery. Click on an image to set it
              as the poster (cover) image.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Upload Area */}
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-muted-foreground/50",
                isUploading && "pointer-events-none opacity-50",
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                onChange={handleFileSelect}
                className="hidden"
                id="image-upload"
              />

              {isUploading ? (
                <div className="space-y-3">
                  <Loader2 className="h-10 w-10 mx-auto text-primary animate-spin" />
                  <p className="text-sm font-medium">Uploading images...</p>
                  <Progress value={uploadProgress} className="w-64 mx-auto" />
                </div>
              ) : (
                <>
                  <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm font-medium mb-1">
                    Drag & drop images here, or{" "}
                    <label
                      htmlFor="image-upload"
                      className="text-primary hover:underline cursor-pointer"
                    >
                      browse
                    </label>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports JPG, PNG, GIF, WebP (max 10MB per file, up to 20
                    files)
                  </p>
                </>
              )}
            </div>

            {/* Images Grid */}
            {images.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    {images.length} image{images.length > 1 ? "s" : ""} uploaded
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <Star className="inline h-3 w-3 mr-1 text-primary" />
                    Click to set as poster
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className={cn(
                        "relative group rounded-lg overflow-hidden border-2 transition-all cursor-pointer",
                        img.isPoster
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-transparent hover:border-muted-foreground/30",
                      )}
                      onClick={() => handleSetPoster(index)}
                    >
                      <div className="aspect-video bg-muted">
                        <img
                          src={img.url}
                          alt={`Project image ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect fill='%23374151' width='100' height='100'/%3E%3Ctext fill='%239CA3AF' font-size='12' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EError%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>

                      {/* Poster Badge */}
                      {img.isPoster && (
                        <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5">
                          <Star className="h-2.5 w-2.5 mr-0.5" />
                          Poster
                        </Badge>
                      )}

                      {/* Delete Button */}
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(index);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>

                      {/* Hover Overlay */}
                      {!img.isPoster && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-xs font-medium">
                            Click to set as poster
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {images.length === 0 && !isUploading && (
              <div className="text-center py-4 text-muted-foreground">
                <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No images uploaded yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/projects")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving || isUploading}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isEdit ? "Update Project" : "Create Project"}
              </>
            )}
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}
