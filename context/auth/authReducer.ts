import { IUser } from '../../interfaces';
import { IAuthState } from './';

type AuthActionType =
    | { type: '[Auth] - Login', payload: IUser }
    | { type: '[Auth] - Logout' }

export const authReducer = (state: IAuthState, action: AuthActionType): IAuthState => {
    switch (action.type) {
        case '[Auth] - Login':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            }

        case '[Auth] - Logout':
            return {
                ...state,
                isLoggedIn: false,
                user: undefined
            }

        default:
            return state;
    }
}