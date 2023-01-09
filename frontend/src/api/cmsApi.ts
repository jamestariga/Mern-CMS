import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:3001/',
})

export const cmsApiPrivate = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

const cmsApi = axios.create({
  baseURL: 'http://localhost:3001/',
})

export const getContent = async () => {
  const { data } = await cmsApi.get('/')

  console.log(data)

  return data
}

export const getAllProduct = async () => {
  const { data } = await cmsApi.get('/product')

  console.log(data.data)

  return data
}
