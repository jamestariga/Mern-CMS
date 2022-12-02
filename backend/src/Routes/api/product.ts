import express, { Router } from 'express'
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  createReview,
  deleteReview,
} from '../../Controller/productController'
import upload from '../../Configs/multer'
import verifyRoles from '../../Middleware/verifyRoles'
import ROLES_LIST from '../../Configs/rolesList'

const router: Router = express.Router()

router
  .route('/')
  .get(getProducts)
  .post(upload.single('image'), createProduct)
  .put(updateProduct)
  .delete(deleteProduct)

router.route('/:slug').get(getProduct)

router.route('/:slug/reviews').post(createReview).delete(deleteReview)

export default router
