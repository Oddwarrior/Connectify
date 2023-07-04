import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios';
import { ENDPOINTS } from './endpoints';
import jwt_decode from 'jwt-decode';

const Refresh = (instance) => {
    const { user, dispatch } = useAuth();

    const refreshToken = async () => {
        const URL = import.meta.env.VITE_BASE_URL + ENDPOINTS.REFRESH;
        try {
            const res = await axios.post(URL, {
                token: user.refreshToken,
            });
            dispatch({ type: "REFRESH_TOKEN", payload: res.data });
            console.log("token refreshed");
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    instance.interceptors.request.use(
        async (config) => {
            let currentDate = new Date();
            const decodedToken = jwt_decode(user.accessToken);
            // console.log(decodedToken);
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                const data = await refreshToken();
                config.headers["Authorization"] = "Bearer " + data.accessToken;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );


}

export default Refresh;