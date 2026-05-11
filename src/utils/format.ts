export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const formatSize = (size: string): string => {
  const normalized = size.toLowerCase().trim()
  if (normalized.includes('sqm')) {
    return size
  }
  if (normalized.includes('sq')) {
    return size
  }
  return `${size} sqm`
}

export const formatDate = (date: string): string => {
  const dateObj = new Date(date)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj)
}

export const getDocumentBadgeColor = (
  docType: 'c-of-o' | 'governors-consent' | 'excision' | 'survey'
): { bg: string; text: string } => {
  const colors = {
    'c-of-o': { bg: 'bg-primary', text: 'text-white' },
    'governors-consent': { bg: 'bg-available', text: 'text-white' },
    excision: { bg: 'bg-accent', text: 'text-white' },
    survey: { bg: 'bg-text-muted', text: 'text-white' },
  }
  return colors[docType]
}

export const getStatusBadgeColor = (status: 'available' | 'reserved' | 'sold'): string => {
  const colors = {
    available: 'bg-available text-white',
    reserved: 'bg-reserved text-white',
    sold: 'bg-sold text-white',
  }
  return colors[status]
}
