const base = "https://orange-broccoli-j4rpj6prpr2qpvq-3001.app.github.dev/api/";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			items: []
		},
		actions: {
			itemSearch: async (search) => {
				try {
					const response = await fetch(base + 'search', {
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
					localStorage.setItem("items", JSON.stringify(result)); // Save items to localStorage
					console.log("This came from the back-end", getStore().items);
				} catch (error) {
					console.error('Error fetching data:', error);
				}
			},
			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token")
				if (token && token != "" && token != undefined) setStore({ token: token });
			},
			handleLogin: async (email, password) => {
				try {
					const response = await fetch(base + 'login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							"email": email,
							"password": password
						}),
					});
					const result = await response.json();
					console.log("This came from the back-end", result);
					sessionStorage.setItem("token", result.access_token);
					setStore({ token: result.access_token });
					return true;
				} catch (error) {
					console.error('Error fetching data:', error);
				}
			},
			handleSignup: async (email, password) => {
				try {
					const response = await fetch(base + 'signup', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							"email": email,
							"password": password
						}),
					});
					const result = await response.json();
					console.log("This came from the back-end", result);
					sessionStorage.setItem("token", result.access_token);
					setStore({ token: result.access_token });
					return true;
				} catch (error) {
					console.error('Error fetching data:', error);
				}
			},
			handleLogout: () => {
				sessionStorage.removeItem("token")
				setStore({ token: null });
			},
			handlePasswordReset: async (email) => {
				try {
					const response = await fetch(base + 'reset-password', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							"email": email
						}),
					});
					const result = await response.json();
					console.log("This came from the back-end", result);
					if (response.ok) {
						return true;
					} else {
						return false;
					}
				} catch (error) {
					console.error('Error fetching data:', error);
					return false;
				}
			},
			handlePasswordChange: async (password, token) => {
				try {
					const response = await fetch(base + 'change-password', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							"password": password,
							"token" : token
						}),
					});
					const result = await response.json();
					console.log("This came from the back-end", result);
					if (response.ok) {
						return true;
					} else {
						return false;
					}
				} catch (error) {
					console.error('Error fetching data:', error);
					return false;
				}
			},
			localStorageToStore: () => {
				const storedItems = JSON.parse(localStorage.getItem("items"));
				if (storedItems) {
                    setStore({ items: storedItems });
                };
				console.log(getStore().items)
			}
		}
	};
};

export default getState;
