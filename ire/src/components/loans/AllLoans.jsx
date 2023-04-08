import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import { TextField, Stack } from "@mui/material";

const AllLoans = () => {
	const [loans, setAllLoans] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/Loan")
			.then((res) => {
				console.log("this is the all loans result", res);
				setAllLoans(res.data.results);
			})
			.catch((err) => {
				console.log("there can an error on the all loans", err);
			});
	}, []);

	return (
		<div>
			{/* make the one loan into a modal and show it that way  */}
			<Stack
				spacing={2}
				direction="row"
				className="d-flex justify-content-center"
			>
				<p className=" ">
					<TextField
						label="Buscar Préstamo"
						type="text"
						size="small"
						onChange={(e) => setSearch(e.target.value)}
					/>
				</p>
				<Link to={`/Nuevo/Prestamos`} className="">
					<button className=" btn btn-secondary text-white ">
						Agregar préstamo
					</button>
				</Link>
			</Stack>

			{/* <h1>
				make a feed(carousel) that show the clients than need to pay
				this day and have other feature{" "}
			</h1>
			<h1>
				you might also want to learn the bootstrap alert and colapsa and
				drop downs and the nav bar
			</h1> */}
			{loans.length === 0 || loans.length == null ? (
				<>
					<p>agrega un préstamo</p>
					<Link
						to={`/Nuevo/Prestamos`}
						className="btn btn-success card-text"
					>
						Agregar préstamo
					</Link>
				</>
			) : (
				loans
					.filter((l, idx) =>
						l?.client_id?.fullName
							.toLowerCase()
							.includes(search.toLowerCase())
					)
					.map((l, idx) => {
						return (
							<div
								className="d-inline-flex p-2 bd-highlight "
								key={l._id}
							>
								<div
									className="card  "
									style={{ width: "18rem" }}
								>
									<img
										className="card-img-top"
										src="https://media.istockphoto.com/id/1209654046/vector/user-avatar-profile-icon-black-vector-illustration.jpg?s=612x612&w=0&k=20&c=EOYXACjtZmZQ5IsZ0UUp1iNmZ9q2xl1BD1VvN6tZ2UI="
										alt="client "
									/>
									<div className="card-body">
										<h5 className="card-title">
											{l?.client_id?.fullName}
										</h5>
										<p className="card-text">
											total prestado: {l.loanAmount}
										</p>
										<p className="card-text">
											total cuotas:{l.cuotasNumber}
										</p>
										<p className="card-text">
											dia Agradado:{" "}
											{moment(l.dateAdded).format(
												"Y/MM/DD"
											)}
										</p>
										<Link
											to={`/Prestamos/${l._id}`}
											className="btn btn-danger"
										>
											cobrar
										</Link>
									</div>
								</div>
							</div>
						);
					})
			)}
		</div>
	);
};

export default AllLoans;
