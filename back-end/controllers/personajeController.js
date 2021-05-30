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
        
        //Guardar un nuevo proyecto
        
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

//Obtiene todos los personajes por edad
exports.obtenerPersonajes2 = async(req,res) => {
    try {
        const personaje = await Personaje.find({edad: req.usuario.id})
        res.json({personaje})
    } catch (error) {
        res.status(500).send('Hubo un error')
    }
}

//Actualizar un proyect
exports.actualizarProyecto = async(req,res) => {
    //revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //extraer la información del proyecto
    const {nombre} = req.body
    const nuevoProyecto = {}

    if(nombre){
        nuevoProyecto.nombre = nombre
    }

    try {
        //Revisar el id
        let proyecto = await Proyecto.findById(req.params.id)

        //si exite el proyecto
        if(!proyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }
        
        //verificar el creador
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'Update no autorizado'})
        }
     
        //Actualizar
        proyecto = await Proyecto.findByIdAndUpdate(
            {_id: req.params.id},
            {$set : nuevoProyecto},
            { new: true})
        res.json({proyecto})

    } catch (error) {
        res.status(500).send('error en el servidor update')
    }

}

//Eliminar un proyecto
exports.eliminarProyecto = async (req,res) => {
    try {
        //Revisar el id
        let proyecto = await Proyecto.findById(req.params.id)

        //si exite el proyecto
        if(!proyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }
        
        //verificar el creador
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'Update no autorizado'})
        }
        //Eliminar el proyecto
        await Proyecto.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'Proyecto eliminado'})

    } catch (error) {
        res.status(500).send('Error en el servidor')
    }

}