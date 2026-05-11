import { useQuery } from '@tanstack/react-query'
import apiClient from '../services/api'
import { Listing } from '../types/listing'

export const useListings = () => {
  return useQuery<Listing[]>({
    queryKey: ['listings'],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: Listing[] }>(
        '/api/v1/listings'
      )
      return response.data.data
    },
  })
}

export const useListingBySlug = (slug: string) => {
  return useQuery<Listing>({
    queryKey: ['listing', slug],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: Listing }>(
        `/api/v1/listings/${slug}`
      )
      return response.data.data
    },
    enabled: !!slug,
  })
}
