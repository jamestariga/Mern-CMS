import axios from 'axios'
import { DogsRequest } from '../types/types'

const dogApi = axios.create({
  baseURL: 'https://dog.ceo/api',
})

export const getDogs = async (breed: string) => {
  const { data } = await dogApi.get<DogsRequest>(`/breed/${breed}/images`)

  // console.log(data.message?.slice(0, 10))
  console.log(data)

  return data
}
