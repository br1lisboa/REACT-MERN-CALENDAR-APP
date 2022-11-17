/* 
    OTRA FORMA DE REALIZAR DISPATCH DE ACCIONES ASINCRONAS - NO THUNKS
    OBJETIVO: REALIZAR TODAS LAS INTERACCIONES CON EL AUTH DE NUESTRO STORE
*/

import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store"

export const useAuthStore = () => {

    const dispatch = useDispatch()

    const { status, user, errorMessage } = useSelector(state => state.auth)

    //* PROCESO DE LOGIN
    const startLogin = async ({ email, password }) => {

        dispatch(onChecking()) //*> COLOCA NUESTRA APP EN MODO DE CARGA

        try {

            const { data } = await calendarApi.post('/auth', { email, password })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid })) //*> SETEA EL ESTADO USER NUESTRO ONLOGIN

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10)
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