import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'


import { addHours } from "date-fns";
import { NavBar, CalendarEvent } from "../"
import { getMessagesES, localizer } from '../../helpers';
import { useState } from 'react';



const events = [{
    title: 'Cumple de Oli',
    notes: 'Darle un premio',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Bruno'
    }
}]

export const CalendarPage = () => {

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


    const onDoubleClick = (event) => {
        console.log({ doubleclick: event })
    }

    const onClick = (event) => {
        console.log({ click: event })
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

        </>
    )
}
