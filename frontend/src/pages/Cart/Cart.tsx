import { useEffect, useState } from 'react'
import useCart from '@/hooks/useCart'
import useCartQuery from '@/hooks/useCartQuery'
import useAddToCartMutation from '@/hooks/useAddToCartMutation'
import useRemoveFromCartMutation from '@/hooks/useRemoveFromCartMutation'
import { Card, Button } from 'react-daisyui'
import { Link } from 'react-router-dom'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { IProduct } from '@/types/types'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const axiosPrivate = useAxiosPrivate()
  const { cart, addItem, removeItem } = useCart()
  const addToCartMutation = useAddToCartMutation()
  const { data, isLoading, isError } = useCartQuery()
  const removeFromCartMutation = useRemoveFromCartMutation()
  const navigate = useNavigate()

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
    } catch (err) {
      console.error(err)
    }
    // addItem({
    //   name,
    //   price,
    //   image,
    //   description,
    //   slug,
    //   brand,
    //   quantity,
    //   _id,
    // })
  }

  const handleClearCart = async () => {
    const response = await axiosPrivate.delete('/api/cart')

    window.location.reload()

    return response.data
  }

  const handleRemoveFromCart = async (_id: string) => {
    try {
      await removeFromCartMutation.mutate(_id)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <header className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl text-white font-bold'>Cart</h2>
      <div className='flex flex-wrap items-center justify-center gap-4 xl:gap-8 px-10 py-6'>
        {data?.items.items.map((item: any) => (
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
              <p className='text-base font-semibold'>{`Quantity: ${item.quantity}`}</p>
              <Card.Actions>
                <Button
                  className='btn bg-blue-700 text-white border-none hover:bg-blue-600'
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </Button>
                <Button
                  className='btn bg-blue-700 text-white border-none hover:bg-blue-600'
                  onClick={() => handleRemoveFromCart(item._id)}
                >
                  Remove
                </Button>
              </Card.Actions>
            </Card.Body>
          </Card>
        ))}
      </div>
      <div className='flex flex-col justify-center items-center gap-4'>
        <h3 className='text-lg text-white font-bold'>
          Cart Total: ${data?.items.total}
        </h3>
        <div className='flex gap-4'>
          <button
            className='btn bg-blue-700 text-white border-none hover:bg-blue-600'
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
          <button
            className='btn bg-blue-700 text-white border-none hover:bg-blue-600'
            onClick={() => navigate('/checkout')}
          >
            Checkout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Cart
