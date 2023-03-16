'use strict'
var express=require('express');
var router=express.Router();
var componentesRouter=require('../controllers/componentes.controllers');
var multiparty=require('connect-multiparty');
var multipartyMiddleWare=multiparty({uploadDir:'./uploads'});
var usuariosRouter=require('../controllers/usuario.controllers')

//pagina de inicio
router.get('/inicio',componentesRouter.getInicio);


//Guardar componente
router.post('/guardar-componente',componentesRouter.saveComponente);

//Guardar la categoria
router.post('/categoria',componentesRouter.saveCategoria);

//Obtener todos los componentes (todos)
router.get('/componentes',componentesRouter.getComponentes);

//Obtener todos los componentes segun la categoria
router.get('/componentes/:idCategoria',componentesRouter.getByCategoria);

//Obtener solo un componente, segun su id
router.get('/componente/:id',componentesRouter.getComponente);

//Editar componente
router.put('/componente/:id',componentesRouter.updateComponent);

//borrar componente
router.delete('/componente/:id',componentesRouter.deleteComponent);

//Guardar imagen
router.post('/guardar-imagenes/:id',multipartyMiddleWare,componentesRouter.uploadImages);

//recuperar una imagen
router.get('/get-imagen/:imagen',componentesRouter.getImage);

//recuperar imagenes del componente segun el idComponent
router.get('/get-imagenes/:id',componentesRouter.getAllImages);

//obtener las categorias
router.get('/get-categorias',componentesRouter.getCategorias);

// router.get('/tarjetaGrafica:id',componentesRouter.detalleComponente);
// router.get('/procesador-detalles',componentesRouter.detallesProcesador);




//Guardar Usuario
router.post('/registro-usuario',usuariosRouter.saveUsuario);

//Login
router.post('/login',usuariosRouter.login);

//Logout
router.get('/logout',usuariosRouter.logout);

module.exports=router;