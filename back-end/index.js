const express = require('express')
const conectarDB = require('./config/db')


//Crear el servidor
const app = express();

//Conectar la base de datos
conectarDB();

//Habilitar express.json
app.use(express.json({extends: true}))

//Puerto de la app
const PORT = process.env.PORT || 4000; //Asignar el puerto o sino el 4000

//Definir la página principal
app.get('/', (req,res)=>{
    res.send('Hola mundo')
})

//Importar rutas
app.use('/auth/register', require('./routes/usuarios'))       //Crear usuario
app.use('/auth/login', require('./routes/auth'))              //Log-in
app.use('/characters', require('./routes/personajes'))   //Personajes
app.use('/api/proyectos', require('./routes/proyectos'))
app.use('/api/tareas', require('./routes/tareas'))

//arrancar la app
app.listen(PORT, ()=>{
    console.log(`El servidor está funcionando en el puerto ${PORT}`)
})