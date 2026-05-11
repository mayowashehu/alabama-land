import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import apiClient from '../../services/api';
import { AdminLayout } from '../../components/layout/AdminLayout';
import type { Listing, ListingStatus } from '../../types/listing';
import { formatPrice } from '../../utils/format';
import { isAdminDemoMode } from '../../config/demoMode';
import { demoListings } from '../../mocks/adminDemoData';

async function fetchListings(): Promise<Listing[]> {
  if (isAdminDemoMode) return demoListings;
  const res = await apiClient.get<{ success: true; data: Listing[] }>('/api/v1/listings');
  return res.data.data;
}

function primaryPhoto(listing: Listing): string | null {
  if (!listing.images?.length) return null;
  const p = listing.images.find((i) => i.isPrimary) ?? listing.images[0];
  return p?.url ?? null;
}

const DOC_LABEL: Record<string, string> = {
  'c-of-o': 'C of O',
  'governors-consent': "Gov't",
  excision: 'Excision',
  survey: 'Survey',
};

const STATUS_STYLE: Record<ListingStatus, string> = {
  available: 'text-[#6db87a]',
  reserved: 'text-[#d4b87a]',
  sold: 'text-[#f5f0e8]/25',
};

function demoGuard(action: () => void, msg = 'Demo mode: this action is disabled'): void {
  if (isAdminDemoMode) { toast(msg); return; }
  action();
}

