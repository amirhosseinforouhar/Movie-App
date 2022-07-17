const UnAuthenticatedError = require("../errors/unAuthenticatedError");
const { verifyJwt } = require("../utils/jwt");
const User = require("../models/user.model");



const authMiddleWare = async (req , res , next) => {
        if(!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
            throw new UnAuthenticatedError("invalid token")
        }

        const token = req.headers.authorization.split(" ") [1] 

        const payload = await verifyJwt(token)

        const user = await User.findById(payload.userId)

        req.user = user ;
        
        next()

}

module.exports =  authMiddleWare ; 