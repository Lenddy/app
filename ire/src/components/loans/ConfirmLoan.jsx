import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
// import AddLoan from "./AddLoan";
import LoanInformation from "./LoanInformation";

const ConfirmLoan = (props) => {
	const { formInfo, id, date, Amount, int, cuotas, type } = props;
	const navigate = useNavigate();
	// const [loan,setLoan] = useState({})
	const [client, setClient] = useState({});
	const [show, setShow] = useState(false);
	const [allCuotas, setAllCuotas] = useState({});
	const [formInfoErr, setFormInfoErr] = useState({});
	const [info, setInfo] = useState({});
	// console.log("this is the form info",formInfo)
	//     console.log("this are all the cuotas ", (11 / 100) * 10000)
	// console.log("is here",info)
	// formInfo.loanAmount,formInfo.interest,formInfo.cuotasNumber,formInfo.cuotasNumber,formInfo.dateAdded,formInfo.timeType)
	useEffect(() => {
		setInfo({
			...formInfo,
			...calculateLoanAndDates(Amount, int, cuotas, cuotas, date, type),
			...allCuotas,
		});
		oneClient(id);
		// console.log("this is the info inside of the use effect ",info)
	}, [Amount, int, cuotas, cuotas, date, type]);
	// console.log('this is the fuuuuuuuuuuucking info that is wrong some fucking how',info)

	const oneClient = (id) => {
		axios
			.get(`http://localhost:8000/api/People/${id}`)
			.then((res) => {
				// console.log(res.data.results)
				setClient(res.data.results);
			})
			.catch((err) => {
				console.log("error", err);
			});
	};

	const submitHandler = () => {
		axios
			.post("http://localhost:8000/api/loan/new", info)
			.then((res) => {
				// console.log(res)
				if (res.data.err?.errors) {
					setFormInfoErr(res.data.err.errors);
				} else {
					setFormInfoErr();
					navigate("/Prestamos"); //change this to
				}
			})
			.catch((err) => {
				console.log("there was an error", err);
			});
	};
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
	const calculateLoanAndDates = (
		principal,
		interestRate,
		term,
		repetition,
		startDate,
		unit
	) => {
		let payments = [];
		let totalInterest = 0;
		let totalPrincipal = 0;
		let totalPrincipalPayment = 0;
		let balance = principal;
		let interestPayment = 0;
		let principalPayment = 0;
		let totalCapital = 0;
		let dates = [];

		let newDate = new Date(startDate);
		// const constantPayment = principal / term ;
		let constantPayment =
			(principal *
				(interestRate / 100 / 12) *
				Math.pow(1 + interestRate / 100 / 12, term)) /
			(Math.pow(1 + interestRate / 100 / 12, term) - 1);
		console.log("this is the constant payment", constantPayment);
		for (let i = 0; i < repetition; i++) {
			if (i > 0) {
				newDate = new Date(dates[i - 1]);
			}
			if (
				unit === "week" ||
				unit === "semanal" ||
				unit === "Semanal" ||
				unit === "SEMANAL" ||
				unit === 7
			) {
				let weeklyInterestRate = interestRate / 52;
				let numberOfWeeks = term * 52;

				interestPayment =
					(balance * weeklyInterestRate) /
					(1 - Math.pow(1 + weeklyInterestRate, -numberOfWeeks));
				newDate.setDate(newDate.getDate() + 7);
				// interestPayment = balance * (interestRate / 100 / 0.5 )
			} else if (
				unit == "bi-weekly" ||
				unit === "15 days" ||
				unit === "quincenal" ||
				unit === "Quincenal" ||
				unit === "QUINCENAL" ||
				unit === 15
			) {
				interestPayment = balance * (interestRate / 100 / 5.5);
				newDate.setDate(newDate.getDate() + 15);
			} else if (
				unit === "month" ||
				unit === "mensual" ||
				unit === "Mensual" ||
				unit === "MENSUAL" ||
				unit === 30 ||
				unit === 31
			) {
				interestPayment = balance * (interestRate / 100 / 1.375); //1.375
				newDate.setMonth(newDate.getMonth() + 1);
			}

			// interestPayment = balance * (interestRate / 100 )*(repetition/12);
			// interestPayment = balance * (interestRate / 100 /  )
			totalInterest += interestPayment;
			principalPayment = constantPayment - interestPayment;
			totalPrincipalPayment += principalPayment;
			totalPrincipal += constantPayment;
			totalCapital += principalPayment;
			balance = balance - constantPayment;
			let year = newDate.getFullYear();
			let month = newDate.getMonth() + 1;
			let day = newDate.getDate();
			dates.push(
				year +
					"/" +
					(month < 10 ? "0" + month : month) +
					"/" +
					(day < 10 ? "0" + day : day)
			);
			let paymentDate = dates[i];

			payments.push({
				_id: i + 1,
				interestPayment: interestPayment,
				capitalPayment: principalPayment,
				principalPayment: constantPayment,
				paymentDate: paymentDate,
				balance: balance,
				isPaid: false,
				latenessPayment: 0,
				daysLate: 0,
			});
		}
		console.log("this is the total capital payment", totalCapital);
		let fullTotal = totalPrincipal; //*this wa the interes + the total principle
		setAllCuotas({
			interest: interestRate,
			payments: payments,
			totalInterest: totalInterest,
			totalPrincipal: totalPrincipal,
			total: fullTotal,
			totalPaid: 0,
			totalCapital: totalCapital,
			dates: dates,
			totalLatenessPayment: 0,
			numberLateness: 0,
		});
		console.log({
			payments: payments,
			totalInterest: totalInterest,
			totalPrincipal: totalPrincipal,
			total: fullTotal,
			totalCapital: totalCapital,
			dates: dates,
		});
	};

	return (
		<div>
			{formInfo.client_id !== undefined &&
			formInfo.loanAmount !== undefined &&
			formInfo.dateAdded !== undefined &&
			formInfo.interest !== undefined &&
			formInfo.timeType !== undefined &&
			formInfo.cuotasNumber !== undefined ? (
				<Button
					className=" mt-3"
					onClick={() => {
						setShow(true);
						oneClient(formInfo.client_id);
						console.log(
							calculateLoanAndDates(
								formInfo.loanAmount,
								formInfo.interest,
								formInfo.cuotasNumber,
								formInfo.cuotasNumber,
								formInfo.dateAdded,
								formInfo.timeType
							)
						);
					}}
				>
					calcular cuotas
				</Button>
			) : null}

			<Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Deudor/ra : {client.fullName}</Modal.Title>
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
					<Button
						variant="success text-center"
						onClick={submitHandler}
					>
						confirmar
					</Button>
					<Button
						variant="danger text-center"
						onClick={() => setShow(false)}
					>
						cancelar
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default ConfirmLoan;
