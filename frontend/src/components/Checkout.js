import React, { useEffect, useState } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { getinfo, setorder } from '../config/Myservices'
import jwt_decode from "jwt-decode";
import { useLocation, useNavigate } from 'react-router-dom'


export default function Checkout() {
    const [data, setData] = useState({})
    const location = useLocation()
    const [address, setAddress] = useState('')
    const navigate = useNavigate()
    // const date = [
    //     1, 2, 3, 4, 5, 6, 7, 8, 9,
    //     10, 11, 12, 13, 14, 15, 16, 17, 18,
    //     19, 20, 21, 22, 23, 24, 25, 26, 27,
    //     28, 29, 30, 31
    // ]
    useEffect(() => {
        if (sessionStorage.getItem('user') != undefined) {
            let item = sessionStorage.getItem('user')
            let data = (jwt_decode(item))
            console.log(data.uid)
            getinfo({ email: data.uid }).then(res => {
                setData(res.data)
                console.log(res.data)
                console.log('ok')
            })
        }
        else {
            navigate('/home')
        }
    }, [])
    const submit = () => {
        // console.log({ buyer: data.email, orderlist: JSON.parse(localStorage.getItem('cart')), total: location.state, 'address': address })
        setorder({ buyer: data.email, orderlist: JSON.parse(localStorage.getItem('cart')), total: location.state, address: address })
        localStorage.removeItem('cart')

    }
    console.log(data)
    console.log(location)
    return (
        <div className='my-5' style={{ height: '80vh' }}>
            <Container className='login' style={{ width: "40vw" }}>
                <h3>Payment</h3>
                <hr />
                <h5>Amount To be paid: Rs. {location.state}</h5>
                <Form>
                    <Row className="mb-3">
                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Address </Form.Label>
                            <Form.Select defaultValue="Choose..." onChange={(e) => setAddress(JSON.parse(e.target.value))}>
                                <option>--select address--</option>
                                {data.address && data.address.map(item => (
                                    <option value={JSON.stringify(item)}>{item.address} &nbsp;{item.pincode}&nbsp;{item.city}&nbsp;{item.state}&nbsp;{item.country}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Control placeholder="Card Holder Name" />
                        </Form.Group>

                        <Row>
                            <Col xs={8}>
                                <Form.Control placeholder="Card Number" />
                            </Col>
                            <Col>
                                <Form.Control placeholder="CVV" />
                            </Col>

                        </Row>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Expiry Month</Form.Label>
                            <Form.Select defaultValue="Choose...">
                                <option value=''>--Select Month--</option>
                                <option selected value='1'>Janaury</option>
                                <option value='2'>February</option>
                                <option value='3'>March</option>
                                <option value='4'>April</option>
                                <option value='5'>May</option>
                                <option value='6'>June</option>
                                <option value='7'>July</option>
                                <option value='8'>August</option>
                                <option value='9'>September</option>
                                <option value='10'>October</option>
                                <option value='11'>November</option>
                                <option value='12'>December</option>
                            </Form.Select>
                        </Form.Group>


                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Select defaultValue="Choose...">
                                <option>--Select Date--</option>
                                {[...Array(31).keys()].map(item => (
                                    <option>{item + 1}</option>
                                ))
                                }
                            </Form.Select>
                        </Form.Group>

                    </Row>

                    <Button variant="success" type='button' className='mx-auto d-block' onClick={() => submit()}>
                        Submit
                    </Button>
                </Form>


            </Container>

        </div>
    )
}
