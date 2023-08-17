import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<div className="row">
			<div className="col-11">
				<nav className="navbar navbar mb-3 d-flex justify-content-end">
					<div className="ml-auto">
						<Link to="/addContact">
							<button className="btn btn-primary ">Agregar Contacto</button>
						</Link>
					</div>
				</nav>
			</div>

		</div>

	);
};
