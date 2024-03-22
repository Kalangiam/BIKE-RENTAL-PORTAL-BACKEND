import mongoose from './index.js'

const validateEmail = (value) => {
    return String(value)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

const RentRequest = new mongoose.Schema({
    no: {
        type:String,
        required:true
    },
    bike: {
        type:String,
        required:true
    },
    name: {
        type: String,
        required: true,
        message: "Name is required"
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validateEmail,
            message: props => `${props.value} is Invalid email`
        },
        message: "email is required"
    },
    mobile: {
        type: String,
        required: false
    },
    For_time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Not Booked"
    },
  
 
}, {
    versionKey: false,
    collection: "user-request"
})

const RRModel = mongoose.model('user-request', RentRequest)

export default RRModel