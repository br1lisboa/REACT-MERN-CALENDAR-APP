/* 
    OTRA FORMA DE REALIZAR DISPATCH DE ACCIONES ASINCRONAS - NO THUNKS
    OBJETIVO: REALIZAR TODAS LAS INTERACCIONES CON EL AUTH DE NUESTRO STORE
*/

import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api"

export const useAuthStore = () => {

    const dispatch = useDispatch()

    const { status, user, errorMessage } = useSelector(state => state.auth)

    //* PROCESO DE LOGIN
    const startLogin = async ({ email, password }) => {
        console.log({ email, password })

        try {

            const resp = await calendarApi.post('/auth', { email, password })
            console.log({ resp })

        } catch (error) {
            console.log(error)
        }

    }

    return {
        //* PROPIEDADES
        status,
        user,
        errorMessage,



        //* METODOS >> ACCIONES QUE PODRAN LLAMAR PARA INTERACTUAR CON NUESTRO STORE
        startLogin
    }
}