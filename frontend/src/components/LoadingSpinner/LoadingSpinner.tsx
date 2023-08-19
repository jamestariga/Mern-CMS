import { AnimatePresence, motion } from 'framer-motion'

const spinTransition = {
  repeat: Infinity,
  ease: 'linear',
  duration: 1,
}

const LoadingSpinner = () => {
  return (
    <>
      <AnimatePresence>
        <div className='flex flex-col h-screen w-screen justify-center items-center min-h-[10rem] text-blue-500 font-bold text-xl'>
          <motion.span
            animate={{ rotate: 360 }}
            transition={spinTransition}
            className='flex justify-center items-center w-10 h-10 border-[0.4rem] border-solid border-blue-300 border-t-[0.4rem] border-t-blue-600 rounded-full'
          />
          Loading...
        </div>
      </AnimatePresence>
    </>
  )
}

export default LoadingSpinner
