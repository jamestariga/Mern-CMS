import { useParams } from 'react-router-dom'
import useQueryByID from '@/hooks/useQueryByID/'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { IProduct, ProductByID } from '@/types/types'
import { Card, Button } from 'react-daisyui'

const ProductID = () => {
  const { id } = useParams<{ id: string }>()
  const axiosPrivate = useAxiosPrivate()

  const getProductByID = async (id: string | undefined) => {
    const response: ProductByID = await axiosPrivate.get<IProduct>(
      `/publicProducts/${id}`
    )
    console.log(response)
    return response.data
  }

  const { data } = useQueryByID('products', id, () => getProductByID(id))

  return (
    <>
      <header className='flex justify-center items-center px-10 h-screen'>
        <Card key={data?._id} bordered={false}>
          <Card.Image src={data?.image.url} className='' />
          <Card.Body className='items-center text-center'>
            <Card.Title>{data?.name}</Card.Title>
            <p className='text-base'>{data?.description}</p>
            <p className='text-base font-semibold'>{data?.price}</p>
            <Card.Actions>
              <Button className='btn bg-blue-700 text-white border-none hover:bg-blue-600'>
                Buy Now
              </Button>
            </Card.Actions>
          </Card.Body>
        </Card>
      </header>
    </>
  )
}

export default ProductID
