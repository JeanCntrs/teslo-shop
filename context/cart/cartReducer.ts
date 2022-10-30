import { ICartProduct } from '../../interfaces';
import { ICartState } from './';

type CartActionType =
    | { type: '[Cart] - Load Cart From Cookies | Storage', payload: ICartProduct[] }
    | { type: '[Cart] - Update Products', payload: ICartProduct[] }
    | { type: '[Cart] - Update Product Quantity', payload: ICartProduct }

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

        case '[Cart] - Update Product Quantity':
            return {
                ...state,
                cart: state.cart.map(product => {
                    if (product._id !== action.payload._id) return product;
                    if (product.size !== action.payload.size) return product;

                    return action.payload;
                })

            }

        default:
            return state;
    }
}