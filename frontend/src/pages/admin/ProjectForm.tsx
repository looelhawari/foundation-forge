import { useState, useEffect } from "react";
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
import { ArrowLeft, Save, Loader2, Plus, X, Image } from "lucide-react";
import { ProjectFormData } from "@/lib/api";

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

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
    images: [],
  });

  const [newImageUrl, setNewImageUrl] = useState("");

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
        images: project.images || [],
      });
    }
  }, [project, isEdit]);

  const handleChange = (
    field: keyof ProjectFormData,
    value: string | boolean | string[],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), newImageUrl.trim()],
      }));
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let result;
    if (isEdit && id) {
      result = await updateProject(parseInt(id), formData);
    } else {
      result = await createProject(formData);
    }

    if (result) {
      navigate("/admin/projects");
    }
  };

  if (isEdit && isLoadingProject) {
    return (
      <AdminLayout>
        <div className="space-y-6 max-w-4xl">
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
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
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
              <h1 className="text-3xl font-display font-bold tracking-tight">
                {isEdit ? "Edit Project" : "New Project"}
              </h1>
              <p className="text-muted-foreground">
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
            <CardTitle>Basic Information</CardTitle>
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
                  Featured project (displayed on homepage)
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Info */}
        <Card>
          <CardHeader>
            <CardTitle>Client & Contractor</CardTitle>
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
            <CardTitle>Project Details</CardTitle>
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
            <CardTitle>Project Images</CardTitle>
            <CardDescription>
              Add image URLs for the project gallery
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Enter image URL..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddImage();
                  }
                }}
              />
              <Button
                type="button"
                onClick={handleAddImage}
                variant="secondary"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {formData.images && formData.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {formData.images.map((url, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-video rounded-lg border overflow-hidden bg-muted">
                      <img
                        src={url}
                        alt={`Project image ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "";
                          (e.target as HTMLImageElement).alt = "Invalid image";
                        }}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {(!formData.images || formData.images.length === 0) && (
              <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
                <Image className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p>No images added yet</p>
                <p className="text-sm">Add image URLs above</p>
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
          <Button type="submit" disabled={isSaving}>
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
