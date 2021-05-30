const mongoose = require('mongoose')

const TareaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    peliserie:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PeliSerie'
    }]

})

module.exports = mongoose.model('Genero', TareaSchema)