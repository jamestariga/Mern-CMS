import { useState } from 'react'
import { Cart, CartItem } from '@/types/types'

const initialCart: Cart = {
  items: [],
  total: 0,
}

const useCart = () => {
  const [cart, setCart] = useState(initialCart)

  const addItem = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.items.findIndex(
        (i) => i.id === item.id
      )

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevCart.items]
        updatedItems[existingItemIndex].quantity += item.quantity

        return {
          ...prevCart,
          items: updatedItems,
          total: prevCart.total + item.price * item.quantity,
        }
      }

      return {
        ...prevCart,
        items: [...prevCart.items, item],
        total: prevCart.total + item.price * item.quantity,
      }
    })
  }

  const removeItem = (itemId: string) => {
    setCart((prevCart) => {
      const itemToRemoveIndex = prevCart.items.findIndex(
        (i) => i.id === Number(itemId)
      )

      if (itemToRemoveIndex !== -1) {
        const itemToRemove = prevCart.items[itemToRemoveIndex]
        const updatedItems = [...prevCart.items]
        updatedItems.splice(itemToRemoveIndex, 1)

        return {
          ...prevCart,
          items: updatedItems,
          total: prevCart.total - itemToRemove.price * itemToRemove.quantity,
        }
      }

      return prevCart
    })
  }

  const clearCart = () => {
    setCart(initialCart)
  }

  return {
    cart,
    addItem,
    removeItem,
    clearCart,
  }
}

export default useCart
