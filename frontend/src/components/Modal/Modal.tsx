import { IModalProps } from '@/types/types'
import { AiOutlineCloudUpload, AiFillCloseCircle } from 'react-icons/ai'
import { motion } from 'framer-motion'

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
}

const Modal = ({
  showModal,
  setShowModal,
  updateProductMutate,
  handleChange,
  handleFileChange,
  product,
  title,
}: IModalProps) => {
  const handleClick = () => {
    setShowModal((prev) => !prev)
  }

  return (
    <>
      <div className='w-screen h-screen fixed top-20 flex justify-center items-center z-10 bg-black bg-opacity-50'>
        {showModal && (
          <motion.div
            variants={dropIn}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='flex justify-center items-center flex-col w-1/2 md:w-3/5 lg:w-9/10 max-w-2xl bg-[#333] shadow-md z-[1] rounded-[2rem] p-4 m-8'
          >
            <button className='absolute right-10 top-2' onClick={handleClick}>
              <AiFillCloseCircle className='w-6 h-6' />
            </button>
            <h1 className='text-xl font-bold'>{title}</h1>
            <form
              onSubmit={updateProductMutate.mutate}
              className='flex flex-col items-center justify-center w-72 sm:w-96'
            >
              <div className='flex flex-col items-center justify-center w-full '>
                <div className='flex flex-col items-center justify-center w-full'>
                  <label htmlFor='name'>Name</label>
                  <input
                    className='w-full px-2 py-1 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-300'
                    type='text'
                    name='name'
                    onChange={handleChange}
                    value={product.name}
                  />
                </div>
              </div>
              <div className='flex flex-col items-center justify-center w-full '>
                <div className='flex flex-col items-center justify-center w-full'>
                  <label htmlFor='name'>Price</label>
                  <input
                    className='w-full px-2 py-1 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-300'
                    name='price'
                    onChange={handleChange}
                    value={product.price}
                  />
                </div>
              </div>
              <div className='flex flex-col items-center justify-center w-full '>
                <div className='flex flex-col items-center justify-center w-full'>
                  <label htmlFor='description'>Description</label>
                  <input
                    className='w-full px-2 py-1 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-300'
                    type='text'
                    name='description'
                    onChange={handleChange}
                    value={product.description}
                  />
                </div>
              </div>
              <div className='flex flex-col items-center justify-center w-full '>
                <div className='flex flex-col items-center justify-center w-full'>
                  <label htmlFor='category'>Category</label>
                  <input
                    className='w-full px-2 py-1 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-300'
                    type='text'
                    name='category'
                    onChange={handleChange}
                    value={product.category}
                  />
                </div>
              </div>
              <div className='flex flex-col items-center justify-center w-full '>
                <div className='flex flex-col items-center justify-center w-full'>
                  <label htmlFor='brand'>Brand</label>
                  <input
                    className='w-full px-2 py-1 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-300'
                    type='text'
                    name='brand'
                    onChange={handleChange}
                    value={product.brand}
                  />
                </div>
              </div>
              <div className='flex flex-col items-center justify-center w-full '>
                <div className='flex flex-col items-center justify-center w-full'>
                  <label htmlFor='slug'>Slug</label>
                  <input
                    className='w-full px-2 py-1 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-300'
                    type='text'
                    name='slug'
                    onChange={handleChange}
                    value={product.slug}
                  />
                </div>
              </div>
              <div className='flex flex-col items-center justify-center w-full '>
                <div className='flex flex-col items-center justify-center w-full'>
                  <label htmlFor='stock'>Stock</label>
                  <input
                    className='w-full px-2 py-1 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-300'
                    type='text'
                    name='stock'
                    onChange={handleChange}
                    value={product.stock}
                  />
                </div>
              </div>
              <div className='flex items-center justify-center w-full pt-6'>
                <label
                  htmlFor='dropzone-file'
                  className='flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
                >
                  <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <AiOutlineCloudUpload className='w-10 h-10 mb-3 text-gray-400' />
                    <p className='mb-2 text-base text-gray-500 dark:text-gray-400'>
                      <span className='font-semibold'>Click to upload</span> or
                      drag and drop
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
                  className='w-full px-4 py-2  text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
                  type='submit'
                >
                  Submit
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </>
  )
}

export default Modal
