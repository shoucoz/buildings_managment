import React from "react";
export const ContextApp = React.createContext();

export const initialState = {
    token: window.localStorage.getItem('token'),
    role: window.localStorage.getItem('role')
};

export const reducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...action.payload
            };
            break
        case 'LOGOUT':
            return {};
            break
        default:
            return state
    }
};
