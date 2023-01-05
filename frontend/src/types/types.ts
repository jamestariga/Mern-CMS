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

export interface Roles {
  User: number
  Admin: number
  Editor: number
}

export interface UserRequest {
  firstName: string
  lastName: string
  _id: string
  roles: Roles
}

export interface User {
  data: UserRequest[]
}

export interface registerUser {
  userName: string
  password: string
  firstName: string
  lastName: string
}

export interface registerResponse {
  data: any
  success: string
  status: number
}

export interface loginUser {
  userName: string
  password: string
}

export interface loginResponse {
  data: any
}

export interface ContextInterface {
  auth: {}
  setAuth: React.Dispatch<React.SetStateAction<{}>>
  persist: any
  setPersist: React.Dispatch<React.SetStateAction<boolean | string>>
}
