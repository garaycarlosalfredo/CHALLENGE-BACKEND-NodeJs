const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.autenticarUsuario = async (req,res)=>{
    //revisar si hay errores
    const errores = validationResult(req)

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //extraer el email y password
    const {email, password} = req.body

    try {
        //Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({email})
        if(!usuario){
            return res.status(400).json({msg: 'El usuario no existe'})
        }

        const passCorrecto = await bcryptjs.compare(password, usuario.password)

        if(!passCorrecto){
            return res.status(400).json({msg: 'password incorrecto'})
        }

        //Si es todo correcto creo el jwt
        //Crear y firmar el jwt
        const payload = {
            usuario:{
                id: usuario.id
            }
        }

        //Firmar el jwt
        jwt.sign(payload,process.env.SECRETA,{
                expiresIn: 3600 //1 hora
            },(error, token)=>{
                if(error)throw error

                //mensaje de confirmación
                console.log("Usuario creado correctamente")
                return res.json({token})

            }
        )
    
    
    } catch (error) {
        console.log(error)
    }

    

}