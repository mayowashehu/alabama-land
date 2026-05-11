import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import apiClient from '../../services/api';
import type { DocumentType, ListingStatus } from '../../types/listing';

const docTypeOptions: { label: string; value: DocumentType }[] = [
  { label: 'C of O', value: 'c-of-o' },
  { label: "Governor's Consent", value: 'governors-consent' },
  { label: 'Excision', value: 'excision' },
  { label: 'Survey', value: 'survey' },
];

const statusOptions: { label: string; value: ListingStatus }[] = [
  { label: 'Available', value: 'available' },
  { label: 'Reserved', value: 'reserved' },
  { label: 'Sold', value: 'sold' },
];

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  estateName: z.string().min(1, 'Estate name is required'),
  plotNumber: z.string().min(1, 'Plot number is required'),
  size: z.string().min(1, 'Size is required'),
  price: z.coerce.number().nonnegative('Price must be 0 or more'),
  documentType: z.enum(['c-of-o', 'governors-consent', 'excision', 'survey']),
  status: z.enum(['available', 'reserved', 'sold']),
  description: z.string().min(1, 'Description is required'),
  address: z.string().min(1, 'Address is required'),
  lga: z.string().min(1),
  state: z.string().min(1),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
});

export type ListingFormValues = z.infer<typeof schema>;

export interface ListingFormInitialValues {
  values: ListingFormValues;
  features: string[];
  existingImages?: { url: string; isPrimary: boolean }[];
}

interface ListingFormProps {
  title: string;
  initial: ListingFormInitialValues;
  submitLabel: string;
  onSubmit: (payload: {
    values: ListingFormValues;
    features: string[];
    newFiles: File[];
    existingImages: { url: string; isPrimary: boolean }[];
    setProgress: (pct: number | null) => void;
  }) => Promise<void>;
}

// ─── Shared input/label classes ───────────────────────────────────────────────
const inputClass =
  'w-full bg-[#0c1610] border border-white/[0.08] px-4 py-2.5 font-sans text-sm text-[#f5f0e8]/75 placeholder-[#f5f0e8]/20 focus:outline-none focus:border-[#b8975a]/50 transition-colors';

const selectClass =
  'w-full bg-[#0c1610] border border-white/[0.08] px-4 py-2.5 font-sans text-sm text-[#f5f0e8]/75 focus:outline-none focus:border-[#b8975a]/50 transition-colors cursor-pointer';

const labelClass =
  'block font-sans text-[10px] font-medium tracking-[0.16em] uppercase text-[#b8975a]/55 mb-2';

const errorClass = 'mt-1.5 font-sans text-[11px] text-red-400/70';

