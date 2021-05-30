const jwt = require('jsonwebtoken')

module.exports = function(req, res,next){
    //Leer el token del header
    const token = req.header('Authorization')

    //Revisar si no hay toquen
    if(!token){
        return res.status(401).json({msg: 'No hay token permiso no autorizado'})
    }
    //validar el token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA)
        req.usuario = cifrado.usuario
        next()
    } catch (error) {
        res.status(401).json({msg: 'Token no válido'})
    }
}