import { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import useCartQuery from '@/hooks/useCartQuery'
import CheckoutForm from './CheckoutForm'

const { VITE_APP_STRIPE_KEY } = import.meta.env
const stripePromise = loadStripe(VITE_APP_STRIPE_KEY)

const Checkout = () => {
  const axiosPrivate = useAxiosPrivate()
  const {
    data: cartData,
    isLoading: cartIsLoading,
    isError: cartIsError,
  } = useCartQuery()
  const [clientSecret, setClientSecret] = useState<string | undefined>()

  useEffect(() => {
    const getPaymentIntent = async () => {
      if (cartData) {
        // Retrieve the client secret from the server
        const response = await axiosPrivate.post('/api/create-payment-intent', {
          amount: cartData.total,
          currency: 'cad',
        })

        console.log(response.data.clientSecret)

        setClientSecret(response.data.clientSecret)
      }
    }

    getPaymentIntent()
  }, [axiosPrivate, cartData])

  console.log(cartData?.total)

  return (
    <header className='flex flex-col gap-4 items-center justify-center'>
      <h2 className='text-2xl text-white font-bold'>Checkout</h2>
      <div className='flex flex-col gap-4 items-center justify-center w-4/6'>
        {cartIsLoading && <div>Loading...</div>}
        {cartIsError && <div>Error loading cart data</div>}
        {clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: clientSecret,
              appearance: { theme: 'night' },
            }}
          >
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </header>
  )
}

export default Checkout
