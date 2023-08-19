import { useMutation } from '@tanstack/react-query'
import useAxiosPrivate from '../useAxiosPrivate'

const useRemoveFromCartMutation = () => {
  const axiosPrivate = useAxiosPrivate()
  return useMutation(async (_id: string) => {
    // Send request to API to remove item from cart
    const response = await axiosPrivate.delete(`/api/cart/${_id}`, {
      params: {
        _id,
      },
    })

    return response.data
  })
}

export default useRemoveFromCartMutation
