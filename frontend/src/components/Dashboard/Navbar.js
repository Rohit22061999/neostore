import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button, Collapse, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { getsearch, setcart } from '../../config/Myservices'

export default function NavigationBar() {


    const [inputText, setInputText] = useState('')
    const [show, setShow] = useState(false);
    const [searchList, setSearchList] = useState([]);
    const userlog = useSelector(state => state.user)
    const userdispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (sessionStorage.getItem('user') != undefined)
            userdispatch({ type: 'isuser' })

    }, [])


    const search = (searchvalue) => {
        if (searchvalue.length > 0) {
            getsearch({ 'data': searchvalue })
                .then(res => {
                    if (res.data.length != 0) {
                        setSearchList(res.data)
                        // console.log(res.data)
                    }
                })
                .catch(err => console.log(err))
        }
        else {
            setSearchList([])
        }
    }

    const logout = () => {
        let item = JSON.parse(localStorage.getItem('cart'))
        console.log(item)
        let data = (jwt_decode(sessionStorage.getItem('user')))
        setcart({ cartitem: item, email: data.uid })
        sessionStorage.removeItem('user')
        localStorage.removeItem('cart')
        userdispatch({ type: 'isuser' })
        navigate('/home')
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home" style={{ fontSize: '2rem', fontWeight: '200' }}>Neo<span className='text-danger'>Store</span></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/home">Home</Nav.Link>
                            <Nav.Link as={Link} to="/product">Products</Nav.Link>
                            {!userlog ?
                                <Nav.Link as={Link} to="/cart" disabled>Order</Nav.Link>
                                :
                                <Nav.Link as={Link} to="/cart">Order</Nav.Link>
                            }


                        </Nav>
                        <Nav>
                            <Form className="d-flex position-relative">
                                <InputGroup>
                                    <Form.Group>
                                        <FormControl
                                            style={{ paddingLeft: '30px' }}
                                            type="text"
                                            placeholder="Search"
                                            className="me-2"
                                            aria-label="Search"
                                            onChange={(e) => { search(e.target.value); setInputText(e.target.value) }}
                                            onFocus={() => setShow(true)}
                                            onBlur={() => setShow(false)}
                                            aria-expanded={show}
                                        />
                                        {inputText.length > 0 &&
                                            <Collapse className="position-absolute p-3 w-100" in={show} >
                                                <div style={{ maxHeight: '25vh', overflow: 'auto', backgroundColor: 'white', zIndex: 1 }}>
                                                    {
                                                        searchList.map(ele =>
                                                            <p onClick={() => { navigate(`/viewproduct?_id=${ele._id}`); window.location.reload(false) }}>&nbsp;{ele.product_name}</p >
                                                        )
                                                    }
                                                </div>
                                            </Collapse>
                                        }
                                    </Form.Group>
                                </InputGroup>
                            </Form>
                            <Nav.Link as={Link} to="/cart" style={{ marginLeft: '0.5rem' }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
                                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                            </svg></Nav.Link>

                            {!userlog ?
                                <NavDropdown style={{ marginLeft: '0.5rem' }} title={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                </svg>
                                } id="collasible-nav-dropdown">

                                    <NavDropdown.Item as={Link} to="/">Login</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
                                </NavDropdown>
                                :
                                <NavDropdown style={{ marginLeft: '0.5rem' }} title={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                </svg>
                                } id="collasible-nav-dropdown">

                                    <NavDropdown.Item as={Link} to="/profile" >Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => logout()}>logout</NavDropdown.Item>
                                </NavDropdown>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div >
    )
}
