// ─── NewListing.tsx ───────────────────────────────────────────────────────────
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { ListingForm, submitListingMultipart } from '../../components/admin/ListingForm';
import type { ListingFormInitialValues } from '../../components/admin/ListingForm';
import type React from 'react';

export function NewListing(): JSX.Element {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (
      payload: Parameters<NonNullable<React.ComponentProps<typeof ListingForm>['onSubmit']>>[0]
    ) => {
      await submitListingMultipart({
        url: '/api/v1/listings',
        method: 'post',
        values: payload.values,
        features: payload.features,
        newFiles: payload.newFiles,
        existingImages: payload.existingImages,
        onProgress: payload.setProgress,
      });
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['admin-listings'] });
      navigate('/admin/listings');
    },
  });

  const initial: ListingFormInitialValues = {
    values: {
      title: '',
      estateName: '',
      plotNumber: '',
      size: '500sqm',
      price: 0,
      documentType: 'c-of-o',
      status: 'available',
      description: '',
      address: '',
      lga: 'Sagamu',
      state: 'Ogun State',
      lat: 6.8322,
      lng: 3.6319,
    },
    features: [],
    existingImages: [],
  };

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
            New
          </span>
        </div>
        <h1 className="font-cormorant text-[clamp(24px,3vw,34px)] font-medium text-[#f5f0e8]">
          Add New Listing
        </h1>
        <p className="font-sans text-sm font-light text-[#f5f0e8]/35 mt-1">
          Fill in the plot details and upload images to publish.
        </p>
      </div>

      <ListingForm
        title=""
        initial={initial}
        submitLabel={mutation.isPending ? 'Saving…' : 'Save Listing'}
        onSubmit={async (payload) => {
          await mutation.mutateAsync(payload);
        }}
      />
    </AdminLayout>
  );
}