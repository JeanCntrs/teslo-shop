import { createContext } from 'react';
import { ICartProduct, IShippingAddress } from '../../interfaces';

interface ContextProps {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    shippingAddress?: IShippingAddress

    // Methods
    addProductToCart: (product: ICartProduct) => void;
    updateCartQuantity: (product: ICartProduct) => void;
    deleteCartProduct: (product: ICartProduct) => void;
    updateAddress: (address: IShippingAddress) => void;

    // Orders
    createOrder: () => Promise<void>;
}

export const CartContext = createContext({} as ContextProps);