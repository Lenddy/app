//!user controller file


const Users = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


class User {
    getAll = (req,res)=>{
        Users.find()
        .then(allUsers =>{
            res.json({
                count: allUsers.length,
                results: allUsers
            })
        })
        .catch(err => res.json({message:"error getting all users",error:err}))
    }


    register = (req,res)=>{
        Users.find({nombreDeUsuario:req.body.nombreDeUsuario})
        .then( taken =>{
            if(taken.length == 0){
            Users.create(req.body)
        .then(user =>{
                const userToken = jwt.sign({
                    id:user._id,
                    name:user.nombre
                },process.env.SECRET_KEY)
                //responding  with a cookie call "userToken" which contains the jwt from above call userToken and also respondin with json with info about the user who just got created
                res.cookie("userToken",userToken,process.env.SECRET_KEY,{httpOnly: true})
                .json({
                message:"new user added",
                result:user
            })})
        .catch(err=>res.json({message: "there was an error adding the new user",err:err}))
            } else{
                res.json({err:{errors:{nombreDeUsuario:{message:"este nombre de usuario ya esta tomado seleccione otro"}
                }}})
            }//end of if
        })//end of parent .then()
        .catch(err=>console.log("error",err))
    }


    //async and await is another way of doing .then() and .catch 
    login = async (req,res)=>{ //async means that there will be promisees inside of this function
        const user = await Users.findOne({nombreDeUsuario:req.body.nombreDeUsuario})//await will make this line of code wait for a response until it runs the next pieces of code//* it will either return a user or null 
        //if the user Name is not found on the db
        if(user === null){
            // return res.sendStatus(400)
            return res.json({err:{nombreDeUsuario:{msg:"usuario o contraseña no coinciden "}},user })
        }
        //if the user was found compare the password
        const correctPassword = await  bcrypt.compare(req.body.contraseña, user.contraseña) //compare take the password inputted and compare it to the hash password in the data base to se if it matches
        //if the password does not match
        if(!correctPassword){
            // return res.sendStatus(400)
            return res.json({err:{contraseña:{msg:"usuario o contraseña no coinciden "}}})
        }
        if(req.body.contraseña === null){
            res.json({err:{contraseña:{msg:"debe de entrar una contraseña"}}})
        }
        //if it matches 
        const userToken = jwt.sign({ //creates a jwt(json web token)  to sing you in 
            id: user._id, //sending the id of the user to cookies (session)
            name: user.nombre
        },
        process.env.SECRET_KEY)  // also sending the secret key to that cookie ????
        res.cookie("userToken",userToken,process.env.SECRET_KEY,{httpOnly:true})// responding with a cookie // also authenticating using the secret key
        .json({// also adding a json{} object ofa message 
            message: "you log in"
        })
        
    }


    loggedUser = (req,res)=>{
        //using the info of the user that is store in the cookie  to get the id of the logged in user and quwey the db to find a user with that id and return with info about the logged user 
        const decodedJwt = jwt.decode(req.cookies.userToken, {complete:true})
        //decodedJWT.payload.id
        Users.findOne({_id: decodedJwt.payload.id})
        .then(user =>{
            res.json({result:user})    //if you dont want to show all the user info you can make a nested object  {result:{name:.user.name,lastname:user.lastname}}
        }).catch(err=>{res.json({err})})
    }


    logout = (req,res)=>{
        res.clearCookie("userToken");
        res.sendStatus(200)
    }


    delete =(req,res)=>{
        Users.findOneAndDelete({_id:req.params.id})
        .then(user =>{
            res.json({
                deletedUser:user
            })
        }).catch(err=>res.json({msg:"user was not deleted", error:err}))
    }
}

module.exports = new User()

//!user controller file end




















//try  doing it with async and await


// register = async (req,res)=>{
//     const user = await Users.find({nombreDeUsuario:req.body.nombreDeUsuario})
//     if(user.length == 0){
//             const newUser = await Users.create(req.body)
//             .then(user =>{
//                     const userToken = jwt.sign({
//                         id:user._id,
//                         name:user.nombre
//                     },process.env.SECRET_KEY)
//                     //responding  with a cookie call "userToken" which contains the jwt from above call userToken and also respondin with json with info about the user who just got created
//                     res.cookie("userToken",userToken,process.env.SECRET_KEY,{httpOnly: true})
//                     .json({
//                     message:"new user added",
//                     result:user
//                 })})
//             .catch(err=>res.json({message: "there was an error adding the new user",err:err}))
            
//         }
//     }
//     )
// }