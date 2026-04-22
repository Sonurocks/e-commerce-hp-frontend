import type { SupportTicket } from "./types";

const sharedMessages = (subject: string): SupportTicket["messages"] => [
  {
    id: "m1",
    role: "requester",
    authorName: "Supriya Arora",
    initials: "SA",
    body: subject,
    time: "5:50 PM",
    dateLabel: "TODAY",
  },
  {
    id: "m2",
    role: "agent",
    authorName: "Support",
    initials: "UT",
    body: "Thanks for reaching out — we’re looking into this and will update you shortly.",
    time: "5:52 PM",
  },
];

export const MOCK_TICKETS: SupportTicket[] = [
  {
    id: "SUP-811679",
    subject: "Testing Support request.",
    description: "Notification not coming.",
    createdAt: "Apr 17, 2026",
    lastActivity: "Apr 17, 2026",
    status: "in_progress",
    submittedBy: "Supriya Arora",
    company: "Zomato",
    messages: [
      {
        id: "m0",
        role: "requester",
        authorName: "Supriya Arora",
        initials: "SA",
        body: "Notification not coming.",
        time: "5:48 PM",
        dateLabel: "TODAY",
      },
      {
        id: "m1",
        role: "agent",
        authorName: "Support",
        initials: "UT",
        body: "Thanks — we’ve escalated this to the notifications team.",
        time: "5:50 PM",
      },
      {
        id: "m2",
        role: "requester",
        authorName: "Supriya Arora",
        initials: "SA",
        body: "Any update on ETA?",
        time: "5:51 PM",
      },
      {
        id: "m3",
        role: "agent",
        authorName: "Support",
        initials: "UT",
        body: "We expect a fix to roll out by end of week. I’ll keep this thread updated.",
        time: "5:55 PM",
      },
    ],
  },
  {
    id: "SUP-321249",
    subject: "testing 1",
    description: "Initial test ticket.",
    createdAt: "Apr 17, 2026",
    lastActivity: "Apr 17, 2026",
    status: "pending",
    submittedBy: "Supriya Arora",
    company: "Zomato",
    messages: sharedMessages("testing 1"),
  },
  {
    id: "SUP-321248",
    subject: "Testing Support request.",
    description: "General support query.",
    createdAt: "Apr 16, 2026",
    lastActivity: "Apr 17, 2026",
    status: "in_progress",
    submittedBy: "Supriya Arora",
    company: "Zomato",
    messages: sharedMessages("Testing Support request."),
  },
  {
    id: "SUP-321247",
    subject: "Order sync delay",
    description: "Orders not appearing in dashboard.",
    createdAt: "Apr 15, 2026",
    lastActivity: "Apr 16, 2026",
    status: "pending",
    submittedBy: "Alex Chen",
    company: "Acme Co",
    messages: sharedMessages("Order sync delay"),
  },
  {
    id: "SUP-321246",
    subject: "Invoice export",
    description: "Need CSV export for last quarter.",
    createdAt: "Apr 14, 2026",
    lastActivity: "Apr 14, 2026",
    status: "resolved",
    submittedBy: "Jamie Lee",
    company: "Northwind",
    messages: sharedMessages("Invoice export"),
  },
];

export function getTicketById(id: string): SupportTicket | undefined {
  const normalized = decodeURIComponent(id).trim();
  return MOCK_TICKETS.find((t) => t.id === normalized);
}

export function listTicketsForTable(): SupportTicket[] {
  return [...MOCK_TICKETS];
}
