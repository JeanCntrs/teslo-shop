import { useReducer } from "react";
import { IUser } from "../../interfaces";
import { AuthContext, authReducer } from "./";

interface IAuthProviderProps {
    children?: React.ReactNode;
}

export interface IAuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

const AUTH_INITIAL_STATE: IAuthState = {
    isLoggedIn: false,
    user: undefined
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
           
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}