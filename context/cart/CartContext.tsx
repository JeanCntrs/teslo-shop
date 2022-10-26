import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';

interface ContextProps {
    cart: ICartProduct[];

    // Methods
    // changeSidemenu: () => void
}

export const CartContext = createContext({} as ContextProps);