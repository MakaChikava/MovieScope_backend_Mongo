const express = require('express');
const app = express();
const mongoose = require('mongoose');
var cors = require('cors');
const corsOptions ={
    origin:'https://moviescope-frontend-3zkq8b3gv-makachikava.vercel.app/', //https://moviescope-frontend-dz6md15ma-makachikava.vercel.app/ , https://moviescope-frontend.onrender.com
    credentials:false,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
require('dotenv').config()
const movie = require('./models/moviesSchema')
// middleware 
app.use(express.json());
app.use(cors(corsOptions));
const makaURI = process.env.MONGODB
// ROUTES

app.get('/', (req, res)=>{
    res.redirect('/movies')
})

// GET

app.get('/movies', async (req, res)=>{
    try {
        const allMovies = await movie.find({})
        res.json(allMovies)
    } catch (err) {
        console.log(err.message)
    }
})

// SHOW ONE
app.get('/movie/:id', async (req, res)=>{
    try {
        const oneMovie = await movie.findById(req.params.id);
        res.json(oneMovie)
    } catch (err) {
        console.log(err.message)
    }
})
// POST
app.post('/movie', async (req, res)=>{
    try {
        const newMovie = await movie.create(req.body)
        res.json(newMovie)
    } catch (err) {
        console.log(err.message)
    }
})
// DELETE
app.delete('/movie/:id', async (req, res)=>{
    try {
        const deleteMovie = await movie.findByIdAndRemove(req.params.id)
        res.json(deleteMovie)
        res.redirect('/movies')
    } catch (err) {
        console.log(err.message)
    }
})
// UPDATE

app.put('/movie/:id', async (req, res)=>{
    try {
        const updateMovie = await movie.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.json(updateMovie)
        res.redirect('/movies')
    } catch (err) {
        console.log(err.message)
    }
})

mongoose.connect(makaURI)
mongoose.connection.once('open', ()=>{
    console.log('connected to mongodb...')
})
app.listen(8000, ()=>{
    console.log('listening')
})