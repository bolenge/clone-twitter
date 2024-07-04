import express from "express"
import { signUp, signIn, logout } from "../controllers/auth.controller.js"
import { signUpRequest } from "../requests/auth.request.js"

const router = express.Router()

router.post('/signup', signUpRequest, signUp)

router.post('/signin', signIn)

router.post('/logout', logout)

export default router