//* CONFIGURACION DE AXIOS
import axios from 'axios'

import { getEnvVariables } from '../helpers'

// ME TRAIGO MI VARIABLE DE ENTORNO QUE CONTIENE LA RUTA BASE DE MI API
const { VITE_API_URL } = getEnvVariables()

const calendarApi = axios.create({
    baseURL: VITE_API_URL
})

//TODO: CONFIGURAR INTERCEPTORES

export default calendarApi