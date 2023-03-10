import { ICartProduct, IShippingAddress } from '../../interfaces';
import { ICartState } from './';

type CartActionType =
    | { type: '[Cart] - Load Cart From Cookies | Storage', payload: ICartProduct[] }
    | { type: '[Cart] - Update Products', payload: ICartProduct[] }
    | { type: '[Cart] - Update Product Quantity', payload: ICartProduct }
    | { type: '[Cart] - Delete Product', payload: ICartProduct }
    | { type: '[Cart] - Load Address From Cookies', payload: IShippingAddress }
    | { type: '[Cart] - Update Address', payload: IShippingAddress }
    | {
        type: '[Cart] - Update Order Summary',
        payload: {
            numberOfItems: number;
            subTotal: number;
            tax: number;
            total: number;
        }
    }
    | { type: '[Cart] - Order Conplete' }

export const cartReducer = (state: ICartState, action: CartActionType): ICartState => {
    switch (action.type) {
        case '[Cart] - Load Cart From Cookies | Storage':
            return {
                ...state,
                isLoaded: true,
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

        case '[Cart] - Delete Product':
            return {
                ...state,
                cart: state.cart.filter(product => !(product._id === action.payload._id && product.size === action.payload.size))
            }

        case '[Cart] - Update Order Summary':
            return {
                ...state,
                ...action.payload
            }

        case '[Cart] - Load Address From Cookies':
        case '[Cart] - Update Address':
            return {
                ...state,
                shippingAddress: action.payload
            }

        case '[Cart] - Order Conplete':
            return {
                ...state,
                cart: [],
                numberOfItems: 0,
                subTotal: 0,
                tax: 0,
                total: 0
            }

        default:
            return state;
    }
}