
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
			stateCambio: false
		},
		actions: {
			// Use getActions to call a function within a fuction
			loadContactos: async () => {
				try {
					const resp = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda/AgendaRodrigo", {
						method: "GET",
						headers: {
							"Content-Type": "application/json"
						},
					})
					const data = await resp.json()
					setStore({ ...getStore, contacts: data })

				} catch (error) {
					console.log(error)
				}
			},
			addContacto: async (datos) => {
				try {
					const resp = await fetch("https://playground.4geeks.com/apis/fake/contact", {
						method: "POST",
						body: JSON.stringify(datos),
						headers: {
							"Content-Type": "application/json"
						}

					})
					const data = await resp.json()
					const store = getStore()
					setStore({ contacts: [...store.contacts, datos] })


				} catch (error) {
					console.log(error)
				}

				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			ActualizarContacto: (index, color) => {
				//get the store
				const store = getStore();
				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
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
