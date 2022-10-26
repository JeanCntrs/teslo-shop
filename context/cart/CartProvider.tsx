import { useReducer } from "react";
import { ICartProduct } from "../../interfaces";
import { CartContext, cartReducer } from "./";

interface ICartProviderProps {
    children?: React.ReactNode;
}

export interface ICartState {
    cart: ICartProduct[];
}

const CART_INITIAL_STATE: ICartState = {
    cart: []
}

export const CartProvider: React.FC<ICartProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    return (
        <CartContext.Provider value={{
            ...state,

            // Methods
            
        }}
        >
            {children}
        </CartContext.Provider>
    )
}