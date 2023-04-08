import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import OneLoan from "./loans/OneLoan";
import ReactToPrint from "react-to-print";
import moment from "moment";

const Print = (props) => {
	const { info, payment_id, totalPaid } = props;
	const navigate = useNavigate();
	const [show, setShow] = useState(true);
	const [payment_info, setPayment_info] = useState({});
	// setShow(active)
	console.log("get this info brooooo", info);
	const length = info?.loan?.payments?.length;
	console.log("gett this info bruuuuuu", info?.loan.total);
	console.log("this is the total paid", totalPaid);

	const ZeroPaddedInput = (number) => {
		let newNumber = "";
		if (number < 10) {
			newNumber = `00${number}`;
		} else {
			newNumber = `0${number}`;
		}
		return newNumber;
	};
	useEffect(() => {
		setTimeout(() => {
			console.log("print");
			window.print();
		}, 10);

		setTimeout(() => {
			navigate("/Dashboard");
		}, 10);
	}, []);

	return (
		<div>
			<Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
				<Modal.Body>
					<h1 style={{ fontSize: 50 }} className="align-self-center">
						{" "}
						<b>INVERSIONES RUBEN & ESTÉVEZ</b>
					</h1>
					<p>(809)579-8833 </p>
					<p>calle Sanchez #110 plaza Cuple Dajabon , Rep. Dom.</p>
					<p style={{ textTransform: "uppercase" }}>
						<u>recibo de ingreso</u>
					</p>
					<div>
						<p>
							No. préstamo :{" "}
							{ZeroPaddedInput(info?.loan?.loanIdNumber)}
						</p>
						<p>
							fecha a pagar: {payment_info?.allInfo?.paymentDate}
						</p>
						<p>
							fecha pagado :
							{moment().format("Y/MM/DD, h:mm:ss a")}
						</p>
					</div>
					<div>
						make them next info into <tr>tds</tr>
						<div>
							<p>Cliente: {info?.loan?.client_id?.fullName}</p>
							<p>
								{info?.loan?.client_id?.idType}:{" "}
								{info?.loan?.client_id?.idNum}
							</p>
							<p>{info?.loan?.client_id?.pNumber}</p>
							<p>{info?.loan?.client_id?.address}</p>
							<p>
								Concepto: pago de préstamo #{" "}
								{ZeroPaddedInput(info?.loan?.loanIdNumber)}
							</p>
							{/*make a loan id to put here please maybe on the loans db */}
							<p>
								Cuotas: <b>{ZeroPaddedInput(payment_id)}</b> de{" "}
								<b>{ZeroPaddedInput(length)}</b>
							</p>
							<p>retraso: lateness days</p>
							{/* use moment to compare the late nes days  and show the amount of time that a payment is late   */}
							{/* make an if statement that if there is a lateness fee to show the amount of the late ness here  */}
							{/* <p>pago a capital: {payment_info?.allInfo?.capitalPayment} </p> */}
							<p>
								mora:{info?.loanValues?.totalLatenessPayment}{" "}
							</p>
							<p>
								pago a interest:{" "}
								{info?.loanValues?.totalInterest}{" "}
							</p>
							<p>
								pago a capital: {info?.loanValues?.totalCapital}{" "}
							</p>
							<p>
								monto pagado: {info?.loanValues?.totalPayment}{" "}
							</p>
							<hr className="dashed-2" />
							<p>balance pendiente: {totalPaid?.balance}</p>
							<div> </div>
							<div>
								<div>
									<div>
										<hr />
										<p>firma</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default Print;
