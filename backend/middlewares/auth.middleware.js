
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export default async (req, res, next) => {
  try {
    const token = req.cookies.jwt

    if (!token) {
      return res.status(401).send({
        error: "Unauthorized : Vous devez être connecté"
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded) {
      return res.status(401).send({
        error: "Unauthorized : Token invalide"
      })
    }

    req.user = await User.findById(decoded.userId).select('-password')

    next()
  } catch (error) {
    console.error('Error in auth middleware: ', error.message)

    res.status(500).send({
      error: "Internal Server Error (Auth Middleware)"
    })
  }
}