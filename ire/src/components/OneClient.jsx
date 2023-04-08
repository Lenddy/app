import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import ConfirmDelete from "./ConfirmDelete";
import { Modal, Button } from "react-bootstrap";
import { Typography, Stack } from "@mui/material";

const OneClient = (props) => {
	const { id } = props;
	const [client, setClient] = useState({});
	const [notFound, setNotFound] = useState(false);
	const [loan, setLoan] = useState([]);
	const navigate = useNavigate();

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/User/loggedUser", {
				withCredentials: true,
			})
			.then((res) => {})
			.catch((err) => {
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
				if (res.data.results) {
					setClient(res.data.results);
				} else {
					setNotFound(true);
				}
			})
			.catch((err) => console.log("there is an error", err));
	}, []);

	// useEffect(() => {
	// 	axios
	// 		.get(`http://localhost:8000/api/Loan/People/${id}`)
	// 		.then((res) => {
	// 			console.log(
	// 				"this is the result for then all the loans in one client",
	// 				res.data
	// 			);
	// 			setLoan(res.data.results);
	// 		})
	// 		.catch((err) => {
	// 			console.log(
	// 				"there is an error in th all loans than belong to a user",
	// 				err
	// 			);
	// 		});
	// }, []);

	return (
		<div>
			{/* <p>
				make a dropdown menu or find a way to better display the
				redirects
			</p>
			<div>
				<Link to={`/DashBoard`}>
					<button>todos los clientes</button>
				</Link>
				<button className="btn btn-warning" onClick={logout}>
					
					salir
				</button>
				<Link to={``}>
					<button>todos los prestamos vacio</button>
				</Link>
				<Link to={``}>
					<button>todo los alquileres vacio</button>
				</Link>
				<Link to={``}>
					<button>crear un nuevo cliente vacio</button>
				</Link>
				<Link to={``}>
					<button>crear una solicitud o alquileres vacio</button>
				</Link>
				<Link to={``}>
					<button>crear una solicitud o alquileres vacio</button>
				</Link>
				<Link to={``}>
					<button>chat vacio </button>
				</Link>
			</div> */}

			<Button variant="success" onClick={handleShow}>
				ver
			</Button>

			<Modal show={show} fullscreen={true} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Client:{client.fullName}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Stack spacing={2} direction="column">
						<div>ID: {client._id}</div>
						<div>
							dia de nacimiento
							{moment(client.dob).format("YYYY/MM/DD")}
						</div>
						<div>tipo de identificación {client.idType}</div>
						<div>numero de identificación {client.idNum}</div>
						<div>numero telefónico personal {client.pNUmber}</div>
						<div>dirección personal {client.address}</div>
						<div>lugar de trabajo {client.workPlace}</div>
						<div>ocupación {client.occupation}</div>
						<div>Ingresos {client.income}</div>
						<div>Otros Ingresos {client.otherIncome}</div>
						<div>
							Numero Telefónico del Trabajo {client.workPNumber}
						</div>
						<div>
							Tiempo Trabajando En esta compañía
							{client.workingYears}
						</div>
						<div>Dirección trabajo {client.workAddress}</div>
						<div>prestamos#.{loan.length}</div>
						{notFound ? (
							<h1 className="text-danger">
								hubo un error encontrando a este cliente o el
								cliente no existe regrese hacia la pagina donde
								están todos los clientes y inténtelo denuedo
							</h1>
						) : (
							<div>
								{/*<h1>
									dia creado
									{moment(client.createAt).format(
										"YYYY/MM/DD"
									)}
								</h1>
								 {loan.map((l, idx) => {
							return (
								<div key={l._id}>
									<h4>
										monto préstamo {idx + 1} #
										{l.loanAmount}
									</h4>
								</div>
							);
						})} 
				<div>
					{" "}
					use the editable lable in html to edit text and that text
					that chage should be the updatable{" "}
				</div>*/}
							</div>
						)}
					</Stack>
				</Modal.Body>
				<div></div>

				<Modal.Footer>
					<Link to={`/editar/cliente/${id}`} className="btn">
						<Button variant="success">editar</Button>
					</Link>
					<Button variant="warning" onClick={handleClose}>
						salir
					</Button>
					<ConfirmDelete id={client._id} name={client.name} />
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default OneClient;
