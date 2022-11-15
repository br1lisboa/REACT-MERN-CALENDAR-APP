import { useCalendarStore, useUiStore } from "../../hooks"

export const FabDelete = () => {

    const { startDeleteEvent, hasEventSelected } = useCalendarStore()

    const handleClick = () => {

        startDeleteEvent()

    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handleClick}
            style={{
                display: hasEventSelected ? '' : 'none'
            }}
        >
            <i className="fas fa-trash-alt"></i>

        </button>
    )
}
