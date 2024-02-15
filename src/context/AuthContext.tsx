import { createContext, useReducer } from "react";
import { useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null }
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    useEffect(() => {
        const user = localStorage.getItem('user')
    
        if (user) {
          dispatch({ type: 'LOGIN', payload: user }) 
        }
      }, [])
    
    console.log(`AuthContext State: ${JSON.stringify(state)}`);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}