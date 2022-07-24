const express = require("express")
const connectToMongoDB = require("./src/db/connect")
const errorHandlerMiddleWare = require("./src/middlewares/errorHandler.middleware")
const notFound = require("./src/middlewares/notFound.middleware")
const authMiddleWare = require("./src/middlewares/auth.middleware")
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const app = express ()

// Security packages 
const cors = require('cors')
const helmet = require("helmet")
const xss = require("xss-clean")
const rateLimiter = require("express-rate-limit")

// app config 
require("dotenv").config()
require("express-async-errors")


// middlewares 
app.use(rateLimiter({
    windowMs : 15 * 60 * 1000 , 
    max : 60 
}))

app.use(helmet())
app.use(cors())
app.use(xss())

app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())

// routes
app.use("/api/auth" , require("./src/routes/auth.routes"))
app.use("/api/user" , authMiddleWare ,require("./src/routes/user.routes"))
app.use("/api/movies" , require("./src/routes/movie.routes"))


// error handlers 
app.use(notFound)
app.use(errorHandlerMiddleWare)


// mongodb connection 
connectToMongoDB()

const PORT = process.env.PORT || 3000 
app.listen(PORT , () => console.log(`http://localhost:${PORT}`))