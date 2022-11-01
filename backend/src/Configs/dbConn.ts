import mongoose from 'mongoose'

const dbURI = `${process.env.DATABASE_URI}`

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI)
  } catch (err) {
    console.log(err)
  }
}

export default connectDB
