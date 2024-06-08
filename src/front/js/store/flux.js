
const base = process.env.BACKEND_URL + "/api/";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,

			items: [],
			users: null,
			recipes: [],
			categories: []

			items: []

		},
		actions: {
			itemSearch: async (search) => {
				try {

					const response = await fetch(process.env.BACKEND_URL + '/search', {

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
				console.log(email)
				try {
					const response = await fetch(process.env.BACKEND_URL + '/login', {
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
					const response = await fetch(process.env.BACKEND_URL + '/signup', {
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

			localStorageToStore: () => {
				const storedItems = JSON.parse(localStorage.getItem("items"));
				if (storedItems) {
					setStore({ items: storedItems });
				};
				console.log(getStore().items)
					console.log("This came from the back-end", result);
				}

			},
			itemClear: () => {
                localStorage.removeItem("items");
                setStore({ items: [] });
            },
			},
// 			handleLogin: async (email, password) => {
// 				try {
// 					const response = await fetch(base + 'login', {
// 						method: 'POST',
// 						headers: {
// 							'Content-Type': 'application/json'
// 						},
// 						body: JSON.stringify({
// 							"email": email,
// 							"password": password
// 						}),
// 					});
// 					const result = await response.json();
// 					console.log("This came from the back-end", result);
// 					sessionStorage.setItem("token", result.access_token);
// 					setStore({ token: result.access_token });
// 					return true;
// 				} catch (error) {
// 					console.error('Error fetching data:', error);
// 				}
// 			},
// 			handleSignup: async (email, password) => {
// 				try {

// 					const response = await fetch(base + 'signup', {

// 						method: 'POST',
// 						headers: {
// 							'Content-Type': 'application/json'
// 						},
// 						body: JSON.stringify({
// 							"email": email,
// 							"password": password
// 						}),
// 					});
// 					const result = await response.json();
// 					console.log("This came from the back-end", result);
// 					sessionStorage.setItem("token", result.access_token);
// 					setStore({ token: result.access_token });
// 					return true;
// 				} catch (error) {
// 					console.error('Error fetching data:', error);
// 				}
// 			},
        
			handleLogout: () => {

				sessionStorage.removeItem("token")
				setStore({ token: null });

				sessionStorage.removeItem("token");
				localStorage.removeItem("items");
				setStore({ token: null });
                setStore({ items: [] });
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

			submitRecipe: async (recipe) => {
				const store = getStore()
				const opts = {
					headers: {
						// changed to getstore.token instead of just token
						Authorization: "Bearer " + store.token,
						'Content-Type': 'application/json'
					},
					method: "POST",
					// mode: "no-cors", // disables CORS

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
				fetch(process.env.BACKEND_URL + "/createrecipe", opts)
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
		}
	};

export default getState;
