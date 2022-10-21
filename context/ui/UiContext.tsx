import { createContext } from 'react';

interface ContextProps {
    isMenuOpen: boolean;

    // Methods
    changeSidemenu: () => void
}

export const UiContext = createContext({} as ContextProps);