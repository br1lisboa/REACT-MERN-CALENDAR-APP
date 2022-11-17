import { createSlice } from '@reduxjs/toolkit'

/* import { addHours, startOfYear } from 'date-fns'
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
} */



export const calendarSlice = createSlice({

    name: 'calendar',

    initialState: {
        isLoadingEvents: true,
        events: [
            /* tempEvent */
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
                state.events = state.events.filter(event => event.id !== state.activeEvent.id)
                state.activeEvent = null
            }
        },

        //* REDUCER PARA CARGAR EVENTOS
        onLoadEvent: (state, { payload = [] }) => {
            state.isLoadingEvents = false
            /* state.events = payload */
            payload.forEach(event => {
                const exist = state.events.some(dbEvent => dbEvent.id === event.id)
                if (!exist) {
                    state.events.push(event)
                }
            });
        },

        //* REDUCER PARA SETEAR STATE EN 0
        onCleanCalendarEvent: (state) => {
            state.isLoadingEvents = true
            state.events = []
            state.activeEvent = null
        }
    },
})

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvenet, onLoadEvent, onCleanCalendarEvent } = calendarSlice.actions