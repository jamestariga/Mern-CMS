import { useState } from 'react'
import { ICreateProduct, IProduct } from '@/types/types'
import { useMutation } from '@tanstack/react-query'
import { AiOutlineCloudUpload } from 'react-icons/ai'

const CreateProduct = (props: ICreateProduct) => {
  const { axiosPrivate } = props
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
    formData.append('price', product.price as any)
    formData.append('category', product.category)
    formData.append('stock', product.stock as any)
    formData.append('image', product.image as any)

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
        className='flex flex-col items-center justify-center w-72 sm:w-96'
      >
        <div className='flex flex-col items-center justify-center w-full mt-4'>
          <div className='flex flex-col items-center justify-center w-full'>
            <label htmlFor='name'>Name</label>
            <input
              className='w-full px-2 py-1 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-300'
              type='text'
              name='name'
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='flex flex-col items-center justify-center w-full mt-4'>
          <div className='flex flex-col items-center justify-center w-full'>
            <label htmlFor='name'>Price</label>
            <input
              className='w-full px-2 py-1 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-300'
              name='price'
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='flex flex-col items-center justify-center w-full mt-4'>
          <div className='flex flex-col items-center justify-center w-full'>
            <label htmlFor='description'>Description</label>
            <input
              className='w-full px-2 py-1 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-300'
              type='text'
              name='description'
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='flex flex-col items-center justify-center w-full mt-4'>
          <div className='flex flex-col items-center justify-center w-full'>
            <label htmlFor='category'>Category</label>
            <input
              className='w-full px-2 py-1 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-300'
              type='text'
              name='category'
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='flex flex-col items-center justify-center w-full mt-4'>
          <div className='flex flex-col items-center justify-center w-full'>
            <label htmlFor='brand'>Brand</label>
            <input
              className='w-full px-2 py-1 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-300'
              type='text'
              name='brand'
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='flex flex-col items-center justify-center w-full mt-4'>
          <div className='flex flex-col items-center justify-center w-full'>
            <label htmlFor='slug'>Slug</label>
            <input
              className='w-full px-2 py-1 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-300'
              type='text'
              name='slug'
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='flex flex-col items-center justify-center w-full mt-4'>
          <div className='flex flex-col items-center justify-center w-full'>
            <label htmlFor='stock'>Stock</label>
            <input
              className='w-full px-2 py-1 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-300'
              type='text'
              name='stock'
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='flex items-center justify-center w-full pt-6'>
          <label
            htmlFor='dropzone-file'
            className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
          >
            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
              <AiOutlineCloudUpload className='w-10 h-10 mb-3 text-gray-400' />
              <p className='mb-2 text-base text-gray-500 dark:text-gray-400'>
                <span className='font-semibold'>Click to upload</span> or drag
                and drop
              </p>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                PNG or JPEG
              </p>
            </div>
            <input
              id='dropzone-file'
              type='file'
              name='image'
              onChange={handleFileChange}
              className='hidden'
            />
          </label>
        </div>
        <div className='py-6'>
          <button
            className='w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
            type='submit'
          >
            Submit
          </button>
        </div>
      </form>
    </>
  )
}

export default CreateProduct
