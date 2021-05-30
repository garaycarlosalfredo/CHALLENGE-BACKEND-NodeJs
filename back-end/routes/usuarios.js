// Rutas para crear usuarios

const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/usuarioController')
const {check} = require('express-validator')

//Crear usuario

// auth/register
router.post('/',
[
    check('nombre', 'Elnombre es obligatorio').not().isEmpty(),
    check('email','Agregar un email válido').isEmail(),
    check('password', 'El pasword debe ser mínimo de 6 caracteres').isLength({min: 6 })
],
    usuarioController.crearUsuario
)

module.exports = router