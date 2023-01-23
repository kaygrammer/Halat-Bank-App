const Users = require("../models/users")
const jwt = require('jsonwebtoken')

  
    // get an account
const getAllUsers = async (req, res) =>{
    try{
    const users = await Users.find()
    if(users.length === 0){
      return res.status(200).json({status: `success`, msg:"no user available", users})
    }
    return res.status(200).json({status:`success`, msg:`all user list`, users:users})
    }catch(err){
    return res.status(401).json({status:`failed`, msg:`could not get the list of users`, err})
    }}


// update a user using the user id
const updateUser = async (req, res) =>{

  try{
    const updatedUser = await Users.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    },
    {new: true}
    );
    res.status(200).json({status:`success`, msg:`user updated successfully`, updatedUser:updatedUser})
}catch(err){
    res.status(500).json({status:`failed`, msg:`there was an error`, err})
}
}


// get total number of users
const userCount = async (req, res)=>{
  try{
  const user = await Users.find()
  userCounts = user.length
  res.status(200).json({status:`success`, msg:`there are ${userCounts} users on the platform`})
}catch(err){
    res.status(500).json(err)
}
}


module.exports = {
    getAllUsers, updateUser, userCount
}