const UnAuthenticatedError = require("../errors/unAuthenticatedError")
const BadRequestError = require("../errors/badRequestError")
const User = require("../models/user.model")

const getCurrentUser = (req , res) => res.json({user : req.user})


const updateUserPassword = async (req , res) => {
    const {oldPassword , newPassword} = req.body ; 

    if(!oldPassword || !newPassword) {
        throw new BadRequestError("please old password and new password")
    }

    const isCorrectPassword = await req.user.comparePassword(oldPassword)
    if(!isCorrectPassword) throw new UnAuthenticatedError("password is wrong")

    req.user.password = newPassword ; 

    await req.user.save()

    res.json({message : "password updated"})
}


module.exports = {
    getCurrentUser , 
    updateUserPassword , 
}