import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { CartItem } from '@/types/types'
import useAxiosPrivate from '../useAxiosPrivate'

const useAddToCartMutation = (): UseMutationResult<
  any,
  unknown,
  any,
  unknown
> => {
  const axiosPrivate = useAxiosPrivate()
  return useMutation(async (item: CartItem) => {
    // Send request to API to add item to cart
    const response = await axiosPrivate.post('/api/cart', item)

    return response.data
  })
}

export default useAddToCartMutation
