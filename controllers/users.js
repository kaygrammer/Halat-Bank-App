const Users = require("../models/users")
const jwt = require('jsonwebtoken')

//Register new User
const createUser = async (req, res) => {
    const existingUser = await Users.findOne({ email: req.body.email});
    if (existingUser) {
        return res.status(401).json({status:`failed`, msg:"email already exists"});
    }
    if (req.body.password.length <= 7) {
        return res.status(401).json({status:`failed`, msg:"password must be greater than 7 digits"});
    }
    else{
    const user = new Users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
        isBlocked: req.body.isBlocked,
        password: req.body.password,
    })
    try{
        const newuser = await user.save()
        res.status(200).json({status:`success`, msg: "account created successfully", newuser})
    }catch(err){
        res.status(500).json(err);
    }}
}

// Login a user

const login = async (req, res) => {
    const { email, password } = req.body
  
    if (!email || !password) {
        return res.status(401).json({status:"failed", msg:"invalid email or password"});
    }
    if (req.body.password.length <= 7) {
        return res.status(401).json("password must be greater than 7 digits");
    }
    const user = await Users.findOne({ email })
    if (!user) {
        return res.status(401).json({status:`failed`,msg:"user does not exist"});
    }
    // compare password
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        return res.status(401).json({status:`failed`, msg:"incorrect password"});
    }
    
    const token = user.createJWT()
    res.status(200).json({stats:`success`, msg:`user with ${email} logged in successfully`,  user: { email }, token })
  }
  

// get an account
  const getAccountNumber = async (req, res) =>{
    try{
    const account = await Users.findById(req.params.id, 'phoneNumber')
    return res.status(200).json({status: `success`, msg:`your account number is ${account.phoneNumber}`})
}catch(err){
    return res.status(401).json({status:`success`, msg:"account number not found"})
}
  }

  
module.exports = {
    createUser,login, getAccountNumber
}