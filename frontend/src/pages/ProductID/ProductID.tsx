import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useQueryByID from '@/hooks/useQueryByID/'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { IProduct, ProductByID } from '@/types/types'
import { Card, Button } from 'react-daisyui'
import useAddToCartMutation from '@/hooks/useAddToCartMutation'

const ProductID = () => {
  const { id } = useParams<{ id: string }>()
  const axiosPrivate = useAxiosPrivate()
  const addToCartMutation = useAddToCartMutation()
  const [cartMessage, setCartMessage] = useState<string>('')

  useEffect(() => {
    return () => {
      setCartMessage('')
    }
  }, [])

  const handleAddToCart = async (item: IProduct) => {
    const { name, price, image, description, slug, brand, quantity, _id } = item
    try {
      await addToCartMutation.mutate({
        name,
        price,
        image,
        description,
        slug,
        brand,
        quantity,
        _id,
      })
      setCartMessage(`Added ${name} to cart!`)
    } catch (err) {
      setCartMessage('Failed to add item to cart')
      console.error(err)
    }
  }

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
      <header className='flex flex-col justify-center items-center px-10 h-screen'>
        <p className='text-green-500 font-semibold text-xl p-4'>
          {cartMessage}
        </p>
        <Card key={data?._id} bordered={false}>
          <Card.Image src={data?.image.url} className='' />
          <Card.Body className='items-center text-center bg-blue-900'>
            <Card.Title>{data?.name}</Card.Title>
            <p className='text-base'>{data?.description}</p>
            <p className='text-base font-semibold'>{data?.price}</p>
            <Card.Actions>
              <Button
                className='btn bg-blue-700 text-white border-none hover:bg-blue-600'
                onClick={() => handleAddToCart(data as IProduct)}
              >
                Add to cart
              </Button>
            </Card.Actions>
          </Card.Body>
        </Card>
      </header>
    </>
  )
}

export default ProductID
