import { Metadata } from "next";
import MailboxesPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Mailboxes - CPC Admin",
  description: "Manage email mailboxes and communications",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MailboxesPage() {
  return <MailboxesPageClient />;
}
