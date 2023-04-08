const mongoose = require("mongoose")


//you may want to use regex on the phone number if you want you can change it later
//you may want to use regex on the phone number if you want you can change it later
//! make a new field call loan id that and make the field outo popula usindin the populate fiesd 

const loan = mongoose.Schema({
    loanIdNumber:{
        type:Number
    },
    dateAdded:{
        type: Date,
        required: [true,"debes de poner una fecha"],
    },
    loanAmount:{
        type: Number,
        required:[true,"debes de poner una suma"],
        min:[1.00,"la suma prestada debe se ser por lo menos 100.00 pesos"]
    },
    interest:{
        type: Number,
        required:[true,"debes de poner la tasa de interés"]
    },
    latenessInterest:{
        type:Number,
        required:[true,"debes de poner el numero de mora/interés"],
    },
    totalLatenessPayment:{
        type:Number,
        default:0
        // required:[true,"debes de poner el numero de pagos/cuotas"],
    },
    numberLateness:{
        type:Number,
        default:0
        // required:[true,"debes de poner el numero de pagos/cuotas"],
    },
    cuotasNumber:{
        type:Number,
        required:[true,"debes de poner el numero de pagos/cuotas"],
    },
    timeType:{
        type:String,
         required:[true,"debes de seleccionar un tipo de pago"],
        enum:["Semanal","Quincenal","Mensual","Anual"]
    },
    payments:{
        type:Object,Array,
        required: [true,"necesitas agregar los pagos"]
    },
    totalInterest:{
        type:Number,
        required: [true,"tienes que sumar el interés total"]
    },
    totalPrincipal:{
        type:Number,
        required: [true,"you need to add the total principal"]
    },
    total:{
        type:Number,
        required: [true,"you need to add the totality of the loan"]
    },
    totalPaid:{
        type:Number,
    },
    dates:{
        type:Array,
        required: [true,"you need to add the  dates that the loans are paid"]
    },
    loanFullyPaid:{
        type:Boolean,
        default: false
    },
    active:{
        type:Boolean,
        default:true
    },
    client_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:[true,"necesitas seleccionar a un cliente"],
        ref:"person"
    }
    

},{timestamps:true})


const Loans = mongoose.model("loan",loan);

module.exports = Loans;