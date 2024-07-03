import User from '../models/user.model.js'

export const userUniqueFieldAlreadyExists = async (field, value) => {
  return await User.findOne({ [field]: value })
}
