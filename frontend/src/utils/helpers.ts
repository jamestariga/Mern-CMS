export const boolToString = (data: any) => {
  if (typeof data === 'boolean') {
    return data.toString()
  }
  return data
}

export const wait = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
}

export default ROLES
