const Users = require("../models/users")
const jwt = require('jsonwebtoken')


//Register new User
const createUser = async (req, res) => {
    const user = new Users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        userType: req.body.userType,
        isBlocked: req.body.isBlocked,
        password: req.body.password,
    })
    const token = user.createJWT()
    try{
        const saveuser = await user.save()
        res.status(200).json({ msg: "account created successfully", saveuser, token})
    }catch(err){
        res.status(500).json(err);
    }
}

// Login a user

const login = async (req, res) => {
    const { email, password } = req.body
  
    if (!email || !password) {
        return res.status(401).json("invalid email or password");
    }
    if (req.body.password.length <= 5) {
        return res.status(401).json("password must be greater than 5 digits");
    }
    const user = await Users.findOne({ email })
    if (!user) {
        return res.status(401).json("user does not exist");
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        return res.status(401).json("incorrect password");
    }
    // compare password
    const token = user.createJWT()
    res.status(200).json({ user: { email: user.email }, token })
  }
  

  const getAccountNumber = async (req, res) =>{
    account = await Users.findOne({phoneNumber})
  }

module.exports = {
    createUser,login
}