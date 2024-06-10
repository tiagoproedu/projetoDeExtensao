import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:8010/api/v1'

})