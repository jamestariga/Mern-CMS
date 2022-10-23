import axios from 'axios'
import { Population } from '../types/types'

const populationApi = axios.create({
  baseURL: 'https://datausa.io/api/',
})

export const getPopulation = async () => {
  const { data } = await populationApi.get<Population>(
    `data?drilldowns=Nation&measures=Population`
  )

  console.log(data)

  return data
}
