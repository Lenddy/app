import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
	Typography,
	Button,
	TextField,
	InputAdornment,
	Stack,
	IconButton,
	Box,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Register = () => {
	const [formInfo, setFormInfo] = useState({});
	const [fromErrors, setFromErrors] = useState({});
	const [show, setShow] = useState(false);
	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8000/api/User/Register", formInfo, {
				withCredentials: true,
			}) //{withCredentials:true} so we are able to create a cookie
			.then((res) => {
				console.log("this is the result", res);
				if (res.data?.err) {
					setFromErrors(res.data.err.errors);
				} else {
					setFromErrors({});
					navigate("/DashBoard");
				}
			})
			.catch((err) => console.log("there was an error", err));
	};

	const changeHandler = (e) => {
		setFormInfo({
			...formInfo,
			[e.target.name]: e.target.value,
		});
	};

	const handleToggleShow = () => {
		setShow(!show);
	};

	return (
		<Box>
			<Typography variant="h3">Registrarse</Typography>
			<form className="form-group " onSubmit={submitHandler}>
				<Stack spacing={2} direction="column">
					<TextField
						label="Nombre"
						type="text"
						name="nombre"
						className="form-control"
						onChange={changeHandler}
						required
					/>
					{formInfo.nombre?.length > 0 &&
					formInfo.nombre?.length < 2 ? (
						<p style={{ color: "red" }}>
							nombre debe de ser por lo menos 2 letras
						</p>
					) : fromErrors.nombre ? (
						<p style={{ color: "red" }}>
							{" "}
							{fromErrors.nombre.message}{" "}
						</p>
					) : null}

					<TextField
						label="Apellido"
						type="text"
						name="apellido"
						className="form-control"
						onChange={changeHandler}
						required
					/>
					{formInfo.apellido?.length > 0 &&
					formInfo.apellido?.length < 2 ? (
						<p style={{ color: "red" }}>
							apellido debe de ser por lo menos 2 letras
						</p>
					) : fromErrors.apellido ? (
						<p style={{ color: "red" }}>
							{" "}
							{fromErrors.apellido.message}{" "}
						</p>
					) : null}

					<TextField
						label="Nombre de Usuario"
						type="text"
						name="nombreDeUsuario"
						className="form-control"
						onChange={changeHandler}
						required
					/>
					{formInfo.nombreDeUsuario?.length > 0 &&
					formInfo.nombreDeUsuario?.length < 2 ? (
						<p style={{ color: "red" }}>
							nombre De Usuario debe de ser por lo menos 2 letras
						</p>
					) : fromErrors.nombreDeUsuario ? (
						<p style={{ color: "red" }}>
							{" "}
							{fromErrors.nombreDeUsuario.message}{" "}
						</p>
					) : null}

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
					{formInfo.contraseña?.length > 0 &&
					formInfo.contraseña?.length < 3 ? (
						<p style={{ color: "red" }}>
							contraseña debe de ser por lo menos 3 letras o
							números
						</p>
					) : fromErrors.contraseña ? (
						<p style={{ color: "red" }}>
							{" "}
							{fromErrors.contraseña.message}{" "}
						</p>
					) : null}

					<TextField
						label="Confirmar Contraseña"
						type={show ? "text" : "password"}
						name="confirmar"
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
					{fromErrors.confirmar ? (
						<p className="text-danger">
							{fromErrors.confirmar.message}
						</p>
					) : null}

					<Button
						variant="contained"
						color="success"
						endIcon={<PersonAddIcon />}
					>
						Registrarse
					</Button>
				</Stack>
			</form>
		</Box>
	);
};

export default Register;

// import {useState,} from 'react';
// import {navigate,Link, useNavigate} from "react-router-dom"
// import axios from"axios";
// import { set } from 'mongoose';

// const Register = () => {
//     const [formInfo,setFormInfo] = useState ({})
//     const [fromErrors,setFromErrors] = useState({})
//     const navigate = useNavigate()
//     const [nombre,setNombre] = useState("")
//     const [apellido,setApellido] = useState("")
//     const [nombreDeUsuario,setUsuario] = useState("")
//     const [contraseña,setContraseña] = useState("")
//     const [confirmar,setConfirmar] = useState("")

//     const submitHandler = (e)=>{
//         e.preventDefault()
//         const formInfo={nombre,apellido,nombreDeUsuario,contraseña,confirmar}
//         axios.post("http://localhost:8000/api/User/Register",formInfo,{withCredentials:true})//{withCredentials:true} so we are able to create a cookie
//         .then(
//             res =>{
//                 console.log("this is the result",res)
//             if(res.data?.error){
//                 setFromErrors(res.data.error.errors)
//             }else{
//                 setFromErrors({})
//                 // navigate("/")
//             }
//         }
//         ).catch(err => console.log( "there was an error",err))
//     }

//     // const changeHandler = (e)=>{
//     //     setFormInfo({
//     //         ...formInfo,
//     //         [e.target.name]: e.target.value
//     //     })
//     // }

//     return (
//         <div>
//             <h1> Registrarse </h1>
//             <Link to="/"><button className=' btn btn-secondary text-white'>ya tengo una cuenta</button> </Link>
//             <form className='form-group ' onSubmit={submitHandler} >
//             <div>
//                 <label htmlFor="" >Nombre </label>
//                 <TextField type="text" name='nombre' className='form-control'  onChange={e=> setNombre(e.target.value)} />
//             </div>
//             <div>
//                 <label htmlFor=""> Apellido </label>
//                 <TextField type="text" name="apellido"  className='form-control' onChange={e =>setApellido(e.target.value)} />
//             </div>
//             <div>
//                 <label htmlFor="">Nombre de Usuario</label>
//                  <TextField type="text" name="nombreDeUsuario"  className='form-control' onChange={e=>setUsuario(e.target.value)} /> {/*make it that when this is check that the type changes from password to text */}
//             </div>
//             <div>
//                 <label htmlFor="">Contraseña</label>
//                  <TextField type="password" name="contraseña"  className='form-control' onChange={e=>setContraseña(e.target.value)}/> {/*make it that when this is check that the type changes from password to text */}
//             </div>
//             <div>
//                 <label htmlFor="">confirmar contraseña</label>
//                  <TextField type="password" name="confirmar"   className='form-control' onChange={e=>setConfirmar(e.target.value)}/> {/*make it that when this is check that the type changes from password to text */}
//             </div>
//             <button className='btn btn-success mt-3'>Registrarse</button>
//             </form>
//         </div>
//     );
// };

// export default Register;
