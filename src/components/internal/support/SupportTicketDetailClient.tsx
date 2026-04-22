"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  Calendar,
  MessageCircle,
  Paperclip,
  Send,
  Tag,
} from "lucide-react";
import type { SupportMessage, SupportTicket, TicketStatus } from "./types";

function statusBadgeClasses(status: TicketStatus) {
  switch (status) {
    case "pending":
      return "bg-gray-100 text-(--color-emperor)";
    case "in_progress":
      return "bg-(--color-whiteSmoke) text-(--color-preto)";
    case "resolved":
      return "bg-gray-100 text-(--color-preto)";
    default:
      return "bg-gray-100 text-(--color-emperor)";
  }
}

function formatStatusLabel(status: TicketStatus) {
  if (status === "in_progress") return "IN PROGRESS";
  return status.replace("_", " ").toUpperCase();
}

type Props = {
  ticket: SupportTicket;
};

export default function SupportTicketDetailClient({ ticket }: Props) {
  const router = useRouter();
  const [messages, setMessages] = useState<SupportMessage[]>(() => ticket.messages);
  const [draft, setDraft] = useState("");

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    const next: SupportMessage = {
      id: `local-${Date.now()}`,
      role: "requester",
      authorName: ticket.submittedBy,
      initials: ticket.submittedBy
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      body: text,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, next]);
    setDraft("");
  };

  return (
    <div className="min-h-screen bg-branco pb-12 pt-8 text-preto">
      <div className="container mx-auto max-w-[1440px] px-6 lg:px-12 xl:px-[48px]">
        <div className="mb-6 flex items-start gap-3">
          <button
            type="button"
            onClick={() => router.push("/internal/support")}
            className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center text-preto transition"
            aria-label="Back to support list"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,340px)_1fr]">
          <section className="h-fit rounded-lg border border-(--color-platinum) bg-branco p-5">
            <div className="flex items-start justify-between gap-2 border-b border-(--color-platinum) pb-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-preto">
                <Tag className="h-4 w-4 text-(--color-emperor)" />
                Ticket Information
              </div>
              <span className="shrink-0 text-sm font-semibold text-preto">#{ticket.id}</span>
            </div>
            <div className="mt-4 space-y-4 text-sm">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.14em] text-(--color-hina)">STATUS</p>
                <span
                  className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClasses(ticket.status)}`}
                >
                  {formatStatusLabel(ticket.status)}
                </span>
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-[0.14em] text-(--color-hina)">SUBJECT</p>
                <p className="mt-1 font-medium text-preto">{ticket.subject}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-[0.14em] text-(--color-hina)">SUBMITTED BY</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-whiteSmoke) text-xs font-semibold text-preto">
                    {ticket.submittedBy
                      .split(" ")
                      .map((p) => p[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                  <div>
                    <p className="font-medium text-preto">{ticket.submittedBy}</p>
                    <p className="flex items-center gap-1 text-xs text-(--color-emperor)">
                      <Building2 className="h-3.5 w-3.5" />
                      {ticket.company}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-[0.14em] text-(--color-hina)">DESCRIPTION</p>
                <p className="mt-1 text-(--color-emperor)">{ticket.description}</p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 border-t border-(--color-platinum) pt-4 text-xs text-(--color-emperor)">
              <Calendar className="h-4 w-4 text-(--color-emperor)" />
              Submitted on {ticket.createdAt}
            </div>
          </section>

          <section className="flex min-h-[480px] flex-col rounded-lg border border-(--color-platinum) bg-branco">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-(--color-platinum) px-5 py-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-preto">
                <MessageCircle className="h-4 w-4 text-(--color-emperor)" />
                Conversation
              </div>
              <span className="rounded-full border border-(--color-platinum) bg-(--color-whiteSmoke) px-3 py-1 text-xs font-medium text-(--color-emperor)">
                {messages.length} messages
              </span>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {messages.map((m, idx) => {
                const showDate =
                  m.dateLabel && (idx === 0 || messages[idx - 1]?.dateLabel !== m.dateLabel);
                return (
                  <div key={m.id}>
                    {showDate ? (
                      <div className="mb-4 flex justify-center">
                        <span className="rounded-full bg-(--color-whiteSmoke) px-3 py-0.5 text-[11px] font-semibold tracking-wide text-(--color-emperor)">
                          {m.dateLabel}
                        </span>
                      </div>
                    ) : null}
                    <div className={`flex ${m.role === "requester" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`flex max-w-[85%] gap-2 sm:max-w-[70%] ${m.role === "requester" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <span
                          className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                            m.role === "requester"
                              ? "bg-[#1d1d1d] text-white"
                              : "bg-(--color-whiteSmoke) text-preto"
                          }`}
                        >
                          {m.initials}
                        </span>
                        <div>
                          <div
                            className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                              m.role === "requester"
                                ? "rounded-br-md bg-[#1d1d1d] text-white"
                                : "rounded-bl-md border border-(--color-platinum) bg-white text-preto"
                            }`}
                          >
                            {m.body}
                          </div>
                          <p className={`mt-1 text-[11px] text-(--color-hina) ${m.role === "requester" ? "text-right" : "text-left"}`}>
                            {m.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-(--color-platinum) bg-(--color-whiteSmoke) px-4 py-3">
              <div className="flex items-end gap-2 rounded-lg border border-(--color-platinum) bg-white p-2">
                <button
                  type="button"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-(--color-emperor) transition hover:bg-(--color-whiteSmoke)"
                  aria-label="Attach file"
                >
                  <Paperclip className="h-5 w-5" />
                </button>
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  rows={1}
                  placeholder="Type a message..."
                  className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent py-2.5 text-sm outline-none placeholder:text-(--color-hina)"
                />
                <button
                  type="button"
                  onClick={sendMessage}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1d1d1d] text-white transition hover:bg-black"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
