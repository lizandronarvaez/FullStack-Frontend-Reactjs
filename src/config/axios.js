import axios from "axios";
//

const apiBackend = import.meta.env.VITE_BASE_URL;
const clienteAxios = axios.create({
    baseURL: apiBackend
});
clienteAxios.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`
    };

    return config;
});
// }, err => Promise.reject(err)); // Do something with request error
export default clienteAxios;
