const  loan= require("../models/loans.model")
const jwt = require("jsonwebtoken")



class Loan{

    //gets all the loans in the db and with their users one to many
    getAll = (req,res)=>{
        loan.find()
        .populate("client_id")
        .then(
            allLoans =>{
                res.json({
                    count: allLoans.length,
                    results:allLoans
                })
            }).catch(
            err=>{res.json({err, msg:"error getting all the loans "})}
        )}

//gets all the loans that one client have made with their users one to many
    getAllLoansOfOneClient = (req,res)=>{ //to get all the loans that belong to one client
        loan.find({client_id:req.params.clientId})
        .populate("client_id")
        .then(
            allLoans =>{
                res.json({
                    count: allLoans.length,
                    results:allLoans
                })
            }).catch(
            err=>{res.json({err, msg:"error getting all the loans "})}
        )}

//creates a new loan
    addOne = (req,res)=>{
        loan.create(req.body)
        .then(newLoan =>{
            res.json({
                results:newLoan
            })
        }).catch(err =>{res.json({err,msg:"error creating a new loan"})})
    }


//gets one loans that match the id provided and the client info  one to many
    getOne = (req,res)=>{
        loan.findOne({_id:req.params.id})
        .populate("client_id")
        .then(oneLoan=>{
            res.json({
                results:oneLoan
            })
        }).catch(err =>{res.json({err,msg:"error getting one loan"})})
    }


//updates one loan  (not implemented yet)
    updateOne = (req,res)=>{
        loan.findOneAndUpdate(
            {_id:req.params.id},
            req.body,
            {new:true,runValidators:true}
            )
            .then(updateOndeLoan=>{
                res.json({
                    results:updateOndeLoan
                })
            }).catch(err =>{res.json({err,msg:"error updating one loan"})})
    }   


//updates the payments status for one loan payments  (not in use because update many in replace it )
    updateStatus = async (req, res) => {
        const id = req.params.id
        const payment_id = parseInt(req.params.payment_id)
        await loan.findOne({_id:id})
        .updateOne(
            {"payments._id": payment_id},
            {
                $set:{
                    "payments.$.isPaid":Boolean(true)
                }
            }
        )
        .then(statusUpdate=>{
            res.json({
                results:statusUpdate
            })
        }).catch(err =>{res.json({err,msg:"error updating the status of  one loan"})})
    }

//updates the payments status for one loan payments  (not in use because update many in replace it )
    undoLoanStatus = async (req, res) => {
        const id = req.params.id
        const payment_id = parseInt(req.params.payment_id)
        await loan.findOne({_id:id})
        .updateOne(
            {"payments._id": payment_id},
            {
                $set:{
                    "payments.$.isPaid":Boolean(false)
                }
            }
        )
        .then(statusUpdate=>{
            res.json({
                results:statusUpdate
            })
        }).catch(err =>{res.json({err,msg:"error updating the status of  one loan"})})
    }

//don't know why i made this fine out later 
    getOneLoanPayment = async (req,res)=>{
        const id = req.params.id
        const payment_id = parseInt(req.params.payment_id)
        await loan.findOne({_id:id}).find({"payments":{$elemMatch :{"payments.id":payment_id}}})
        .then(statusUpdate=>{
            res.json({
                results:statusUpdate
            })
        }).catch(err =>{res.json({err,msg:"error updating the status of  one loan"})})
    }


