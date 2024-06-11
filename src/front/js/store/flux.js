const base = process.env.BACKEND_URL + "/api/";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			items: [],
			user: null,
			recipes: [],
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
							"token": token
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
					console.log({user:getStore().user})
                    const response = await fetch(base + 'categories/' + getStore().user, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getStore().token}` // Pass the token for authenticated requests
                        }
                    });
                    const result = await response.json();
					if (result.data) {
						setStore({ categories: result.data });
					}
					else {
						setStore({ categories: [] });
					}
					console.log(result)
                } catch (error) {
                    console.error('Error fetching user categories:', error);
                }
            },
			
			submitRecipe: async (recipe) => {
				const store = getStore()
				const opts = {
					headers: {
						// changed to getstore.token instead of just token
						Authorization: "Bearer " + store.token,
						'Content-Type': 'application/json'
					},
					method: "POST",

					body: JSON.stringify({
						// changed to title to match routes.py
						title: recipe.name,
						description: recipe.description,
						ingredients: recipe.ingredients,
						directions: recipe.directions,
						nutrition_facts: {
							calories: recipe.calories,
							protein_in_grams: recipe.protein,
							carbohydrates_in_grams: recipe.carbohydrates,
							fats_in_grams: recipe.fats,
							sodium_in_mg: recipe.sodium,
							cholestorol_in_mg: recipe.cholestorol,
							fiber_in_grams: recipe.fiber,
							sugars_in_grams: recipe.sugar,
						}
					}),
				};
				console.log({ opts: opts })
				fetch(base + "recipes", opts)
					.then((response) => response.json())
					.then((data) => {
						if (data.msg == "ok") {
							console.log(store.token)
							false.push(item);
							// might need to add code to make sure it doesn't double add an existing recipe
							// you can use .includes to do this
							setStore({ recipes: [...recipes, data] });
						}
					})
					.catch((error) => { console.log(error, store.token) });

			}
		}
	};
};

export default getState;