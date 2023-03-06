'use strict'
var mongoose=require('mongoose');
var port='3700';
mongoose.promise=global.Promise;
mongoose.set("strictQuery",false);
var app=require('./app');
mongoose.connect('mongodb+srv://dbUser:techcorecomponents@cluster1.7xtlw1w.mongodb.net/TechCoreComponents?retryWrites=true&w=majority')
.then(()=>{
    console.log("Conexion establecida con la BDD")
    app.listen(port,()=>{
        console.log("Conexion establecida en el url: localhost:3700");
    })
})
.catch(err=>console.log(err))