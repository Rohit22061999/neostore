import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { Container, Row, Col, Table } from 'react-bootstrap'
import Pdf from "react-to-pdf";


export default function Invoice() {
    const ref = useRef(0)
    const [orderdata, setOrderdata] = useState()
    const location = useLocation()
    useEffect(() => {
        console.log(location.state)
        setOrderdata(location.state.order)
    }, [])
    return (

        <div className='pdf'>
            {orderdata &&
                <Pdf targetRef={ref} x={.5} y={.5} scale={0.95} filename={orderdata._id}>
                    {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
                </Pdf>}
            {orderdata &&
                <Container ref={ref} className='login' style={{ width: '60vw' }}>
                    <Row>
                        <Col><h2>Neo<span style={{ color: 'red' }}>Store</span></h2>

                            <h4>Bill to : </h4>
                            <h6>order id : {orderdata._id}</h6>
                            <h6>Date of purchase:{orderdata.date.substring(0, 10)}</h6>
                            <h6>Buyer's Email:{orderdata.buyer}</h6>
                            <h6>Address: {orderdata.address.address},{orderdata.address.pincode}</h6>
                            <h6>{orderdata.address.city}{orderdata.address.state}</h6>
                            <h6>{orderdata.address.country}</h6>
                        </Col>

                        <Col style={{ textAlign: 'end' }}>
                            <h3>Invoice</h3>

                        </Col>
                    </Row>
                    <hr />

                    <Table >
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>total</th>
                                <th></th>
                            </tr>
                        </thead>
                        {orderdata && orderdata.orderlist.map((ele, index) => {
                            return (
                                <tbody key={index}>
                                    <tr className='xyz' >
                                        <td><img height='50px' src={`./myimages/${ele.subimages[0]}`} /> &nbsp;{ele.product_name}</td>
                                        <td >{ele.quantity}</td>
                                        <td>{ele.product_cost}</td>
                                        <td >{ele.product_cost * ele.quantity}</td>

                                    </tr>
                                </tbody>
                            )
                        }
                        )}
                    </Table>

                    <Row>
                        <Col style={{ textAlign: 'end', paddingRight: '20px' }}> <h3>Order Total:  Rs. {orderdata.total}</h3>
                            <p>#include gst</p>
                        </Col>


                    </Row>


                </Container>
            }

        </div>
    )
}