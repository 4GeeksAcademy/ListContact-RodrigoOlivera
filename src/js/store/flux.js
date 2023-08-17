
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
			contactEdit: {}
		},
		actions: {
			// Use getActions to call a function within a fuction
			CrearUsuario: async () => {
				const actions = getActions()
				const initialUserrodrigo = {
					full_name: "Rodriguito",
					email: "Rodrigo@gmail.com",
					agenda_slug: "AgendaRodrigo",
					address: "San jose de mayo, Uruguay",
					phone: "029939232"
				}
				try {
					const resp = await fetch('https://playground.4geeks.com/apis/fake/contact', {
						method: "POST",
						body: JSON.stringify(initialUserrodrigo),
						headers: {
							"Content-Type": "application/json"
						}
					})
					const data = await resp.json()
					if (data.ok) {
						actions.loadContactos()
					}

				} catch (error) {

				}
			},
			loadContactos: async () => {
				console.log("traer contactos")
				const actions = getActions()
				try {
					const resp = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda/AgendaRodrigo", {
						method: "GET",
						headers: {
							"Content-Type": "application/json"
						},
					})
					const data = await resp.json()

					if (data) {
						setStore({ ...getStore, contacts: data })
					} else {
						actions.CrearUsuario()
					}



				} catch (error) {
					console.log(error)
				}
			},
			addContacto: async (datos) => {
				try {
					const actions = getActions()
					const resp = await fetch("https://playground.4geeks.com/apis/fake/contact", {
						method: "POST",
						body: JSON.stringify(datos),
						headers: {
							"Content-Type": "application/json"
						}

					})
					const data = await resp.json()
					const store = getStore()
					if (data.msg === "Contact created successfully") {
						actions.loadContactos()
					}
					console.log(data)

				} catch (error) {
					console.log(error)
				}

				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			TraerDatosDeUnUsuario: async (id) => {
				console.log("este es el id")
				console.log(id)
				try {
					const resp = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json"
						}
					})
					const data = await resp.json()
					const store = getStore()
					setStore({ ...store, contactEdit: data[0] })

				} catch (error) {
					console.log(error)
				}
			},
			ActualizarStateInfoUser: (selected) => {
				const store = getStore()
				setStore({ ...store, contactEdit: selected })
			},
			ActualizarContacto: async (contactEdited) => {

				try {
					const store = getStore()
					const actions = getActions()
					// Pongo el id del usuario dentro de su informacion para actualizarlo
					const resp = await fetch(`https://playground.4geeks.com/apis/fake/contact/${contactEdited.id}`, {
						method: "PUT",
						body: JSON.stringify(contactEdited),
						headers: {
							"Content-Type": "application/json"
						},
					})
					const data = await resp.json()
					if (data.msg) {
						setStore({ ...store, contactEdit: {} })
						actions.loadContactos()
					}

				} catch (error) {
					console.log(error)
				}

			},
			BorrarContacto: async (info) => {
				console.log("esta es la info")
				try {
					const resp = await fetch(`https://playground.4geeks.com/apis/fake/contact/${info.id}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json"
						},
					})

					//Ahora actualizamos nuestro state para que sea en tiempo real
					const store = getStore()
					const newArr = store.contacts.filter((contact) => {
						return contact.id !== info.id
					})
					setStore({ contacts: newArr })



				} catch (error) {
					console.log(error)
				}
			}
		}
	};
};

export default getState;
