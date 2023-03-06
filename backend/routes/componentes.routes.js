'use strict'
var express=require('express');
var router=express.Router();
var componentesRouter=require('../controllers/componentes.controllers');
var multiparty=require('connect-multiparty');
var multipartyMiddleWare=multiparty({uploadDir:'./uploads'});


//pagina de inicio
router.get('/inicio',componentesRouter.getInicio);


module.exports=router;