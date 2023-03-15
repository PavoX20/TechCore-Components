'use strict'
var express=require('express');
var bodyParser=require('body-parser');
var app=express();
var componentesRoutes=require('./routes/componentes.routes');

app.use(bodyParser.urlencoded({extended:false}));//todo lo que llegua y todo lo que se envia sea convertido en json
app.use(bodyParser.json());
//las cabeceras para saber lo que esta permitido
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, X-Request-With, Content-Type,Accept, Access-Control-Allow, Request-Method')
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials',true);
    next();
});

var sessions=require('express-session');
var cookieParser=require('cookie-parser');
const oneDay=1000*60*60*24;//por cuanto tiempo tendremos la sesion
app.use(sessions({
    secret:"estaesmiclavesecretahgjgkhjkjhkjfhdnkfjhdfnk545hfnj1543",
    saveUninitialized:true,
    cookie:{maxAge:oneDay},
    resave:false//tome un valor booleano para que la sesion se vuelva a iniciar
}));

app.use(cookieParser());


app.use('/',componentesRoutes);

module.exports=app;