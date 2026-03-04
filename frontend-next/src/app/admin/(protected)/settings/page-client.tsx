"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useAuth } from "@/hooks/useAuth";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { siteSettingsApi, authApi, type SiteSettings } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Lock,
  Globe,
  Mail,
  Building2,
  Save,
  Loader2,
  Eye,
  EyeOff,
  Phone,
  MapPin,
  Share2,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminSettings() {
  const { admin, refreshProfile } = useAuth();
  const { refresh: refreshGlobalSettings } = useSiteSettings();
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Profile state
  const [profile, setProfile] = useState({
    name: admin?.name || "",
    email: admin?.email || "",
  });

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Site settings state — matches the site_settings DB columns
  const [settings, setSettings] = useState<Partial<SiteSettings>>({
    site_name: "",
    public_location: "",
    head_office_address: "",
    contact_email: "",
    contact_phone: "",
    contact_phone_2: "",
    contact_telephone: "",
    contact_fax: "",
    po_box: "",
    google_maps_url: "",
    facebook_url: "",
    show_facebook: false,
    instagram_url: "",
    show_instagram: false,
    linkedin_url: "",
    show_linkedin: false,
    twitter_url: "",
    show_twitter: false,
  });

  // Track which fields the user has actually changed
  const [dirtyFields, setDirtyFields] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    if (admin) {
      setProfile({ name: admin.name, email: admin.email });
    }
  }, [admin]);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const response = await siteSettingsApi.get();
      if (response.success && response.data) {
        setSettings(response.data);
      }
    } catch {
      // Settings might not exist yet, use defaults
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await authApi.updateProfile(profile);
      // Refresh the admin profile to get updated data
      await refreshProfile();
      toast.success("Profile updated successfully");
    } catch (err: unknown) {
      const error = err as { message?: string };
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsSaving(true);
    try {
      await authApi.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success("Password changed successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: unknown) {
      const error = err as { message?: string };
      toast.error(error.message || "Failed to change password");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSettingsUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (dirtyFields.size === 0) {
      toast.info("No changes to save");
      return;
    }

    setIsSaving(true);
    try {
      // Only send fields the user actually changed
      const payload: Partial<SiteSettings> = {};
      for (const key of dirtyFields) {
        (payload as Record<string, unknown>)[key] = (settings as Record<string, unknown>)[key];
      }

      const res = await siteSettingsApi.update(payload);
      if (res.success && res.data) {
        setSettings(res.data);
      }
      setDirtyFields(new Set());
      // Refresh the global context so Footer/Contact update immediately
      await refreshGlobalSettings();
      toast.success("Site settings updated successfully");
    } catch (err: unknown) {
      const error = err as { message?: string };
      toast.error(error.message || "Failed to update settings");
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = (key: keyof SiteSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setDirtyFields((prev) => new Set(prev).add(key));
  };

  const updateToggle = (key: keyof SiteSettings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setDirtyFields((prev) => new Set(prev).add(key));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account and site settings
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="site" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Site
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your account details and email address
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) =>
                          setProfile({ ...profile, email: e.target.value })
                        }
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="mr-2 h-4 w-4" />
                      )}
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Ensure your account is using a strong password
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPasswords.current ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              currentPassword: e.target.value,
                            })
                          }
                          placeholder="Enter current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() =>
                            setShowPasswords({
                              ...showPasswords,
                              current: !showPasswords.current,
                            })
                          }
                        >
                          {showPasswords.current ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showPasswords.new ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              newPassword: e.target.value,
                            })
                          }
                          placeholder="Enter new password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() =>
                            setShowPasswords({
                              ...showPasswords,
                              new: !showPasswords.new,
                            })
                          }
                        >
                          {showPasswords.new ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Confirm New Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showPasswords.confirm ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              confirmPassword: e.target.value,
                            })
                          }
                          placeholder="Confirm new password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() =>
                            setShowPasswords({
                              ...showPasswords,
                              confirm: !showPasswords.confirm,
                            })
                          }
                        >
                          {showPasswords.confirm ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Lock className="mr-2 h-4 w-4" />
                      )}
                      Change Password
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Site Settings Tab */}
          <TabsContent value="site">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {isLoading ? (
                <Card>
                  <CardContent className="flex items-center justify-center py-16">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    <span className="ml-3 text-muted-foreground">Loading settings…</span>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={handleSettingsUpdate} className="space-y-6">
                  {/* General Settings */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        General Information
                      </CardTitle>
                      <CardDescription>
                        Company name and public location
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="site_name">Site / Company Name *</Label>
                        <Input
                          id="site_name"
                          value={settings.site_name || ""}
                          onChange={(e) =>
                            updateSetting("site_name", e.target.value)
                          }
                          placeholder="Cosmo Projects & Construction"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="public_location">Public Location *</Label>
                        <Input
                          id="public_location"
                          value={settings.public_location || ""}
                          onChange={(e) =>
                            updateSetting("public_location", e.target.value)
                          }
                          placeholder="Doha, Qatar"
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          Short location shown in CTAs and footer (e.g. &quot;Doha, Qatar&quot;)
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Phone className="h-5 w-5" />
                        Contact Information
                      </CardTitle>
                      <CardDescription>
                        Email, phone, fax, and head office address
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="contact_email">
                            <Mail className="inline h-4 w-4 mr-1" />
                            Contact Email *
                          </Label>
                          <Input
                            id="contact_email"
                            type="email"
                            value={settings.contact_email || ""}
                            onChange={(e) =>
                              updateSetting("contact_email", e.target.value)
                            }
                            placeholder="Info@ctgroups.net"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contact_phone">
                            <Phone className="inline h-4 w-4 mr-1" />
                            Phone 1 (Primary) *
                          </Label>
                          <Input
                            id="contact_phone"
                            value={settings.contact_phone || ""}
                            onChange={(e) =>
                              updateSetting("contact_phone", e.target.value)
                            }
                            placeholder="+974 XXXX-XXXX"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="contact_phone_2">
                            <Phone className="inline h-4 w-4 mr-1" />
                            Phone 2
                          </Label>
                          <Input
                            id="contact_phone_2"
                            value={settings.contact_phone_2 || ""}
                            onChange={(e) =>
                              updateSetting("contact_phone_2", e.target.value)
                            }
                            placeholder="+974 XXXX-XXXX"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contact_telephone">
                            <Phone className="inline h-4 w-4 mr-1" />
                            Telephone
                          </Label>
                          <Input
                            id="contact_telephone"
                            value={settings.contact_telephone || ""}
                            onChange={(e) =>
                              updateSetting("contact_telephone", e.target.value)
                            }
                            placeholder="+974 XXXX-XXXX"
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="contact_fax">Fax Number</Label>
                          <Input
                            id="contact_fax"
                            value={settings.contact_fax || ""}
                            onChange={(e) =>
                              updateSetting("contact_fax", e.target.value)
                            }
                            placeholder="+974 XXXX-XXXX"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="po_box">P.O. Box</Label>
                          <Input
                            id="po_box"
                            value={settings.po_box || ""}
                            onChange={(e) =>
                              updateSetting("po_box", e.target.value)
                            }
                            placeholder="15776"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="head_office_address">
                          <MapPin className="inline h-4 w-4 mr-1" />
                          Head Office Address *
                        </Label>
                        <Textarea
                          id="head_office_address"
                          value={settings.head_office_address || ""}
                          onChange={(e) =>
                            updateSetting("head_office_address", e.target.value)
                          }
                          placeholder="Mirqab Mall, Area No. 39, Street No. 840, ..."
                          rows={3}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="google_maps_url">Google Maps Embed URL</Label>
                        <Input
                          id="google_maps_url"
                          type="url"
                          value={settings.google_maps_url || ""}
                          onChange={(e) =>
                            updateSetting("google_maps_url", e.target.value)
                          }
                          placeholder="https://www.google.com/maps/embed?pb=..."
                        />
                        <p className="text-xs text-muted-foreground">
                          Paste the &quot;Embed a map&quot; iframe src URL from Google Maps
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Social Links */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Share2 className="h-5 w-5" />
                        Social Media Links
                      </CardTitle>
                      <CardDescription>
                        Toggle each platform on/off. When off, the icon is hidden on the site even if a URL is saved.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Facebook */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="facebook_url" className="flex items-center gap-2 text-base">
                            <svg className="h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            Facebook
                          </Label>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-medium ${settings.show_facebook ? "text-green-500" : "text-muted-foreground"}`}>
                              {settings.show_facebook ? "Visible" : "Hidden"}
                            </span>
                            <Switch
                              checked={!!settings.show_facebook}
                              onCheckedChange={(val) => updateToggle("show_facebook", val)}
                            />
                          </div>
                        </div>
                        <Input
                          id="facebook_url"
                          type="url"
                          value={settings.facebook_url || ""}
                          onChange={(e) => updateSetting("facebook_url", e.target.value)}
                          placeholder="https://facebook.com/yourpage"
                          disabled={!settings.show_facebook}
                          className={!settings.show_facebook ? "opacity-50" : ""}
                        />
                      </div>

                      <Separator />

                      {/* Twitter / X */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="twitter_url" className="flex items-center gap-2 text-base">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            Twitter / X
                          </Label>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-medium ${settings.show_twitter ? "text-green-500" : "text-muted-foreground"}`}>
                              {settings.show_twitter ? "Visible" : "Hidden"}
                            </span>
                            <Switch
                              checked={!!settings.show_twitter}
                              onCheckedChange={(val) => updateToggle("show_twitter", val)}
                            />
                          </div>
                        </div>
                        <Input
                          id="twitter_url"
                          type="url"
                          value={settings.twitter_url || ""}
                          onChange={(e) => updateSetting("twitter_url", e.target.value)}
                          placeholder="https://twitter.com/yourhandle"
                          disabled={!settings.show_twitter}
                          className={!settings.show_twitter ? "opacity-50" : ""}
                        />
                      </div>

                      <Separator />

                      {/* LinkedIn */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="linkedin_url" className="flex items-center gap-2 text-base">
                            <svg className="h-5 w-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            LinkedIn
                          </Label>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-medium ${settings.show_linkedin ? "text-green-500" : "text-muted-foreground"}`}>
                              {settings.show_linkedin ? "Visible" : "Hidden"}
                            </span>
                            <Switch
                              checked={!!settings.show_linkedin}
                              onCheckedChange={(val) => updateToggle("show_linkedin", val)}
                            />
                          </div>
                        </div>
                        <Input
                          id="linkedin_url"
                          type="url"
                          value={settings.linkedin_url || ""}
                          onChange={(e) => updateSetting("linkedin_url", e.target.value)}
                          placeholder="https://linkedin.com/company/yourcompany"
                          disabled={!settings.show_linkedin}
                          className={!settings.show_linkedin ? "opacity-50" : ""}
                        />
                      </div>

                      <Separator />

                      {/* Instagram */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="instagram_url" className="flex items-center gap-2 text-base">
                            <svg className="h-5 w-5 text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                            Instagram
                          </Label>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-medium ${settings.show_instagram ? "text-green-500" : "text-muted-foreground"}`}>
                              {settings.show_instagram ? "Visible" : "Hidden"}
                            </span>
                            <Switch
                              checked={!!settings.show_instagram}
                              onCheckedChange={(val) => updateToggle("show_instagram", val)}
                            />
                          </div>
                        </div>
                        <Input
                          id="instagram_url"
                          type="url"
                          value={settings.instagram_url || ""}
                          onChange={(e) => updateSetting("instagram_url", e.target.value)}
                          placeholder="https://instagram.com/yourhandle"
                          disabled={!settings.show_instagram}
                          className={!settings.show_instagram ? "opacity-50" : ""}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <Button type="submit" size="lg" disabled={isSaving || isLoading}>
                      {isSaving ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="mr-2 h-4 w-4" />
                      )}
                      Save All Settings
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
