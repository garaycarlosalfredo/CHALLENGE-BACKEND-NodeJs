const express = require('express')
const router = express.Router()
const personajeController = require('../controllers/personajeController')
const auth = require('../middleware/auth')
const {check} = require('express-validator')
//Crear proyecto
// api/proyectos
router.post('/',
    auth,
    [
        check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    personajeController.crearPersonaje
)


//Obtiene todos los personajes

router.get('/',
    auth,
    personajeController.obtenerPersonajes
)

/*
//Actualiza proyecto vía ID
router.put('/:id',
    auth,
    [
        check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
)

//Eliminar un proyecto
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
)

*/

module.exports = router