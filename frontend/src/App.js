import { Spin } from "antd";
import "antd/dist/antd.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/auth/Login";
import { Dashboard } from "./components/dashboard/Dashboard";
import { PrivateRoute } from "./components/protected-route/PrivateRoute";
import { useAuth } from "./contexts/auth/useAuth";
function App() {
	const { isLoading } = useAuth();

	return isLoading ? (
		<>
			<div className="App">
				<div className="App-logo App-header">
					<Spin size="large" />
				</div>
			</div>
		</>
	) : (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />

				<Route
					path="/admin"
					element={
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>
					}
				/>

				<Route path="/" element={<Navigate replace to={"/admin"} />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
