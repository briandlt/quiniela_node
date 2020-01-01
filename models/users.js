const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/quiniela", { useUnifiedTopology: true, useNewUrlParser: true });

let userSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    username: {type: String, required: true, maxlength: [20, "Username demaciado grande"]},
    password: {
        type: String,
        minlength: [8,"Password demaciado corto"],
        validate: {
            validator: function(p){
                return this.password_confirmation == p;
            },
            message: "Las contraseñas no son iguales"
        }
    },
    telefono: String,
    permisos: String,
    foto: String
});

userSchema.virtual("password_confirmation").get(function(){
    return this.p_c;
}).set(function(password){
    this.p_c = password;
})

let User = mongoose.model('User', userSchema);

module.exports.User = User;
