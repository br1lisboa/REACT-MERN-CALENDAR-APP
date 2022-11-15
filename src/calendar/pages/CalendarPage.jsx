import { useState } from 'react';
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { NavBar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../"
import { getMessagesES, localizer } from '../../helpers';
import { useCalendarStore, useUiStore } from '../../hooks';


export const CalendarPage = () => {

    const { events, setActiveEvent } = useCalendarStore()

    const { openDateModal } = useUiStore()

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

    const eventStyleGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor: '#347CF7',
            borderRadios: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }

    }

    const onDoubleClick = () => {
        openDateModal()
    }

    const onClick = (event) => {
        setActiveEvent(event)
    }

    const onViewChanged = (event) => {
        localStorage.setItem('lastView', event)
        setLastView(event)
    }

    return (
        <>

            <NavBar />

            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onClick}
                onView={onViewChanged}
            />

            <CalendarModal />

            <FabAddNew />

            <FabDelete />

        </>
    )
}