// ─── Section wrapper ──────────────────────────────────────────────────────────
function FormSection({
  label,
  note,
  children,
}: {
  label: string;
  note?: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="bg-[#131f14] border border-white/[0.07]">
      <div className="px-6 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <span className="block w-4 h-px bg-[#b8975a]/50" />
          <p className="font-sans text-[10px] font-medium tracking-[0.18em] uppercase text-[#b8975a]/70">
            {label}
          </p>
        </div>
        {note && (
          <p className="font-sans text-xs font-light text-[#f5f0e8]/25 mt-1 ml-7">
            {note}
          </p>
        )}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

// ─── TagsInput ────────────────────────────────────────────────────────────────
function TagsInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (next: string[]) => void;
}): JSX.Element {
  const [draft, setDraft] = useState('');

  const add = (): void => {
    const next = draft.trim();
    if (!next) return;
    if (value.some((v) => v.toLowerCase() === next.toLowerCase())) {
      setDraft('');
      return;
    }
    onChange([...value, next]);
    setDraft('');
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
          className={inputClass + ' flex-1'}
          placeholder="Type a feature and press Enter"
        />
        <button
          type="button"
          onClick={add}
          className="font-sans text-[11px] font-medium tracking-widest uppercase px-4 py-2.5 border border-white/15 text-[#f5f0e8]/45 hover:border-white/30 hover:text-[#f5f0e8]/70 transition-all flex-shrink-0"
        >
          Add
        </button>
      </div>
      {value.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {value.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-white/[0.08] font-sans text-xs text-[#f5f0e8]/55"
            >
              {tag}
              <button
                type="button"
                className="text-[#f5f0e8]/25 hover:text-red-400/60 transition-colors leading-none"
                onClick={() => onChange(value.filter((t) => t !== tag))}
                aria-label={`Remove ${tag}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── ImagePicker ──────────────────────────────────────────────────────────────
function ImagePicker({
  existing,
  onExistingChange,
  newFiles,
  onNewFilesChange,
  disabled,
}: {
  existing: { url: string; isPrimary: boolean }[];
  onExistingChange: (next: { url: string; isPrimary: boolean }[]) => void;
  newFiles: File[];
  onNewFilesChange: (next: File[]) => void;
  disabled: boolean;
}): JSX.Element {
  const previews = useMemo(() => newFiles.map((f) => URL.createObjectURL(f)), [newFiles]);

  useEffect(() => {
    return () => { previews.forEach((p) => URL.revokeObjectURL(p)); };
  }, [previews]);

  const totalCount = existing.length + newFiles.length;

  const setPrimary = (idx: number, isExisting: boolean): void => {
    if (isExisting) {
      onExistingChange(existing.map((img, i) => ({ ...img, isPrimary: i === idx })));
      return;
    }
    onExistingChange(existing.map((img) => ({ ...img, isPrimary: false })));
    toast.success('Primary image set (applied after save)');
  };

  return (
    <div className="space-y-4">
      {/* Upload zone */}
      <div className="border border-dashed border-white/[0.12] p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="font-sans text-sm text-[#f5f0e8]/60">
            Add up to 8 images. Click a photo to set it as primary.
          </p>
          <p className="font-sans text-[11px] text-[#f5f0e8]/25 mt-0.5">
            {totalCount} / 8 images
          </p>
        </div>
        <label className="flex-shrink-0">
          <input
            type="file"
            accept="image/*"
            multiple
            disabled={disabled || totalCount >= 8}
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              if (!files.length) return;
              const remaining = Math.max(0, 8 - totalCount);
              onNewFilesChange([...newFiles, ...files.slice(0, remaining)]);
              e.currentTarget.value = '';
            }}
            className="hidden"
          />
          <span className={`block font-sans text-[11px] font-medium tracking-widest uppercase px-5 py-2.5 border transition-all cursor-pointer ${
            disabled || totalCount >= 8
              ? 'border-white/[0.06] text-[#f5f0e8]/20 cursor-not-allowed'
              : 'border-[#b8975a]/40 text-[#b8975a]/70 hover:border-[#b8975a] hover:text-[#b8975a]'
          }`}>
            Choose Images
          </span>
        </label>
      </div>

      {/* Thumbnails */}
      {(existing.length > 0 || newFiles.length > 0) && (
        <div className="flex flex-wrap gap-3">
          {existing.map((img, i) => (
            <button
              type="button"
              key={img.url}
              className="relative group"
              onClick={() => setPrimary(i, true)}
              title="Click to set as primary"
            >
              <img
                src={img.url}
                alt=""
                className={`h-16 w-16 object-cover transition-all ${img.isPrimary ? 'ring-2 ring-[#b8975a]' : 'ring-1 ring-white/10 group-hover:ring-white/25'}`}
                style={{ filter: 'grayscale(10%)' }}
                loading="lazy"
              />
              {img.isPrimary && (
                <span className="absolute -top-2 -right-2 font-sans text-[8px] font-medium tracking-wider uppercase px-1.5 py-0.5 bg-[#b8975a] text-[#0f1810]">
                  1st
                </span>
              )}
            </button>
          ))}
          {previews.map((src, i) => (
            <div key={src} className="relative">
              <img
                src={src}
                alt=""
                className="h-16 w-16 object-cover ring-1 ring-white/10"
                style={{ filter: 'grayscale(10%)' }}
                loading="lazy"
              />
              {existing.length === 0 && i === 0 && (
                <span className="absolute -top-2 -right-2 font-sans text-[8px] font-medium tracking-wider uppercase px-1.5 py-0.5 bg-[#b8975a] text-[#0f1810]">
                  1st
                </span>
              )}
              <button
                type="button"
                className="absolute -top-2 -left-2 h-5 w-5 bg-[#131f14] border border-white/15 text-[#f5f0e8]/40 hover:text-red-400/70 transition-colors text-xs leading-none flex items-center justify-center"
                onClick={() => onNewFilesChange(newFiles.filter((_, idx) => idx !== i))}
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── ListingForm ─────────────────────────────────────────────────────────────
export function ListingForm({ title, initial, submitLabel, onSubmit }: ListingFormProps): JSX.Element {
  const [features, setFeatures] = useState<string[]>(initial.features);
  const [existingImages, setExistingImages] = useState(initial.existingImages ?? []);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [uploadPct, setUploadPct] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ListingFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initial.values,
  });

  useEffect(() => {
    reset(initial.values);
    setFeatures(initial.features);
    setExistingImages(initial.existingImages ?? []);
    setNewFiles([]);
  }, [initial, reset]);

  const submit = async (values: ListingFormValues): Promise<void> => {
    if (existingImages.length + newFiles.length === 0) {
      toast.error('Please add at least one image');
      return;
    }
    if (existingImages.length + newFiles.length > 8) {
      toast.error('Maximum 8 images');
      return;
    }
    try {
      setUploadPct(null);
      const toastId = toast.loading('Saving listing…');
      await onSubmit({ values, features, newFiles, existingImages, setProgress: setUploadPct });
      toast.success('Saved', { id: toastId });
    } catch (e) {
      const message =
        typeof e === 'object' && e !== null && 'response' in e
          ? String((e as { response?: { data?: { message?: unknown } } }).response?.data?.message ?? '')
          : '';
      toast.error(message || 'Could not save listing');
      throw e;
    } finally {
      setUploadPct(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-5">

      {/* Details */}
      <FormSection label="Listing Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div className="md:col-span-2">
            <label className={labelClass}>Title</label>
            <input {...register('title')} className={inputClass} placeholder="e.g. 500 sqm plot in Remmy Atlantic" />
            {errors.title?.message && <p className={errorClass}>{errors.title.message}</p>}
          </div>

          <div>
            <label className={labelClass}>Estate Name</label>
            <input {...register('estateName')} className={inputClass} placeholder="e.g. Remmy Atlantic Estate" />
            {errors.estateName?.message && <p className={errorClass}>{errors.estateName.message}</p>}
          </div>

          <div>
            <label className={labelClass}>Plot Number</label>
            <input {...register('plotNumber')} className={inputClass} placeholder="e.g. RA-112" />
            {errors.plotNumber?.message && <p className={errorClass}>{errors.plotNumber.message}</p>}
          </div>

          <div>
            <label className={labelClass}>Size</label>
            <input {...register('size')} className={inputClass} placeholder="e.g. 500sqm" />
            {errors.size?.message && <p className={errorClass}>{errors.size.message}</p>}
          </div>

          <div>
            <label className={labelClass}>Price (₦)</label>
            <input type="number" inputMode="numeric" {...register('price')} className={inputClass} placeholder="12500000" />
            {errors.price?.message && <p className={errorClass}>{errors.price.message}</p>}
          </div>

          <div>
            <label className={labelClass}>Document Type</label>
            <select {...register('documentType')} className={selectClass}>
              {docTypeOptions.map((o) => (
                <option key={o.value} value={o.value} className="bg-[#0c1610]">{o.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Status</label>
            <select {...register('status')} className={selectClass}>
              {statusOptions.map((o) => (
                <option key={o.value} value={o.value} className="bg-[#0c1610]">{o.label}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Description</label>
            <textarea
              rows={4}
              {...register('description')}
              className={inputClass + ' resize-none'}
              placeholder="Short, clear description that builds trust."
            />
            {errors.description?.message && <p className={errorClass}>{errors.description.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Features</label>
            <TagsInput value={features} onChange={setFeatures} />
          </div>
        </div>
      </FormSection>

      {/* Location */}
      <FormSection label="Location" note="Defaults are set for Sagamu. Adjust if needed.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className={labelClass}>Address</label>
            <input {...register('address')} className={inputClass} placeholder="e.g. Makun City axis, Sagamu" />
            {errors.address?.message && <p className={errorClass}>{errors.address.message}</p>}
          </div>
          <div>
            <label className={labelClass}>LGA</label>
            <input {...register('lga')} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>State</label>
            <input {...register('state')} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Latitude</label>
            <input type="number" step="0.0001" {...register('lat')} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Longitude</label>
            <input type="number" step="0.0001" {...register('lng')} className={inputClass} />
          </div>
        </div>
      </FormSection>

      {/* Photos */}
      <FormSection label="Photos">
        <ImagePicker
          existing={existingImages}
          onExistingChange={setExistingImages}
          newFiles={newFiles}
          onNewFilesChange={setNewFiles}
          disabled={isSubmitting}
        />

        {uploadPct !== null && (
          <div className="mt-5">
            <div className="h-px bg-white/[0.06] overflow-hidden">
              <div
                className="h-px bg-[#b8975a] transition-all duration-200"
                style={{ width: `${Math.min(100, Math.max(0, uploadPct))}%` }}
              />
            </div>
            <p className="font-sans text-[11px] text-[#f5f0e8]/30 mt-2">
              {`Uploading… ${uploadPct}%`}
            </p>
          </div>
        )}
      </FormSection>

      {/* Submit */}
      <div className="flex items-center justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="font-sans text-[12px] font-medium tracking-widest uppercase px-10 py-4 bg-[#b8975a] text-[#0f1810] transition-all hover:bg-[#d4b87a] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

// ─── submitListingMultipart ────────────────────────────────────────────────────
export async function submitListingMultipart(params: {
  url: string;
  method: 'post' | 'patch';
  values: ListingFormValues;
  features: string[];
  newFiles: File[];
  existingImages: { url: string; isPrimary: boolean }[];
  onProgress?: (pct: number) => void;
}): Promise<void> {
  const fd = new FormData();
  fd.set('title', params.values.title);
  fd.set('estateName', params.values.estateName);
  fd.set('plotNumber', params.values.plotNumber);
  fd.set('size', params.values.size);
  fd.set('price', String(params.values.price));
  fd.set('status', params.values.status);
  fd.set('documentType', params.values.documentType);
  fd.set('description', params.values.description);
  fd.set('features', JSON.stringify(params.features));
  fd.set('location', JSON.stringify({
    address: params.values.address,
    lga: params.values.lga,
    state: params.values.state,
    lat: params.values.lat,
    lng: params.values.lng,
  }));

  if (params.method === 'patch' && params.existingImages.length > 0 && params.newFiles.length === 0) {
    fd.set('images', JSON.stringify(params.existingImages));
  }
  params.newFiles.forEach((f) => fd.append('images', f));

  await apiClient.request({
    url: params.url,
    method: params.method,
    data: fd,
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (evt) => {
      if (!evt.total) return;
      params.onProgress?.(Math.round((evt.loaded / evt.total) * 100));
    },
  });
}