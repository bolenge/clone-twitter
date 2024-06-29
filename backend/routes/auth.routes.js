import express from "express"
import authController from "../controllers/auth.controller.js"

const router = express.Router()

router.post('/signup', authController.signUp)

router.post('/signin', authController.signIn)

router.post('/logout', authController.logout)

export default router