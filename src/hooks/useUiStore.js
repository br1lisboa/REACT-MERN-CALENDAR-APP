import { useDispatch, useSelector } from "react-redux"
import { onCloseDataModel, onOpenDataModel } from "../store"


export const useUiStore = () => {

    const dispatch = useDispatch()

    const { isDateModalOpen } = useSelector(state => state.ui)

    // Fn para abrir el modal
    const openDateModal = () => {
        dispatch(onOpenDataModel())
    }

    //Fn para cerrar modal
    const closeDateModal = () => {
        dispatch(onCloseDataModel())
    }


    return {
        //* Propiedades
        isDateModalOpen,



        //* Metodos
        openDateModal,
        closeDateModal

    }
}