import { useEffect, useReducer } from "react";
import { ICartProduct } from "../../interfaces";
import { CartContext, cartReducer } from "./";
import Cookie from 'js-cookie';

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

    useEffect(() => {
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
            dispatch({ type: '[Cart] - Load Cart From Cookies | Storage', payload: cookieProducts });
        } catch (error) {
            dispatch({ type: '[Cart] - Load Cart From Cookies | Storage', payload: [] });
        }
    }, [])


    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart))
    }, [state.cart])

    const addProductToCart = (product: ICartProduct) => {
        const existProduct = state.cart.some(p => p._id === product._id && p.size === product.size);

        if (!existProduct) {
            return dispatch({ type: '[Cart] - Update Products', payload: [...state.cart, product] });
        }

        // Another way could be with find and [...state.cart, updatedProductFound]
        const updatedProducts = state.cart.map(p => {
            if (p._id !== product._id) return p;
            if (p.size !== product.size) return p;

            const newQuantity = p.quantity + product.quantity
            p.quantity = newQuantity
            return p;
        });

        dispatch({ type: '[Cart] - Update Products', payload: updatedProducts });
    }

    return (
        <CartContext.Provider value={{
            ...state,

            // Methods
            addProductToCart
        }}
        >
            {children}
        </CartContext.Provider>
    )
}