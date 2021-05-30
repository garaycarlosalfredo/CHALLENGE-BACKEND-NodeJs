const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
//===
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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

        //Enviar el mail de vienbenida
        const msg = {
            to: user.email, // Change to your recipient
            from: 'verified@email.com', // Acá dbería estar el mail verificado en GridSend
            subject: 'Bienvenido al challenge de Node js de Alkemy',
            text: `Hola ${usuaro.nombre} ahora estás listo para poder utilizar la app en Node.js`,
            html: '<strong> Saludos desde Alkemy </strong>',
          }
          
          sgMail
            .send(msg)
            .then((response) => {
              console.log(response[0].statusCode)
              console.log(response[0].headers)
            })
            .catch((error) => {
              console.error(error)
            })

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