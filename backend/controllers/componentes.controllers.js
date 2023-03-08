'use strict'

var fs=require('fs');
var path=require('path');
var fse = require('fs-extra');
var {Categoria, CategoriaModel} = require('../models/categoria');
const techComponent = require('../models/techComponent');
var mongoose = require('mongoose');


var controller={ 
    getInicio:function(req,res){
        return res.status(201).send(
            "<h1>Inicio</h1>"
        );
    },

    saveComponente:async function(req,res){
        var componente=new techComponent();
        var params=req.body;
        
        componente.nombre=params.nombre;
        componente.titulo=params.titulo;
        componente.detalle=params.detalle;
        componente.precio=params.precio;
        componente.imagen1=null;

        componente.categoria = params.idCategoria;
        try {
            const componenteGuardado = await componente.save();
            return res.status(200).send({ componente: componenteGuardado });
          } catch (err) {
            return res.status(500).send({ message: "Error al guardar" });
        }
        

        
    },


    saveCategoria: async function(req,res){
        var categoria = new CategoriaModel();
        var params=req.body;

        categoria.nombre = params.nombreCategoria;

        try {
            const cateGuardada = await categoria.save();
            return res.status(200).send({ categoria: cateGuardada });
          } catch (error) {
            return res.status(500).send({ message: "Error al guardar" });
        }
    },

    getComponentes: async function(req,res){
        try {
            const techComponents =  await techComponent.find().sort();
            if (!techComponents || techComponents.length === 0) {
              return res.status(404).send({ message: 'No existen Componentes' });
            }
            return res.status(200).send({ techComponents });
          } catch (err) {
            return res.status(500).send({ message: 'Error al recuperar los datos' });
          }
    },


    getByCategoria: async function(req,res){
        var idCategoria;

        try {
            idCategoria = new mongoose.Types.ObjectId(req.params.idCategoria);
            console.log(idCategoria);
        } catch (err) {
            console.log(err);
            res.status(500).send('El ID de categoría no es válido');
            return;
        }
        try {
            const idCategoria = new mongoose.Types.ObjectId(req.params.idCategoria);
            const techComponents = await techComponent.find({ categoria: idCategoria }).exec();
            if (!techComponents || techComponent.length === 0) {
              return res.status(404).send({ message: 'No existen Componentes' });
            }
            return res.status(200).send({ techComponents });
          } catch (err) {
            console.log(err);
            return res.status(500).send({ message: 'Error al recuperar los datos' });
          }          
          
          
          
    },

    getComponente: async function(req, res) {
        const componenteId = req.params.id;
        if (!componenteId) {
          return res.status(404).send({ message: 'El componente no existe' });
        }
      
        try {
          const techComponents = await techComponent.findById(componenteId);
          if (!techComponents) {
            return res.status(404).send({ message: 'El componente no existe' });
          }
          return res.status(200).send({ techComponents });
        } catch (err) {
          return res.status(500).send({ message: 'Error al recuperar los datos' });
        }
    },   
      
    deleteComponent:async function(req,res){
        const componenteId = req.params.id;
        if (!componenteId) {
          return res.status(404).send({ message: 'El componente no existe' });
        }
      
        try {
          const techComponents = await techComponent.findByIdAndDelete(componenteId);
          if (!techComponents) {
            return res.status(404).send({ message: 'El componente no existe' });
          }
          return res.status(200).send({ techComponents });
        } catch (err) {
          return res.status(500).send({ message: 'Error al recuperar los datos' });
        }
    },

    updateComponent:async function(req,res){

        var update=req.body;
        const componenteId = req.params.id;
        if (!componenteId) {
          return res.status(404).send({ message: 'El componente no existe' });
        }
      
        try {
          const techComponents = await techComponent.findByIdAndDelete(componenteId);
          if (!techComponents) {
            return res.status(404).send({ message: 'El componente no existe' });
          }
          return res.status(200).send({ techComponents });
        } catch (err) {
          return res.status(500).send({ message: 'Error al recuperar los datos' });
        }
    },
    // uploadImages:function(req,res){

    //     var componenteId=req.params.id;
    //     var newFolderPath = './uploads/'+componenteId;
    //     if (!fs.existsSync(newFolderPath)) {
    //         fs.mkdirSync(newFolderPath);
    //     }
        
    //     var files=req.files.imagenes;
    //     var fileNames=[];
        
    //     if(files){
    //         for(var i=0;i<files.length;i++){
    //             var filePath=files[i].path;
    //             var fileName=files[i].originalFilename;
    //             var extSplit=fileName.split('\.');
    //             var fileExt=extSplit[1];
    //             if(fileExt=='png'||fileExt=='jpg'||fileExt=='jpeg'||fileExt=='gif'){
    //                 //Mueve el archivo a una carpeta en el servidor
    //                 var newFilePath='./uploads/'+componenteId+'/'+fileName;
    //                 fs.rename(filePath,newFilePath,(err)=>{
    //                     if(err){
    //                         console.log(err);
    //                         return res.status(500).send({message:"La imagen no se ha subido"});
    //                     }else{
    //                         fileNames.push(fileName);
    //                         if(i==files.length-1){
    //                             techComponent.findByIdAndUpdate(componenteId,{imagenes:fileNames},{new:true},(err,techComponentsActualizado)=>{
    //                                 if (err) return res.status(500).send({message:"La imagen no se ha subido"});
    //                                 if(!techComponentsActualizado) return res.status(404).send({message:'El componente no existe y no se subio la imagen'});
    //                                 return res.status(200).send({techComp:techComponentsActualizado});
    //                             });
    //                         }
    //                     }
    //                 });
    //             }else{
    //                 fs.unlink(filePath,(err)=>{
    //                     return res.status(200).send({message:"La extension no es valida"});
    //                 });
    //             }
    //         }
    //     }else{
    //         return res.status(200).send({message:"No se han subido archivos"});
    //     }
    // },
    uploadImages: function (req, res) {
        var componenteId = req.params.id;
        var files = req.files.imagenes;
        var fileNames = [];
    
        if (files) {
          for (var i = 0; i < files.length; i++) {
            var filePath = files[i].path;
            var fileName = files[i].originalFilename;
            var extSplit = fileName.split('.');
            var fileExt = extSplit[1];
            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {
              // Mueve el archivo a una carpeta en el servidor
              var newFilePath = './uploads/' + componenteId + '/' + fileName;
              fse.copy(filePath, newFilePath, function (err) {
                if (err) {
                  console.log(err);
                  return res.status(500).send({ message: "La imagen no se ha subido" });
                } else {
                  fileNames.push(fileName);
                  if (i == files.length - 1) {
                    techComponent.findByIdAndUpdate(componenteId, { imagenes: fileNames }, { new: true }, function (err, techComponentsActualizado) {
                      if (err) return res.status(500).send({ message: "La imagen no se ha subido" });
                      if (!techComponentsActualizado) return res.status(404).send({ message: 'El componente no existe y no se subio la imagen' });
                      return res.status(200).send({ techComp: techComponentsActualizado });
                    });
                  }
                }
              });
            } else {
              fse.unlink(filePath, function (err) {
                return res.status(200).send({ message: "La extension no es valida" });
              });
            }
          }
        } else {
          return res.status(200).send({ message: "No se han subido archivos" });
        }
    },

    getImage:function(req,res){
        var file=req.params.imagen;
        var path_file="./uploads/"+file;
        fs.exists(path_file,(exists)=>{
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                res.status(200).send({message:"No existe la imagen"})
            }
        })
    }





}

module.exports=controller;