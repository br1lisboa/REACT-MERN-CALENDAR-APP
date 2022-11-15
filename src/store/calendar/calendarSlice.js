import { createSlice } from '@reduxjs/toolkit'
import { addHours, startOfYear } from 'date-fns'

//!Este tempEvent es tempral, vendra del backend 
const tempEvent = {
    _id: new Date().getTime(),
    title: 'Cumple de Oli',
    notes: 'Darle un premio',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Bruno'
    }
}

export const calendarSlice = createSlice({

    name: 'calendar',

    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null
    },

    reducers: {

        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload
        },

        //* REDUCER QUE CREA UN NUEVO EVENTO
        onAddNewEvent: (state, { payload }) => {

            state.events.push(payload)

            state.activeEvent = null

        },

        //* REDUCER PARA ACTUALIZAR UN EVENTO
        onUpdateEvent: (state, { payload }) => {

            state.events = state.events.map(event => {
                if (event._id == payload._id) {
                    return payload
                }

                return event
            })

        },

        //*REDUCER PARA BORRAR EVENTO
        onDeleteEvenet: (state) => {

            if (state.activeEvent) {
                state.events = state.events.filter(event => event._id !== state.activeEvent._id)
                state.activeEvent = null
            }

        }

    },
})

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvenet } = calendarSlice.actions