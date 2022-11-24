import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'

type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
  filename: (req: Request, file: any, cb: FileNameCallback) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: storage })

export default upload
