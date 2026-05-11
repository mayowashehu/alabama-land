import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AdminLayout } from '../../components/layout/AdminLayout'
import apiClient from '../../services/api'
import type { Listing } from '../../types/listing'
import { ListingForm, submitListingMultipart } from '../../components/admin/ListingForm'
import type { ListingFormInitialValues } from '../../components/admin/ListingForm'
import type React from 'react'

async function fetchListings(): Promise<Listing[]> {
  const res = await apiClient.get<{ success: true; data: Listing[] }>('/api/v1/listings')
  return res.data.data
}

function AdminShell({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <AdminLayout>
      <div className="p-8 bg-[#131f14] border border-white/[0.07]">
        <div className="font-sans text-sm font-light text-[#f5f0e8]/55">
          {children}
        </div>
      </div>
    </AdminLayout>
  )
}

function SkeletonLoader(): JSX.Element {
  return (
    <AdminLayout>
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-12 bg-[#131f14] border border-white/[0.05] animate-pulse"
            style={{ opacity: 1 - i * 0.12 }}
          />
        ))}
      </div>
    </AdminLayout>
  )
}

export function EditListing(): JSX.Element {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const qc = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin-listings'],
    queryFn: fetchListings,
  })

  const listing = useMemo(() => (data ?? []).find((l) => l._id === id), [data, id])

  const mutation = useMutation({
    mutationFn: async (
      payload: Parameters<NonNullable<React.ComponentProps<typeof ListingForm>['onSubmit']>>[0]
    ) => {
      if (!id) return
      await submitListingMultipart({
        url: `/api/v1/listings/${id}`,
        method: 'patch',
        values: payload.values,
        features: payload.features,
        newFiles: payload.newFiles,
        existingImages: payload.existingImages,
        onProgress: payload.setProgress,
      })
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['admin-listings'] })
      navigate('/admin/listings')
    },
  })

  if (!id) {
    return (
      <AdminShell>
        Invalid listing ID.
      </AdminShell>
    )
  }

  if (isLoading) return <SkeletonLoader />

  if (!listing) {
    return (
      <AdminShell>
        <span className="text-[#f5f0e8]/40">Listing not found.</span>
        {' '}
        <button
          type="button"
          className="font-sans text-[11px] font-medium tracking-widest uppercase text-[#b8975a] hover:text-[#d4b87a] transition-colors underline-offset-2 underline"
          onClick={() => navigate('/admin/listings')}
        >
          Back to listings
        </button>
      </AdminShell>
    )
  }

  const initial: ListingFormInitialValues = {
    values: {
      title: listing.title,
      estateName: listing.estateName,
      plotNumber: listing.plotNumber,
      size: listing.size,
      price: listing.price,
      documentType: listing.documentType,
      status: listing.status,
      description: listing.description,
      address: listing.location.address,
      lga: listing.location.lga,
      state: listing.location.state,
      lat: listing.location.lat,
      lng: listing.location.lng,
    },
    features: listing.features ?? [],
    existingImages: listing.images ?? [],
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <button
            type="button"
            onClick={() => navigate('/admin/listings')}
            className="font-sans text-[10px] font-medium tracking-[0.14em] uppercase text-[#f5f0e8]/25 hover:text-[#f5f0e8]/60 transition-colors flex items-center gap-1.5"
          >
            <span aria-hidden="true">{'←'}</span>
            Listings
          </button>
          <span className="text-white/20">/</span>
          <span className="font-sans text-[10px] font-medium tracking-[0.14em] uppercase text-[#b8975a]/60">
            Edit
          </span>
        </div>
        <h1 className="font-cormorant text-[clamp(24px,3vw,34px)] font-medium text-[#f5f0e8]">
          Edit Listing
        </h1>
        <p className="font-sans text-sm font-light text-[#f5f0e8]/35 mt-1">
          {listing.estateName}
          {' · '}
          {listing.plotNumber}
        </p>
      </div>

      <ListingForm
        title=""
        initial={initial}
        submitLabel={mutation.isPending ? 'Saving…' : 'Save Listing'}
        onSubmit={async (payload) => {
          await mutation.mutateAsync(payload)
        }}
      />
    </AdminLayout>
  )
}