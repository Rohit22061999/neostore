import React, { useEffect, useState } from 'react'
import { getorder } from '../config/Myservices'
import jwt_decode from "jwt-decode";
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'


export default function Order() {
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        if (sessionStorage.getItem('user') != undefined) {
            let item = sessionStorage.getItem('user')
            let data = (jwt_decode(item))
            getorder({ email: data.uid }).then(res => {
                console.log(res.data)
                setOrders(res.data)
            })
        }
    }, [])

    const invoice = (index) => {
        console.log(orders[index])
        navigate('/invoice', { state: { order: orders[index] } })
    }
    return (
        <div>
            <h2>orders</h2>

            <Container >
                {orders && orders.map((item, index) => (
                    <Card style={{ marginBottom: '10px' }} key={index}>
                        <Card.Body>
                            <p>ORDER BY:{item.buyer}</p>
                            <span>palaced on :{item.date}</span>
                            <p>{item.orderlist.map(order => (
                                <span><img width='100px' height='100px' src={`./myimages/${order.product_image}`}></img> &nbsp;</span>
                            ))}</p>
                            <p>Amount Paid :  {item.total}</p>

                            <Button variant="primary" size='sm' onClick={() => invoice(index)}>Download Invoice</Button>

                        </Card.Body>

                    </Card>
                ))
                }
            </Container>
        </div>
    )
}
