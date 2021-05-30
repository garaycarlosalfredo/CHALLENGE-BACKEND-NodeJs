const Tarea = require('../models/Tarea')
const Proyecto = require('../models/Proyecto')
const {validationResult} = require('express-validator')
// Crea una nueva Tarea

exports.crearTarea = async(req,res) => {
    //revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //Extraer el proyecto
    const {proyecto} = req.body

    try {
        const existeProyecto = await Proyecto.findById(proyecto)
        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        
        //Revisar si el proyecto es del usuario
        //verificar el creador
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

      //Creamos la tarea
        const tarea = new Tarea(req.body)
        await tarea.save()        
        res.json({tarea})
        
    

    } catch (error) {
        res.status(500).send('Hubo un error')
    }
}

//Obtiene las tareas por proyecto

exports.obtenerTareas = async(req,res)=>{
    //Extraer el proyecto

    try {
        const {proyecto} = req.body

    
        const existeProyecto = await Proyecto.findById(proyecto)
        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        
        //Revisar si el proyecto es del usuario
        //verificar el creador
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        //obtener tareas por proyecto
        const tareas = await Tarea.find({proyecto})
        res.json({tareas})

    } catch (error) {
        
        res.status(500).send('Hubo un error')
    }


}

//Actualizar Tarea

exports.actualizarTarea = async(req,res) => {
    try {
        const {proyecto, nombre, estado} = req.body

        //Si tarea existe o no
        let tarea = await Tarea.findById(req.params.id)
        
        if(!tarea){
            return res.status(404).json({msg: 'No existe tarea'})
        }

        //Extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto)
        
        //Revisar si el proyecto es del usuario
        //verificar el creador
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        console.log("OK")
        //Crear objeto con nueva tarea
        const nuevaTarea = {}

        if(nombre)nuevaTarea.nombre = nombre
        if(estado)nuevaTarea.estado = estado
        
        tarea = await Tarea.findByIdAndUpdate(
            {_id: req.params.id},
            nuevaTarea,
            {new: true}
            )

        res.json({tarea})

    } catch (error) {
        
        res.status(500).send('Hubo un error')
    }
}


//Eliminar una tarea

exports.eliminarTarea = async (req, res)=>{
    try {
        const {proyecto} = req.body

        //Si tarea existe o no
        let tarea = await Tarea.findById(req.params.id)
        
        if(!tarea){
            return res.status(404).json({msg: 'No existe tarea'})
        }

        //Extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto)
        
        //Revisar si el proyecto es del usuario
        //verificar el creador
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

       //Eliminar
       await Tarea.findByIdAndRemove({_id: req.params.id})
       res.json({msg: 'Tarea Eliminada'})

    } catch (error) {
        
        res.status(500).send('Hubo un error')
    }   
}