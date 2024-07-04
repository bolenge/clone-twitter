import express from "express"
import { signUp, signIn, logout, getUser } from "../controllers/auth.controller.js"
import signUpRequest from '../requests/auth/signup.request.js'
import authMiddleware from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post('/signup', signUpRequest, signUp)

router.post('/signin', signIn)

router.post('/logout', logout)

router.get('/user', authMiddleware, getUser)

export default router