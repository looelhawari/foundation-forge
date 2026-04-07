"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Mail,
  Inbox,
  Send,
  Trash2,
  RefreshCw,
  Search,
  User,
  Calendar,
  Paperclip,
  AlertCircle,
  CheckCircle,
  Star,
  Forward,
  Reply,
  X,
  Loader2,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

// Email type definition
interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  preview: string;
  body: string;
  date: Date;
  read: boolean;
  starred: boolean;
  hasAttachment: boolean;
}

// Mailbox type definition
interface Mailbox {
  id: string;
  email: string;
  name: string;
  unreadCount: number;
  totalEmails: number;
}

// Initial mailbox definitions (counts will be updated from API)
const initialMailboxes: Mailbox[] = [
  {
    id: "info",
    email: "info@cpc-qa.com",
    name: "Info (General)",
    unreadCount: 0,
    totalEmails: 0,
  },
  {
    id: "accounts",
    email: "accounts@cpc-qa.com",
    name: "Accounts",
    unreadCount: 0,
    totalEmails: 0,
  },
];

export default function MailboxesPageClient() {
  const [selectedMailbox, setSelectedMailbox] = useState<string>("info");
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [emails, setEmails] = useState<Email[]>([]);
  const [mailboxes, setMailboxes] = useState<Mailbox[]>(initialMailboxes);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "starred">("all");
  
  // Compose/Reply/Forward state
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeMode, setComposeMode] = useState<"new" | "reply" | "forward">("new");
  const [composeTo, setComposeTo] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const [sending, setSending] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  
  const { toast } = useToast();

  // Fetch emails for selected mailbox
  const fetchEmails = useCallback(async (mailboxId: string) => {
    setLoading(true);
    setSelectedEmail(null);
    
    try {
      const response = await fetch(`/api/mailbox/${mailboxId}`);
      const data = await response.json();

      if (!response.ok || data.error) {
        console.error("Error fetching emails:", data.error);
        setEmails([]);
      } else {
        // Convert date strings back to Date objects
        const parsedEmails = data.emails.map((email: any) => ({
          ...email,
          date: new Date(email.date),
        }));
        setEmails(parsedEmails);

        // Update mailbox counts with real data
        setMailboxes((prev) =>
          prev.map((mb) =>
            mb.id === mailboxId
              ? {
                  ...mb,
                  totalEmails: data.count || 0,
                  unreadCount: data.unreadCount || 0,
                }
              : mb
          )
        );
      }
    } catch (error) {
      console.error("Failed to fetch emails:", error);
      setEmails([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmails(selectedMailbox);
  }, [selectedMailbox, fetchEmails]);

  const filteredEmails = emails.filter((email) => {
    const matchesSearch =
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.preview.toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === "unread") return !email.read && matchesSearch;
    if (filter === "starred") return email.starred && matchesSearch;
    return matchesSearch;
  });

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Email actions
  const handleEmailAction = async (emailId: string, action: string) => {
    setActionLoading(emailId + action);
    try {
      const response = await fetch("/api/mailbox/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailId, action }),
      });
      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: `Email ${action === "delete" ? "deleted" : action === "star" ? "starred" : action === "unstar" ? "unstarred" : action}`,
        });

        if (action === "delete") {
          setEmails((prev) => prev.filter((e) => e.id !== emailId));
          if (selectedEmail?.id === emailId) setSelectedEmail(null);
        } else if (action === "star" || action === "unstar") {
          setEmails((prev) =>
            prev.map((e) =>
              e.id === emailId ? { ...e, starred: action === "star" } : e
            )
          );
          if (selectedEmail?.id === emailId) {
            setSelectedEmail({ ...selectedEmail, starred: action === "star" });
          }
        }
      } else {
        toast({
          title: "Error",
          description: data.error || "Action failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to perform action",
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };

  // Open compose modal
  const openCompose = (mode: "new" | "reply" | "forward", email?: Email) => {
    setComposeMode(mode);
    if (mode === "reply" && email) {
      setComposeTo(email.from);
      setComposeSubject(`Re: ${email.subject.replace(/^Re:\s*/i, "")}`);
      setComposeBody(`\n\n---\nOn ${email.date.toLocaleString()}, ${email.from} wrote:\n\n${email.body}`);
    } else if (mode === "forward" && email) {
      setComposeTo("");
      setComposeSubject(`Fwd: ${email.subject.replace(/^Fwd:\s*/i, "")}`);
      setComposeBody(`\n\n---\nForwarded message:\nFrom: ${email.from}\nDate: ${email.date.toLocaleString()}\nSubject: ${email.subject}\n\n${email.body}`);
    } else {
      setComposeTo("");
      setComposeSubject("");
      setComposeBody("");
    }
    setComposeOpen(true);
  };

  // Send email
  const handleSendEmail = async () => {
    if (!composeTo || !composeSubject) {
      toast({
        title: "Error",
        description: "Please fill in recipient and subject",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/mailbox/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: composeTo,
          subject: composeSubject,
          text: composeBody,
        }),
      });
      const data = await response.json();

      if (data.success) {
        toast({
          title: "Email Sent",
          description: `Message sent to ${composeTo}`,
        });
        setComposeOpen(false);
        setComposeTo("");
        setComposeSubject("");
        setComposeBody("");
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to send email",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send email",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold">Mailboxes</h1>
            <p className="text-muted-foreground mt-1">
              Manage and view emails from all mailboxes
            </p>
          </div>
          <Button onClick={() => fetchEmails(selectedMailbox)}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Status Alert */}
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>IMAP Connected</AlertTitle>
          <AlertDescription>
            Successfully connected to Hostinger mailboxes. Emails are being fetched in real-time from:
            <span className="block mt-2 text-sm font-medium">
              {mailboxes.map(m => m.email).join(", ")}
            </span>
          </AlertDescription>
        </Alert>

        {/* Mailbox Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {mailboxes.map((mailbox) => (
            <Card
              key={mailbox.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedMailbox === mailbox.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedMailbox(mailbox.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <Mail className="h-5 w-5 text-primary" />
                  {mailbox.unreadCount > 0 && (
                    <Badge variant="destructive">{mailbox.unreadCount}</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium">{mailbox.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {mailbox.email}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {mailbox.totalEmails} total emails
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Email Interface */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Email List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">
                {mailboxes.find((m) => m.id === selectedMailbox)?.name}
              </CardTitle>
              <CardDescription>
                {mailboxes.find((m) => m.id === selectedMailbox)?.email}
              </CardDescription>

              {/* Search */}
              <div className="pt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search emails..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Filters */}
              <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="pt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                  <TabsTrigger value="starred">Starred</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>

            <CardContent className="p-0">
              {loading ? (
                <div className="space-y-2 p-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              ) : filteredEmails.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Inbox className="mx-auto h-12 w-12 mb-3 opacity-50" />
                  <p>No emails found</p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredEmails.map((email) => (
                    <motion.div
                      key={email.id}
                      className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedEmail?.id === email.id ? "bg-muted" : ""
                      } ${!email.read ? "bg-muted/20" : ""}`}
                      onClick={() => setSelectedEmail(email)}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {!email.read && (
                              <div className="h-2 w-2 rounded-full bg-primary" />
                            )}
                            <p className="text-sm font-medium truncate">
                              {email.from}
                            </p>
                          </div>
                          <p className="text-sm font-medium truncate">
                            {email.subject}
                          </p>
                          <p className="text-xs text-muted-foreground truncate mt-1">
                            {email.preview}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xs text-muted-foreground">
                            {formatDate(email.date)}
                          </span>
                          <div className="flex gap-1">
                            {email.starred && (
                              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            )}
                            {email.hasAttachment && (
                              <Paperclip className="h-3 w-3 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Email Detail */}
          <Card className="lg:col-span-2">
            {selectedEmail ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {selectedEmail.subject}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{selectedEmail.from}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {selectedEmail.date.toLocaleString("en-US", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleEmailAction(
                            selectedEmail.id,
                            selectedEmail.starred ? "unstar" : "star"
                          )
                        }
                        disabled={actionLoading === selectedEmail.id + "star" || actionLoading === selectedEmail.id + "unstar"}
                      >
                        {actionLoading === selectedEmail.id + "star" || actionLoading === selectedEmail.id + "unstar" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Star className={`h-4 w-4 ${selectedEmail.starred ? "fill-yellow-500 text-yellow-500" : ""}`} />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEmailAction(selectedEmail.id, "delete")}
                        disabled={actionLoading === selectedEmail.id + "delete"}
                      >
                        {actionLoading === selectedEmail.id + "delete" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4 text-destructive" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="whitespace-pre-wrap text-sm">
                    {selectedEmail.body}
                  </div>
                  {selectedEmail.hasAttachment && (
                    <div className="mt-6 p-4 border rounded-lg">
                      <p className="text-sm font-medium mb-2">Attachments</p>
                      <div className="flex items-center gap-3 p-3 bg-muted rounded">
                        <Paperclip className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">document.pdf</span>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          Download
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className="mt-6 flex gap-2">
                    <Button onClick={() => openCompose("reply", selectedEmail)}>
                      <Reply className="mr-2 h-4 w-4" />
                      Reply
                    </Button>
                    <Button variant="outline" onClick={() => openCompose("forward", selectedEmail)}>
                      <Forward className="mr-2 h-4 w-4" />
                      Forward
                    </Button>
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground p-12">
                <div className="text-center">
                  <Mail className="mx-auto h-16 w-16 mb-4 opacity-20" />
                  <p>Select an email to view</p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Compose Modal */}
        <Dialog open={composeOpen} onOpenChange={setComposeOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {composeMode === "new"
                  ? "Compose Email"
                  : composeMode === "reply"
                  ? "Reply"
                  : "Forward"}
              </DialogTitle>
              <DialogDescription>
                Send email from info@cpc-qa.com
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="to">To</Label>
                <Input
                  id="to"
                  placeholder="recipient@example.com"
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Email subject"
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="body">Message</Label>
                <Textarea
                  id="body"
                  placeholder="Write your message..."
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  rows={10}
                  className="resize-none"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setComposeOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendEmail} disabled={sending}>
                {sending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
