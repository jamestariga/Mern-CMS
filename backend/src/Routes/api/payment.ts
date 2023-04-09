import express, { Router } from 'express'

import {
  createPaymentIntent,
  capturePayment,
  getCartItems,
  addToCart,
  removeFromCart,
  clearCart,
} from '../../Controller/paymentController'

const router: Router = express.Router()

router.route('/create-payment-intent').post(createPaymentIntent)
router.route('/capture-payment').post(capturePayment)

router.route('/cart').get(getCartItems).post(addToCart).delete(clearCart)

router.route('/cart/:id').delete(removeFromCart)

export default router
