const mongoose = require("mongoose")


const connectToMongoDB = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to MongoDB")
    }
    catch(error) {
        console.log(error)
        process.exit(1)
    }

    
}


module.exports = connectToMongoDB ; 