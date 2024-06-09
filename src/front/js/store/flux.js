const base = process.env.BACKEND_URL + "/api/";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			items: [],
			user: null,
            categories: []
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
			itemClear: () => {
                localStorage.removeItem("items");
                setStore({ items: [] });
            },
			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token")
				if (token && token != "" && token != undefined) setStore({ token: token });
			},
			syncUserIdSessionStore: () => {
				const user = sessionStorage.getItem("user")
				if (user && user != null && user != undefined) setStore({ user: user });
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
					sessionStorage.setItem("user", result.user_id);
					setStore({ token: result.access_token });
					setStore({ user: result.user_id });
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
					sessionStorage.setItem("user", result.user_id);
					setStore({ token: result.access_token });
					setStore({ user: result.user_id });
					return true;
				} catch (error) {
					console.error('Error fetching data:', error);
				}
			},
			handleLogout: () => {
				sessionStorage.removeItem("token");
				sessionStorage.removeItem("user");
				localStorage.removeItem("items");
				setStore({ token: null });
                setStore({ items: [] });
				setStore({ user: null });
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
			},
			fetchUserCategories: async () => {
                try {
                    const response = await fetch(base + 'categories/' + getStore().user, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getStore().token}` // Pass the token for authenticated requests
                        }
                    });
                    const result = await response.json();
					console.log(result)
                    setStore({ categories: result });
                } catch (error) {
                    console.error('Error fetching user categories:', error);
                }
            }
		}
	};
};

export default getState;