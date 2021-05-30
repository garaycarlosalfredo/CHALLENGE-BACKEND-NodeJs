// Rutas para autenticar usuarios

const express = require('express')
const router = express.Router()
const {check} = require('express-validator')
const authController = require('../controllers/authController')

//Login usuario
// auth/login
router.post('/',
[
    check('email','Agregar un email válido').isEmail(),
    check('password', 'El pasword debe ser mínimo de 6 caracteres').isLength({min: 6 })
],
    authController.autenticarUsuario
)

module.exports = router