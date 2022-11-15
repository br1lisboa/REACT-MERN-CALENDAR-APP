import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns'

//!Este tempEvent es tempral, vendra del backend 
const tempEvent = {
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
        onShowEvent: (state) => {
            state.events
        },
    },
})

// Action creators are generated for each case reducer function
export const { onShowEvent } = calendarSlice.actions