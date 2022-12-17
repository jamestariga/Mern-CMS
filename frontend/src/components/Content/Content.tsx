import { getUser } from '@/api/cmsApi'
import { useQuery } from '@tanstack/react-query'
import { User, UserRequest } from '../../types/types'

const Content = () => {
  const { data, isLoading, isError } = useQuery<User, Error>(['content'], () =>
    getUser()
  )

  const { data: userData } = data || {}

  return (
    <div>
      {userData?.map((item: UserRequest) => (
        <div key={item._id}>
          <h1>{item.firstName}</h1>
          <p>{item.lastName}</p>
        </div>
      ))}
    </div>
  )
}

export default Content
