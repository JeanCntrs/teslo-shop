import { useReducer } from "react";
import { UiContext, uiReducer } from "./";

interface UiProviderProps {
    children?: React.ReactNode;
}

export interface UiState {
    isMenuOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
    isMenuOpen: false
}

export const UiProvider: React.FC<UiProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const changeSidemenu = () => {
        dispatch({type: '[UI] - Change Sidemenu'});
    }

    return (
        <UiContext.Provider value={{
            ...state,

            // Methods
            changeSidemenu
        }}
        >
            {children}
        </UiContext.Provider>
    )
}