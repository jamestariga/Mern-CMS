import useCart from '@/hooks/useCart'
import useCartQuery from '@/hooks/useCartQuery'
import useRemoveFromCartMutation from '@/hooks/useRemoveFromCartMutation'

const Cart = () => {
  const { cart, addItem, removeItem, clearCart } = useCart()
  const { data, isLoading, isError } = useCartQuery()
  const removeFromCartMutation = useRemoveFromCartMutation()

  const handleRemoveFromCart = (itemId: string) => {
    removeFromCartMutation.mutate(itemId)
    removeItem(itemId)
  }

  console.log(data?.items.map((item: any) => item.name))

  return (
    <header>
      <h2>Cart</h2>
      <ul>
        {data?.items.map((item: any) => (
          <li key={item.itemId}>
            {item.name} - {item.price} - {item.quantity}{' '}
            <button onClick={() => handleRemoveFromCart(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div>Total: {data?.total}</div>
      <button onClick={clearCart}>Clear Cart</button>
    </header>
  )
}

export default Cart
