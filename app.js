const express = require('express');
const pug = require('pug');
const bodyParser = require('body-parser');
const User = require("./models/users").User;
const Jornada = require("./models/jornadas").Jornada;
const session = require('express-session');
const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "123byuhbsdah12ub",
    resave: false,
    saveUninitialized: false
}));

const Main = (req,res) => {
    // Revisamos si hay una sesion activa
    if(req.session.nombre != undefined){
        var sesion = req.session;
    }else{
        var sesion = "null";
    }

    Jornada.findOne({jornada: 1}, (err,jornada) => {
        if(!err){
            if(jornada){
                res.render("results", {jornadas:jornada,sesion:sesion})
            }else{
                console.log("no se encontraron jornadas");
            }
        }else{
            console.log(err);
        }  
        console.log(sesion)
        console.log(jornada)
    });

}

app.set('view engine', 'pug');

app.get('/', (req, res) =>{
    Main(req,res)
});

app.post('/login', (req, res) =>{
    User.findOne({username:req.body.user, password:req.body.pass}, (err, user) => {
        if(!err){
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
        }else{
            console.log(err);
        }   
    });
});

app.listen(8080, () =>{
    console.log("Server on port 8080");
});