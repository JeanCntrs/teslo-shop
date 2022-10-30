import { ICartProduct } from '../../interfaces';
import { ICartState } from './';

type CartActionType =
    | { type: '[Cart] - Load Cart From Cookies | Storage', payload: ICartProduct[] }
    | { type: '[Cart] - Update Products', payload: ICartProduct[] }

export const cartReducer = (state: ICartState, action: CartActionType): ICartState => {
    switch (action.type) {
        case '[Cart] - Load Cart From Cookies | Storage':
            return {
                ...state,
                cart: [...action.payload]
            }

        case '[Cart] - Update Products':
            return {
                ...state,
                cart: [...action.payload]

            }

        default:
            return state;
    }
}