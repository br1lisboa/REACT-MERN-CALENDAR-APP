import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvenet, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"

export const useCalendarStore = () => {

    const dispatch = useDispatch()

    const { events, activeEvent } = useSelector(state => state.calendar)

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {
        //TODO: llegar al backend

        //*Si todo sale bien.

        if (calendarEvent._id) {
            //estoy actualizando
            dispatch(onUpdateEvent({ ...calendarEvent }))
        } else {
            //estoy creando
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }))
        }


    }

    const startDeleteEvent = () => {
        // TODO llegar al backend
        dispatch(onDeleteEvenet())
    }

    return {
        //*Propiedaes
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,


        //*Metodos
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent



    }
}
