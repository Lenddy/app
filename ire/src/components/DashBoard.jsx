import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDelete from "./ConfirmDelete";
import axios from "axios";
import moment from "moment";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import PersonIcon from "@mui/icons-material/Person";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import AllLoans from "./loans/AllLoans";
import AllCLients from "./AllClients";
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
	Tab,
} from "@mui/material";

const DashBoard = (props) => {
	const [user, setUser] = useState({});
	const [person, setPerson] = useState([]);
	const [tab, setTab] = useState("1");
	const navigate = useNavigate();
	const [currentTime, setCurrentTime] = useState(moment());

	let interest = (15000 * (14 * 0.01)) / 13;
	let total = 15000 / 13 + interest;

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentTime(moment());
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	const onload = () => {
		axios
			.get("http://localhost:8000/api/People", { withCredentials: true }) //
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
			.get("http://localhost:8000/api/People", { withCredentials: true }) //
			.then((res) => {
				console.log("this is the result", res);
				setPerson(res.data.results);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []); //when i put the state person it keep re rendering

	const tabChange = (e, newVal) => {
		setTab(newVal);
	};

	return (
		<div>
			<Stack spacing={2} direction="row">
				<strong className="">Hola {user.nombre}</strong>
				<p>
					{moment().format("dddd, MMMM Do YYYY")}|
					{currentTime.format("h:mm:ss a")}
				</p>
			</Stack>

			<TabContext value={tab}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<TabList
						arial-label="tabs example"
						onChange={tabChange}
						centered
					>
						<Tab
							label="Clientes"
							value="1"
							icon={<PersonIcon />}
							iconPosition="start"
						/>
						<Tab
							label="Prestamos"
							value="2"
							icon={<RequestQuoteIcon />}
							iconPosition="start"
						/>
						<Tab label="casi viene" value="3" disabled />
					</TabList>
				</Box>
				<TabPanel value="1">
					<AllCLients />
				</TabPanel>
				<TabPanel value="2">
					<AllLoans />
				</TabPanel>
				<TabPanel value="3">casi viene</TabPanel>
			</TabContext>
		</div>
	);

	// <SwipeableViews
	//     axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
	//     index={value}
	//     onChangeIndex={handleChangeIndex}
	//   ></SwipeableViews>
};

export default DashBoard;