export function ManageListings(): JSX.Element {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-listings'],
    queryFn: fetchListings,
  });

  const statusMutation = useMutation({
    mutationFn: async (params: { id: string; status: ListingStatus }) => {
      await apiClient.patch(`/api/v1/listings/${params.id}/status`, { status: params.status });
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['admin-listings'] });
      toast.success('Status updated');
    },
    onError: (e) => {
      const msg =
        typeof e === 'object' && e !== null && 'response' in e
          ? String((e as { response?: { data?: { message?: unknown } } }).response?.data?.message ?? '')
          : '';
      toast.error(msg || 'Could not update status');
    },
  });

  const listings = data ?? [];

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="block w-5 h-px bg-[#b8975a]" />
            <span className="font-sans text-[10px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
              Inventory
            </span>
          </div>
          <h1 className="font-cormorant text-[clamp(26px,3vw,36px)] font-medium text-[#f5f0e8]">
            Manage Listings
          </h1>
          <p className="font-sans text-sm font-light text-[#f5f0e8]/35 mt-1">
            Add new plots, update prices, and mark availability.
          </p>
          {isAdminDemoMode && (
            <p className="font-sans text-[11px] text-[#d4b87a]/70 mt-3 border-l-2 border-[#d4b87a]/30 pl-3">
              Demo mode: edit actions are disabled.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => demoGuard(() => navigate('/admin/listings/new'), 'Demo mode: creating listings is disabled')}
          className="flex-shrink-0 font-sans text-[12px] font-medium tracking-widest uppercase px-6 py-3 bg-[#b8975a] text-[#0f1810] transition-colors hover:bg-[#d4b87a]"
        >
          + Add Listing
        </button>
      </div>

      {/* Table card */}
      <div className="bg-[#131f14] border border-white/[0.07]">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-12 bg-white/[0.03] animate-pulse"
                style={{ opacity: 1 - i * 0.13 }}
              />
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="font-cormorant text-xl italic text-[#f5f0e8]/20 mb-3">
              No listings yet.
            </p>
            <button
              type="button"
              onClick={() => demoGuard(() => navigate('/admin/listings/new'), 'Demo mode: creating listings is disabled')}
              className="font-sans text-[11px] font-medium tracking-widest uppercase px-6 py-3 bg-[#b8975a] text-[#0f1810] transition-colors hover:bg-[#d4b87a]"
            >
              Add First Listing
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px]">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {['', 'Title', 'Estate', 'Size', 'Price', 'Status', 'Doc', 'Views', 'Actions'].map((h) => (
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
                {listings.map((l) => {
                  const photo = primaryPhoto(l);
                  return (
                    <tr
                      key={l._id}
                      className="border-t border-white/[0.05] hover:bg-white/[0.02] transition-colors duration-150"
                    >
                      {/* Thumbnail */}
                      <td className="py-3 px-4 w-12">
                        {photo ? (
                          <img
                            src={photo}
                            alt=""
                            className="h-9 w-9 object-cover"
                            style={{ filter: 'grayscale(15%)' }}
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-9 w-9 bg-white/[0.04] border border-white/[0.06]" />
                        )}
                      </td>

                      {/* Title */}
                      <td className="py-3 px-4">
                        <p className="font-sans text-sm font-medium text-[#f5f0e8]/75 leading-snug">
                          {l.title}
                        </p>
                        <p className="font-sans text-[10px] text-[#f5f0e8]/25 mt-0.5">
                          {l.plotNumber}
                        </p>
                      </td>

                      {/* Estate */}
                      <td className="py-3 px-4 font-sans text-sm text-[#f5f0e8]/45">
                        {l.estateName}
                      </td>

                      {/* Size */}
                      <td className="py-3 px-4 font-sans text-sm text-[#f5f0e8]/45">
                        {l.size}
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4 font-cormorant text-base font-medium text-[#f5f0e8]/70">
                        {formatPrice(l.price)}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className={`block w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            l.status === 'available' ? 'bg-[#6db87a]' :
                            l.status === 'reserved' ? 'bg-[#d4b87a]' :
                            'bg-white/20'
                          }`} />
                          <span className={`font-sans text-[11px] font-medium tracking-wide ${STATUS_STYLE[l.status]}`}>
                            {l.status.charAt(0).toUpperCase() + l.status.slice(1)}
                          </span>
                        </div>
                      </td>

                      {/* Document */}
                      <td className="py-3 px-4">
                        <span className="font-sans text-[10px] font-medium tracking-[0.1em] uppercase text-[#b8975a]/60 border border-[#b8975a]/20 px-2 py-0.5">
                          {DOC_LABEL[l.documentType] ?? l.documentType}
                        </span>
                      </td>

                      {/* Views */}
                      <td className="py-3 px-4 font-sans text-sm text-[#f5f0e8]/30">
                        {l.viewCount}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => demoGuard(() => navigate(`/admin/listings/${l._id}/edit`), 'Demo mode: editing is disabled')}
                            className="font-sans text-[11px] font-medium tracking-wider uppercase px-3 py-1.5 border border-white/15 text-[#f5f0e8]/45 hover:border-white/30 hover:text-[#f5f0e8]/70 transition-all"
                          >
                            Edit
                          </button>

                          <select
                            value={l.status}
                            onChange={(e) => {
                              demoGuard(() => {
                                statusMutation.mutate({ id: l._id, status: e.target.value as ListingStatus });
                              }, 'Demo mode: status change is disabled');
                            }}
                            disabled={statusMutation.isPending}
                            aria-label="Change status"
                            className="bg-transparent border border-white/[0.08] font-sans text-[11px] text-[#f5f0e8]/40 px-2 py-1.5 focus:outline-none focus:border-[#b8975a]/40 transition-colors cursor-pointer"
                          >
                            <option value="available" className="bg-[#131f14]">Available</option>
                            <option value="reserved" className="bg-[#131f14]">Reserved</option>
                            <option value="sold" className="bg-[#131f14]">Sold</option>
                          </select>

                          {l.status !== 'sold' && (
                            <button
                              type="button"
                              disabled={statusMutation.isPending}
                              onClick={() => {
                                demoGuard(() => {
                                  if (!window.confirm('Mark as sold? This cannot be undone easily.')) return;
                                  statusMutation.mutate({ id: l._id, status: 'sold' });
                                }, 'Demo mode: status change is disabled');
                              }}
                              className="font-sans text-[11px] font-medium tracking-wider uppercase px-3 py-1.5 text-[#f5f0e8]/25 hover:text-red-400/60 transition-colors disabled:opacity-30"
                            >
                              Sold
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}