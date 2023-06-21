import { createContext, useContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user') || null),
    error: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS": return { user: action.payload, error: false };
        case "LOGIN_FAILED": return { user: null, error: action.payload };
        case "LOGOUT": return { user: null, error: null };
        default: return state;
    }
}

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return (
        <AuthContext.Provider value={{ user: state.user, error: state.error, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}