import express from "express"
import authController from "../controllers/auth.controller.js"
import { signUpRequest } from "../requests/auth.request.js"

const router = express.Router()

router.post('/signup', signUpRequest, authController.signUp)

router.post('/signin', authController.signIn)

router.post('/logout', authController.logout)

export default router