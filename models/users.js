const mongoose = require("mongoose");


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
            required:[true, "phone number is required"],
            unique:true
        },
        email:{
            type:String,
            required:[true, "email is reuired"],
            unique:true
        },
        password:{
            type:String,
            required:[true]
        },
        isAdmin:{
            type:Boolean,
            default: false,
        },
        isBlocked:{
            type:Boolean,
            default: false
        },
    },
    { timestamps: true}
);

module.exports = mongoose.model("User", userSchema);
