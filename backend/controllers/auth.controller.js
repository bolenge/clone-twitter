import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js'

export const signUp = async (req, res) => {
  try {
    const { fullName, email, username, password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
      fullName,
      email,
      username,
      password: hashedPassword
    })

    if (!user) {
      return res.status(400).send({
        error: "Données envoyées sont invalides"
      })
    }

    generateTokenAndSetCookie(user._id, res)
    await user.save()

    res.status(201).send({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      username: user.username,
      followers: user.followers,
      following: user.following,
      profileImg: user.profileImg,
      coverImg: user.coverImg,
    })
  } catch (error) {
    return res.status(500).send({
      error: "Une erreur s'est produite lors de la création de votre compte"
    })
  }
}

export const signIn = async (req, res) => {
  res.send({
    data: "You hit the sign in endpoint"
  })
}

export const logout = async (req, res) => {
  res.send({
    data: "You hit the logout endpoint"
  })
}
