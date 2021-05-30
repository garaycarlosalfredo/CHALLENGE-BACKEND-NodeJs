const mongoose = require('mongoose')

const TareaSchema = mongoose.Schema({
    imagen: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    fecha:{
        type: Date,
        required: true
    },
    calificacion: {
        type: Number,
        required: true
    },
    personajes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto'
    }]

})

module.exports = mongoose.model('PeliSerie', TareaSchema)