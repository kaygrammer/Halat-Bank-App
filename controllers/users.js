const Users = require("../models/users")

const createUser = async (req, res) => {
    
    try{
        const user = await Users.create(req.body)
        res.status(200).json("user created successfull", user)
    }catch(err){
        res.status(500).json(err);
    }

}

module.exports = {
    createUser,
}