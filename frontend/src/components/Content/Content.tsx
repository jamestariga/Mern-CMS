import { IContent, IProduct } from '@/types/types'
import { Card, Button } from 'react-daisyui'

const Content = (props: IContent) => {
  const { data, title } = props

  return (
    <>
      <h1 className='text-xl font-bold pb-10'>{title}</h1>
      <div className='grid grid-cols-2 xl:grid-cols-4 items-center justify-center gap-4 px-10'>
        {data?.map((item: IProduct) => (
          <Card key={item._id} bordered={false}>
            <Card.Image src={item.image.url} className='' />
            <Card.Body className='items-center text-center'>
              <Card.Title>{item.name}</Card.Title>
              <p className='text-base'>{item.description}</p>
              <p className='text-base font-semibold'>{item.price}</p>
              <Card.Actions>
                <Button className='btn bg-blue-700 text-white border-none hover:bg-blue-600'>
                  Buy Now
                </Button>
              </Card.Actions>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  )
}

export default Content
