const express = require('express')
const router = express.Router()
const moviesController = require('../controllers/moviesController')
const auth = require('../middleware/auth')
const {check} = require('express-validator')
//Crear proyecto
// api/proyectos
router.post('/',
    auth,
    [
        check('titulo','El titulo de la pelicula/serie es obligatorio').not().isEmpty()
    ],
    moviesController.crearMovie
)


//Obtiene todos los personajes
router.get('/',
    auth,
    moviesController.obtenerMovies
)


//Actualiza proyecto vía ID
router.put('/:id',
    auth,
    [
        check('titulo','El titulo del personaje es obligatorio').not().isEmpty(),
        check('fecha','El fecha del personaje es obligatorio').not().isEmpty(),  
    ],
    moviesController.actualizarMovie
)

//Eliminar un proyecto
router.delete('/:id',
    auth,
    moviesController.eliminarMovie
)



module.exports = router