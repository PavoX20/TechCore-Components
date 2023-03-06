'use strict'
var express=require('express');
var router=express.Router();
var componentesRouter=require('../controllers/componentes.controllers');
var multiparty=require('connect-multiparty');
var multipartyMiddleWare=multiparty({uploadDir:'./uploads'});


//pagina de inicio
router.get('/inicio',componentesRouter.getInicio);


//componentes Tarjeta grafica
router.post('/tarjetaGrafica',componentesRouter.saveComponente);
router.post('/categoria',componentesRouter.saveCategoria)
// router.get('/tarjetaGrafica:id',componentesRouter.detalleComponente);
// router.get('/procesador-detalles',componentesRouter.detallesProcesador);


module.exports=router;