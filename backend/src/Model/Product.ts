import { Schema, Document, Types, model } from 'mongoose'

export interface Reviews {
  userName: string
  title: string
  rating: number
  comment: string
}

export interface Products extends Document<Types.ObjectId> {
  name: string
  slug: string
  description: string
  brand: string
  price: number
  category: string
  stock: number
  reviews: Reviews[]
  numReviews: number
  rating: number
  quantity: number
  image: {
    public_id: string
    url: string
  }
}

const ReviewSchema = new Schema<Reviews>(
  {
    userName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const ProductSchema = new Schema<Products>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    reviews: [ReviewSchema],
    numReviews: {
      type: Number,
      default: 0,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
)

export const Reviews = model<Reviews>('Review', ReviewSchema)

export default model<Products>('Product', ProductSchema)
