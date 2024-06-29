import express from "express"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"

/**
 * Import routes
 */
import authRoutes from './routes/auth.routes.js'

import connectMongoDB from "./config/db.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

/**
 * Routes
 */
app.use('/api/auth', authRoutes)

app.listen(8000, () => {
  console.log(`Server is running on port ${PORT}`);

  connectMongoDB()
})