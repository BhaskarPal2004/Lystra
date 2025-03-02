import mongoose from "mongoose";


export const dbConnect = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URI)
    await mongoose.connect("mongodb://localhost:27017/Lystra")
    console.log('MongoDb connected successfully')
  } catch (error) {
    console.log(error)
  }
}