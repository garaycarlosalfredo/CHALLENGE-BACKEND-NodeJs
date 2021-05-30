const mongoose = require('mongoose')

const ProyectoSchema = mongoose.Schema({
    imagen:{
        type: String,
        required: true
    },
    nombre:{
        type: String,
        required: true
    },
    edad:{
        type: Number,
        required: true
    },
    peso:{
        type: Number,
        required: true
    },
    historia:{
        type: String,
        required: true
    },
    peliserieAsociada:[{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'PeliSerie'
    }],
})

module.exports = mongoose.model('Personaje', ProyectoSchema)