import { useMemo, useState, Fragment } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { AdminLayout } from '../../components/layout/AdminLayout'
import apiClient from '../../services/api'
import type { Inquiry, InquiryStatus } from '../../types/inquiry'
import { formatDate } from '../../utils/format'
import { isAdminDemoMode } from '../../config/demoMode'
import { demoInquiries } from '../../mocks/adminDemoData'

type InquiryWithListing = Inquiry & {
  listingId?: string | { title?: string; slug?: string; estateName?: string }
}

async function fetchInquiries(): Promise<InquiryWithListing[]> {
  if (isAdminDemoMode) return demoInquiries
  const res = await apiClient.get<{
    success: true
    data: InquiryWithListing[]
    count: number
    page: number
    limit: number
  }>('/api/v1/inquiries')
  return res.data.data
}

function waLink(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  const normalized = digits.startsWith('234')
    ? digits
    : digits.startsWith('0')
      ? `234${digits.slice(1)}`
      : digits
  return `https://wa.me/${normalized}`
}

const STATUS_STYLES: Record<InquiryStatus, { dot: string; label: string }> = {
  new: { dot: 'bg-[#b8975a]', label: 'text-[#b8975a]' },
  contacted: { dot: 'bg-[#6db87a]', label: 'text-[#6db87a]' },
  closed: { dot: 'bg-[#f5f0e8]/20', label: 'text-[#f5f0e8]/30' },
}

interface StatPillProps {
  label: string;
  value: number;
  accent?: boolean;
}

function StatPill({ label, value, accent }: StatPillProps): JSX.Element {
  return (
    <div className={`flex flex-col p-5 border ${accent ? 'border-[#b8975a]/30 bg-[#1a2a1a]' : 'border-white/[0.07] bg-[#131f14]'}`}>
      <p className="font-sans text-[10px] font-medium tracking-[0.18em] uppercase text-[#f5f0e8]/30 mb-2">
        {label}
      </p>
      <p className={`font-cormorant text-[clamp(28px,3vw,40px)] font-medium leading-none ${accent ? 'text-[#b8975a]' : 'text-[#f5f0e8]'}`}>
        {value}
      </p>
    </div>
  )
}

