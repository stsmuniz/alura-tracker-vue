import axios, {AxiosInstance} from "axios";

const clienteHttp: AxiosInstance = axios.create({
    baseURL: 'https://62db6f73d1d97b9e0c4f535a.mockapi.io/'
})

export default clienteHttp;
