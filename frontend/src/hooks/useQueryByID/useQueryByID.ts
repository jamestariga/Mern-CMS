import { useQuery } from '@tanstack/react-query'
import { IProduct } from '@/types/types'

const useQueryByID = (
  query: string,
  id: string | undefined,
  callback: (id: string | undefined) => Promise<any>
) => {
  return useQuery<IProduct>([query, id], () => callback(id), {
    enabled: !!id,
  })
}

export default useQueryByID
