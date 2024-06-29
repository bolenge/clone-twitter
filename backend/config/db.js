import mongoose from "mongoose"

const connectMongoDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })

    console.log(`MongoDB connected: ${connect.connection.host}`)
  } catch (error) {
    console.error(`Error : ${error.message}`);
    process.exit(1)
  }
}

export default connectMongoDB