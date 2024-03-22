import mongoose from './index.js'

const validateEmail = (value) => {
    return String(value)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        message: "Name is required"
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validateEmail,
            message: props => `${props.value} is Invalid email`
        },
        message: "email is required"
    },
    password: {
        type: String,
        required: true,
        message: "Password is required"
    },
    confirm_password:{
        type:String,
        required:false,
        message:"Confirm Password is required"
    },
    role: {
        type: String,
        default: "user"
    },
    status: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
}, {
    versionKey: false,
    collection: "users"
})

const UserModel = mongoose.model('users', userSchema)

export default UserModel