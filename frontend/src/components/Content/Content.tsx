import { useState } from 'react'
import { IContent, IProduct } from '@/types/types'
import { Card, Button } from 'react-daisyui'
import { Link } from 'react-router-dom'
import useAddToCartMutation from '@/hooks/useAddToCartMutation'

const Content = (props: IContent) => {
  const { data, title } = props
  const addToCartMutation = useAddToCartMutation()
  const [cartMessage, setCartMessage] = useState<string>('')
  const [cartItems, setCartItems] = useState<any>([])

  const handleAddToCart = async (item: IProduct) => {
    const { name, price, image, _id } = item
    try {
      await addToCartMutation.mutate({ name, price, image, itemId: _id })
      setCartMessage(`Added ${name} to cart!`)
      setCartItems([...cartItems, { name, price, image, itemId: _id }])
    } catch (err) {
      setCartMessage('Failed to add item to cart')
      console.error(err)
    }
  }

  return (
    <>
      <h1 className='text-xl font-bold pb-10'>{title}</h1>
      <div className='grid sm:grid-cols-2 xl:grid-cols-4 items-center justify-center gap-4 xl:gap-8 px-10'>
        {data?.map((item: IProduct) => (
          <Card
            key={item._id}
            bordered={true}
            className='rounded-2xl overflow-hidden border-zinc-200 border-2'
          >
            <Link to={`/product/${item.slug}`} key={item._id}>
              <Card.Image
                src={item.image.url}
                className='overflow-hidden hover:scale-[1.1] transition h-full w-full'
              />
            </Link>
            <Card.Body className='items-center text-center'>
              <Card.Title>{item.name}</Card.Title>
              <p className='text-base'>{item.description}</p>
              <p className='text-base font-semibold'>{`$${item.price}`}</p>
              <Card.Actions>
                <Button
                  className='btn bg-blue-700 text-white border-none hover:bg-blue-600'
                  onClick={() => handleAddToCart(item)}
                >
                  Add to cart
                </Button>
              </Card.Actions>
              <p className='text-green-500 font-semibold mt-2'>{cartMessage}</p>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  )
}

export default Content
