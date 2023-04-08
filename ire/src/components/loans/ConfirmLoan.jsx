import {useEffect, useState} from "react";
import { useParams,useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {Button,Modal, Table} from 'react-bootstrap';
import AddLoan from "./AddLoan";
import LoanInformation from './LoanInformation';

const ConfirmLoan = (props) => {
    const {formInfo,id,date,Amount,int,cuotas,type} = props
    const navigate = useNavigate()
    // const [loan,setLoan] = useState({})
    const [client,setClient] = useState({})
    const [show, setShow] = useState(false);
    const [allCuotas,setAllCuotas] = useState({})
    const [formInfoErr,setFormInfoErr] = useState({})
    const [info,setInfo] = useState({})
    console.log("this is the form info",formInfo)
        console.log("this are all the cuotas ", (11 / 100) * 10000)
    // console.log("is here",info)
    // formInfo.loanAmount,formInfo.interest,formInfo.cuotasNumber,formInfo.cuotasNumber,formInfo.dateAdded,formInfo.timeType)
    useEffect(() => {
        setInfo({...formInfo, ...calculateLoanAndDates(Amount, int, cuotas, cuotas, date, type),...allCuotas})
        oneClient(id)
        // console.log("this is the info inside of the use effect ",info)
    }, [Amount, int, cuotas, cuotas, date, type,])
    console.log('this is the fuuuuuuuuuuucking info that is wrong some fucking how',info)

    const oneClient=(id)=>{
        axios.get(`http://localhost:8000/api/People/${id}`)
        .then(res =>{
        // console.log(res.data.results)
            setClient(res.data.results)
        }).catch(err=>{ 
            console.log("error",err)
        })
    }
    


    const submitHandler = ()=>{
        axios.post("http://localhost:8000/api/loan/new", info )
        .then(res =>{
            // console.log(res)
            if(res.data.err?.errors){
                setFormInfoErr(res.data.err.errors)
            }else{
                setFormInfoErr()
                navigate("/Prestamos") //change this to 
            }
        }).catch(
            err =>{console.log("there was an error", err)}
        )
    }
//! to calculate the 10 persent of somethign 
//! to calculate the 10 persent of somethign 
//! to calculate the 10 persent of somethign 
//! to calculate the 10 persent of somethign 
//! to calculate the 10 persent of somethign 
//! to calculate the 10 persent of somethign 
//! to calculate the 10 persent of somethign 
//! to calculate the 10 persent of somethign 
//! to calculate the 10 persent of somethign 
//! to calculate the 10 persent of somethign 
//! to calculate the 10 persent of somethign 
//! to calculate the 10 persent of somethign 
//! to calculate the 10 persent of somethign 
//! to calculate the 10 persent of somethign 
//! to calculate the 10 persent of somethign 
//! to calculate the 10 persent of somethign 
//! to calculate the 10 persent of somethign 
// subjest that you put the  (interest rate /100)* loanAmount
    //  console.log(" ", (11 / 100) * 10000)
const calculateLoanAndDates = (principal, interestRate, term, repetition, startDate, unit) => {
    let payments = [];
    let totalInterest = 0;
    let totalPrincipal = 0;
    let totalPrincipalPayment = 0
    let balance = principal;
    let interestPayment = 0;
    let principalPayment = 0;
    let totalCapital = 0
    let dates = [];
    
    let newDate = new Date(startDate);
    // const constantPayment = principal / term ;
    let constantPayment = (principal * (interestRate / 100 / 12) * Math.pow(1 + (interestRate / 100 / 12), term)) / (Math.pow(1 + (interestRate / 100 / 12), term) - 1);
    console.log("this is the constant payment",constantPayment)
    for (let i = 0; i < repetition; i++) {
    if (i > 0) {
        newDate = new Date(dates[i - 1]);
    }
        if (unit === "week" || unit === "semanal" || unit === "Semanal" || unit === "SEMANAL" || unit === 7) {
            let weeklyInterestRate = interestRate / 52;
            let numberOfWeeks = term * 52;
            
            interestPayment = (balance * weeklyInterestRate)/ (1 - Math.pow(1 + weeklyInterestRate, - numberOfWeeks));
            newDate.setDate(newDate.getDate() + 7);
        // interestPayment = balance * (interestRate / 100 / 0.5 )
        } else if (unit=="bi-weekly"|| unit === "15 days" || unit === "quincenal" || unit === "Quincenal" || unit === "QUINCENAL" || unit === 15) {
            interestPayment = balance * (interestRate / 100 / 5.5);
            newDate.setDate(newDate.getDate() + 15);
        } else if (unit === "month" || unit === "mensual" || unit === "Mensual" || unit === "MENSUAL" || unit === 30 || unit === 31) {
            interestPayment = balance * (interestRate / 100 / 1.375 );//1.375
            newDate.setMonth(newDate.getMonth() + 1);
        }

      // interestPayment = balance * (interestRate / 100 )*(repetition/12);
      // interestPayment = balance * (interestRate / 100 /  )
        totalInterest += interestPayment;
        principalPayment = constantPayment - interestPayment;
        totalPrincipalPayment += principalPayment
        totalPrincipal += constantPayment;
        totalCapital += principalPayment
        balance = balance - constantPayment;
        let year = newDate.getFullYear();
        let month = (newDate.getMonth() + 1);
        let day = newDate.getDate();
        dates.push(
            year + "/" + (month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day)
        );
        let paymentDate = dates[i]

        payments.push({
            _id: i + 1,
            interestPayment: interestPayment,
            capitalPayment:principalPayment,
            principalPayment: constantPayment,
            paymentDate:paymentDate,
            balance: balance,
            isPaid: false,
            latenessPayment:0,
            daysLate:0
        });
    }
    console.log("this is the total capital payment",totalCapital)
    let fullTotal = totalPrincipal //*this wa the interes + the total principle 
    setAllCuotas({
    interest:interestRate,
    payments: payments,
    totalInterest: totalInterest,
    totalPrincipal: totalPrincipal,
    total:fullTotal,
    totalPaid:0,
    totalCapital:totalCapital ,
    dates: dates,
    totalLatenessPayment: 0,
    numberLateness: 0,
    });
    console.log({
        payments: payments,
        totalInterest: totalInterest,
        totalPrincipal: totalPrincipal,
        total:fullTotal,
        totalCapital:totalCapital ,
        dates: dates
    });
};





// const calculateLoanAndDates = (principal, interestRate, term, repetition, startDate, unit) => {
//     let payments = [];
//     let totalInterest = 0;
//     let totalPrincipal = 0;
//     let totalPrincipalPayment = 0
//     let balance = principal;
//     let interestPayment = 0;
//     let principalPayment = 0;
//     let totalCapital = 0
//     let dates = [];
  
//     let newDate = new Date(startDate);
//     let constantPayment = (principal * (interestRate / 100 / 12) * Math.pow(1 + (interestRate / 100 / 12), term)) / (Math.pow(1 + (interestRate / 100 / 12), term) - 1);
//     console.log("this is the constant payment",constantPayment)
  
//     for (let i = 0; i < repetition; i++) {
//       if (i > 0) {
//         newDate = new Date(payments[i - 1].paymentDate);
//       }
  
//       if (unit === "week" || unit === "semanal" || unit === "Semanal" || unit === "SEMANAL" || unit === 7) {
//         let weeklyInterestRate = interestRate / 52;
//         let numberOfWeeks = term * 52;
        
//         interestPayment = (balance * weeklyInterestRate)/ (1 - Math.pow(1 + weeklyInterestRate, - numberOfWeeks));
//         newDate.setDate(newDate.getDate() + 7);
//       } else if (unit=="bi-weekly"|| unit === "15 days" || unit === "quincenal" || unit === "Quincenal" || unit === "QUINCENAL" || unit === 15) {
//         interestPayment = balance * (interestRate / 100 / 5.5);
//         newDate.setDate(newDate.getDate() + 15);
//       } else if (unit === "month" || unit === "mensual" || unit === "Mensual" || unit === "MENSUAL" || unit === 30 || unit === 31) {
//         interestPayment = balance * (interestRate / 100 / 1.375 );
//         newDate.setMonth(newDate.getMonth() + 1);
//       }
  
//       totalInterest += interestPayment;
//       principalPayment = constantPayment - interestPayment;
//       totalPrincipalPayment += principalPayment
//       totalPrincipal += constantPayment;
//       totalCapital += principalPayment
//       balance = balance - constantPayment;
  
//       let year = newDate.getFullYear();
//       let month = (newDate.getMonth() + 1);
//       let day = newDate.getDate();
  
//       dates.push(
//         year + "/" + (month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day)
//       );
  
//       let paymentDate = dates[i];
  
//       payments.push({
//         _id: i + 1,
//         interestPayment: interestPayment,
//         capitalPayment: principalPayment,
//         principalPayment: constantPayment,
//         paymentDate: paymentDate,
//         balance: balance,
//         isPaid: false
//       });
//     }
  
//     let fullTotal = totalPrincipal
//     setAllCuotas({
//       interest: interestRate,
//       payments: payments,
//       totalInterest: totalInterest,
//       totalPrincipal: totalPrincipal,
//       total: fullTotal,
//       totalPaid: 0,
//       totalCapital: totalCapital,
//       dates: dates,
//       totalLatenessPayment: 0,
//       numberLateness: 0,
//     });
  
// }
  

    return (
        <div>
        {
          formInfo.client_id !== undefined &&
          formInfo.loanAmount !== undefined &&
          formInfo.dateAdded !== undefined &&
          formInfo.interest !== undefined &&
          formInfo.timeType !== undefined &&
          formInfo.cuotasNumber !== undefined?
          <Button className=" mt-3" onClick={() =>{ setShow(true);oneClient(formInfo.client_id);console.log(calculateLoanAndDates(formInfo.loanAmount,formInfo.interest,formInfo.cuotasNumber,formInfo.cuotasNumber,formInfo.dateAdded,formInfo.timeType)) } }> {/* */}
          calcular cuotas
        </Button>: null
        }

      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header  closeButton>
          <Modal.Title  >Deudor/ra : {client.fullName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    <div>
        {/* Input fields for Principal, Interest Rate, etc */}
      {allCuotas && (
        <LoanInformation
          payments={allCuotas.payments}
          totalInterest={allCuotas.totalInterest}
          totalPrincipal={allCuotas.totalPrincipal}
          dates={allCuotas.dates}
          totalCapital={allCuotas.totalCapital}
          total={allCuotas.total}
        />
      )}
    </div>
        </Modal.Body>

        <Modal.Footer className="justify-content-center">
        <Button variant="success text-center"  onClick={submitHandler}> 
            confirmar
        </Button>
        <Button variant="danger text-center" onClick={() => setShow(false)}>
            cancelar
        </Button>
        </Modal.Footer>
      </Modal>
            </div>
      )}


export default ConfirmLoan;


      {/* 


// const calculateLoanAndDates = (principal, interestRate, term, repetition, startDate, unit) => {
//   let payments = [];
//   let totalInterest = 0;
//   let totalPrincipal = 0;
//   let balance = principal;
//   let interestPayment = 0;
//   let principalPayment = 0;
//   let dates = [];
//   let newDate = new Date(startDate);
//   const constantPayment = principal / term ;
//   console.log("this is the term", term)
//   for (let i = 0; i < repetition; i++) {
//       if (unit === "week" || unit === "semanal" || unit === "Semanal" || unit === "SEMANAL" || unit === 7) {
//           let weeklyInterestRate = interestRate / 52;
//           let numberOfWeeks = term;
//           interestPayment = balance * (weeklyInterestRate / 12) / (1 - (1 + (weeklyInterestRate / 12)) ** -numberOfWeeks);
//           principalPayment = constantPayment - interestPayment;  
//           totalPrincipal += constantPayment;
//           balance = balance - constantPayment;  
//       } else if (unit === "bi-weekly" || unit === "15 days" || unit === "quincenal" || unit === "Quincenal" || unit === "QUINCENAL" || unit === 15) {
//           let biWeeklyInterestRate = interestRate / 26;
//           let numberOfBiWeeks = term / 2;
//           console.log("Bi weeks",numberOfBiWeeks)

//           interestPayment = balance * (biWeeklyInterestRate / 12) / (1 - (1 + (biWeeklyInterestRate / 12)) ** -numberOfBiWeeks);
//           principalPayment = constantPayment - interestPayment;  
//           totalPrincipal += constantPayment;
//           balance = balance - constantPayment;  
//       } else if (unit === "month" || unit === "mensual" || unit === "Mensual" || unit === "MENSUAL" || unit === 30 || unit === 31) {
//           let monthlyInterestRate = interestRate / 12;
//           let numberOfMonths = term;
//           console.log("month",numberOfMonths)

//           interestPayment = balance * (monthlyInterestRate / 12) / (1 - (1 + (monthlyInterestRate / 12)) ** -numberOfMonths);
//           principalPayment = constantPayment - interestPayment;  
//           totalPrincipal += constantPayment;
//           balance = balance - constantPayment;  
//       }
//       // interestPayment = balance * (interestRate / 100 )*(repetition/12);
//       // interestPayment = balance * (interestRate / 100 /  )
//       totalInterest += interestPayment;
//       principalPayment = constantPayment - interestPayment;  
//       // totalPrincipalPayment += principalPayment
//       totalPrincipal += constantPayment;
//       balance = balance - constantPayment;  

//       payments.push({
//         paymentNumber: i + 1,
//         interestPayment: interestPayment,
//         capitalPayment:principalPayment,
//         principalPayment: constantPayment,
//         balance: balance,
//         isPaid: false
//       });
  
//       if (i > 0) {
//         newDate = new Date(dates[i - 1]);
//       }
  
//       if (unit === "week" || unit === "semanal" || unit === "Semanal" || unit === "SEMANAL" || unit === 7) {
//         newDate.setDate(newDate.getDate() + 7);
//       } else if (unit === "bi-weekly" || unit === "15 days" || unit === "quincenal" || unit === "Quincenal" || unit === "QUINCENAL" || unit === 15) {
//         newDate.setDate(newDate.getDate() + 15);
//       } else if (unit === "month" || unit === "mensual" || unit === "Mensual" || unit === "MENSUAL" || unit === 30 || unit === 31) {
//         newDate.setMonth(newDate.getMonth() + 1);
//       }
  
//       let year = newDate.getFullYear();
//       let month = newDate.getMonth() + 1;
//       let day = newDate.getDate();
  
//       dates.push(
//         year + "/" + (month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day)
//       );
//     }
//     console.log('this is the full total',totalInterest + totalPrincipal)
//     let fullTotal =totalInterest + totalPrincipal
//     setAllCuotas({
//       payments: payments,
//       totalInterest: totalInterest,
//       totalPrincipal: totalPrincipal,
//       total:fullTotal,
//       dates: dates
//     });
//     console.log({
//       payments: payments,
//       totalInterest: totalInterest,
//       totalPrincipal: totalPrincipal,
//       total:fullTotal,
//       dates: dates
//     });
//   };





// const calculateLoanAndDates = (principal, interestRate, term, repetition, startDate, unit) => {
//   console.log("principal",principal)
//   console.log("interestRate",interestRate)
//   console.log("term",term)
//   console.log("repetition",repetition)
//   console.log("startDate",startDate)
//   console.log("unit",unit)
//   let payments = [];
//   let totalInterest = 0;
//   let totalPrincipal = 0;
//   let balance = principal;
//   let interestPayment = 0;
//   let principalPayment = 0;
//   let dates = [];
  
//   let newDate = new Date(startDate);
//   const interestPerPeriod = interestRate / (unit === "week" || unit === "semanal" || unit === "Semanal" || unit === "SEMANAL" || unit === 7 ? 52 : unit === "bi-weekly" || unit === "15 days" || unit === "quincenal" || unit === "Quincenal" || unit === "QUINCENAL" || unit === 15 ? 26 : 12);

//   for (let i = 0; i < repetition; i++) {
//     interestPayment = balance * interestPerPeriod;
//     totalInterest += interestPayment;
//     principalPayment = (principal / repetition) - interestPayment;  
//     totalPrincipal += principalPayment;
//     balance -= principalPayment;  

//     payments.push({
//       paymentNumber: i + 1,
//       interestPayment: interestPayment,
//       principalPayment: principalPayment,
//       balance: balance,
//       isPaid: false
//     });

//     if (i > 0) {
//       newDate = new Date(dates[i - 1]);
//     }

//     if (unit === "week" || unit === "semanal" || unit === "Semanal" || unit === "SEMANAL" || unit === 7) {
//       newDate.setDate(newDate.getDate() + 7);
//     } else if (unit === "15 days" || unit === "quincenal" || unit === "Quincenal" || unit === "QUINCENAL" || unit === 15) {
//       newDate.setDate(newDate.getDate() + 15);
//     } else if (unit === "month" || unit === "mensual" || unit === "Mensual" || unit === "MENSUAL" || unit === 30 || unit === 31) {
//       newDate.setMonth(newDate.getMonth() + 1);
//     }

//     let year = newDate.getFullYear();
//     let month = newDate.getMonth() + 1;
//     let day = newDate.getDate();

//     dates.push(
//       year + "/" + (month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day)
//     );
//   }
//       console.log('this is the full total',totalInterest + totalPrincipal)
//     let fullTotal =totalInterest + totalPrincipal
//     // setAllCuotas({
//     //   payments: payments,
//     //   totalInterest: totalInterest,
//     //   totalPrincipal: totalPrincipal,
//     //   total:fullTotal,
//     //   dates: dates
//     // });

//   setAllCuotas({
//     payments: payments,
//     totalInterest: totalInterest,
//     totalPrincipal: totalPrincipal,
//     total: principal + totalInterest,
//     dates: dates
//   });
//   console.log("total", allCuotas.total)
//   console.log({
//     payments: payments,
//     totalInterest: totalInterest,
//     totalPrincipal: totalPrincipal,
//     total: principal + totalInterest,
//     dates: dates
//   });
// };








//! modify this function so that  it give you a 60% pay to interest and a 40% payment and that the payments are a combination of  payment and interest
// const calculateLoanAndDates = (principal, interestRate, term, repetition, startDate, unit) => {
//     let payments = [];
//     let totalInterest = 0;
//     let totalPrincipal = 0;
//     let totalPrincipalPayment = 0
//     let balance = principal;
//     let interestPayment = 0;
//     let principalPayment = 0;
//     let dates = [];
    
//     let newDate = new Date(startDate);
//     const constantPayment = principal / term;
  
//     for (let i = 0; i < repetition; i++) {

//         if (unit === "week" || unit === "semanal" || unit === "Semanal" || unit === "SEMANAL" || unit === 7) {
//                    let weeklyInterestRate = interestRate / 52;
//           let numberOfWeeks = term * 52;
//             interestPayment = (principal * weeklyInterestRate)/ (1 - Math.pow(1 + weeklyInterestRate, - numberOfWeeks))
//             interestPayment = balance * (interestRate / 100 / 1.75);
//           } else if (unit === "15 days" || unit === "quincenal" || unit === "Quincenal" || unit === "QUINCENAL" || unit === 15) {
//             interestPayment = balance * (interestRate / 100 / 5.5);
//           } else if (unit === "month" || unit === "mensual" || unit === "Mensual" || unit === "MENSUAL" || unit === 30 || unit === 31) {
//             interestPayment = balance * (interestRate / 100 / 3.3329 );//1.375
//           }
//       // interestPayment = balance * (interestRate / 100 )*(repetition/12);
//       totalInterest += interestPayment;
//       principalPayment = constantPayment - interestPayment;  
//       console.log("1 this is the constant payment  ",constantPayment)
//       console.log("2 this is the INTEREST payment  ",interestPayment)
//       console.log("3 in line 142 my guy ",principalPayment);
//     totalPrincipalPayment += principalPayment
//       totalPrincipal += constantPayment;
//       balance = balance - constantPayment;  
//       payments.push({
//         paymentNumber: i + 1,
//         interestPayment: interestPayment,
//         capitalPayment:principalPayment,
//         principalPayment: constantPayment,
//         balance: balance,
//         isPaid: false
//       });
  
//       if (i > 0) {
//         newDate = new Date(dates[i - 1]);
//       }
  
//       if (unit === "week" || unit === "semanal" || unit === "Semanal" || unit === "SEMANAL" || unit === 7) {
//         newDate.setDate(newDate.getDate() + 7);
//       } else if (unit === "15 days" || unit === "quincenal" || unit === "Quincenal" || unit === "QUINCENAL" || unit === 15) {
//         newDate.setDate(newDate.getDate() + 15);
//       } else if (unit === "month" || unit === "mensual" || unit === "Mensual" || unit === "MENSUAL" || unit === 30 || unit === 31) {
//         newDate.setMonth(newDate.getMonth() + 1);
//       }
  
//       let year = newDate.getFullYear();
//       let month = newDate.getMonth() + 1;
//       let day = newDate.getDate();
  
//       dates.push(
//         year + "/" + (month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day)
//       );
//     }
//     console.log('this is the full total',totalInterest + totalPrincipal)
//     let fullTotal =totalInterest + totalPrincipal
//     setAllCuotas({
//       payments: payments,
//       totalInterest: totalInterest,
//       totalPrincipal: totalPrincipal,
//       total:fullTotal,
//       dates: dates
//     });
//     console.log({
//       payments: payments,
//       totalInterest: totalInterest,
//       totalPrincipal: totalPrincipal,
//       total:fullTotal,
//       dates: dates
//     });
//   };

















    // jsdlkfjslkdjflksdjflksdjlfkjsdlkfjsdlkfjslkdfjlsdkfjklds

    {/* <div className="alert alert-warning alert-dismissible fade show" role="alert">
<strong>Holy guacamole!</strong> You should check in on some of those fields below.
<button type="button" className="close" data-dismiss="alert" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div> 
                  also create another function  that allow you to input a different amount that is less or == to the amount that particular payment(cuota) is  then  dubstracted (the current payment -(minus) the amount inputed)    <span className='text-primary' > fine a way to store some of the info in arrays  OR/ make a add new loan  api and this loan needs to be attach to only on particular user (one to many)  and fine out  a way to prevent  one a cliente of having more than 1 loan at the time iF you can (I KNOW YOU CAN BIG DADDY)    </span>  </p>

*/}







                          // <p className='text-danger'>interval's  broooooooo</p>
                    


                    // <div>
                    // <p className='text-danger'>idea came into my head to have a flag(boolean) tha sets the a loan to true(or false when tey are done because the loan wont be true or false because i was never created) when is active but set to false when the las 
                    // payment(cuota) is payed  and while this boolean is true trow a erro message  that does not alow one(OR SAYS THE WHILE THEY HAVE AT LEAST ONE CUOTA UN PAYED IN THEIR LAST(CURRENT LOAN) THEY ARE NOT ALOW TO HAVE MORE LOANS )    ALSO FIGRE OUT THE BLACK LISTING  WITH A BOOLEAN()/ ALSO TALK WITH THE PEOPLE ABOUT A FEATURE THAT IF THEY ARE IN A GREEN LIST( ORE TRUSTED LIST ) THEY ARE ALOW TO HAVE ONE FEATURE (LIKE PAY LEST MONEY  OR SOMETHING LIKE THAT )   </p>
                    // </div>
                  