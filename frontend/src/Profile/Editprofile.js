import React, { useState, useEffect } from 'react'
import { Container, Button, Modal, Form, InputGroup, Card } from 'react-bootstrap'
import jwt_decode from "jwt-decode";
import { getinfo } from '../config/Myservices';
import { useNavigate } from 'react-router-dom'

export default function Editprofile() {
    const [data, setData] = useState({})
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate()
    useEffect(() => {
        if (sessionStorage.getItem('user') != undefined) {
            let item = sessionStorage.getItem('user')
            let data = (jwt_decode(item))
            console.log(data.uid)
            getinfo({ email: data.uid }).then(res => {
                setData(res.data)
                console.log('ok')
            })
        }
        else {
            navigate('/home')
        }

    }, [])
    return (
        <div>
            {console.log(data)}
            <h2>Profile</h2>
            <Container>
                <h6>First Name:      {data.firstname}</h6>
                <h6>Last Name:       {data.lastname}</h6>
                <h6>Mobile No :      {data.mobileno}</h6>
                <h6>Email : {data.email}</h6>
            </Container>
            <Button variant="primary" onClick={handleShow}>Edit Profile</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicfirstName">
                            <InputGroup>
                                <Form.Control type="Text" name="address" placeholder="House no/street/locality" />
                                <div className="icons"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fonts" viewBox="0 0 16 16">
                                    <path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z" />
                                </svg></div>
                            </InputGroup>
                            <div style={{ fontSize: '.7rem', color: "red" }}></div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <InputGroup>
                                <Form.Control type="text" name="pincode" placeholder={data.lastname} />
                                <div className="icons"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                </svg></div>
                            </InputGroup>
                            <div style={{ fontSize: '.7rem', color: "red" }}></div>

                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="primary" onClick={() => { handleClose(); }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}