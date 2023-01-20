const Users = require("../models/users")
const jwt = require('jsonwebtoken')
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middlewares/verifyToken")

  
    // get an account
const getAllUsers = async (req, res) =>{
    try{
    const users = await Users.find()
    if(users.length === 0){
      return res.status(200).json("no user available")
    }
    return res.status(200).json({users})
    }catch(err){
    return res.status(401).json("invalid")
    }}


// update a user using the user id
const updateUser = async (req, res) =>{

  try{
    const updatedUser = await Users.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    },
    {new: true}
    );
    res.status(200).json(updatedUser)
}catch(err){
    res.status(500).json(err)
}
}


// get total number of users
const userCount = async (req, res)=>{
  try{
  const user = await Users.find()
  userCounts = user.length
  res.status(200).json({msg:`there are ${userCounts} users on the platform`})
}catch(err){
    res.status(500).json(err)
}
}


module.exports = {
    getAllUsers, updateUser, userCount
}