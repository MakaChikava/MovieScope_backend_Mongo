const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()
const movie = require('./models/moviesSchema')
// middleware 
app.use(express.json());
app.use(cors());
const makaURI = process.env.MONGODB
// ROUTES

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
app.get('/movie:id', async (req, res)=>{
    try {
        const oneMovie = await movie.find({}, req.params.id);
        res.json(oneMovie)
    } catch (err) {
        console.log(err.message)
    }
})
// POST
app.post('/movie', async (req, res)=>{
    try {
        const newMovie = await movie.create(req.body)
        res.json(newMovie.rows)
    } catch (err) {
        console.log(err.message)
    }
})
// DELETE
app.delete('/movie/:id', async (req, res)=>{
    try {
        const deleteMovie = await movie.findByIdandDelete(req.params.id)
        res.json(deleteMovie)
        res.redirect('/movies')
    } catch (err) {
        console.log(err.message)
    }
})
// UPDATE

app.put('/movie/:id', async (req, res)=>{
    try {
        const updateMovie = await movie.findByIdandUpdate(req.params.id, req.body, {new:true});
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