import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const UserHome = () => {
    const { store, actions } = useContext(Context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryName, setCategoryName] = useState(""); // New state for category name
    const [userCategories, setUserCategories] = useState([]); // New state for user-created categories

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleCategoryNameChange = (e) => {
        setCategoryName(e.target.value); // Update category name when input changes
    };

    const handleCreateCategory = () => {
        // Handle saving the category name (e.g., send it to an API or store it in state)
        // For now, I'm just adding it to the userCategories state
        setUserCategories([...userCategories, categoryName]);
        setCategoryName(""); // Clear input field after creating category
        toggleModal(); // Close the modal after creating category
    };

    return (
        <>
            {/* Existing UI elements (search, etc.) */}
            {/* ... */}

            <div className="container d-flex justify-content-end mb-4">
                <button className="btn button-accent rounded-pill ps-4 pe-4" onClick={toggleModal}>Create Recipe Board</button>
            </div>

            {/* Display user-created categories */}
            <div className="container">
                {userCategories.map((category, index) => (
                    <div key={index} className="mb-4">
                        {/* Customize how you want to display each user-created category */}
                        {category}
                    </div>
                ))}
            </div>

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
        </>
    );
};
