export type DogsRequest = {
  message: string[]
  status: string
}

type PopulationRequest = {
  'ID Nation': string
  'ID Year': number
  Nation: string
  Population: number
  'Slug Nation': string
  Year: string
}

export interface Population {
  data: PopulationRequest[]
  source: {}[]
}

export interface Roles {
  User: number
  Admin: number
  Editor: number
}

export interface UserRequest {
  firstName: string
  lastName: string
  _id: string
  roles: Roles
}

export interface User {
  data: UserRequest[]
}

export interface IImage {
  url: string
  public_id: string
}

interface Review {
  useName: string
  rating: number
  title: string
  comment: string
  createdAt: string
  _id: string
}

export interface IProduct {
  _id: string
  name: string
  brand: string
  category: string
  price: number
  slug: string
  description: string
  reviews: Review[]
  stock: number
  quantity?: number
  image: IImage
}

export interface Product {
  data: IProduct[] | undefined
}

export interface ProductByID {
  data: IProduct
}

export interface IContent {
  data: IProduct[] | undefined
  title: string
}

export interface registerUser {
  userName: string
  password: string
  firstName: string
  lastName: string
}

export interface registerResponse {
  data: any
  success: string
  status: number
}

export interface Auth {
  accessToken: string
  refreshToken?: string
  userName?: string
  password?: string
  roles: Roles[]
  rolesList: Roles
  isAuthorized: boolean
}

export interface loginResponse {
  data: Auth
}

export interface ContextInterface {
  auth: Auth
  setAuth: React.Dispatch<React.SetStateAction<Auth>>
  persist: string | boolean
  setPersist: React.Dispatch<React.SetStateAction<string | boolean>>
}

export interface ICreateProduct {
  axiosPrivate: any
}

export interface IDeleteProduct extends ICreateProduct {
  data: IProduct[] | undefined
}

export interface IModalProps {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  updateProductMutate: any
  handleChange: any
  handleFileChange: any
  product: IProduct
  title: string
}

export interface ITicket {
  title: string
  description: string
  status: any
  priority: any
  type: string
  _id?: string
}

export interface Tickets {
  data: ITicket[] | undefined
}

export interface CartItem {
  name: string
  price: number
  image: IImage
  description: string
  slug: string
  brand: string
  quantity?: number
  _id: string
}

export interface Cart {
  items: CartItem[]
  total: number
}
