const express = require('express')
const router = express.Router()
const generoController = require('../controllers/generoController')
const auth = require('../middleware/auth')
const {check} = require('express-validator')
//Crear un genero

// /genero
router.post('/',
    auth,
    [
        check('nombre','El nombre del genero es obligatorio').not().isEmpty(),
        check('imagen','La imagen del genero es obligatorio').not().isEmpty()
    ],
    generoController.crearGenero
)


//Obtiene todos los generos
router.get('/',
    auth,
    generoController.obtenerGenero
)


//Actualiza el genero vía ID
router.put('/:id',
    auth,
    [        
    check('nombre','El nombre del genero es obligatorio').not().isEmpty(),
    check('imagen','La imagen del genero es obligatorio').not().isEmpty()
    ],
    generoController.actualizarGenero
)

//Eliminar un genero
router.delete('/:id',
    auth,
    generoController.eliminarGenero
)

module.exports = router