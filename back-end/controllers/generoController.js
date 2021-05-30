const Movie = require('../models/PeliSerie')
const Genero = require('../models/Genero')
const {validationResult} = require('express-validator')

//Crear genero

exports.crearGenero = async(req,res)=>{
    //revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }
    
    try{
        //Crear Genero
        const genero = new Genero(req.body)        
        //Guardar un nuevo Genero        
        genero.save()

        //Guardar 
        res.json(genero)

    }catch (error){
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

//Obtiene todos los generos
exports.obtenerGenero = async(req,res) => {
    try {
        const genero = await Genero.find()
        res.json({genero})      
    } catch (error) {
        res.status(500).send('Hubo un error')
    }
}

//Actualizar un genero
exports.actualizarGenero = async(req,res) => {
    //revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //extraer la información del genero
    const {nombre,imagen,peliserie} = req.body
    const nuevoGenero = {}

    if(nombre){
        nuevoGenero.nombre = nombre
    }

    if(imagen){
        nuevoGenero.imagen = imagen
    }

    if(peliserie){
        nuevoGenero.peliserie = peliserie
    }

    try {
        //Revisar el id
        let genero = await Genero.findById(req.params.id)

        //si exite el genero
        if(!genero){
            return res.status(404).json({msg: 'genero no encontrado'})
        }
             
        //Actualizar
        genero = await Genero.findByIdAndUpdate(
            {_id: req.params.id},
            {$set : nuevoGenero},
            { new: true})
        
        res.json({genero})

    } catch (error) {
        res.status(500).send('error en el servidor update')
    }

}

//Eliminar un genero
exports.eliminarGenero = async (req,res) => {
    
    try {
        //Revisar el id
        let genero = await Genero.findById(req.params.id)

        //si exite el genero
        if(!genero){
            return res.status(404).json({msg: 'genero no encontrado'})
        }
        

        //Eliminar el genero
        await Genero.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'genero eliminado'})

    } catch (error) {
        res.status(500).send('Error en el servidor intentando eliminar el genero')
    }

}
