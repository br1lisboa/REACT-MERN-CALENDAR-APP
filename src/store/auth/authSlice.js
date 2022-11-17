import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({

    name: 'auth',

    initialState: {
        status: 'checking', // TENDREMOS 3 ESTADOS, auth - notAuth - checking
        user: {}, // INFORMACION DEL USUARIO QUE INCIALIZAMOS COMO UN OBJETO VACIO, PARA SIEMPRE TENER ACCESO A EL
        errorMessage: undefined
    },

    //* EL OBJETIVO DE LOS REDUCER ES GENERAR UN NUEVO STATE
    reducers: {
        //* Este reducer se ocupara de colocar el state en checking mientras se realiza el proceso de autenticacion
        onChecking: (state) => {
            state.status = 'checking'
            state.user = {}
            state.errorMessage = undefined
        },
        //* CUANDO LLAME ESTE REDUCER SIGNIFICA QUE LA PERSONA ESTA AUTENTICADA
        onLogin: (state, action) => {
            state.status = 'auth'
            state.user = action.payload
            state.errorMessage = undefined
        },
        //* ESTE REDUCER SETEA EL ESTADO EN NO AUTH POR FALTA DE CREDENCIALES
        onLogout: (state, { payload }) => {
            state.status = 'not-auth'
            state.user = {}
            state.errorMessage = payload
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined
        }
    },
})

// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions