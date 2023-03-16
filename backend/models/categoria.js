'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Categoria = Schema({
    nombre: String
});

module.exports.CategoriaModel = mongoose.model('categoria', Categoria);