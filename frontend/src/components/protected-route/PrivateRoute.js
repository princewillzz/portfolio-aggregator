import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/useAuth";

export const PrivateRoute = ({ children, ...rest }) => {
	let auth = useAuth();

	return auth.isUserLoggedIn ? children : <Navigate replace to={"/login"} />;
};
