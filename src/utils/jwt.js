const jwt = require("jsonwebtoken")

const createJwt = (payload) => {
    return jwt.sign(payload , process.env.JWT_SECRET , {
        expiresIn : process.env.JWT_LIFE_TIME 
    })
}

const verifyJwt = (token) => jwt.verify(token , process.env.JWT_SECRET)


const sendJwtInCookie = (res , token) => {
    res.cookie("access_token" , token , {
        httpOnly : true , 
        secure : true 
    })
}

module.exports = {
    createJwt , 
    verifyJwt , 
    sendJwtInCookie
}