'use strict'
var express=require('express');
var router=express.Router();
var componentesRouter=require('../controllers/componentes.controllers');
var multiparty=require('connect-multiparty');
var multipartyMiddleWare=multiparty({uploadDir:'./uploads'});


//pagina de inicio
router.get('/inicio',componentesRouter.getInicio);


//Guardar componentes
router.post('/guardar-componente',componentesRouter.saveComponente);

//Guardar la categoria
router.post('/categoria',componentesRouter.saveCategoria);

//Obtener todos los componentes (todos)
router.get('/componentes',componentesRouter.getComponentes);

//Obtener todos los componentes segun la categoria
router.get('/componentes/:idCategoria',componentesRouter.getByCategoria);

//Obtener solo un componente, segun su id
router.get('/componente/:id',componentesRouter.getComponente);

//Eliminar componente
router.get('/delete/:id',componentesRouter.getComponente);

//Eliminar componente
router.get('/editar/:id',componentesRouter.updateComponent);

//Guardar imagen
router.post('/guardar-imagenes/:id',multipartyMiddleWare,componentesRouter.uploadImages);



//recuperar una imagen
router.get('/get-imagen/:imagen',componentesRouter.getImage);




// router.get('/tarjetaGrafica:id',componentesRouter.detalleComponente);
// router.get('/procesador-detalles',componentesRouter.detallesProcesador);


module.exports=router;