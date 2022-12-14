import { useEffect, useState } from "react";
import { addHours, differenceInSeconds } from "date-fns";

import Modal from "react-modal"

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es'

import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks";

registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');



export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore()

    const { activeEvent, startSavingEvent } = useCalendarStore()

    const [formValues, setFormValues] = useState({

        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2)

    })

    useEffect(() => {
        if (activeEvent !== null)
            setFormValues({ ...activeEvent })
    }, [activeEvent])


    const onInputChanges = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChange = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onCloseModal = () => {
        closeDateModal()
    }

    const onSubmit = async (event) => {
        event.preventDefault()

        const diferencce = differenceInSeconds(formValues.end, formValues.start)
        console.log({ diferencce })

        if (isNaN(diferencce) || diferencce <= 0) {
            console.log('Error en las fechas')
            return
        }

        if (formValues.title.length <= 0) return

        console.log(formValues, 'todo ok!')

        //TODO:
        await startSavingEvent(formValues)
        closeDateModal()
    }

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            contentLabel="Example Modal"
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >

            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={formValues.start}
                        className="form-control"
                        onChange={(event) => onDateChange(event, 'start')}
                        dateFormat='Pp'
                        showTimeSelect
                        locale={"es"}
                        timeCaption="Hora"
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValues.start}
                        selected={formValues.end}
                        className="form-control"
                        onChange={(event) => onDateChange(event, 'end')}
                        dateFormat='Pp'
                        showTimeSelect
                        locale={"es"}
                        timeCaption="Hora"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="T??tulo del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChanges}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripci??n corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChanges}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Informaci??n adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}
