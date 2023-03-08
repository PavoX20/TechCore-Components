'use strict'
var fs=require('fs');
var path=require('path');
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
        await componente.save((err,componenteGuardadar)=>{
            if (err) return res.status(500).send({message:"Error al guardar"});
            if(!componenteGuardadar) return res.status(404).send({message:'No se ha guardado el componente'});
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
    },

    getComponentes:function(req,res){
        techComponent.find({}).sort().exec((err,techComponents)=>{
            if (err) return res.status(500).send({message:"Error al recuparar los datos"});
            if(!techComponents) return res.status(404).send({message:'No existen Componentes'});
            return res.status(200).send({techComponents});
        })
    },


    getByCategoria:function(req,res){
        var idCategoria;

        try {
            idCategoria = mongoose.Types.ObjectId(req.params.idCategoria);
        } catch (err) {
            console.log(err);
            res.status(500).send('El ID de categoría no es válido');
            return;
        }
        techComponent.find({categoria: idCategoria}, 
        function(err, techComponent){
            if(err){
                console.log(err);
                return res.status(500).send(err);
            }
            return res.json({techComponent});
        });
    },

    getComponente:function(req,res){
        var componenteId=req.params.id;
        if(componenteId==null) return res.status(404).send({message:"El componente no existe"});

        techComponent.findById(componenteId,(err,techComponents)=>{
            if (err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!techComponents) return res.status(404).send({message:'El componente no existe'});
            return res.status(200).send({techComponents});
        })
    },

    deleteComponent:function(req,res){
        var componenteId=req.params.id;

        techComponent.findByIdAndRemove(componenteId,(err,techComponents)=>{
            if (err) return res.status(500).send({message:"Error al eliminar los datos"});
            if(!techComponents) return res.status(404).send({message:'No se puede eliminar el componente'});
            return res.status(200).send({techComponents});
        })
    },

    updateComponent:function(req,res){
        var componenteId=req.params.id;
        var update=req.body;

        techComponent.findByIdAndUpdate(componenteId,update,{new:true},(err,techComponentsActualizado)=>{
            if (err) return res.status(500).send({message:"Error al eliminar los datos"});
            if(!techComponentsActualizado) return res.status(404).send({message:'No se puede eliminar el componente'});
            return res.status(200).send({techComponentsActualizado});
        })
    },
    uploadImages:function(req,res){

        var componenteId=req.params.id;
        var newFolderPath = './uploads/'+componenteId;
        if (!fs.existsSync(newFolderPath)) {
            fs.mkdirSync(newFolderPath);
        }
        
        var files=req.files.imagenes;
        var fileNames=[];
        
        if(files){
            for(var i=0;i<files.length;i++){
                var filePath=files[i].path;
                var fileName=files[i].originalFilename;
                var extSplit=fileName.split('\.');
                var fileExt=extSplit[1];
                if(fileExt=='png'||fileExt=='jpg'||fileExt=='jpeg'||fileExt=='gif'){
                    //Mueve el archivo a una carpeta en el servidor
                    var newFilePath='./uploads/'+componenteId+'/'+fileName;
                    fs.rename(filePath,newFilePath,(err)=>{
                        if(err){
                            console.log(err);
                            return res.status(500).send({message:"La imagen no se ha subido"});
                        }else{
                            fileNames.push(fileName);
                            if(i==files.length-1){
                                techComponent.findByIdAndUpdate(componenteId,{imagenes:fileNames},{new:true},(err,techComponentsActualizado)=>{
                                    if (err) return res.status(500).send({message:"La imagen no se ha subido"});
                                    if(!techComponentsActualizado) return res.status(404).send({message:'El componente no existe y no se subio la imagen'});
                                    return res.status(200).send({techComp:techComponentsActualizado});
                                });
                            }
                        }
                    });
                }else{
                    fs.unlink(filePath,(err)=>{
                        return res.status(200).send({message:"La extension no es valida"});
                    });
                }
            }
        }else{
            return res.status(200).send({message:"No se han subido archivos"});
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