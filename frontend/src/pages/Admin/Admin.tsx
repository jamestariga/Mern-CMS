import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useLocation } from 'react-router-dom'
import { Product } from '@/types/types'
import CreateProduct from './components/CreateProduct'
import DeleteProduct from './components/DeleteProduct'

const postProduct = async (axiosPrivate: any) => {
  const abortController = new AbortController()

  const response = await axiosPrivate.post('/products', {
    signal: abortController.signal,
  })
  console.log(response.data)

  return response.data
}

const Admin = () => {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()

  const getProducts = async () => {
    const response = await axiosPrivate.get<Product>('/publicProducts')
    console.log(response)

    return response.data
  }

  const { data: publicProductData } = useQuery<Product, Error>(
    ['publicProducts'],
    () => getProducts()
  )

  const { data: productData } = publicProductData || {}

  console.log(productData)

  return (
    <>
      <header className='flex flex-col items-center justify-center'>
        <CreateProduct axiosPrivate={axiosPrivate} />
        <DeleteProduct data={productData} axiosPrivate={axiosPrivate} />
      </header>
    </>
  )
}

export default Admin
