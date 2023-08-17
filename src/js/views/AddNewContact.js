import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { IoIosArrowBack } from "react-icons/io"


export const AddNewContact = props => {
	const { store, actions } = useContext(Context);
	const { addContacto } = actions;


	const initialState = {
		full_name: "",
		address: "",
		agenda_slug: "AgendaRodrigo",
		phone: "",
		email: "",
	}
	const [stateForm, setStateForm] = useState(initialState)

	const actualizarFormulario = (e, key) => {
		const value = e.target.value
		if (value !== "") {
			setStateForm({
				...stateForm,
				[key]: value
			})
		} else {
			console.log("Ingrese un valor en " + key + ", No puede ser vacio.")
		}

	}

	const params = useParams();
	const navigate = useNavigate()

	const ValidarFormulario = (e) => {
		e.preventDefault()
		if (stateForm.full_name !== "" && stateForm.phone !== "" && stateForm.address !== "" && stateForm.email !== "") {
			addContacto(stateForm)
			console.log("se inserto correctamente")
		} else {
			console.log(" no se puede mandar")
		}
	}
	return (
		<div className="row">
			<div className="col-6 m-auto px-5 py-2">
				<form onSubmit={ValidarFormulario} className="d-flex flex-column">
					<div className="name">
						<label for="fullName" class="form-label">Full Name</label>
						<input value={stateForm.full_name} onChange={(e) => actualizarFormulario(e, "full_name")} type="text" class="form-control" id="fullName" placeholder="full name" />
					</div>
					<div className="email">
						<label for="email" class="form-label">Email</label>
						<input value={stateForm.email} onChange={(e) => actualizarFormulario(e, "email")} type="email" class="form-control" id="email" placeholder="name@example.com" />
					</div>
					<div className="phone">
						<label for="phoneNumber" class="form-label">Phone</label>
						<input value={stateForm.phone} onChange={(e) => actualizarFormulario(e, "phone")} type="number" class="form-control" id="phoneNumber" placeholder="Enter Phone" />
					</div>
					<div className="address mb-5">
						<label for="exampleFormControlInput1" class="form-label">Address</label>
						<input value={stateForm.address} onChange={(e) => actualizarFormulario(e, "address")} type="text" class="form-control" id="exampleFormControlInput1" placeholder="Ej: Calle 123 Montevideo, Uruguay" />
					</div>
					<input type="submit" class="btn btn-primary w-25 m-auto " value={"Enviar"} />

				</form>
			</div>
			<p role="button" onClick={() => navigate("/")}> <IoIosArrowBack /> Back to Home</p>
		</div>
	);
};
