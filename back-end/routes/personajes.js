const express = require('express')
const router = express.Router()
const personajeController = require('../controllers/personajeController')
const auth = require('../middleware/auth')
const {check} = require('express-validator')
//Crear personajes
// characters
router.post('/',
    auth,
    [        
    check('nombre','El nombre del personaje es obligatorio').not().isEmpty(),
    check('edad','La edad del personaje es obligatorio').not().isEmpty(),        
    check('peso','El peso del personaje es obligatorio').not().isEmpty(),
    check('historia','La historia del personaje es obligatorio').not().isEmpty(),
    check('imagen','La imagen del personaje es obligatorio').not().isEmpty()
    ],
    personajeController.crearPersonaje
)


//Obtiene todos los personajes
router.get('/',
    auth,
    personajeController.obtenerPersonajes
)


//Actualiza personajes vía ID
router.put('/:id',
    auth,
    [
        check('nombre','El nombre del personaje es obligatorio').not().isEmpty(),
        check('edad','La edad del personaje es obligatorio').not().isEmpty(),        
        check('peso','El peso del personaje es obligatorio').not().isEmpty(),
        check('historia','La historia del personaje es obligatorio').not().isEmpty(),
        check('imagen','La imagen del personaje es obligatorio').not().isEmpty()
    ],
    personajeController.actualizarPersonaje
)

//Eliminar un personaje
router.delete('/:id',
    auth,
    personajeController.eliminarPersonaje
)



module.exports = router