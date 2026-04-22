"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  Pencil,
  Plus,
  Search,
  X,
} from "lucide-react";
import type { SupportTicket, TicketStatus } from "./types";
import { listTicketsForTable } from "./mockTickets";

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
  if (status === "in_progress") return "in_progress";
  return status;
}

export default function SupportRequestsClient() {
  const router = useRouter();
  const [tickets, setTickets] = useState<SupportTicket[]>(() => listTicketsForTable());
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<TicketStatus | "">("");
  const [modalOpen, setModalOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [attachmentName, setAttachmentName] = useState("");

  const filtered = useMemo(() => {
    return tickets.filter((t) => {
      const matchesSearch =
        search.trim() === "" ||
        t.id.toLowerCase().includes(search.trim().toLowerCase()) ||
        t.subject.toLowerCase().includes(search.trim().toLowerCase());
      const matchesStatus = status === "" || t.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [tickets, search, status]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setSubject("");
    setDescription("");
    setAttachmentName("");
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;
    const newId = `SUP-${String(Date.now()).slice(-6)}`;
    const next: SupportTicket = {
      id: newId,
      subject: subject.trim(),
      description: description.trim(),
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      lastActivity: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: "pending",
      submittedBy: "Internal user",
      company: "—",
      messages: [
        {
          id: "init",
          role: "requester",
          authorName: "Internal user",
          initials: "IU",
          body: description.trim(),
          time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
          dateLabel: "TODAY",
        },
      ],
    };
    setTickets((prev) => [next, ...prev]);
    closeModal();
  };

  return (
    <div className="min-h-screen bg-branco pb-12 pt-8 text-preto">
      <div className="container mx-auto max-w-[1440px] px-6 lg:px-12 xl:px-[48px]">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <h1 className="text-4xl font-light tracking-tight text-preto">Support requests</h1>
          </div>
          <button
            type="button"
            onClick={openModal}
            className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-md bg-[#222] px-4 text-sm font-semibold text-white transition sm:self-center"
          >
            <Plus className="h-4 w-4" />
            Raise new request
          </button>
        </div>

        <section className="rounded-lg border border-(--color-platinum) bg-branco p-4 md:p-6">
          <h2 className="text-sm font-semibold tracking-wide text-preto">All requests</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-hina)" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by TicketID"
                className="h-11 w-full rounded-md border border-(--color-platinum) bg-branco py-2 pl-10 pr-3 text-sm outline-none transition focus:border-preto"
              />
            </div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TicketStatus | "")}
              className="h-11 w-full rounded-md border border-(--color-platinum) bg-branco px-3 text-sm text-preto outline-none transition focus:border-preto"
            >
              <option value="">Select status</option>
              <option value="pending">pending</option>
              <option value="in_progress">in_progress</option>
              <option value="resolved">resolved</option>
            </select>
          </div>

          <div className="mt-6 overflow-x-auto rounded-md border border-(--color-platinum)">
            <table className="min-w-[720px] w-full border-collapse text-left text-sm">
              <thead className="bg-[#111]">
                <tr className="text-xs font-semibold uppercase tracking-[0.08em]">
                  <th className="px-4 py-3 text-white">Ticket ID</th>
                  <th className="px-4 py-3 text-white">Subject</th>
                  <th className="px-4 py-3 text-white">Created at</th>
                  <th className="px-4 py-3 text-white">Status</th>
                  <th className="px-4 py-3 text-white">Last activity</th>
                  <th className="px-4 py-3 text-center text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <tr
                    key={row.id}
                    className={i % 2 === 0 ? "bg-white" : "bg-(--color-whiteSmoke)"}
                  >
                    <td className="px-4 py-3 font-medium text-preto">
                      <Link href={`/internal/support/${encodeURIComponent(row.id)}`} className="hover:underline">
                        #{row.id}
                      </Link>
                    </td>
                    <td className="max-w-[220px] truncate px-4 py-3 text-preto">{row.subject}</td>
                    <td className="px-4 py-3 text-(--color-emperor)">{row.createdAt}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${statusBadgeClasses(row.status)}`}
                      >
                        {formatStatusLabel(row.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-(--color-emperor)">{row.lastActivity}</td>
                    <td className="px-4 py-3 text-center">
                      <Link
                        href={`/internal/support/${encodeURIComponent(row.id)}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-(--color-platinum) bg-white text-preto transition hover:bg-(--color-whiteSmoke)"
                        aria-label={`Edit ticket ${row.id}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 ? (
              <p className="bg-white px-4 py-6 text-center text-sm text-(--color-emperor)">No tickets match your filters.</p>
            ) : null}
          </div>
        </section>
      </div>

      {modalOpen ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="support-modal-title"
            className="relative w-full max-w-lg rounded-xl border border-(--color-platinum) bg-branco shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-(--color-platinum) px-5 py-4">
              <h2 id="support-modal-title" className="text-lg font-semibold text-preto">
                Raise new request
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full p-1 text-(--color-emperor) transition hover:bg-(--color-whiteSmoke) hover:text-preto"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmitRequest} className="px-5 py-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="rq-subject" className="text-sm font-medium text-preto">
                    Subject <span className="text-[#c41429]">*</span>
                  </label>
                  <input
                    id="rq-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    placeholder="Brief subject"
                    className="mt-1.5 h-11 w-full rounded-md border border-(--color-platinum) bg-branco px-3 text-sm outline-none transition focus:border-preto"
                  />
                </div>
                <div>
                  <label htmlFor="rq-desc" className="text-sm font-medium text-preto">
                    Description <span className="text-[#c41429]">*</span>
                  </label>
                  <textarea
                    id="rq-desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                    placeholder="Add details when needed..."
                    className="mt-1.5 w-full resize-y rounded-md border border-(--color-platinum) bg-branco px-3 py-2 text-sm outline-none transition focus:border-preto"
                  />
                </div>
                <div>
                  <label htmlFor="rq-file" className="text-sm font-medium text-preto">
                    Attachment
                  </label>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <input
                      id="rq-file"
                      type="file"
                      onChange={(e) => setAttachmentName(e.target.files?.[0]?.name ?? "")}
                      className="text-sm text-(--color-emperor) file:mr-2 file:rounded-md file:border file:border-(--color-platinum) file:bg-branco file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-preto"
                    />
                    <span className="text-xs text-(--color-hina)">{attachmentName || "No file chosen"}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2 border-t border-(--color-platinum) pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="h-10 rounded-md border border-(--color-platinum) bg-branco px-4 text-sm font-semibold text-preto transition hover:bg-(--color-whiteSmoke)"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-10 rounded-md bg-[#1d1d1d] px-4 text-sm font-semibold text-white transition hover:bg-black"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
