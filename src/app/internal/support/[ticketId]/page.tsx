import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTicketById } from "@/components/internal/support/mockTickets";
import SupportTicketDetailClient from "@/components/internal/support/SupportTicketDetailClient";

type Props = {
  params: Promise<{ ticketId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ticketId } = await params;
  const ticket = getTicketById(ticketId);
  return {
    title: ticket ? `${ticket.id} | Internal Support` : "Ticket | Internal Support",
  };
}

export default async function InternalSupportTicketPage({ params }: Props) {
  const { ticketId } = await params;
  const ticket = getTicketById(ticketId);
  if (!ticket) {
    notFound();
  }
  return <SupportTicketDetailClient ticket={ticket} />;
}
