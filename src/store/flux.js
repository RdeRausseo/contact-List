const getState = ({getStore,getActions,setStore})=>{
    return {
		store: {
			contactList: []
		},
		actions: {
			getContacts: () => {
				fetch("https://playground.4geeks.com/contact/agendas/angel/contacts", {
					method: "GET"
					
				})
				.then ((res) => {
					if(!res.ok) {
						throw new Error ("Error en la obtencion de los datos del contacto")
					}
				})
				.then ((body) => {
					if (body) {
						setStore({contactList: body.contacts})
					}
				})
				.catch((error) => {
					console.error("error: ", error )
				})
			},
			addContact: (contact) => {
				const store = getStore();
				setStore({...store, contactList: [...store.contactList, contact]})
			},
			createContact: (contactInfo) => {
                fetch("https://playground.4geeks.com/contact/agendas/angel/contacts", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        contactInfo
                    ),
                })
                    .then((res) => res.json())
                    .then((body) => {
                        const actions = getActions(); 
                        actions.addContact(body); 
                    })
                    .catch((error) => console.error(error));
            },
			deleteContact: (id) => {
                fetch(`https://playground.4geeks.com/contact/agendas/angel/contacts/${id}`, {
                    method: "DELETE",
                })
                    .then((response) => {
                        console.log(response)
                        if (response.ok) {
                            const store = getStore();
                            const contacts = store.contactList.filter(contact => contact.id !== id);
                            setStore({ contactList: contacts });
                        } else {
                            console.error("No se pudo borrar el contacto, error");
                        }
                    })
                    .catch((error) => console.error(error));
            }, 
			editContact: (id, contactEdit) => {
				fetch(`https://playground.4geeks.com/contact/agendas/angel/contacts/${id}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(contactEdit),
				})
					.then((response) => response.json())
					.then((data) => {
						const store = getStore();
						const contacts= store.contactList.map(contact => 
							contact.id === id ? { ...contact, ...data } : contact
						);
						setStore({ contactList: contacts });
					})
					.catch((error) => console.error("Error al editar el contacto:", error));
			},


		}
	};
}

export default getState