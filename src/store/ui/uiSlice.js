
import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({

    name: 'ui',

    initialState: {
        isDateModalOpen: false
    },

    reducers: {

        onOpenDataModel: (state) => {
            state.isDateModalOpen = true
        },

        onCloseDataModel: (state) => {
            state.isDateModalOpen = false
        }

    },
})

// Action creators are generated for each case reducer function
export const { onOpenDataModel, onCloseDataModel } = uiSlice.actions