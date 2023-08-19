import { useEffect, useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Elements, PaymentElement } from '@stripe/react-stripe-js'
import { useNavigate } from 'react-router-dom'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import useCartQuery from '@/hooks/useCartQuery'

const CheckoutForm = () => {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const stripe = useStripe()
  const elements = useElements()
  const { data, isLoading, isError } = useCartQuery()
  const [processing, setProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const total = data?.total

  console.log(elements)

  const handlePaymentSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setProcessing(true)

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000/home',
        },
      })

      if (error) {
        setProcessing(false)
        setErrorMessage('Failed to process payment.')
      } else {
        // Capture the payment
        await axiosPrivate.post('/api/capture-payment', {
          paymentIntentId: elements,
        })
        navigate('/home')
      }
    } catch (error: any) {
      setProcessing(false)
      setErrorMessage(error.message)
      console.log(error.message)
    }
  }

  return (
    <>
      <div className='w-4/6'>
        <PaymentElement />
        <form onSubmit={handlePaymentSubmit} className='pt-4'>
          <div className='flex flex-col gap-4'>
            <label
              htmlFor='amount'
              className='text-base font-semibold text-white'
            >
              Total
            </label>
            <h3 className='text-white font-bold'>{total}</h3>
            {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
            <button
              className='btn bg-blue-700 text-white border-none hover:bg-blue-600'
              type='submit'
              disabled={processing}
            >
              {processing ? 'Processing...' : 'Submit Payment'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CheckoutForm
