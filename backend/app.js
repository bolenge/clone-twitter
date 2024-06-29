import express from "express"
import dotenv from 'dotenv'

/**
 * Import routes
 */
import authRoutes from './routes/auth.routes.js'

import connectMongoDB from "./config/db.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

/**
 * Routes
 */
app.use('/api/auth', authRoutes)

app.listen(8000, () => {
  console.log(`Server is running on port ${PORT}`);

  connectMongoDB()
})