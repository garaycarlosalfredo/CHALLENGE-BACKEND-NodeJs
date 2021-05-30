const express = require('express')
const router = express.Router()
const generoController = require('../controllers/generoController')
const auth = require('../middleware/auth')
const {check} = require('express-validator')
//Crear proyecto
// /genero
router.post('/',
    auth,
    [
        check('nombre','El nombre del genero es obligatorio').not().isEmpty()
    ],
    generoController.crearGenero
)


//Obtiene todos los personajes
router.get('/',
    auth,
    generoController.obtenerGenero
)


//Actualiza proyecto vía ID
router.put('/:id',
    auth,
    [
        check('nombre','El nombre del personaje es obligatorio').not().isEmpty() 
    ],
    generoController.actualizarGenero
)

//Eliminar un proyecto
router.delete('/:id',
    auth,
    generoController.eliminarGenero
)



module.exports = router