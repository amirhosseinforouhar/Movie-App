const UnAuthenticatedError = require("../errors/unAuthenticatedError")
const User = require("../models/user.model")
const { createJwt } = require("../utils/jwt")

const signUp = async (req , res) => {
    // first user is admin
    const isFirstUser = (await User.countDocuments()) === 0
    req.body.role = isFirstUser ? "admin" : "user"

    const user = await User.create({...req.body})

    res.status(201).json({user})

}

const login = async (req , res) => {
    const { email , password } = req.body
    
    const user = await User.findOne({email})
    if(!user) throw new UnAuthenticatedError("email or password is wrong")
    
    const isCorrectPassword = await user.comparePassword(password)
    if(!isCorrectPassword) throw new UnAuthenticatedError("email or password is wrong")

    const accessToken = await createJwt({userId : user._id })


    res.json({accessToken , user})
}

const logout = async (req , res) => {

}

module.exports = {
    signUp , 
    login , 
    logout
}