'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var usuarioSchema=Schema({
    user:String,
    password:String,
    nombre:String,
    apellido:String
});
module.exports=mongoose.model('Usuario',usuarioSchema);