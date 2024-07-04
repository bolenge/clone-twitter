import User from '../models/user.model.js'

export const getUserByField = async (field, value) => {
  return await User.findOne({ [field]: value })
}

export const userUniqueFieldAlreadyExists = async (field, value) => {
  const user = await getUserByField(field, value)

  return user !== null && user !== undefined
}

