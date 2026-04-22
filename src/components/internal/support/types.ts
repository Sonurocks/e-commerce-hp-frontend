export type TicketStatus = "pending" | "in_progress" | "resolved";

export type SupportMessage = {
  id: string;
  role: "requester" | "agent";
  authorName: string;
  initials: string;
  body: string;
  time: string;
  dateLabel?: string;
};

export type SupportTicket = {
  id: string;
  subject: string;
  description: string;
  createdAt: string;
  lastActivity: string;
  status: TicketStatus;
  submittedBy: string;
  company: string;
  messages: SupportMessage[];
};
