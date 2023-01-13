import express, { Router } from 'express'
import {
  getProducts,
  getProduct,
  createReview,
  deleteReview,
} from '../../Controller/productController'

const router: Router = express.Router()

router.route('/').get(getProducts)

router.route('/:slug').get(getProduct)

router.route('/:slug/reviews').post(createReview).delete(deleteReview)

export default router
