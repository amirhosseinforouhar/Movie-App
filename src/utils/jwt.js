const jwt = require("jsonwebtoken")

const createJwt = (payload) => {
    return jwt.sign(payload , process.env.JWT_SECRET , {
        expiresIn : process.env.JWT_LIFE_TIME 
    })
}

const verifyJwt = (token) => jwt.verify(token , process.env.JWT_SECRET)


module.exports = {
    createJwt , 
    verifyJwt
}