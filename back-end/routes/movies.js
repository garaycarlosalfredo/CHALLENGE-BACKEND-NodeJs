const express = require('express')
const router = express.Router()
const moviesController = require('../controllers/moviesController')
const auth = require('../middleware/auth')
const {check} = require('express-validator')
//Crear una pelicula/serie
// movies
router.post('/',
    auth,
    [
        check('titulo','El titulo de la pelicula/serie es obligatorio').not().isEmpty(),
        check('imagen','La imagen de la pelicula/serie es obligatorio').not().isEmpty(),
        check('fecha','La fecha de la pelicula/serie es obligatorio').not().isEmpty(),
        check('calificacion','La calificación de la pelicula/serie es obligatorio').not().isEmpty()
    ],
    moviesController.crearMovie
)


//Obtiene todos las peliculas
router.get('/',
    auth,
    moviesController.obtenerMovies
)


//Actualiza una pelicula vía ID
router.put('/:id',
    auth,
    [
        check('titulo','El titulo de la pelicula/serie es obligatorio').not().isEmpty(),
        check('imagen','La imagen de la pelicula/serie es obligatorio').not().isEmpty(),
        check('fecha','La fecha de la pelicula/serie es obligatorio').not().isEmpty(),
        check('calificacion','La calificación de la pelicula/serie es obligatorio').not().isEmpty()
    ],
    moviesController.actualizarMovie
)

//Eliminar una pelicula
router.delete('/:id',
    auth,
    moviesController.eliminarMovie
)

module.exports = router