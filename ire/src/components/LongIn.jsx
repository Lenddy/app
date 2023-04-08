import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
// import io from "socket.io-client";
import {
	Typography,
	Button,
	TextField,
	InputAdornment,
	MenuItem,
	Stack,
	ToggleButton,
	IconButton,
	Box,
} from "@mui/material";
// ,  Checkbox, FormControlLabel, InputAdornment, IconButton
import LoginIcon from "@mui/icons-material/Login";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
const LongIn = () => {
	const [formInfo, setFormInfo] = useState({});
	const [usuarios, setUsuarios] = useState([]);
	const [formErr, setFormErr] = useState({});
	const [show, setShow] = useState(false);
	const [loan, setLoan] = useState([]);
	const navigate = useNavigate();
	// const [socket] = useState(() => io(":8000")); //new user socket
	// useEffect(() => {
	// 	socket.on("new_connection", (data) => {
	// 		console.log("new connection", data);
	// 	});
	// }, []);

	const changeHandler = (e) => {
		setFormInfo({
			...formInfo,
			[e.target.name]: e.target.value,
		});
	};

	const handleToggleShow = () => {
		setShow(!show);
	};

	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/User`, { withCredentials: true })
			.then((res) => {
				// console.log(res);
				setUsuarios(res.data.results);
			});
	}, []);

	const submitHandler = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8000/api/User/Login", formInfo, {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res);
				if (res.data?.err) {
					setFormErr(res.data.err);
				} else {
					setFormErr(null);
					navigate("/DashBoard");
				}
			})
			.catch((err) => console.log(err));
	};

	const lateness = async (item) => {
		if (!item) {
			console.log("there is no loan here");
			return;
		}
		//getting todays date
		const today = moment();

		let paymentDate;
		let paymentId;
		let loanId; //* have loan id
		let latenessPayment;
		let daysLate;
		let totalLatenessPayment;
		let numberLateness;
		let currentLatenessPayment;
		let updatedPrincipalPayment;

		for (let i = 0; i < item.length; i++) {
			loanId = item[i]._id; //* have loan id
			numberLateness = item[i].numberLateness; //* total of late cuotas
			totalLatenessPayment = 0; //
			for (let n = 0; n < item[i].payments.length; n++) {
				latenessPayment = 0;
				daysLate = 0;
				currentLatenessPayment = 0;
				updatedPrincipalPayment = item[i].payments[n].principalPayment;
				paymentId = item[i].payments[n]._id; //* got payment id
				//!log console.log("this is paymentId", paymentId);

				paymentDate = moment(
					item[i].payments[n].paymentDate,
					"YYYY/MM/DD"
				);
				//!log console.log("this is the paymentDate", paymentDate);

				if (paymentDate.isBefore(today)) {
					const duration = moment.duration(today.diff(paymentDate));
					//!log console.log("this is duration", duration);
					let daysDifference = Math.abs(duration.asDays());
					daysLate = daysDifference;

					//dont know if you still want that
					// Add one day to payment date for each day late
					// paymentDate.add(daysDifference, "days");
					// console.log(
					// 	"this is paymentDate after adding days",
					// 	paymentDate
					// );
					//this is fix compare the days diference with the late nes days in the data ba if the days are the same run the code below else do no nothin or breate aout of the curent iteration maybe use continue

					if (
						Math.floor(daysDifference) <=
						item[i].payments[n].daysLate
					) {
						continue;
					}

					if (daysDifference >= 5) {
						numberLateness += 1;
						//!log console.log("this is daysLate", daysLate);
						for (let z = Math.floor(daysDifference); z >= 5; z--) {
							currentLatenessPayment =
								item[i].payments[n].principalPayment *
								(item[i].latenessInterest / 100);
							latenessPayment += currentLatenessPayment;
							updatedPrincipalPayment += currentLatenessPayment;
						}

						// Update principal payment with lateness payment
						//!log console.log("this is updatedPrincipalPayment",updatedPrincipalPayment);

						totalLatenessPayment += latenessPayment;

						// Update lateness payment for the loan payment
						try {
							//!log  console.log(`Updating lateness payment for loan ${loanId} with payment ID ${paymentId}: lateness payment is ${latenessPayment}, days llate is ${daysLate}, total lateness payment is ${totalLatenessPayment}, number of days late is ${daysDifference}`);

							const response = await axios.put(
								`http://localhost:8000/api/Loan/update/Lateness/${loanId}/${paymentId}/${latenessPayment}/${updatedPrincipalPayment}/${daysLate}/${totalLatenessPayment}/${numberLateness}`
							);

							//!log console.log(response.data);
						} catch (error) {
							console.log(error.response.data);
						}
					}
				}
			}
		}
	};

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/Loan")
			.then((res) => {
				// console.log("this is the result of the loas", res);
				setLoan(res.data.results);
			})
			.catch((err) => {
				console.log("error:", err);
			});
	}, []);

	//you might want to use a useEffect to get the loan and then run the first time only
	lateness(loan);

	return (
		<div>
			<Typography variant="h3">Iniciar sesión</Typography>

			<form className="form-group " onSubmit={submitHandler}>
				<Box>
					{/*whiteSpace={"500px"} */}
					<Stack spacing={2} direction="column">
						<TextField
							label="Seleccionar Usuario"
							name="nombreDeUsuario"
							onChange={changeHandler}
							defaultValue={""}
							select
							required
						>
							{usuarios.map((u) => {
								return (
									<MenuItem
										value={u.nombreDeUsuario}
										key={u._id}
									>
										{u.nombreDeUsuario}
									</MenuItem>
								);
							})}
						</TextField>

						<TextField
							label="Contraseña"
							type={show ? "text" : "password"}
							name="contraseña"
							onChange={changeHandler}
							required
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton onClick={handleToggleShow}>
											{show ? (
												<VisibilityIcon color="primary" />
											) : (
												<VisibilityOffIcon />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>

						{formErr.nombreDeUsuario ? (
							<p className="text-danger">
								{formErr.nombreDeUsuario?.msg}
							</p>
						) : formErr.contraseña ? (
							<p className="text-danger">
								{formErr.contraseña?.msg}
							</p>
						) : null}

						<Button
							variant="contained"
							endIcon={<LoginIcon />}
							color="success"
							size="large"
							onClick={submitHandler}
						>
							iniciar session
						</Button>
					</Stack>
				</Box>
			</form>
		</div>
	);
};

export default LongIn;

/* for the loans you need 

before you create a loan fine a way that the workers can preview
so they can tell the clientes the total amount that they need to pay
the interés they will need to pay back
the days that they need to pay  and they amount that they need to pay that day 


adn add places where they need to sign both the client and then worker


1 id for the loan
    fine a way to make the id     maybe set a state that will go up and attach the current number  to one specific loan 

2 the name of the client

3 date of the loan 
    1 from this you need to make function that will alow the workers to update loans 
    2 see the  total amount that the person needs to pay 
    3 see  the amount that they need to pay the day that they are suppose to 
    4 if they dont pay they will hav to pay a lateness  fee and that late ness comes 5 days after the current cuota is not payed
    5 a way that the clients can add bonuses to the current cuota instead of the full cuota 
    6 a history of payment and that has the day they pay ,the amount and the cuota/s number
        1 this must have the amount of total full cuotas that are payed
        2 total amount that has been payed at the time
        3 total capital that has been payed 
        4 and the total capital that has been payed

4 amount of the loan

5 inters rate

6 then amount of cuotas

7 repayment period 
    1 monthly
    2 every 15 days
    3 weekly
*/
