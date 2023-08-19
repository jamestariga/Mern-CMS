import { useState } from 'react'
import { IDeleteProduct, IProduct } from '@/types/types'
import { useMutation } from '@tanstack/react-query'
import { Card, Button } from 'react-daisyui'
import Modal from '@/components/Modal'
import { AnimatePresence } from 'framer-motion'

const DeleteProduct = (props: IDeleteProduct) => {
  const { data, axiosPrivate } = props

  const [product, setProduct] = useState<IProduct>({
    name: '',
    slug: '',
    brand: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    image: {
      url: '',
      public_id: '',
    },
    _id: '',
    reviews: [],
  })

  const [showModal, setShowModal] = useState<boolean>(false)

  const deleteProduct = async (id: string) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: any) => {
    setProduct({ ...product, image: e.target.files?.[0] })
  }

  const updateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const abortController = new AbortController()

    const formData = new FormData()

    formData.append('_id', product._id)
    formData.append('name', product.name)
    formData.append('slug', product.slug)
    formData.append('brand', product.brand)
    formData.append('description', product.description)
    formData.append('price', product.price as any)
    formData.append('category', product.category)
    formData.append('stock', product.stock as any)
    formData.append('image', product.image as any)

    try {
      const response = await axiosPrivate.put('/product', formData, {
        signal: abortController.signal,
        data: { _id: product._id },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteProductMutation = useMutation(deleteProduct)
  const updateProductMutation = useMutation(updateProduct)

  return (
    <>
      <h2 className='font-bold text-2xl text-center'>Product List</h2>
      <div className='grid grid-cols-2 xl:grid-cols-4 items-center justify-center gap-4 px-10'>
        {data?.map((product: IProduct) => (
          <Card key={product._id} bordered={false} className=''>
            <Card.Body className='items-center text-center p-2'>
              <Card.Image src={product.image.url} className='rounded-xl' />
              <Card.Title className='font-bold text-xl'>
                {product.name}
              </Card.Title>
              <div className='flex items-center justify-center gap-4'>
                <Card.Actions>
                  <Button
                    onClick={() => deleteProductMutation.mutate(product._id)}
                  >
                    Delete
                  </Button>
                </Card.Actions>
                <Card.Actions>
                  <Button
                    onClick={() => {
                      setShowModal((prev) => !prev)
                      setProduct({
                        name: product.name,
                        slug: product.slug,
                        brand: product.brand,
                        description: product.description,
                        price: product.price,
                        category: product.category,
                        stock: product.stock,
                        image: {
                          url: product.image.url,
                          public_id: product.image.public_id,
                        },
                        _id: product._id,
                        reviews: product.reviews,
                      })
                    }}
                  >
                    Update
                  </Button>
                </Card.Actions>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
      <AnimatePresence initial={false} onExitComplete={() => null}>
        {showModal && (
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            updateProductMutate={updateProductMutation}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            product={product}
            title='Update Product'
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default DeleteProduct
