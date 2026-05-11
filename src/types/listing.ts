export type DocumentType = 'c-of-o' | 'governors-consent' | 'excision' | 'survey'
export type ListingStatus = 'available' | 'reserved' | 'sold'

export interface ListingImage {
  url: string
  isPrimary: boolean
}

export interface ListingLocation {
  address: string
  lga: string
  state: string
  lat: number
  lng: number
}

export interface Listing {
  _id: string
  title: string
  slug: string
  estateName: string
  plotNumber: string
  size: string
  price: number
  status: ListingStatus
  documentType: DocumentType
  description: string
  features: string[]
  images: ListingImage[]
  location: ListingLocation
  viewCount: number
  isActive?: boolean
  createdAt: string
  updatedAt: string
}
