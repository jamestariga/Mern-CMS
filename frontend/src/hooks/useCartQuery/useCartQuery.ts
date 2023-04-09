import { useQuery } from '@tanstack/react-query'
import { CartItem } from '@/types/types'
import useAxiosPrivate from '../useAxiosPrivate'

const useCartQuery = () => {
  const axiosPrivate = useAxiosPrivate()
  return useQuery(['cart'], async () => {
    // Fetch cart items from API
    const response = await axiosPrivate.get('/api/cart')
    const cartItems = response.data
    console.log(cartItems)

    // Calculate total price of cart
    const total = cartItems.reduce((acc: number, item: CartItem) => {
      return acc + item.price * item.quantity
    }, 0)

    return {
      items: cartItems,
      total,
    }
  })
}

export default useCartQuery
