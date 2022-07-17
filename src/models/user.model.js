const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    username : {
        type : String , 
        required : [true , "Please provide username"] ,  
        trim : true , 
        minLength : 3 , 
        maxLength : 30 
    },
    email : {
        type : String , 
        required : [true , "Please provide email"] , 
        unique : true , 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    },
    password : {
        type : String , 
        required : true , 
        minLength : 8 
    }, 
    role : {
        type : String , 
        enum : ["admin" , 'user'] , 
        default : "user"
    }

} , {timestaps : true })

userSchema.pre("save" , async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password , salt)
})

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password , this.password)
}

const User = mongoose.model("users" , userSchema)

module.exports = User ; 