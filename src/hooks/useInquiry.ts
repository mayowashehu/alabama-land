import { useMutation } from '@tanstack/react-query'
import apiClient from '../services/api'
import { Inquiry } from '../types/inquiry'

export const useSubmitInquiry = () => {
  return useMutation({
    mutationFn: async (data: Partial<Inquiry>) => {
      const response = await apiClient.post<{ success: boolean; message: string }>(
        '/api/v1/inquiries',
        data
      )
      return response.data
    },
  })
}

export const useGetInquiries = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.get<{
        success: boolean
        data: Inquiry[]
        count: number
        page: number
        limit: number
      }>('/api/v1/inquiries')
      return response.data
    },
  })
}
