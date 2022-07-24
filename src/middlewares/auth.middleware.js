const UnAuthenticatedError = require("../errors/unAuthenticatedError");
const { verifyJwt } = require("../utils/jwt");
const User = require("../models/user.model");



const authMiddleWare = async (req , res , next) => {

        const token = req.cookies.access_token 
        
        if(!token) throw new UnAuthenticatedError("invalid token")

        const payload = await verifyJwt(token)

        const user = await User.findById(payload.userId)
        req.user = user ;
        
        next()

}

module.exports =  authMiddleWare ; 