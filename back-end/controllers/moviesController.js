const Movie = require('../models/PeliSerie')
const Genero = require('../models/Genero')
const {validationResult} = require('express-validator')
const { findById } = require('../models/PeliSerie')


var ObjectID = require('mongodb').ObjectID; 
const PeliSerie = require('../models/PeliSerie');

exports.crearMovie = async(req,res)=>{
    //revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }
    
    try{
        //Crear Movie
        const movie = new Movie(req.body)        
        //Guardar un nuevo movie        
        movie.save()

        //Verificar si tiene genero
        if(req.body.idGenero){
            let genero = {}
            try{
                genero = await Genero.findById(req.body.idGenero)
                genero.peliserie.push(movie.id);                    //Si el genero existe agrega el id de la pelicula a el genero
                genero.save()
            }catch{
               console.log("El genero no existe")
            }
        }
        
        //Guardar 
        res.json(movie)

    }catch (error){
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

//Obtiener todas las peliculas
exports.obtenerMovies = async(req,res) => {
    try {
        if(req.query.name){
            const movie = await Movie.find({titulo: req.query.name})
            res.json({movie})
        }else{
            if(req.query.order){
                
                if(req.query.order == "ASC"){
                    const movie = await Movie.find().sort({fecha : 'asc'})
                    res.json({movie})
                }else{
                    const movie = await Movie.find().sort({fecha : 'desc'})
                    res.json({movie})
                }
                
            }else{
                if(req.query.genre){     
                    try {                                               
                        const genero = await Genero.findOne({_id: new ObjectID(req.query.genre)})  // ok
                        const listId = genero.peliserie                       
                        const movie = await Movie.find()
                        const newmovies = movie.filter(m => listId.includes(m._id))
                        res.json({newmovies})
                    } catch (error) {
                        res.json({ msg : "No existe el id del genero"}) 
                    }               
                }else{
                    const movie = await Movie.find()

                    const movieFormateado = movie.map(function(movie){
                        var formatoLista = {
                            imagen: movie.imagen,
                            titulo: movie.titulo,                            
                            fecha: movie.fecha
                        }
                        return formatoLista                   
                    })
                    res.json({movieFormateado})}
                
            }
        }
        

    } catch (error) {
        res.status(500).send('Hubo un error Intentando busqueda especifica')
    }
}

//Actualizar un proyect
exports.actualizarMovie = async(req,res) => {
    //revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //extraer la información del proyecto
    const {imagen,titulo,fecha,calificacion,personajes} = req.body
    const nuevaMovie = {}

    if(titulo){
        nuevaMovie.titulo = titulo
    }

    if(imagen){
        nuevaMovie.imagen = imagen
    }

    if(fecha){
        nuevaMovie.fecha = fecha
    }

    if(calificacion){
        nuevaMovie.calificacion = calificacion
    }

    if(personajes){
        nuevaMovie.personajes = personajes
    }

    try {
        //Revisar el id
        let movie = await Movie.findById(req.params.id)

        //si exite el personaje
        if(!movie){
            return res.status(404).json({msg: 'pelicula/serie no encontrado'})
        }
             
        //Actualizar
        movie = await Movie.findByIdAndUpdate(
            {_id: req.params.id},
            {$set : nuevaMovie},
            { new: true})
        
        res.json({movie})

    } catch (error) {
        res.status(500).send('error en el servidor update')
    }

}

//Eliminar una pelicula
exports.eliminarMovie = async (req,res) => {
    
    try {
        //Revisar el id
        let movie = await Movie.findById(req.params.id)

        //si exite el personaje
        if(!movie){
            return res.status(404).json({msg: 'movie no encontrado'})
        }
        

        //Eliminar la pelicula
        await Movie.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'movie eliminado'})

    } catch (error) {
        res.status(500).send('Error en el servidor intentando eliminar la pelicula')
    }

}
