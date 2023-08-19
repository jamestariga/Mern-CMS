import { useState, useEffect, useMemo } from 'react'
import { Cart, CartItem } from '@/types/types'

const initialCart: Cart = {
  items: [],
  total: 0,
}

const useCart = () => {
  const [cart, setCart] = useState(initialCart)

  // useEffect(() => {
  //   const savedCart = localStorage.getItem('cart')
  //   if (savedCart) {
  //     setCart(JSON.parse(savedCart))
  //   }
  // }, [])

  // useEffect(() => {
  //   localStorage.setItem('cart', JSON.stringify(cart))
  // }, [cart])

  const addItem = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.items.findIndex(
        (i) => i._id === item._id
      )

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevCart.items]
        const existingItem = updatedItems[existingItemIndex]
        existingItem.quantity = existingItem.quantity || 0
        existingItem.quantity += item.quantity || 1

        return {
          ...prevCart,
          items: updatedItems,
          total: prevCart.total + item.price * (item.quantity || 1),
        }
      }

      return {
        ...prevCart,
        items: [...prevCart.items, { ...item, quantity: item.quantity || 1 }],
        total: prevCart.total + item.price * (item.quantity || 1),
      }
    })
  }

  const removeItem = (itemId: string) => {
    setCart((prevCart) => {
      const itemToRemoveIndex = prevCart.items.findIndex(
        (i) => i._id === itemId
      )

      if (itemToRemoveIndex !== -1) {
        const itemToRemove = prevCart.items[itemToRemoveIndex]
        const updatedItems = [...prevCart.items]
        updatedItems.splice(itemToRemoveIndex, 1)

        return {
          ...prevCart,
          items: updatedItems,
          total:
            prevCart.total - itemToRemove.price * (itemToRemove.quantity || 1),
        }
      }

      return prevCart
    })
  }

  const clearCart = () => {
    setCart(initialCart)
    localStorage.removeItem('cart')
  }

  const memoizedCart = useMemo(
    () => ({
      cart,
      addItem,
      removeItem,
      clearCart,
    }),
    [cart, addItem, removeItem, clearCart]
  )

  return memoizedCart
}

export default useCart
