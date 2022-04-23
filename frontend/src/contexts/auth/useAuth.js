import { useContext } from "react";
import { authContext } from "./ProvideAuth";

export const useAuth = () => {
	return useContext(authContext);
};
