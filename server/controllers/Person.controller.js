const Persons = require("../models/person.model")
const jwt = require("jsonwebtoken")



class person{

    getAll = (req,res)=>{
        Persons.find()
        .then(
            allPeople =>{
                res.json({
                    count: allPeople.length,
                    results:allPeople
                })
            }).catch(
            err=>{res.json({err, msg:"error getting all the people"})}
        )}

    addOne = (req,res)=>{
        Persons.create(req.body)
        .then(newPerson =>{
            res.json({
                results:newPerson
            })
        }).catch(err =>{res.json({err,msg:"error creating a new person"})})
    }

    getOne = (req,res)=>{
        Persons.findOne({_id:req.params.id})
        .then(onePerson=>{
            res.json({
                results:onePerson
            })
        }).catch(err =>{res.json({err,msg:"error getting one person"})})
    }

    updateOne = (req,res)=>{
        Persons.findOneAndUpdate(
            {_id:req.params.id},
            req.body,
            {new:true,runValidators:true}
            )
            .then(updateOnePerson=>{
                res.json({
                    results:updateOnePerson
                })
            }).catch(err =>{res.json({err,msg:"error updating one person"})})
    }

    deleteOne = (req,res)=>{
        Persons.findOneAndDelete({_id:req.params.id})
        .then(deletePerson=>{
            res.json({
                results:deletePerson
            })
        }).catch(err =>{res.json({err,msg:"error deleting one person"})})
    }



    getByFullName=(req,res)=>{ 
        Persons.findOne({fullName:req.params.PersonFullName})
        .then(onePerson=>{
            res.json({
                results:onePerson
            })
        }).catch(err =>{res.json({err,msg:"error getting one person by full name"})})
    }
}


module.exports = new person