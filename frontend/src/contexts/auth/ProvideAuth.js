import { createContext } from "react";
import { useProvideAuth } from "./useProvideAuth";

export const authContext = createContext();

export const ProvideAuth = ({ children }) => {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
