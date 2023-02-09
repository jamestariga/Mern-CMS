import { useQuery } from '@tanstack/react-query'
import { Product } from '../../types/types'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import Content from '@/components/Content'
import { useNavigate } from 'react-router-dom'
import useLogout from '@/hooks/useLogout'

const Home = () => {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const logout = useLogout()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

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
      <header className='flex flex-col items-center justify-center'>
        <Content data={productData} title='Public Products' />
        <div className='flex flex-col justify-center'>
          <button onClick={() => navigate('/admin')}>Admin</button>
          <button onClick={handleLogout}>Sign out</button>
        </div>
      </header>
    </>
  )
}

export default Home
