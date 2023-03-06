'use strict'
var componente=require('../models/componente');
var fs=require('fs');
var path=require('path');
var {Categoria, CategoriaModel} = require('../models/categoria');
const tarjetaVideo = require('../models/tarjetaVideo');

var controller={ 
    getInicio:function(req,res){
        return res.status(201).send(
            "<h1>Hola 2</h1>"
        );
    },

    saveComponente:async function(req,res){
        var componente=new tarjetaVideo();
        var params=req.body;
        
        
        componente.nombre=params.nombre;
        componente.titulo=params.titulo;
        componente.detalle=params.detalle;
        componente.precio=params.precio;
        componente.imagen=null;

        componente.categoria = params.idCategoria;
        await componente.save((err,componenteGuardadar)=>{
            if (err) return res.status(500).send({message:"Error al guardar"});
            if(!componenteGuardadar) return res.status(404).send({message:'No se ha guardado la componente'});
            return res.status(200).send({componente:componenteGuardadar});
        })
        

        
    },


    saveCategoria: async function(req,res){
        var categoria = new CategoriaModel();
        var params=req.body;

        categoria.nombre = params.nombreCategoria;

        await categoria.save((err,cateGuardadar)=>{
            if (err) return res.status(500).send({message:"Error al guardar"});
            if(!cateGuardadar) return res.status(404).send({message:'No se ha guardado la componente'});
            return res.status(200).send({categoria:cateGuardadar});
        })
    }
}

module.exports=controller;