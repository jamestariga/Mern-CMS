import Stripe from 'stripe'
import { Request, Response } from 'express'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

let cartItems: CartItem[] = []

const secret = `${process.env.STRIPE_SECRET_KEY}`

const stripe = new Stripe(secret, {
  apiVersion: '2022-11-15',
})

export const createPaymentIntent = async (req: Request, res: Response) => {
  const { amount, currency } = req.body

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    })

    res.status(200).json({ clientSecret: paymentIntent.client_secret })
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({ message: 'Failed to create payment intent.' })
  }
}

export const capturePayment = async (req: Request, res: Response) => {
  const { paymentIntentId } = req.body

  try {
    const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId)

    res.status(200).json({ paymentIntent })
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({ message: 'Failed to capture payment intent.' })
  }
}

export const getCartItems = (req: Request, res: Response) => {
  // Calculate total price of cart
  const total = cartItems.reduce((acc: number, item: CartItem) => {
    return acc + item.price * item.quantity
  }, 0)

  console.log('getCart', cartItems)

  res.status(200).json({
    items: cartItems,
    total,
  })
}

export const addToCart = (req: Request, res: Response) => {
  const item: CartItem = req.body

  // Check if item is already in cart
  const existingItemIndex = cartItems.findIndex((i) => i.id === item.id)
  if (existingItemIndex !== -1) {
    // If item already exists, update its quantity
    const existingItem = cartItems[existingItemIndex]
    const updatedItem = {
      ...existingItem,
      quantity: existingItem.quantity + item.quantity,
    }
    const newCartItems = cartItems.slice()
    newCartItems.splice(existingItemIndex, 1, updatedItem)
    cartItems = newCartItems
  } else {
    // If item does not exist, add it to cart
    cartItems = cartItems.concat(item)
  }

  res.status(200).json({ message: 'Item added to cart.' })
}

export const removeFromCart = (req: Request, res: Response) => {
  const itemId: number = Number(req.params.itemId)

  // Remove item from cart
  cartItems = cartItems.filter((i) => i.id !== itemId)

  res.status(200).json({ message: 'Item removed from cart.' })
}

export const clearCart = (req: Request, res: Response) => {
  cartItems = []

  res.status(200).json({ message: 'Cart cleared.' })
}
