'use strict'
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');


var controller = {
    saveUsuario: async function(req, res) {
        let usuario = new Usuario();
        let params = req.body;
        
        usuario.user = params.user;
        usuario.nombre = params.nombre;
        usuario.apellido = params.apellido;
        
        const saltRounds = 10;
        bcrypt.hash(params.password, saltRounds, async function (err, hash) {
            if (err) {
                console.error(err);
            } else {
                try {
                    try{
                        
                        let ifExists = await Usuario.findOne({user:usuario.user})
                        if(ifExists.user==usuario.user){
                            
                            return res.status(200).send({flag:false, message: "Ya existe una cuenta con ese usuario" });
                        }
                        
                    }catch{
                        usuario.password=hash
                        const result = await usuario.save();
                        return res.status(200).send({ flag:true,usuario: result });
                    }
                  } catch (err) {
                    return res.status(200).send({ flag:false,message: "Error al guardar" });
                }
            }
        });
    },

    
    
    login: async function (req, res) {
        let user = req.body.user;
        let password = req.body.password;
        let session = req.session;

        if (user == null || password == null) return res.status(404).send({flag:false, message: 'Datos incorrectos' });

        const response = await Usuario.findOne({user:user})


        if(!response) return res.status(500).send({flag:false, message: "No existe en la base de datos el usuario" });


        bcrypt.compare(password, response.password, function(err, result) {
            if (err) {
              console.log(err)
              return res.send({flag:false,message:'Error al cargar los datos'});
            } else if (result) {
              
                session.req.session;
                session.user=req.body.user;
                return res.send({flag:true,message:'Se ha ingresado con éxito', response});

            } else {
                return res.send({flag:false,message:'Usuario o contraseña incorrectos'});
            }
          });


    },
    logout: function (req, res) {
        req.session.destroy();
        res.redirect('/inicio');

    }
}
module.exports = controller;