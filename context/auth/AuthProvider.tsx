import Cookies from "js-cookie";
import { useReducer } from "react";
import { tesloApi } from "../../api";
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

    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const { data } = await tesloApi.post('/users/login', { email, password });
            const { token, user } = data;
            Cookies.set('token', token);;
            dispatch({ type: '[Auth] - Login', payload: user });
            return true;
        } catch (error) {
            return false;
        }
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            loginUser
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}