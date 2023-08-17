import React, { useContext } from "react"
import { Context } from "../store/appContext"
import { PropTypes } from 'prop-types';

export const Modal = ({ closeModal, info }) => {
    const ancho = window.innerWidth;
    const alto = window.innerHeight;
    const styleModal = { position: "absolute", width: "200px", height: "200px", top: alto / 2 - 100 + "px", left: ancho / 2 - 100 + "px" }
    const { store, actions } = useContext(Context)
    const { BorrarContacto } = actions

    const BorrarDefinitivamente = () => {
        BorrarContacto(info)
        closeModal()
    }

    return (
        <div className="shadow-lg d-flex flex-column bg-light" style={styleModal}>
            <button onClick={closeModal} className=" align-self-end border-0 bg-transparent opacity-75 text-danger">X</button>
            <p className="text-center mt-4">Eliminar este Contacto Definitivamente?</p>
            <div className="d-flex flex-row justify-content-around mt-2 px-3">
                <button onClick={BorrarDefinitivamente} className="btn btn-success ">SI</button>
                <button onClick={closeModal} className="btn btn-danger ">NO</button>
            </div>
        </div>
    )
}
Modal.propTypes = {
    info: PropTypes.object,
    closeModal: PropTypes.func
}
