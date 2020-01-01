const express = require('express');
const router = express.Router();

// mongo schemas
const { User } = require('../models/users');
const { Jornada } = require('../models/jornadas');

// root app
router.get('/', (req, res, next) => {
  let session = null;
  // Revisamos si hay una sesion activa
  if(req.session.nombre != undefined)
	session = req.session;

  Jornada.findOne({jornada: 1}, (err,jornadas) => {
	if(err)
	  return next(err);
    
	if(jornada)
	  res.render("results", {jornadas, session})
	else
	  res.render("results", {jornadas: false, session })
        
    console.log(session)
    console.log(jornadas)
  });
});

// login
router.post('/singin', async(req, res, next) => {
    User.findOne({username:req.body.user, password:req.body.pass}, (err, user) => {
        if(err)
		  return next(err)

        // SI ME DEVUELVE UN SUAURIO QUIERE DECIR QUE LAS CREDENCIALES SON CORRECTAS
        if(user){
         req.session.user_id = user._id;
         req.session.nombre = user.nombre;
         req.session.username = user.username;
         res.render("results", {sesion: req.session});
        }else{ // DE LO CONTRARIO REDIRECCIONAMOS AL LOGIN Y MANDAMOS UN MENSAJE DE FALLO 
         res.render("results", {sesion:"null"});
         console.log("Tus credenciales son incorrectas");
        }
    });
  console.log('login')
});

module.exports = router;
