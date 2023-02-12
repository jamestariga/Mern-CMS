import express, { Router } from 'express'
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../Controller/productController'
import upload from '../../Configs/multer'
import verifyRoles from '../../Middleware/verifyRoles'
import ROLES_LIST from '../../Configs/rolesList'

const router: Router = express.Router()

router
  .route('/')
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    upload.single('image'),
    createProduct
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    upload.single('image'),
    updateProduct
  )
  .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), deleteProduct)

export default router
