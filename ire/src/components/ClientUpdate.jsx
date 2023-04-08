import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import ConfirmDelete from "./ConfirmDelete";
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

const ClientUpdate = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [info, setInfo] = useState({});
	const [formInfoErr, setFormInfoErr] = useState({});
	const [notFound, setNotFound] = useState(false);
	console.log(info);

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

	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/People/${id}`)
			.then((res) => {
				console.log(res);
				setInfo(res.data.results);
			})
			.catch((err) => console.log("there is an error", err));
	}, []);

	const changeHandler = (e) => {
		setInfo({
			...info,
			[e.target.name]: e.target.value,
		});
	};

	const submitHandler = (e) => {
		e.preventDefault();
		axios
			.put(`http://localhost:8000/api/People/update/${id}`, info, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.data.err?.errors) {
					setFormInfoErr(res.data.err.errors);
				} else {
					// setFormInfoErr()
					navigate("/DashBoard"); //change this to
				}
			})
			.catch((err) => {
				console.log("there was an error", err);
			});
	};

	return (
		<div>
			<Link to="/Dashboard">
				<button className=" btn btn-secondary text-white">
					todos los clientes
				</button>
			</Link>
			<ConfirmDelete id={info._id} name={info.name} />
			{notFound ? (
				<h1 className="text-danger">
					hubo un error encontrando a este cliente o el cliente no
					existe regrese hacia la pagina donde están todos los
					clientes y inténtelo de nuevo
				</h1>
			) : (
				<form className="from-group" onSubmit={submitHandler}>
					<Stack spacing={2} direction="column">
						<TextField
							label="Primer Nombre"
							type="text"
							name="name"
							onChange={changeHandler}
							Value={info.name}
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
							value={info.midName}
							required
							InputLabelProps={{
								shrink: Boolean(info.midName),
								position: "top",
							}}
						/>
						{info.midName?.length > 0 &&
						info.midName?.length < 2 ? (
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
							value={info.Lname}
							required
							InputLabelProps={{
								shrink: Boolean(info.Lname),
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
							value={info.secondLname}
							InputLabelProps={{
								shrink: Boolean(info.secondLname),
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
							value={info.nickname}
							onChange={changeHandler}
							InputLabelProps={{
								shrink: Boolean(info.nickname),
								position: "top",
							}}
						/>
						{info.nickname?.length > 0 &&
						info.nickname?.length < 2 ? (
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
							value={moment(info.dob).format("YYYY-MM-DD")}
							required
							InputLabelProps={{
								shrink: Boolean(
									moment(info.dob).format("YYYY-MM-DD")
								),
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
							select
							required
							fullWidth={true}
							defaultValue={info.idType}
							InputLabelProps={{
								shrink: Boolean(info.idType),
								position: "top",
							}}
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
							value={info.idNum}
							required
							InputLabelProps={{
								shrink: Boolean(info.idNum),
								position: "top",
							}}
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
							value={info.rnc}
							InputLabelProps={{
								shrink: Boolean(info.rnc),
								position: "top",
							}}
						/>
						{info.rnc?.length > 0 && info.rnc?.length < 9 ? (
							<p style={{ color: "red" }}>
								RNC debe de tener por lo menos 9 letras o
								numeros
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
							value={info.pNumber}
							required
							InputLabelProps={{
								shrink: Boolean(info.pNumber),
								position: "top",
							}}
						/>
						{info.pNumber?.length > 0 &&
						info.pNumber?.length < 10 ? (
							<p style={{ color: "red" }}>
								numero de teléfono debe de tener al menos 10
								números
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
							value={info.address}
							required
							InputLabelProps={{
								shrink: Boolean(info.address),
								position: "top",
							}}
						/>
						{info.address?.length > 0 &&
						info.address?.length < 5 ? (
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
							value={info.workPlace}
							required
							InputLabelProps={{
								shrink: Boolean(info.workPlace),
								position: "top",
							}}
						/>
						{info.workPlace?.length > 0 &&
						info.workPlace?.length < 2 ? (
							<p style={{ color: "red" }}>
								lugar de trabajo debe de tener por lo menos 2
								letras o números
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
							value={info.occupation}
							required
							InputLabelProps={{
								shrink: Boolean(info.occupation),
								position: "top",
							}}
						/>
						<TextField
							label="Ingresos"
							type="text"
							name="income"
							className="form-control"
							onChange={changeHandler}
							step={0.01}
							value={info.income}
							required
							InputLabelProps={{
								shrink: Boolean(info.income),
								position: "top",
							}}
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
							value={info.otherIncome}
							required
							step={0.01}
							InputLabelProps={{
								shrink: Boolean(info.otherIncome),
								position: "top",
							}}
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
							value={info.workPNumber}
							required
							InputLabelProps={{
								shrink: Boolean(info.workPNumber),
								position: "top",
							}}
						/>
						<TextField
							label="Tiempo Laborando"
							type="text"
							name="workingYears"
							className="form-control"
							onChange={changeHandler}
							value={info.workingYears}
							required
							InputLabelProps={{
								shrink: Boolean(info.workingYears),
								position: "top",
							}}
						/>
						{info.workingYears?.length > 0 &&
						info.workingYears?.length < 2 ? (
							<p style={{ color: "red" }}>
								tiempo laborando debe de tener por lo menos 2
								letras o números
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
							value={info.workAddress}
							required
							InputLabelProps={{
								shrink: Boolean(info.workAddress),
								position: "top",
							}}
						/>
						{info.workAddress?.length > 0 &&
						info.workAddress?.length < 2 ? (
							<p style={{ color: "red" }}>
								Direction de trabajo debe de tener por lo menos
								2 letras o números
							</p>
						) : formInfoErr.workAddress ? (
							<p style={{ color: "red" }}>
								{formInfoErr.workAddress.message}
							</p>
						) : null}
					</Stack>
					<button className="btn btn-success">agregar cliente</button>
				</form>
			)}
		</div>
	);
};

export default ClientUpdate;
