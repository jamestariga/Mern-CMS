import axios from 'axios'
import { User } from '../types/types'

const cmsApi = axios.create({
  baseURL: 'http://localhost:3001/',
})

export const getContent = async () => {
  const { data } = await cmsApi.get('/')

  console.log(data)

  return data
}

export const getUser = async () => {
  const { data } = await cmsApi.get<User>('/user')

  console.log(data.data)

  return data
}
