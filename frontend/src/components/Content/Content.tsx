import { useEffect, useState } from 'react'
// import useCart from '@/hooks/useCart'
import { IContent, IProduct } from '@/types/types'
import { Card, Button } from 'react-daisyui'
import { Link } from 'react-router-dom'
import useAddToCartMutation from '@/hooks/useAddToCartMutation'

const Content = (props: IContent) => {
  const { data, title } = props
  // const { cart, addItem, removeItem } = useCart()
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

  // const handleAddToCart = async (item: IProduct) => {
  //   const { name, price, image, description, slug, brand, quantity, _id } = item
  //   addItem({
  //     name,
  //     price,
  //     image,
  //     description,
  //     slug,
  //     brand,
  //     quantity,
  //     _id,
  //   })
  // }

  return (
    <>
      <h1 className='text-2xl text-white font-bold pb-6'>{title}</h1>
      <p className='text-green-500 font-semibold text-xl p-4'>{cartMessage}</p>
      <div className='grid sm:grid-cols-2 xl:grid-cols-4 items-center justify-center gap-4 xl:gap-8 px-10'>
        {data?.map((item: IProduct) => (
          <Card
            key={item._id}
            bordered={true}
            className='rounded-2xl overflow-hidden bg-blue-900 shadow-xl'
          >
            <Link to={`/product/${item.slug}`} key={item._id}>
              <Card.Image
                src={item.image.url}
                className='overflow-hidden hover:scale-[1.1] transition h-full w-full'
              />
            </Link>
            <Card.Body className='items-center text-center text-white'>
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
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  )
}

export default Content
