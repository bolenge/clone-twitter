import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js'
import { getUserByField } from '../repositories/user.repository.js'

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
    console.error('Error in signUp controller: ', error.message)

    res.status(500).send({
      error: "Une erreur s'est produite lors de la création de votre compte"
    })
  }
}

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await getUserByField('username', username)

    if (!user) {
      return res.status(400).send({
        error: "Nom d'utilisateur d'utilisateur incorrect"
      })
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({
        error: "Mot de passe incorrect"
      })
    }

    generateTokenAndSetCookie(user._id, res)

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
    console.error('Error in signIn controller: ', error.message)

    res.status(500).send({
      error: "Une erreur s'est produite lors de la connexion"
    })
  }
}

export const logout = async (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 })
    res.status(200).send({
      message: "Déconnecté avec succès"
    })
  } catch (error) {
    console.error('Error in logout controller: ', error.message);

    res.status(500).send({
      error: "Une erreur s'est produite lors de la déconnexion"
    })
  }
}

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')

    res.status(200).send(user)
  } catch (error) {
    console.error('Error in getUser controller: ', error.message)

    res.status(500).send({
      error: "Une erreur s'est produite lors de la récupération de l'utilisateur"
    })
  }
}
