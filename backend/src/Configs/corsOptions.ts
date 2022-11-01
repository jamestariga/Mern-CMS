import allowedOrigins from './allowedOrigins'

const corsOption = {
  origin: (origin: any, callback: (x: any, y?: boolean) => void) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200,
}

export default corsOption
