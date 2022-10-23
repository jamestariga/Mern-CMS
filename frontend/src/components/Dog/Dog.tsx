import { useQuery } from '@tanstack/react-query'
import { DogsRequest } from '../../types/types'
import { getDogs } from '../../api/dogsApi'

const Dog = () => {
  const { data, isLoading, isError } = useQuery<DogsRequest, Error>(
    ['dog'],
    () => getDogs('hound')
  )

  return (
    <>
      <div className='flex flex-col justify-center items-center gap-10 bg-red-200'>
        {data?.message
          ?.map((message, i) => (
            <div key={i}>
              <img src={message} alt={message} />
            </div>
          ))
          .slice(0, 10)}
      </div>
    </>
  )
}

export default Dog
