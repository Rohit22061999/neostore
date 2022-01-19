import React, { useState, useEffect } from 'react'
import { Container, Button, Modal, Form, InputGroup, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { addAddress, getinfo, setAddress } from '../config/Myservices'
import jwt_decode from "jwt-decode";

const regForName = RegExp(/^[A-Z a-z 0-9]{2,29}$/);
const regForPhone = RegExp(/^[7-9][0-9]{7}$/);

export default function ChangeAddress() {
    const [userdetail, setUserdetail] = useState({})
    const [item, setItem] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [savedAddress, setSavedAddress] = useState([])
    const [userAddress, setUserAddress] = useState({
        address: '',
        pincode: '',
        state: '',
        country: 'India',
        city: '',
    })
    const navigate = useNavigate()
    const [error, setError] = useState({ address: '', pincode: '', state: '', country: '', city: '' })

    useEffect(() => {
        if (sessionStorage.getItem('user') != undefined) {
            let item = jwt_decode(sessionStorage.getItem('user'))
            setItem(item.uid)
            getinfo({ email: item.uid }).then(res => {
                console.log(res.data)
                setUserdetail(res.data)
            })

        }
        else {
            navigate('/home')


        }

    }, [])


    const validate = (event) => {
        switch (event.target.name) {
            case 'address':
                if (!regForName.test(event.target.value)) {
                    setError({ ...error, address: "enter proper address" })
                    console.log(error)
                }
                else {
                    setError({ ...error, address: '' })
                    console.log(error)
                }
                break;
            case 'pincode':
                if (!regForPhone.test(event.target.value)) {
                    setError({ ...error, pincode: 'enter proper pincode' })
                    console.log(error)

                }
                else {
                    setError({ ...error, pincode: '' })
                    console.log(error)

                }
                break;
            case 'city':
                if (!regForName.test(event.target.value)) {
                    setError({ ...error, city: 'enter proper city name' })
                }
                else {
                    setError({ ...error, city: '' })
                }
                break;
            case 'state':
                if (!regForName.test(event.target.value)) {
                    setError({ ...error, state: "incorrect state name" })
                    console.log(error)
                }
                else {
                    setError({ ...error, state: '' })
                    console.log(error)

                }
                break;

            case 'country':
                if (!regForName.test(event.target.value)) {
                    setError({ ...error, country: "enter correct entry name" })
                    console.log(error)

                }
                else {
                    setError({ ...error, country: '' })
                    console.log(error)

                }
                break;
        }
    }

    const del = (index) => {
        let temp = JSON.parse(JSON.stringify(userdetail.address))
        temp.splice(index, 1)
        console.log(temp)
        setUserdetail({ ...userdetail, address: [...temp] })
        setAddress({ email: userdetail.email, address: temp })
    }


    const submit = () => {
        console.log('ok', item)

        if (!userAddress.address || !userAddress.state || !userAddress.pincode || !userAddress.country) {
            alert("all field required")
        }
        else {
            let temp = JSON.parse(JSON.stringify(userdetail.address))
            temp.push()
            // console.log(userAddress)
            addAddress({ ...userAddress, email: item })
                .then((res) => {
                    console.log(res.data)
                    if (sessionStorage.getItem('user') != undefined) {
                        let item = jwt_decode(sessionStorage.getItem('user'))
                        setItem(item.uid)
                        getinfo({ email: item.uid }).then(res => {
                            console.log(res.data)
                            setUserdetail(res.data)
                        })
                    }
                    else {
                        alert(res.data.msg)
                    }
                })
        }

    }
    return (
        <div>
            <Container >
                {userdetail.address && userdetail.address.map((item, index) => (
                    <Card style={{ marginBottom: '10px' }} key={index}>
                        <Card.Body>
                            <p>{item.address}</p>
                            <p><span>{item.pincode}</span> <span>{item.state}</span></p>
                            <p>{item.country}</p>
                            <Button variant="primary" size='sm' onClick={() => del(index)}>Delete</Button>
                        </Card.Body>

                    </Card>
                ))
                }
            </Container>

            <Button variant="primary" onClick={handleShow}> Add Address</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicfirstName">
                            <InputGroup>
                                <Form.Control type="Text" name="address" placeholder="House no/street/locality" onChange={event => { setUserAddress({ ...userAddress, address: event.target.value }); validate(event) }} />
                                <div className="icons"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fonts" viewBox="0 0 16 16">
                                    <path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z" />
                                </svg></div>
                            </InputGroup>
                            <div style={{ fontSize: '.7rem', color: "red" }}>{error.firstname}</div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <InputGroup>
                                <Form.Control type="text" name="pincode" placeholder=" Area Pincode" onChange={event => { setUserAddress({ ...userAddress, pincode: event.target.value }); validate(event) }} />
                                <div className="icons"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                </svg></div>
                            </InputGroup>
                            <div style={{ fontSize: '.7rem', color: "red" }}>{error.email}</div>

                        </Form.Group>
                        {/* 
                    <Select placeholder='town/city' onChange={() => getstates()}>
                        {states && states.map(item =>
                            <option value={item.state_name}>{item.state_name}</option>
                        )}
                    </Select> */}

                        {/* <Form.Group className="mb-3" controlId="formBasiclastName">
                        <InputGroup>
                            <Form.Select type="text" name='city' placeholder="Town/City" onChange={event => { setUserAddress({ ...userAddress, ciyt: event.target.value }); validate(event) }} />
                            <div className="icons"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fonts" viewBox="0 0 16 16">
                                <path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z" />
                            </svg></div>
                        </InputGroup>
                        {console.log(states)} */}


                        {/* <div style={{ fontSize: '.7rem', color: "red" }}>{error.lastname}</div>

                    </Form.Group> */}

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <InputGroup>
                                <Form.Control type='text' name='city' placeholder="town/City" onChange={event => { setUserAddress({ ...userAddress, city: event.target.value }); validate(event) }} />

                            </InputGroup>
                            <span><div style={{ fontSize: '.7rem', color: "red" }}>{error.password}</div> </span>
                        </Form.Group>




                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <InputGroup>
                                <Form.Control type='text' name='state' placeholder="State" onChange={event => { setUserAddress({ ...userAddress, state: event.target.value }); validate(event) }} />

                            </InputGroup>
                            <span><div style={{ fontSize: '.7rem', color: "red" }}>{error.password}</div> </span>
                        </Form.Group>



                        <Form.Group className="mb-3" controlId="formBasicMobileNo">
                            <InputGroup>
                                <Form.Control type="text" name='country' placeholder="Country" onChange={event => { setUserAddress({ ...userAddress, country: event.target.value }); validate(event) }} />
                                <div className='icons'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                </svg></div>
                            </InputGroup>
                            <span>                            <div style={{ fontSize: '.7rem', color: "red" }}>{error.mobileno}</div>
                            </span>
                            <div className='text-muted' style={{ fontSize: '.6rem', textAlign: 'right' }}>enter 10 digit number</div>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="primary" onClick={() => { handleClose(); submit() }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}
