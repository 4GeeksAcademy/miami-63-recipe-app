const base = process.env.BACKEND_URL + "/api/";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			items: [],
			user: null,
			recipes: [],
			recipe_id: null,
			category_id: null,
			categories: [],
			recipes: []
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
                    const response = await fetch(base + 'categories/' + getStore().user, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getStore().token}` // Pass the token for authenticated requests
                        }
                    });
                    const result = await response.json();
					if (result.data) {

						result.data.sort(function (a, b) {
							if (a.category_name.toUpperCase() < b.category_name.toUpperCase()) {
								return -1;
							}
							if (a.category_name.toUpperCase() > b.category_name.toUpperCase()) {
								return 1;
							}
							return 0;
						});

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
			fetchUserCategoriesRecipes: async (categoryId) => {
				try {
					const response = await fetch(base + `recipes/${getStore().user}/${categoryId}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${getStore().token}` // Pass the token for authenticated requests
						}
					});
					if (response.ok) {
						const result = await response.json();
						
						result.sort(function (a, b) {
							if (a.recipe_name.toUpperCase() < b.recipe_name.toUpperCase()) {
								return -1;
							}
							if (a.recipe_name.toUpperCase() > b.recipe_name.toUpperCase()) {
								return 1;
							}
							return 0;
						});

						setStore({ recipes: result });
						localStorage.setItem("recipes", JSON.stringify(result)); // Persist recipes to localStorage
						return result; // Ensure to return the fetched result
					} else {
						setStore({ recipes: [] });
						localStorage.setItem("recipes", JSON.stringify([])); // Persist empty array to localStorage
            			return []; // Return an empty array if no results
					}
				} catch (error) {
					console.error('Error fetching user categories:', error);
					return []; // Return an empty array in case of error
				}
			},
			fetchRecipeById: async (id) => {
				try {
					const response = await fetch(base + `recipe/${id}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${getStore().token}`
						}
					});
					if (response.ok) {
						const result = await response.json();
						return result;
					} else {
						console.error('Error fetching recipe:', response.statusText);
					}
				} catch (error) {
					console.error('Error fetching recipe:', error);
				}
			},
			fetchCategoryById: async (categoryId) => {
				try {
					const response = await fetch(base + `category/${categoryId}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${getStore().token}` // Pass the token for authenticated requests
						}
					});
					const result = await response.json();
					return result;
				} catch (error) {
					console.error('Error fetching category details:', error);
					return null;
				}
			},
			submitRecipe: async (recipe, user_id, category_id) => {
				const store = getStore()
				const opts = {
					headers: {
						Authorization: "Bearer " + store.token,
						'Content-Type': 'application/json'
					},
					method: "POST",
					body: JSON.stringify({
						recipe_name: recipe.name,
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
				fetch(base + `recipes/${user_id}/${category_id}`, opts)
					.then((response) => response.json())
					.then((data) => {
						if (data.msg == "ok") {
							const updatedRecipes = [...store.recipes, data];
							setStore({ recipes: updatedRecipes });
							localStorage.setItem("recipes", JSON.stringify(updatedRecipes)); // Persist updated recipes to localStorage
						}
					})
					.catch((error) => { console.log(error, store.token) });
			}
		}
	};
};

export default getState;