import { createContext, useContext, useEffect, useReducer } from "react";
import { ENDPOINTS } from "../utils/endpoints";
import axios from "axios";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user') || null),
    error: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS": return { user: action.payload, error: false };
        case "LOGIN_FAILED": return { user: null, error: action.payload };
        case "LOGOUT": return { user: null, error: null };
        case "UPDATE_DATA":
            return { ...state, user: { ...state.user, data: action.payload } };
        case "UNFOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    data: {
                        ...state.user.data,
                        followings: state.user.data.followings?.filter(
                            (following) => following !== action.payload
                        ),
                    },
                },
            };
        case "FOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    data: {
                        ...state.user.data,
                        followings: [...state.user.data.followings, action.payload],
                    },
                },
            };
        default: return state;
    }
}

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    useEffect(() => {
        //update local storage data
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    useEffect(() => {
        //sync local storage data with database on initial render
        const syncuser = async () => {
            const URL = import.meta.env.VITE_BASE_URL;
            const res = await axios.get(
                URL + ENDPOINTS.GET_USER_BY_USERNAME + state.user.data.username
            );
            dispatch({ type: "UPDATE_DATA", payload: res.data.user });
            console.log("User synced");
        };
        syncuser();
    }, []);



    return (
        <AuthContext.Provider value={{ user: state.user, error: state.error, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}