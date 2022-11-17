import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api"
import { convertEventsToDateEvents } from "../helpers"
import { onAddNewEvent, onDeleteEvenet, onLoadEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"
import Swal from 'sweetalert2'

export const useCalendarStore = () => {

    const dispatch = useDispatch()

    const { events, activeEvent } = useSelector(state => state.calendar)
    const { user } = useSelector(state => state.auth)

    //* fn PARA MARCAR COMO ACTIVO A UN EVENTO
    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    //* fn PARA GUARDAR
    const startSavingEvent = async (calendarEvent) => {

        try {

            if (calendarEvent.id) {
                //* ACTUALIZANDO EVENTO
                const { data } = await calendarApi.put(`/event/${calendarEvent.id}`, calendarEvent)
                dispatch(onUpdateEvent({ ...calendarEvent, user }))
            } else {
                //*CREANDO EVENTO
                const { data } = await calendarApi.post('/event/', calendarEvent)
                dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }))
            }

        } catch (error) {
            console.log(error)
            Swal.fire('Error al guardar', error.response.data.msg, 'error')
        }
    }

    //* fn PARA BORRAR EVENTO
    const startDeleteEvent = async () => {

        try {
            await calendarApi.delete(`/event/${activeEvent.id}`)

            dispatch(onDeleteEvenet())
        } catch (error) {
            console.log(error)
            Swal.fire('No tiene permisos para eliminar una nota que no creo usted', error.response.data.msg, 'error')
        }

    }

    //* fn PARA CARGAR EVENTOS
    const startLoadingEvents = async () => {

        try {

            const { data } = await calendarApi.get('/event/')
            const events = convertEventsToDateEvents(data.eventos)
            dispatch(onLoadEvent(events))

        } catch (error) {
            console.log('Error cargando eventos')
            console.log(error)
        }
    }


    return {
        //*Propiedaes
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,


        //*Metodos
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent,
        startLoadingEvents
    }
}
