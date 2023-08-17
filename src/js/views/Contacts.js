import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";
import { CardContactF } from "../component/CardContactF";
import { Modal } from "../component/Modal";


export const Contacts = () => {
	const [stateModal, setStateModal] = useState(false)
	const [selectedDelete, setSelectedDelete] = useState(undefined)

	const closeModal = () => {
		setStateModal(false)
	}
	const openModal = () => {
		console.log("Hola xd")
		setStateModal(true)
	}

	useEffect(()=>{
		console.log(selectedDelete)
	},[selectedDelete])

	const { store, actions } = useContext(Context);
	//denteo del store tenemos nuestros datos, y en las acciones son las que manipulan los datos
	const { contacts } = store
	return (
		<div className="container">
			<div className="row">
				<div className="col-10 h-100 m-auto">
					{
						contacts[0] ? contacts.map((item) => {
							return <CardContactF key={item.id} infoUser={item} openModal={openModal} setSelectedDelete={setSelectedDelete} />
						}) : <p>No hay data</p>
					}
					{
						stateModal === true && <Modal closeModal={closeModal} info={selectedDelete} />
					}
				</div>
			</div>
		</div>
	);
};
