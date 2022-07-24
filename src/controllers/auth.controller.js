const UnAuthenticatedError = require("../errors/unAuthenticatedError")
const User = require("../models/user.model")
const { createJwt , sendJwtInCookie } = require("../utils/jwt")

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

    sendJwtInCookie(res , accessToken)

    res.json({user})
}

const logout = async (req , res) => {
    res.clearCookie("access_token").json({messgae : "Successfully logged out"})
}

module.exports = {
    signUp , 
    login , 
    logout
}