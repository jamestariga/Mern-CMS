import Product, { Products, Reviews } from '../Model/Product'
import { Request, Response, NextFunction } from 'express'
import cloudinary from '../Configs/cloudinary'
import User, { Users } from '../Model/User'

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    slug,
    brand,
    description,
    price,
    category,
    stock,
    reviews,
    numReviews,
    rating,
    quantity,
  }: Products = req.body

  const image = req.file?.path || ''

  if (
    !name ||
    !slug ||
    !brand ||
    !description ||
    !price ||
    !category ||
    !stock
  ) {
    return res.status(400).json({ message: 'Please fill in all fields' })
  }

  const checkProduct = await Product.findOne({ slug: slug })

  if (checkProduct) {
    return res.status(400).json({ message: 'Product already exists' })
  }

  try {
    const result = await cloudinary.uploader.upload(image, {
      upload_preset: 'products',
      // allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    })

    const product = await Product.create({
      name: name,
      slug: slug,
      brand: brand,
      description: description,
      price: price,
      category: category,
      stock: stock,
      reviews: reviews,
      numReviews: numReviews,
      rating: rating,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    })

    res.status(201).json({
      product,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const getProducts = async (req: Request, res: Response) => {
  const products: Array<Products> = await Product.find({})

  if (!products) {
    return res.status(404).send({
      message: 'No products found',
    })
  }

  res.json({ data: products })
}

export const getProduct = async (req: Request, res: Response) => {
  const { slug } = req.params
  const product: Products | null = await Product.findOne({ slug })

  if (!product) {
    return res.status(404).send({
      message: 'No product found',
    })
  }

  res.json(product)
}

export const updateProduct = async (req: Request, res: Response) => {
  const { name, brand, description, price, category, stock, _id }: Products =
    req.body

  if (!_id) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const image = req.file?.path || ''

  const product: Products | null = await Product.findOne({
    _id: _id,
  }).exec()

  if (!product) {
    return res.status(404).json({
      message: `No product matches ID: ${_id}.`,
    })
  }

  if (image !== '') {
    const result = await cloudinary.uploader.upload(image, {
      upload_preset: 'products',
      // allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    })
    product.image = {
      public_id: result.public_id,
      url: result.secure_url,
    }
  }

  if (name) product.name = name

  if (brand) product.brand = brand

  if (description) product.description = description

  if (price) product.price = price

  if (category) product.category = category

  if (stock) product.stock = stock

  await product.save()

  res.json(product)
}

export const deleteProduct = async (req: Request, res: Response) => {
  if (!req?.body?._id) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const product: Products | null = await Product.findOne({
    _id: req.body._id,
  }).exec()

  if (!product) {
    return res.status(404).send({
      message: 'No product found',
    })
  }

  const result: Products = await product.deleteOne({ _id: req.body._id })

  res.json(result)
}

export const createReview = async (req: Request, res: Response) => {
  const { title, rating, comment, userName }: Reviews = req.body
  const { slug } = req.params

  if (!title || !rating || !comment || !userName) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const product: Products | null = await Product.findOne({
    slug: slug,
  }).exec()

  const user: Users | null = await User.findOne({
    userName: userName,
  }).exec()

  const userMadeReview = product?.reviews.find(
    (review) => review.userName === userName
  )

  if (!product) {
    return res.status(404).send({
      message: 'No product found',
    })
  }

  if (!user) {
    return res.status(404).send({ message: 'No user found' })
  }

  if (userMadeReview) {
    return res.status(400).json({ message: 'You already made a review' })
  }

  const review: Reviews = {
    userName: userName,
    title: title,
    rating: rating,
    comment: comment,
  }

  product.reviews.push(review)

  product.numReviews = product.reviews.length

  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length

  await product.save()

  res.status(201).json({ message: 'Review added' })
}

export const deleteReview = async (req: Request, res: Response) => {
  const { slug } = req.params

  const { userName } = req.body

  const product: Products | null = await Product.findOne({
    slug: slug,
  }).exec()

  if (!product) {
    return res.status(404).send({
      message: 'No product found',
    })
  }

  const review = product.reviews.find((review) => review.userName === userName)

  console.log(review)

  if (!review) {
    return res.status(404).send({
      message: 'No review found',
    })
  }

  const index = product.reviews.indexOf(review)

  product.reviews.splice(index, 1)

  product.numReviews = product.reviews.length

  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length

  await product.save()

  res.status(201).json({ message: 'Review deleted' })
}