export function Leads(): JSX.Element {
  const qc = useQueryClient()
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['admin-inquiries'],
    queryFn: fetchInquiries,
    refetchInterval: isAdminDemoMode ? false : 60_000,
  })

  const updateStatus = useMutation({
    mutationFn: async (params: { id: string; status: InquiryStatus }) => {
      await apiClient.patch(`/api/v1/inquiries/${params.id}/status`, { status: params.status })
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['admin-inquiries'] })
      toast.success('Status updated')
    },
    onError: (e) => {
      const message =
        typeof e === 'object' && e !== null && 'response' in e
          ? String((e as { response?: { data?: { message?: unknown } } }).response?.data?.message ?? '')
          : ''
      toast.error(message || 'Could not update')
    },
  })

  const inquiries = data ?? []

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase()
    if (!s) return inquiries
    return inquiries.filter((i) => {
      const name = i.name?.toLowerCase() ?? ''
      const phone = i.phone?.toLowerCase() ?? ''
      const wa = (i.whatsappPhone ?? '').toLowerCase()
      return name.includes(s) || phone.includes(s) || wa.includes(s)
    })
  }, [inquiries, search])

  const counts = useMemo(() => ({
    total: inquiries.length,
    n: inquiries.filter((i) => i.status === 'new').length,
    c: inquiries.filter((i) => i.status === 'contacted').length,
    closed: inquiries.filter((i) => i.status === 'closed').length,
  }), [inquiries])

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="block w-5 h-px bg-[#b8975a]" />
          <span className="font-sans text-[10px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
            CRM
          </span>
        </div>
        <h1 className="font-cormorant text-[clamp(26px,3vw,36px)] font-medium text-[#f5f0e8]">
          Inquiries & Leads
        </h1>
        <p className="font-sans text-sm font-light text-[#f5f0e8]/35 mt-1">
          New leads appear automatically every minute.
        </p>
        {isAdminDemoMode && (
          <p className="font-sans text-[11px] text-[#d4b87a]/70 mt-3 border-l-2 border-[#d4b87a]/30 pl-3">
            Demo mode: lead status updates are disabled.
          </p>
        )}
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.04] mb-10">
        <StatPill label="Total" value={counts.total} />
        <StatPill label="New" value={counts.n} accent />
        <StatPill label="Contacted" value={counts.c} />
        <StatPill label="Closed" value={counts.closed} />
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or phone…"
          className="w-full max-w-sm bg-[#131f14] border border-white/[0.08] px-4 py-2.5 font-sans text-[12px] text-[#f5f0e8]/70 placeholder-[#f5f0e8]/20 tracking-wide focus:outline-none focus:border-[#b8975a]/50 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-[#131f14] border border-white/[0.07]">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-10 bg-white/[0.03] animate-pulse"
                style={{ opacity: 1 - i * 0.13 }}
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-cormorant text-xl italic text-[#f5f0e8]/20 mb-2">
              No inquiries yet.
            </p>
            <p className="font-sans text-xs text-[#f5f0e8]/20">
              They will appear here when someone sends a message.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {['Name', 'Phone', 'WhatsApp', 'Listing', 'Date', 'Status'].map((h) => (
                    <th
                      key={h}
                      className="text-left py-3 px-4 font-sans text-[10px] font-medium tracking-[0.16em] uppercase text-[#f5f0e8]/25"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((inq) => {
                  const isOpen = expanded === inq._id
                  const listing = typeof inq.listingId === 'object' ? inq.listingId : undefined
                  const wa = inq.whatsappPhone ?? inq.phone
                  const statusStyle = STATUS_STYLES[inq.status]

                  return (
                    <Fragment key={inq._id}>
                      <tr
                        className={`border-t border-white/[0.05] cursor-pointer transition-colors duration-150 ${isOpen ? 'bg-white/[0.03]' : 'hover:bg-white/[0.025]'}`}
                        onClick={() => setExpanded(isOpen ? null : inq._id)}
                      >
                        <td className="py-3.5 px-4 font-sans text-sm font-medium text-[#f5f0e8]/80">
                          {inq.name}
                        </td>
                        <td className="py-3.5 px-4">
                          <a
                            href={`tel:${inq.phone}`}
                            className="font-sans text-sm text-[#b8975a] hover:text-[#d4b87a] transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {inq.phone}
                          </a>
                        </td>
                        <td className="py-3.5 px-4">
                          <a
                            href={waLink(wa)}
                            target="_blank"
                            rel="noreferrer"
                            className="font-sans text-[11px] font-medium tracking-wider uppercase text-[#b8975a]/70 hover:text-[#b8975a] transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Open →
                          </a>
                        </td>
                        <td className="py-3.5 px-4 font-sans text-sm text-[#f5f0e8]/40">
                          {listing?.estateName ?? (
                            <span className="text-[#f5f0e8]/20">—</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-sans text-sm text-[#f5f0e8]/35">
                          {formatDate(inq.createdAt)}
                        </td>
                        <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-2">
                            <span className={`block w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusStyle.dot}`} />
                            <select
                              value={inq.status}
                              onChange={(e) => {
                                if (isAdminDemoMode) {
                                  toast('Demo mode: status change is disabled')
                                  return
                                }
                                updateStatus.mutate({
                                  id: inq._id,
                                  status: e.target.value as InquiryStatus,
                                })
                              }}
                              disabled={updateStatus.isPending}
                              aria-label="Change inquiry status"
                              className={`bg-transparent border-none font-sans text-[11px] font-medium tracking-wide cursor-pointer focus:outline-none ${statusStyle.label}`}
                            >
                              <option value="new" className="bg-[#131f14] text-[#f5f0e8]">New</option>
                              <option value="contacted" className="bg-[#131f14] text-[#f5f0e8]">Contacted</option>
                              <option value="closed" className="bg-[#131f14] text-[#f5f0e8]">Closed</option>
                            </select>
                          </div>
                        </td>
                      </tr>

                      {/* Expanded message row */}
                      {isOpen && (
                        <tr className="border-t border-white/[0.04] bg-white/[0.02]">
                          <td colSpan={6} className="px-4 py-4">
                            <div className="flex items-start gap-3">
                              <span className="block w-0.5 h-full bg-[#b8975a]/30 self-stretch flex-shrink-0 mt-0.5" />
                              <p className="font-sans text-sm font-light leading-relaxed text-[#f5f0e8]/55 whitespace-pre-wrap">
                                {inq.message || <span className="italic text-[#f5f0e8]/20">No message.</span>}
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}