    //updates many payments status for one loan
    updateManyLoanStatus = async (req, res) => {
        console.log("req.params.id:", req.params.id);
        const id = req.params.id
        const payment_id =  parseInt(req.params.payment_id);
        console.log(`id: ${id}, payment_id: ${payment_id}`) // Debugging line
        try {
            // Try to update the payment status
            const statusUpdate = await loan.updateMany(
                { _id: id ,"payments._id": payment_id, "payments.isPaid": Boolean(false)},
                { $set: { "payments.$[elem].isPaid": Boolean(true) } },
                { arrayFilters: [{ "elem._id": {$lte: payment_id }}] } //$lte not working as intended 
            );
            // Send a JSON response with the status update
            res.json({ results: statusUpdate });
        } catch (err) {
            // Handle any errors that occur during the try block
            res.json({ err, msg: "error getting the status of many loans" });
        }
        
    }


//updates many payments status for one loan
    undoManyLoanStatus = async (req, res) => {
        console.log("req.params.id:", req.params.id);
        const id = req.params.id
        const payment_id =  parseInt(req.params.payment_id);
        console.log(`id: ${id}, payment_id: ${payment_id}`) // Debugging line
        try {
            // Try to find the loan document
            // const loanDoc = await loan.findOne({ _id: id });
        
            // Try to update the payment status
            const statusUpdate = await loan.updateMany(
                { _id: id ,"payments._id": payment_id, "payments.isPaid": Boolean(true)},
                { $set: { "payments.$[elem].isPaid": Boolean(false) } },
                { arrayFilters: [{ "elem._id": {$gte: payment_id}}] } //$lte not working as intended 
            );
        
            // Send a JSON response with the status update
            res.json({ results: statusUpdate });
        } catch (err) {
            // Handle any errors that occur during the try block
            res.json({ err, msg: "error getting the status of many loans" });
        }
    }



    // await loan.findOne({_id:id})
    //     .updateOne(
    //         {"payments._id": payment_id},
    //         {
    //             $set:{
    //                 "payments.$.isPaid":Boolean(false)
    //             }
    //         }
    //     )
    // updateLateness = async (req, res) => {
    //     const id = req.params.id 
    //     const payment_id =  parseInt(req.params.payment_id);
    //     const latenessPayment = parseFloat(req.params.latenessPayment)
    //     const daysLate = parseInt(req.params.daysLate)
    //     const totalLatenessPayment = parseFloat(req.params.totalLatenessPayment)
    //     const numberLateness = parseInt(req.params.numberLateness)
    //     try {
    //         const latenessUpdate = await loan.findOneAndUpdate(
    //             { _id: id },
    //             {totalLatenessPayment:totalLatenessPayment,numberLateness:numberLateness},
    //             )
    //         .findOneAndUpdate(
    //             {"payments._id": payment_id},
    //             {
    //                 $set:{
    //                     "payments.$.latenessPayment":latenessPayment,
    //                     "payments.$.daysLate":daysLate,
    //             }
    //         );
    //         res.json({ results: latenessUpdate })
    //     }catch(err){
    //         res.json({err,msg:"error updating the lateness of one loan"})
    //     }
    // }


    updateLateness = async (req, res) => {
        const id = req.params.id;
        const payment_id = parseInt(req.params.payment_id);
        const latenessPayment = parseFloat(req.params.latenessPayment);
        const daysLate = parseInt(req.params.daysLate);
        const totalLatenessPayment = parseFloat(req.params.totalLatenessPayment);
        const numberLateness = parseInt(req.params.numberLateness);
        const updatedPrincipal = parseFloat(req.params.updatedPrincipalPayment);
        try {
          const loanUpdate = await loan.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                totalLatenessPayment: totalLatenessPayment,
                numberLateness: numberLateness
              }
            }
          );
          const paymentUpdate = await loan.findOneAndUpdate(
            { _id: id, "payments._id": payment_id },
            {
              $set: {
                "payments.$.latenessPayment": latenessPayment,
                "payments.$.daysLate": daysLate,
                "payments.$.principalPayment": updatedPrincipal
              }
            }
          );
          res.json({ results: paymentUpdate });
        } catch (err) {
          res.json({ err, msg: "error updating the lateness of one loan" });
        }
      };
      

    updateTotalPaid = async(req,res)=>{
        const id = req.params.id
        const sum = req.params.sum
        try{
            const totalPaid = await loan.findOneAndUpdate(
                {_id:id},
                {
                    totalPaid: parseFloat(sum)
                },
                {new:true,runValidators:true}
            );

            res.json({results:totalPaid});
        }catch(err){
            res.json({err,msg: "error updating the  total paid"})
        }
    }



//deletes a loan not in use at the moment 
    deleteOne = (req,res)=>{
        loan.findOneAndDelete({_id:req.params.id})
        .then(deleteLoan=>{
            res.json({
                results:deleteLoan
            })
        }).catch(err =>{res.json({err,msg:"error deleting one loan"})})
    }
}


module.exports = new Loan