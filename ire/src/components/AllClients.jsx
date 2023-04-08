import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDelete from "./ConfirmDelete";
import OneClient from "./OneClient";
import axios from "axios";
import { TextField, Stack } from "@mui/material";

const AllClients = () => {
	const [user, setUser] = useState({});
	const [person, setPerson] = useState([]);
	const [search, setSearch] = useState("");
	const navigate = useNavigate();

	const onload = () => {
		axios
			.get("http://localhost:8000/api/People", { withCredentials: true })
			.then((res) => {
				console.log("this is the result", res);
				setPerson(res.data.results);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/User/loggedUser", {
				withCredentials: true,
			})
			.then((res) => {
				if (res.data.result) {
					setUser(res.data.result);
				}
				console.log("this is the user", res.data);
			})
			.catch((err) => {
				console.log("error", err);
				navigate("/");
			});
	}, []);

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/People", { withCredentials: true }) //
			.then((res) => {
				console.log("this is the result", res);
				setPerson(res.data.results);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []); //when i put the state person it keep re rendering

	return (
		<div>
			{/* <p>
				try to use the npm install react-swipeable-views latter to allow
				a swipe animation on the tabs
			</p>
			<p className="text-primary">
				{" "}
				add a field or sub field with then loan request form{" "}
			</p> */}

			<div>
				<Stack
					spacing={2}
					direction="row"
					className="d-flex justify-content-center"
				>
					<p className=" ">
						<TextField
							label="Buscar cliente"
							type="text"
							size="small"
							onChange={(e) => setSearch(e.target.value)}
						/>
					</p>
					<Link to="/nuevo/cliente" className="">
						<button className=" btn btn-secondary text-white ">
							agregar cliente
						</button>
					</Link>
				</Stack>
				{person.length === 0 ? (
					<div>
						{" "}
						<p className="text-danger">
							{" "}
							no hay clientes todavía agrega uno nuevo
						</p>
						<Link to="/nuevo/cliente">
							<button className=" btn btn-secondary text-white">
								agregar nuevo cliente
							</button>{" "}
						</Link>
					</div>
				) : (
					person
						.filter((p, idx) =>
							p.fullName
								.toLowerCase()
								.includes(search.toLowerCase())
						)
						.map((p, idx) => {
							return (
								<div
									className="d-inline-flex p-2 bd-highlight "
									key={p._id}
								>
									<div
										className="card  "
										style={{ width: "18rem" }}
									>
										<img
											className="card-img-top "
											src="https://media.istockphoto.com/id/1209654046/vector/user-avatar-profile-icon-black-vector-illustration.jpg?s=612x612&w=0&k=20&c=EOYXACjtZmZQ5IsZ0UUp1iNmZ9q2xl1BD1VvN6tZ2UI="
											alt="client"
										/>
										<div className="card-body">
											<h5 className="card-title">
												{p.fullName}
											</h5>
											<p>
												{p.idType}: {p.idNum}
											</p>
											<p>Teléfono: {p.pNumber}</p>
											<div>
												<hr />
												<OneClient id={p._id} />|
												<Link
													to={`/editar/cliente/${p._id}`}
													className="btn btn-primary"
												>
													Editar Cliente
												</Link>
												|
												<ConfirmDelete
													id={p._id}
													reload={onload}
													name={p.name}
												/>
											</div>
										</div>
									</div>
								</div>
							);
						})
				)}
			</div>
		</div>
	);
};

export default AllClients;
