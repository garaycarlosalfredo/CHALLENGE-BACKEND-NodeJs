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
        check('nombre','El nombre del personaje es obligatorio').not().isEmpty()
    ],
    personajeController.crearPersonaje
)


//Obtiene todos los personajes
router.get('/',
    auth,
    personajeController.obtenerPersonajes
)


//Actualiza proyecto vía ID
router.put('/:id',
    auth,
    [
        check('nombre','El nombre del personaje es obligatorio').not().isEmpty(),
        check('edad','El nombre del personaje es obligatorio').not().isEmpty(),        
        check('peso','El nombre del personaje es obligatorio').not().isEmpty(),
        check('historia','El nombre del personaje es obligatorio').not().isEmpty(),
        check('imagen','El nombre del personaje es obligatorio').not().isEmpty()
    ],
    personajeController.actualizarPersonaje
)

//Eliminar un proyecto
router.delete('/:id',
    auth,
    personajeController.eliminarPersonaje
)



module.exports = router