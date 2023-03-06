'use strict'
var Componente=require('../models/componente');
var fs=require('fs');
var path=require('path');


var controller={

    getInicio:function(req,res){
        return res.status(201).send(
            "<h1>Hola 2</h1>"
        );
    },

}

module.exports=controller;