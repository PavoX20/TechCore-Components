'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var componenteSchema=Schema({
    nombre:String,
    tipo:String,
    anio:Number,
    precio:Number,
    imagen:String
});



module.exports=mongoose.model('Componente',componenteSchema);