import "./App.css";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import ClientForm from "./components/ClientForm";
import ClientUpdate from "./components/ClientUpdate";
import AddLoan from "./components/loans/AddLoan";
import OneLoan from "./components/loans/OneLoan";
import ConfirmLoan from "./components/loans/ConfirmLoan";
// import Test from "./components/Test";
import Print from "./components/Print";
import Log_Reg from "./components/Log_Reg";

const App = () => {
	return (
		<div className="App">
			<Routes>
				<Route exact path="/" element={<Log_Reg />}></Route>
				<Route exact path="/DashBoard" element={<DashBoard />} />
				<Route exact path="/nuevo/cliente" element={<ClientForm />} />
				{/* <Route exact path="/:id" element={<OneClient />} /> */}
				<Route
					exact
					path="/editar/cliente/:id"
					element={<ClientUpdate />}
				/>
				<Route exact path="/Nuevo/Prestamos" element={<AddLoan />} />
				<Route exact path="Prestamos/:id" element={<OneLoan />} />
				<Route exact path="/confirm/loan" element={<ConfirmLoan />} />
				<Route exact path="/print" element={<Print />} />
				{/* <Route exact path='/test' element={<Print/>} /> */}
			</Routes>
		</div>
	);
};

export default App;
