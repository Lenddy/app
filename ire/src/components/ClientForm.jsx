import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
	Typography,
	Button,
	TextField,
	InputAdornment,
	Stack,
	IconButton,
	Box,
	MenuItem,
} from "@mui/material";

// import { LocalizationProvider, DatePicker } from "@mui/lab";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";

const ClientForm = () => {
	const navigate = useNavigate();
	const [info, setInfo] = useState({});
	const [formInfoErr, setFormInfoErr] = useState({});

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/User/loggedUser", {
				withCredentials: true,
			})
			.then((res) => {})
			.catch((err) => {
				console.log("error", err);
				navigate("/");
			});
	}, []);

	const logout = () => {
		axios
			.get("http://localhost:8000/api/User/logout", {
				withCredentials: true,
			})
			.then((res) => {
				navigate("/");
			})
			.catch((err) => {
				console.log("error", err);
			});
	};

	const submitHandler = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8000/api/People/new", info)
			.then((res) => {
				console.log(res);
				if (res.data.err?.errors) {
					setFormInfoErr(res.data.err.errors);
				} else {
					setFormInfoErr();
					navigate("/DashBoard"); //change this to
				}
			})
			.catch((err) => {
				console.log("there was an error", err);
			});
	};

	const changeHandler = (e) => {
		setInfo({
			...info,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div>
			<Link to="/Dashboard">
				<button className=" btn btn-secondary text-white">
					todos los clientes
				</button>
			</Link>

			<form className="from-group" onSubmit={submitHandler}>
				<Stack spacing={2} direction="column">
					<TextField
						label="Primer Nombre"
						type="text"
						name="name"
						className="form-control"
						onChange={changeHandler}
						required
						InputLabelProps={{
							shrink: Boolean(info.name),
							position: "top",
						}}
					/>
					{info.name?.length > 0 && info.name?.length < 2 ? (
						<p style={{ color: "red" }}>
							nombre debe de ser por lo menos 2 letras
						</p>
					) : formInfoErr.name ? (
						<p style={{ color: "red" }}>
							{formInfoErr.name.message}
						</p>
					) : null}

					<TextField
						label="Segundo Nombre"
						type="text"
						name="midName"
						className="form-control"
						onChange={changeHandler}
						required
						InputLabelProps={{
							shrink: Boolean(info.name),
							position: "top",
						}}
					/>
					{info.midName?.length > 0 && info.midName?.length < 2 ? (
						<p style={{ color: "red" }}>
							nombre debe de ser por lo menos 2 letras
						</p>
					) : formInfoErr.midName ? (
						<p style={{ color: "red" }}>
							{formInfoErr.midName.message}
						</p>
					) : null}
					<TextField
						label="Apellido"
						type="text"
						name="Lname"
						className="form-control"
						onChange={changeHandler}
						required
						InputLabelProps={{
							shrink: Boolean(info.name),
							position: "top",
						}}
					/>
					{info.Lname?.length > 0 && info.Lname?.length < 2 ? (
						<p style={{ color: "red" }}>
							apellido debe de tener por lo menos 2 letras
						</p>
					) : formInfoErr.Lname ? (
						<p style={{ color: "red" }}>
							{formInfoErr.Lname.message}
						</p>
					) : null}
					<TextField
						label="segundo Apellido (opcional)"
						type="text"
						name="secondLname"
						className="form-control"
						onChange={changeHandler}
						InputLabelProps={{
							shrink: Boolean(info.name),
							position: "top",
						}}
					/>
					{info.secondLname?.length > 0 &&
					info.secondLname?.length < 2 ? (
						<p style={{ color: "red" }}>
							apellido debe de tener por lo menos 2 letras
						</p>
					) : formInfoErr.secondLname ? (
						<p style={{ color: "red" }}>
							{formInfoErr.secondLname.message}
						</p>
					) : null}
					<TextField
						label="Apodo (opcional)"
						type="text"
						name="nickname"
						className="form-control"
						onChange={changeHandler}
						InputLabelProps={{
							shrink: Boolean(info.name),
							position: "top",
						}}
					/>
					{info.nickname?.length > 0 && info.nickname?.length < 2 ? (
						<p style={{ color: "red" }}>
							Apodo debe de tener por lo menos 2 letras
						</p>
					) : formInfoErr.nickname ? (
						<p style={{ color: "red" }}>
							{formInfoErr.nickname.message}
						</p>
					) : null}

					<TextField
						label="Fecha De Nacimiento"
						type="date"
						name="dob"
						className="form-control"
						onChange={changeHandler}
						required
						InputLabelProps={{
							shrink: Boolean(info.dob),
							position: "top",
						}}
					/>
					{/* info.dob?.length > 0 && info.dob?.length < 2?
                    <p style={{color:"red"}}  >fecha de nacimiento no puede quedar en blanco</p>: */}
					{formInfoErr.dob ? (
						<p style={{ color: "red" }}>
							{formInfoErr.dob.message}
						</p>
					) : null}
					<TextField
						label="tipo de identificación"
						name="idType"
						onChange={changeHandler}
						defaultValue={""}
						select
						required
						fullWidth={true}
					>
						<MenuItem value="Cédula">Cédula</MenuItem>
						<MenuItem value="Pasaporte">Pasaporte</MenuItem>
					</TextField>
					{/* info.idType?.length > 0 && info.idType?.length < 2?
                    <p style={{color:"red"}}  > </p>: */}
					{formInfoErr.idType ? (
						<p style={{ color: "red" }}>
							{formInfoErr.idType.message}
						</p>
					) : null}
					<TextField
						label="No.Identificación"
						type="text"
						name="idNum"
						className="form-control"
						onChange={changeHandler}
						required
					/>
					{info.idNum?.length > 0 && info.idNum?.length < 6 ? (
						<p style={{ color: "red" }}>
							numero de identificación debe de tener 6 o mas
							letras o números
						</p>
					) : formInfoErr.idNum ? (
						<p style={{ color: "red" }}>
							{formInfoErr.idNum.message}
						</p>
					) : null}
					<TextField
						label="RNC(opcional)"
						type="text"
						name="rnc"
						className="form-control"
						onChange={changeHandler}
					/>
					{info.rnc?.length > 0 && info.rnc?.length < 9 ? (
						<p style={{ color: "red" }}>
							RNC debe de tener por lo menos 9 letras o numeros
						</p>
					) : formInfoErr.rnc ? (
						<p style={{ color: "red" }}>
							{formInfoErr.rnc.message}
						</p>
					) : null}
					<TextField
						label="Numero telefónico personal"
						type="text"
						name="pNumber"
						className="form-control"
						onChange={changeHandler}
						required
					/>
					{info.pNumber?.length > 0 && info.pNumber?.length < 10 ? (
						<p style={{ color: "red" }}>
							numero de teléfono debe de tener al menos 10 números
						</p>
					) : formInfoErr.pNumber ? (
						<p style={{ color: "red" }}>
							{formInfoErr.pNumber.message}
						</p>
					) : null}
					<TextField
						label="Dirección Personal"
						type="text"
						name="address"
						className="form-control"
						onChange={changeHandler}
						required
					/>
					{info.address?.length > 0 && info.address?.length < 5 ? (
						<p style={{ color: "red" }}>
							dirección Personal debe de tener por lo menos 5
							letras o números
						</p>
					) : formInfoErr.address ? (
						<p style={{ color: "red" }}>
							{formInfoErr.address.message}
						</p>
					) : null}
					<TextField
						label="lugar de trabajo"
						type="text"
						name="workPlace"
						className="form-control"
						onChange={changeHandler}
						required
					/>
					{info.workPlace?.length > 0 &&
					info.workPlace?.length < 2 ? (
						<p style={{ color: "red" }}>
							lugar de trabajo debe de tener por lo menos 2 letras
							o números
						</p>
					) : formInfoErr.workPlace ? (
						<p style={{ color: "red" }}>
							{formInfoErr.workPlace.message}
						</p>
					) : null}
					<TextField
						label="ocupación"
						type="text"
						name="occupation"
						className="form-control"
						onChange={changeHandler}
						required
					/>
					<TextField
						label="Ingresos"
						type="text"
						name="income"
						className="form-control"
						onChange={changeHandler}
						step={0.01}
						required
					/>
					{formInfoErr.income ? (
						<p style={{ color: "red" }}>
							{formInfoErr.income.message}
						</p>
					) : null}
					<TextField
						label="Otros Ingresos"
						type="text"
						name="otherIncome"
						className="form-control"
						onChange={changeHandler}
						required
						step={0.01}
					/>
					{formInfoErr.otherIncome ? (
						<p style={{ color: "red" }}>
							{formInfoErr.otherIncome.message}
						</p>
					) : null}
					<TextField
						label="Numero telefónico De Trabajo"
						type="text"
						name="workPNumber"
						className="form-control"
						onChange={changeHandler}
						required
					/>
					<TextField
						label="Tiempo Laborando"
						type="text"
						name="workingYears"
						className="form-control"
						onChange={changeHandler}
						required
					/>
					{info.workingYears?.length > 0 &&
					info.workingYears?.length < 2 ? (
						<p style={{ color: "red" }}>
							tiempo laborando debe de tener por lo menos 2 letras
							o números
						</p>
					) : formInfoErr.workingYears ? (
						<p style={{ color: "red" }}>
							{formInfoErr.workingYears.message}
						</p>
					) : null}
					<TextField
						label="Dirección de Trabajo"
						type="text"
						name="workAddress"
						className="form-control"
						onChange={changeHandler}
						required
					/>
					{info.workAddress?.length > 0 &&
					info.workAddress?.length < 2 ? (
						<p style={{ color: "red" }}>
							Direction de trabajo debe de tener por lo menos 2
							letras o números
						</p>
					) : formInfoErr.workAddress ? (
						<p style={{ color: "red" }}>
							{formInfoErr.workAddress.message}
						</p>
					) : null}
				</Stack>
				<button className="btn btn-success"> agregar cliente </button>
			</form>
		</div>
	);
};

export default ClientForm;
