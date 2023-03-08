'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var componenteSchema = Schema({
    nombre: String,
    titulo: String,
    detalle: String,
    precio: Number,
    imagenes: [String],
    categoria: {type: mongoose.Schema.Types.ObjectId, ref: 'categorias'}
});


module.exports = mongoose.model('componenteSchema', componenteSchema);
