import React, { useState } from 'react'
import { ICreateProduct } from '@/types/types'
import { useMutation } from '@tanstack/react-query'

const CreateProduct = (props: ICreateProduct) => {
  const { axiosPrivate } = props
  const [product, setProduct] = useState({
    name: '',
    slug: '',
    brand: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: any) => {
    setProduct({ ...product, image: e.target.files?.[0] })
  }

  const postProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append('name', product.name)
    formData.append('slug', product.slug)
    formData.append('brand', product.brand)
    formData.append('description', product.description)
    formData.append('price', product.price)
    formData.append('category', product.category)
    formData.append('stock', product.stock)
    formData.append('image', product.image)

    try {
      const response = await axiosPrivate.post('/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      window.location.reload()
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const createProductMutation = useMutation(postProduct)

  return (
    <>
      <form
        onSubmit={createProductMutation.mutate}
        className='flex flex-col justify-center items-center'
      >
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' onChange={handleChange} />
        <label htmlFor='price'>Price</label>
        <input type='text' name='price' onChange={handleChange} />
        <label htmlFor='description'>Description</label>
        <input type='text' name='description' onChange={handleChange} />
        <label htmlFor='category'>Category</label>
        <input type='text' name='category' onChange={handleChange} />
        <label htmlFor='brand'>Brand</label>
        <input type='text' name='brand' onChange={handleChange} />
        <label htmlFor='slug'>Slug</label>
        <input type='text' name='slug' onChange={handleChange} />
        <label htmlFor='stock'>Stock</label>
        <input type='text' name='stock' onChange={handleChange} />
        <label htmlFor='image'>Image</label>
        <input type='file' name='image' onChange={handleFileChange} />
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default CreateProduct
