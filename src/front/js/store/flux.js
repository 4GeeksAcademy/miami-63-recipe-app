const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			items: []
		},
		actions: {
			itemSearch: async (search) => {
				try {
					const response = await fetch('https://orange-broccoli-j4rpj6prpr2qpvq-3001.app.github.dev/api/search', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							"query": search
						}),
					});
					const result = await response.json();
					setStore({ items: result })
					console.log("This came from the back-end", result);
				} catch (error) {
					console.error('Error fetching data:', error);
				}
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			}
		}
	};
};

export default getState;
