const Movie = require("../models/movie.model")
const BadRequestError = require("../errors/badRequestError")
const NotFoundError = require("../errors/notFoundError")
const path = require("path")
const fs = require('fs')

const createMovie = async (req , res) => {
    if(!req.files) throw new BadRequestError("please provide image")

    const image = req.files.image

    const imagePath = path.join(__dirname , "../../public/uploads/" + image.name)
    req.body.cover = imagePath 

    const movie = await Movie.create({...req.body})

    await image.mv(imagePath)

    res.status(201).json({movie})

}

const getAllMovies = async (req , res) => {
    // sort 
    const {sort} = req.query 

    const movies = Movie.find()

    if(sort === "latest") movies.sort("-createdAt") 
    if(sort === "oldest") movies.sort("createdAt")
    if(sort === "like") movies.sort("-likeCount")

    // pagination  

    const limit = parseInt(req.query.limit) || 10 
    const page = parseInt(req.query.page) || 1

    const skip = (page - 1) * limit 


    const result = await movies.limit(limit).skip(skip)

    res.json({movies : result})

}


const getSingleMovie = async (req , res) => {
    const movie = await Movie.findById(req.params.id)
    if(!movie) throw new NotFoundError("movie not found")
    
    res.json({movie})
}

const deleteMovie = async(req , res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id)
    if(!movie) throw new NotFoundError("movie not found")
    
    fs.unlinkSync(movie.cover)

    res.json({message : "movie deleted"})
}

const editMovie = async (req , res) => {
    const movie = await Movie.findById(req.params.id)
    if(!movie) throw new NotFoundError("movie not found")

    if(req.files) {
        const imagePath = path.join(__dirname , "../../public/uploads/" + req.files.image.name)
        req.body.cover = imagePath 
        // delete old image 
        fs.unlinkSync(movie.cover)
        // upload new image 
        await req.files.image.mv(imagePath)
    }

    else req.body.cover = movie.cover 

    await movie.updateOne({...req.body} , {
        runValidators : true 
    })

    res.json({message : "movie updated"})

}

const addLike = async (req , res) => {
    const movie = await Movie.findById(req.params.id)
    if(!movie) throw new NotFoundError("movie not found")
    
    await movie.updateOne({$push : {likes : req.user._id} , $inc : {likeCount : 1}})
    
    
    res.json({message : "liked"})
    
    
}
const unLike = async (req  , res ) => {
    const movie = await Movie.findById(req.params.id)
    if(!movie) throw new NotFoundError("movie not found")
    
    
    await movie.updateOne({$pull : {likes : req.user._id} , $inc : {likeCount :  -1 } })
    res.json({message : "unliked"})
}


module.exports = {
    createMovie ,
    getAllMovies , 
    getSingleMovie , 
    deleteMovie , 
    editMovie , 
    addLike ,
    unLike
}