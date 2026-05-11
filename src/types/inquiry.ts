export type InquiryStatus = 'new' | 'contacted' | 'closed'
export type InquirySource = 'website' | 'whatsapp' | 'referral'

export interface Inquiry {
  _id: string
  listingId?: string | { _id?: string; title?: string; slug?: string; estateName?: string }
  name: string
  phone: string
  whatsappPhone?: string
  message: string
  status: InquiryStatus
  source: InquirySource
  createdAt: string
}
