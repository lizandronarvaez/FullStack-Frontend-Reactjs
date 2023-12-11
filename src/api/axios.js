import axios from "axios";
import { getEnv } from "../helpers/getEnv";
const { VITE_BASE_URL } = getEnv();

export const clienteAxios = axios.create({ baseURL: VITE_BASE_URL });
clienteAxios.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`
    };

    return config;
});
