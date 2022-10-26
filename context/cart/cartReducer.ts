import { ICartProduct } from '../../interfaces';
import { ICartState } from './';

type CartActionType =
    | { type: '[Cart] - Load Cart From Cookies | Storage', payload: ICartProduct[] }
    | { type: '[Cart] - Add Product', payload: ICartProduct }

export const cartReducer = (state: ICartState, action: CartActionType): ICartState => {
    switch (action.type) {
        case '[Cart] - Load Cart From Cookies | Storage':
            return {
                ...state
            }

        default:
            return state;
    }
}