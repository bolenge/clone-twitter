import mongoose from "mongoose"

const connectMongoDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_MONGO_URI)

    console.log(`MongoDB connected: ${connect.connection.host}`)
  } catch (error) {
    console.error(`Error : ${error.message}`);
    process.exit(1)
  }
}

export default connectMongoDB