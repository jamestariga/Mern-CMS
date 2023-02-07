import { IDeleteProduct, IProduct } from '@/types/types'
import { useMutation } from '@tanstack/react-query'
import { Card, Button } from 'react-daisyui'

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
      <h2 className='font-bold text-2xl text-center'>Product List</h2>
      <div className='grid grid-cols-4 items-center justify-center gap-4 px-10'>
        {data?.map((product: IProduct) => (
          <Card key={product._id} bordered={false} className=''>
            <Card.Body className='items-center text-center p-2'>
              <Card.Image src={product.image.url} className='rounded-xl' />
              <Card.Title className='font-bold text-xl'>
                {product.name}
              </Card.Title>
              <Card.Actions>
                <Button
                  onClick={() =>
                    deleteProductMutation.mutate(parseInt(product._id))
                  }
                >
                  Delete
                </Button>
              </Card.Actions>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  )
}

export default DeleteProduct
