const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:[true, "first name required"]
        },
        lastName:{
            type:String,
            required:[true, "last name required"]
        },
        phoneNumber:{
            type:String, 
            required:[true, "phone number is required"]
        },
        email:{
            type:String,
            required:[true, "email is reuired"],
            unique:true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please provide a valid email',
              ],
        },
        password:{
            type:String,
            required:[true]
        },
        userType: {
            type: String,
            enum : ['user','admin'],
            default: 'user'
        },
        isBlocked:{
            type:Boolean,
            default: false
        },
    },
    { timestamps: true}
)

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })


userSchema.methods.createJWT = function () {
return jwt.sign(
    { userId: this._id },
    process.env.JWT_SECRET,
    {
    expiresIn: process.env.JWT_LIFETIME,
    }
)
}

userSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
  }
  


module.exports = mongoose.model("User", userSchema);
