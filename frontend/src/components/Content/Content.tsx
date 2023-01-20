import { IContent, IProduct } from '@/types/types'

const Content = (props: IContent) => {
  const { data, title } = props

  return (
    <header className='flex flex-col items-center justify-center px-4'>
      <h1>{title}</h1>
      {data?.map((item: IProduct) => (
        <div
          key={item._id}
          className='flex flex-col justify-center items-center'
        >
          <h1>{item.name}</h1>
          <p>{item.price}</p>
          <p>{item.description}</p>
          <img src={item.image.url} alt='' />
        </div>
      ))}
    </header>
  )
}

export default Content
