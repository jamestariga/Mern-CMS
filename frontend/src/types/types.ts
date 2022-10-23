export type DogsRequest = {
  message: string[]
  status: string
}

type PopulationRequest = {
  'ID Nation': string
  'ID Year': number
  Nation: string
  Population: number
  'Slug Nation': string
  Year: string
}

export interface Population {
  data: PopulationRequest[]
  source: {}[]
}
