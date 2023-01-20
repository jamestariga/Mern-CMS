import { useQuery } from '@tanstack/react-query'
import { Product } from '../../types/types'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import Content from '@/components/Content'

const Home = () => {
  const axiosPrivate = useAxiosPrivate()

  const getProducts = async () => {
    const response = await axiosPrivate.get<Product>('/publicProducts')
    console.log(response)

    return response.data
  }

  const { data, isLoading, isError } = useQuery<Product, Error>(
    ['publicProducts'],
    () => getProducts()
  )

  const { data: productData } = data || {}

  console.log(productData)

  return (
    <>
      <Content data={productData} title='Public Products' />
    </>
  )
}

export default Home
