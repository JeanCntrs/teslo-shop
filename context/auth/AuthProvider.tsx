import axios from "axios";
import Cookies from "js-cookie";
import { useReducer, useEffect } from 'react';
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

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async () => {
        if (!Cookies.get('token')) return;

        try {
            const { data } = await tesloApi.get('/users/validate-token');
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });
        } catch (error) {
            Cookies.remove('token');
        }
    }

    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const { data } = await tesloApi.post('/users/login', { email, password });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });
            return true;
        } catch (error) {
            return false;
        }
    }

    const registerUser = async (name: string, email: string, password: string): Promise<{ hasError: boolean; message?: string }> => {
        try {
            const { data } = await tesloApi.post('/users/register', { name, email, password });
            const { token, user } = data;
            Cookies.set('token', token);;
            dispatch({ type: '[Auth] - Login', payload: user });

            return {
                hasError: false
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: 'Something went wrong'
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            loginUser,
            registerUser
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}