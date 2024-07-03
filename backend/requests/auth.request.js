import Joi from "joi"
import { userUniqueFieldAlreadyExists } from "../repositories/user.repository.js";

const fieldAlreadyUsed = async (req) => {
  if (await userUniqueFieldAlreadyExists('email', req.body.email)) {
    return 'Email existe déjà'
  }

  if (await userUniqueFieldAlreadyExists('username', req.body.username)) {
    return 'Nom d\'utilisateur existe déjà'
  }
}

export const signUpRequest = async (req, res, next) => {
  let fieldsError = await fieldAlreadyUsed(req)

  if (fieldsError) {
    return res.status(400).send({
      state: false,
      message: fieldsError
    })
  }

  const regexPassword = /^[a-zA-Z0-9]{6,30}$/
  
  const schema = Joi.object({
    fullName: Joi.string()
      .min(3)
      .max(50)
      .required()
      .messages({
        'string.base': 'Nom doit être une chaîne de caractères',
        'string.empty': 'Nom ne peut pas être vide',
        'string.min': 'Nom minimum 3 caractères',
        'string.max': 'Nom maximum 50 caractères',
        'any.required': 'Nom est requis'
      }),
    
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.email': 'Email invalide',
        'any.required': 'Email est requis'
      }),
    
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(15)
      .required()
      .messages({
        'string.base': 'Nom d\'utilisateur doit être une chaîne de caractères',
        'string.empty': 'Nom d\'utilisateur ne peut pas être vide',
        'string.alphanum': 'Nom d\'utilisateur doit être alphanumérique',
        'string.min': 'Nom d\'utilisateur minimum 3 caractères',
        'string.max': 'Nom d\'utilisateur maximum 15 caractères',
        'any.required': 'Nom d\'utilisateur est requis'
      }),
    
    password: Joi.string()
      .pattern(regexPassword)
      .required()
      .messages({
        'string.base': 'Mot de passe doit être une chaîne de caractères',
        'string.min': 'Mot de passe minimum 6 caractères',
        'string.pattern.base': 'Mot de passe minimum 8 à 30 caractères contenant des lettres et des chiffres',
        'any.required': 'Le mot de passe est requis'
      })
  });

  const { error } = schema.validate(req.body)

  if (error) {
    return res.status(400).send({
      state: false,
      message: error.details[0].message
    })
  }

  next()
}
