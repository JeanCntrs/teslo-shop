import { useEffect, useReducer } from "react";
import { ICartProduct } from "../../interfaces";
import { CartContext, cartReducer } from "./";
import Cookies from "js-cookie";

interface ICartProviderProps {
    children?: React.ReactNode;
}

export interface ICartState {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
    shippingAddress?: IShippingAddress;
}

export interface IShippingAddress {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
}

const CART_INITIAL_STATE: ICartState = {
    isLoaded: false,
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    shippingAddress: undefined
}

export const CartProvider: React.FC<ICartProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    useEffect(() => {
        try {
            const cookieProducts = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : [];
            dispatch({ type: '[Cart] - Load Cart From Cookies | Storage', payload: cookieProducts });
        } catch (error) {
            dispatch({ type: '[Cart] - Load Cart From Cookies | Storage', payload: [] });
        }
    }, [])

    useEffect(() => {
        if (Cookies.get('firstName')) {
            const shippingAddress = {
                firstName: Cookies.get('firstName') || '',
                lastName: Cookies.get('lastName') || '',
                address: Cookies.get('address') || '',
                address2: Cookies.get('address2') || '',
                zip: Cookies.get('zip') || '',
                city: Cookies.get('city') || '',
                country: Cookies.get('country') || '',
                phone: Cookies.get('phone') || ''
            }

            dispatch({ type: '[Cart] - Load Address From Cookies', payload: shippingAddress });
        }
    }, [])


    useEffect(() => {
        Cookies.set('cart', JSON.stringify(state.cart));
    }, [state.cart])

    useEffect(() => {
        const numberOfItems = state.cart.reduce((previous, current) => current.quantity + previous, 0);
        const subTotal = state.cart.reduce((previous, current) => (current.quantity * current.price) + previous, 0);
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

        const orderSummary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * (taxRate + 1)
        }

        dispatch({ type: '[Cart] - Update Order Summary', payload: orderSummary });
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

    const updateCartQuantity = (product: ICartProduct) => {
        dispatch({ type: '[Cart] - Update Product Quantity', payload: product });
    }

    const deleteCartProduct = (product: ICartProduct) => {
        dispatch({ type: '[Cart] - Delete Product', payload: product });
    }

    return (
        <CartContext.Provider value={{
            ...state,

            // Methods
            addProductToCart,
            updateCartQuantity,
            deleteCartProduct
        }}
        >
            {children}
        </CartContext.Provider>
    )
}