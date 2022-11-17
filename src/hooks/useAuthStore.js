/* 
    OTRA FORMA DE REALIZAR DISPATCH DE ACCIONES ASINCRONAS - NO THUNKS
    OBJETIVO: REALIZAR TODAS LAS INTERACCIONES CON EL AUTH DE NUESTRO STORE
*/

import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api"
import { clearErrorMessage, onChecking, onCleanCalendarEvent, onLogin, onLogout } from "../store"

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

    //* PROCESO DE REGISTRO
    const startRegister = async ({ name, email, password }) => {

        dispatch(onChecking())

        try {

            const { data } = await calendarApi.post('/auth/new', { name, email, password })
            console.log(data)
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid }))

        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || 'Algunos de los campos no son correctos'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10)
        }

    }

    //* CHECK DEL AUTH TOKEN
    const checkAuthToken = async () => {

        const token = localStorage.getItem('token')

        if (!token) return dispatch(onLogout())

        try {

            const { data } = calendarApi.get('/auth/renew')
            console.log({ data })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getItem())
            dispatch(onLogin({ name: data.name, uid: data.uid }))

        } catch (error) {
            localStorage.clear()
            dispatch(onLogout())
        }

    }

    //* LOGOUT
    const startLogout = () => {

        localStorage.clear()
        dispatch(onCleanCalendarEvent())
        dispatch(onLogout())

    }

    return {
        //* PROPIEDADES
        status,
        user,
        errorMessage,



        //* METODOS >> ACCIONES QUE PODRAN LLAMAR PARA INTERACTUAR CON NUESTRO STORE
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}