import { useQuery } from '@tanstack/react-query'
import { AdminLayout } from '../../components/layout/AdminLayout'
import apiClient from '../../services/api'
import type { Listing } from '../../types/listing'
import type { Inquiry } from '../../types/inquiry'
import { isAdminDemoMode } from '../../config/demoMode'
import { demoInquiries, demoListings } from '../../mocks/adminDemoData'

interface StatCardProps {
  label: string;
  value: number;
  accent?: boolean;
  note?: string;
}

function StatCard({ label, value, accent, note }: StatCardProps): JSX.Element {
  return (
    <div className={`flex flex-col p-6 border ${accent ? 'border-[#b8975a]/30 bg-[#1a2a1a]' : 'border-white/[0.07] bg-[#131f14]'}`}>
      <p className="font-sans text-[10px] font-medium tracking-[0.18em] uppercase text-[#f5f0e8]/35 mb-3">
        {label}
      </p>
      <p className={`font-cormorant text-[clamp(36px,4vw,52px)] font-medium leading-none ${accent ? 'text-[#b8975a]' : 'text-[#f5f0e8]'}`}>
        {value}
      </p>
      {note && (
        <p className="font-sans text-[10px] tracking-wide text-[#b8975a]/60 mt-2">
          {note}
        </p>
      )}
    </div>
  )
}

export function Dashboard(): JSX.Element {
  const listingsQ = useQuery({
    queryKey: ['admin-listings'],
    queryFn: async () => {
      if (isAdminDemoMode) return demoListings
      const res = await apiClient.get<{ success: true; data: Listing[] }>('/api/v1/listings')
      return res.data.data
    },
  })

  const inquiriesQ = useQuery({
    queryKey: ['admin-inquiries'],
    queryFn: async () => {
      if (isAdminDemoMode) return demoInquiries
      const res = await apiClient.get<{ success: true; data: Inquiry[] }>('/api/v1/inquiries')
      return res.data.data
    },
    refetchInterval: isAdminDemoMode ? false : 60_000,
  })

  const listings = listingsQ.data ?? []
  const inquiries = inquiriesQ.data ?? []

  const available = listings.filter((l) => l.status === 'available').length
  const reserved = listings.filter((l) => l.status === 'reserved').length
  const sold = listings.filter((l) => l.status === 'sold').length
  const newLeads = inquiries.filter((i) => i.status === 'new').length

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="block w-5 h-px bg-[#b8975a]" />
          <span className="font-sans text-[10px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
            Overview
          </span>
        </div>
        <h1 className="font-cormorant text-[clamp(26px,3vw,36px)] font-medium text-[#f5f0e8]">
          Dashboard
        </h1>
        <p className="font-sans text-sm font-light text-[#f5f0e8]/35 mt-1">
          Quick overview of listings and new inquiries.
        </p>
        {isAdminDemoMode && (
          <p className="font-sans text-[11px] text-[#d4b87a]/70 mt-3 border-l-2 border-[#d4b87a]/30 pl-3">
            Demo mode: data shown here is mocked locally.
          </p>
        )}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.04]">
        <StatCard label="Available" value={available} />
        <StatCard label="Reserved" value={reserved} />
        <StatCard label="Sold" value={sold} />
        <StatCard label="New Leads" value={newLeads} accent note={newLeads > 0 ? 'Awaiting response' : 'All clear'} />
      </div>
    </AdminLayout>
  )
}