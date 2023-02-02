import mongoose from 'mongoose'
import bcyrpt from 'bcrypt'
import config from 'config'

export interface UserInput {
  email: string
  name: string
  password: string
}
export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<Boolean>
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

// Hashing function to hash password

userSchema.pre('save', async function (next) {
  let user = this as UserDocument

  if (!user.isModified('password')) {
    return next()
  }

  // salt password = 10 rounds
  const salt = await bcyrpt.genSalt(config.get<number>('saltWorkFactor'))
  const hash = await bcyrpt.hashSync(user.password, salt)

  user.password = hash

  return next()
})

// Compare Passwords

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument

  return bcyrpt.compare(candidatePassword, user.password).catch((e) => false)
}

// This is User Model
const UserModel = mongoose.model<UserDocument>('User', userSchema)

export default UserModel
