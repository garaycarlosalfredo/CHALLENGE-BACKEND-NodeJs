const Personaje = require('../models/Personaje')
const {validationResult} = require('express-validator')

exports.crearPersonaje = async(req,res)=>{
    //revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }
    
    try{
        //Crear Personaje
        const personaje = new Personaje(req.body)
        
        //Guardar un nuevo personaje        
        personaje.save()
        res.json(personaje)

    }catch (error){
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

//Obtiene todos los personajes
exports.obtenerPersonajes = async(req,res) => {
    try {
        if(req.query.edad){
            const personaje = await Personaje.find({edad: req.query.edad})
            res.json({personaje})
        }else{
            if(req.query.name){
                const personaje = await Personaje.find({nombre: req.query.name})
                res.json({personaje})
            }else{
                if(req.query.idMovie){
                    const personaje = await Personaje.find({__v: req.query.idMovie})
                    res.json({personaje})
                }else{
                    const personaje = await Personaje.find()

                    const personajeFormateado = personaje.map(function(personaje){
                        var formatoLista = {
                            imagen: personaje.imagen,
                            nombre: personaje.nombre
                        }
                        return formatoLista                   
                    })
                    res.json({personajeFormateado})}
                
            }
        }
        

    } catch (error) {
        res.status(500).send('Hubo un error')
    }
}


//Actualizar un proyect
exports.actualizarPersonaje = async(req,res) => {
    //revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //extraer la información del proyecto
    const {imagen,nombre,edad,peso,historia,peliserieAsociada} = req.body
    const nuevoPersonaje = {}

    if(nombre){
        nuevoPersonaje.nombre = nombre
    }
    if(edad){
        nuevoPersonaje.edad = edad
    }
    if(imagen){
        nuevoPersonaje.imagen = imagen
    }
    if(historia){
        nuevoPersonaje.historia = historia
    }

    if(peso){
        nuevoPersonaje.peso = peso
    }

    if(peliserieAsociada){
        nuevoPersonaje.peliserieAsociada = peliserieAsociada
    }

    try {
        //Revisar el id
        let personaje = await Personaje.findById(req.params.id)

        //si exite el personaje
        if(!personaje){
            return res.status(404).json({msg: 'personaje no encontrado'})
        }
             
        //Actualizar
        personaje = await Personaje.findByIdAndUpdate(
            {_id: req.params.id},
            {$set : nuevoPersonaje},
            { new: true})
        
        res.json({personaje})

    } catch (error) {
        res.status(500).send('error en el servidor update')
    }

}

//Eliminar un personaje
exports.eliminarPersonaje = async (req,res) => {
    
    try {
        //Revisar el id
        let personaje = await Personaje.findById(req.params.id)

        //si exite el personaje
        if(!personaje){
            return res.status(404).json({msg: 'personaje no encontrado'})
        }
        

        //Eliminar el personaje
        await Personaje.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'personaje eliminado'})

    } catch (error) {
        res.status(500).send('Error en el servidor intentando eliminar el mensaje')
    }

}