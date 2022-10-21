import { UiState } from './';

type UiActionType =
    | { type: '[UI] - Change Sidemenu' }

export const uiReducer = (state: UiState, action: UiActionType): UiState => {
    switch (action.type) {
        case '[UI] - Change Sidemenu':
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen
            }

        default:
            return state;
    }
}