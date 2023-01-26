import { IDeleteProduct } from '@/types/types'
import { useMutation } from '@tanstack/react-query'

const DeleteProduct = (props: IDeleteProduct) => {
  const { data, axiosPrivate } = props

  const deleteProduct = async (id: number) => {
    const abortController = new AbortController()

    try {
      const response = await axiosPrivate.delete('/product', {
        signal: abortController.signal,
        data: { _id: id },
      })
      console.log(response)

      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const deleteProductMutation = useMutation(deleteProduct)

  return (
    <>
      <div className='flex flex-col justify-center items-center p-4'>
        <h2 className='font-bold text-2xl'>Product List</h2>
        <ul>
          {data?.map((product: any) => (
            <li key={product._id} className='py-4'>
              <p className='font-bold text-xl'>{product.name}</p>
              <button
                className='btn'
                onClick={() => deleteProductMutation.mutate(product._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default DeleteProduct
