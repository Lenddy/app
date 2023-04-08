//!user model file

const mongoose = require("mongoose")
const bcrypt = require("bcrypt") //to encrypt the password


const user = mongoose.Schema({
    nombre:{
        type: String,
        required: [true,"debes de poner tu nombre"],
        minLength: [2,"tu nombre debe de tener al menos 2 letras"]
    },
    apellido:{
        type:String,
        required: [true,"debes de poner tu apellido"],
        minLength:[2,"tu apellido debe de tener por lo menos 2 letras "]
    },
    nombreDeUsuario:{
        type:String,
        required: [true,"debes de poner tu nombre de usuario"],
        minLength:[2,"tu nombre usuario debe de tener por lo menos 2 letras "]
    },
    contraseña:{
        type: String,
        required: [true,"debes de poner tu contraseña"],
        minLength:[3,"tu contraseña debe de tener por lo menos 3 letras o números "]
    }
},{timeStamps: true});


// user.virtual("some variable name") creates a temporary field in your data base 
user.virtual("confirmar") //this is the name of the variable
.get(() => this._confirmar) //what you put on the form  with the confirm input will be store in a fiel call _confirmar 
.set( value => this._confirmar = value);//then is going to set the value that you got from the form to be _confirm



//* before (pre). validate that the password and the confirm password matches
//* if they dont match this.invalidate will create a validation message
// creating a  validation to check if the password and the confirm password match
user.pre("validate", //pre is creating a validation before the virtual variable is created .pre()is develope by mongoose
    function(next){ //creating an arrow function that takes next as a parameter
        if(this.contraseña !== this.confirmar){
             //having an if statement that checks if password and confirm password are not the same 
        this.invalidate("confirmar","la contraseña y confirmar contraseña tienen que ser iguales"); // if they are not the same it will create a validation message 
    }
    next(); //calling the parameter next as a method/ to do the next step (continue) to either save the user to the data base or show the validation message 
})

//before (pre) saving the user to the db(this means that we pass the validation test) it will hash the password 
user.pre("save",//calling .pre() method but giving it a string (save) instead of validate
    function(next){ //giving a function that has next as a parameter 
        bcrypt.hash(this.contraseña,10) //hashing the password
        .then(
            hash=>{ this.contraseña = hash;
            next() //taking the next step saving it to the data base
        })
})


const Users = mongoose.model("user_table",user)

module.exports = Users


//! user model file end