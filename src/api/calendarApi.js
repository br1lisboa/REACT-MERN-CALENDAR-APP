//* CONFIGURACION DE AXIOS
import axios from 'axios'

import { getEnvVariables } from '../helpers'

// ME TRAIGO MI VARIABLE DE ENTORNO QUE CONTIENE LA RUTA BASE DE MI API
const { VITE_API_URL } = getEnvVariables()

const calendarApi = axios.create({
    baseURL: VITE_API_URL
})

//TODO: CONFIGURAR INTERCEPTORES >> interceptar peticiones que van al back, o regresan
calendarApi.interceptors.request.use(config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config
})

export default calendarApi