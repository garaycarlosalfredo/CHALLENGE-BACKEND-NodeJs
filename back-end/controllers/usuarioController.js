const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.crearUsuario = async(req,res)=>{
    //revisar si hay errores
    const errores = validationResult(req)
    
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }
    //Extraer email y password
    const {email, password} = req.body

    try {
        //Revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({email});
        if(usuario){
            console.log("Usuario ya exsiste")
            return res.status(400).json({msg: 'El usuario ya exsiste'})
        }

        //guardar nuevo usuario
        usuario = new Usuario(req.body)

        //Hashear el password
        const salt = await bcryptjs.genSalt(10)
        usuario.password = await bcryptjs.hash(password, salt)

        //guardar usuario
        await usuario.save()

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
        console.log("erorr al intentar guardar  un usuario", error)
        res.status(400).send('hubo un error')
    }
}