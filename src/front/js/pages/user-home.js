import React, { useState, useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import SearchBG from "../../img/steak-image.png";
import "../../styles/user-home.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../styles/createCategoryModal.css";

export const UserHome = () => {
    const { store, actions } = useContext(Context);
    const [search, setSearch] = useState("")
    const forward = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryName, setCategoryName] = useState(""); // New state for category name

    // Sends the user to the main home page if not logged in
    useEffect(() => {
        if (store.token == null) {
            forward("/");
        }
    }, [store.token, forward]);

    const handleSearch = () => {
		actions.itemSearch(search);
	};

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleCategoryNameChange = (e) => {
        setCategoryName(e.target.value); // Update category name when input changes
    };

    const handleCreateCategory = () => {
        // Handle saving the category name (e.g., send it to an API or store it in state)
        console.log("Category name:", categoryName);
        // You can add your logic here to save the category name
        // For now, I'm just logging it to the console
    };

    return (
        <>
           <div className="container-fluid d-flex justify-content-center search-section mb-5" style={{backgroundImage: `url(${SearchBG})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                <div className="d-flex align-items-center justify-content-center col-4">
                    <input className="search-query-input" placeholder="Search Ingredient" value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={(element) => {
						if (element.key === "Enter") {
							handleSearch();
						};
					}} />
                    <button className="search-query-submit" type="submit" onClick={handleSearch}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="container d-flex justify-content-end mb-4">
                <button className="btn button-accent rounded-pill ps-4 pe-4" onClick={toggleModal}>Create Recipe Board</button>
            </div>

            <div className="container">
                {store.items != "" ?
                    <div className="col-12 scrollable-section mb-5">
                        <ul className="list-group list-group-flush">
                            {store.items.map((item, index) => (
                                <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                    <span>
                                        <Link to={`/item-detail/${item.id}`} className="text-decoration-none text-muted">{item.name}</Link>
                                    </span>
                                    <span>
                                        <button type="button" className="btn button-accent rounded-pill">+ Add Ingredient</button>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                :
                    null
                }

                {/* Modal Implementation */}
                <Modal show={isModalOpen} onHide={toggleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formCategoryName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    value={categoryName} // Bind input value to categoryName state
                                    onChange={handleCategoryNameChange} // Handle input change
                                />
                            </Form.Group>
                            <Button variant="danger" className="btn-danger" style={{ marginTop: '20px' }} onClick={handleCreateCategory}>
                                Create
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={toggleModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};
