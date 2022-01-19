import React, { useEffect, useState } from 'react'
import { Carousel, Container, Row, Col, Collapse, Card, Button, Form } from 'react-bootstrap'
import { getproducts } from '../config/Myservices';
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import { useDispatch } from 'react-redux'


export default function Home() {

    const [product, setProduct] = useState([])
    const location = useLocation()
    const navigate = useNavigate()
    const cartdispatch = useDispatch()


    useEffect(() => {
        getproducts(location.search).then(res => {
            console.log(res.data)
            let temp = [...res.data];
            let tempProduct = []
            let sortData = temp.sort((a, b) => {
                return b.rating - a.rating;
            })
            console.log(sortData)
            for (let i = 0; i < 8; i++) {
                tempProduct.push(sortData[i])
                console.log(tempProduct);
            }
            setProduct(tempProduct)
        })

    }, [])

    const addcart = (element) => {
        if (localStorage.getItem('cart') != undefined) {
            let tmp = JSON.parse(localStorage.getItem('cart'))
            // console.log(tmp.filter(ele => ele.name == element.name))
            if (tmp.filter(ele => ele._id == element._id).length === 0) {
                tmp.push({ ...element, quantity: 1 })
                localStorage.setItem('cart', JSON.stringify(tmp))
                cartdispatch({ type: 'iscart' })


            }
        }
        else {
            localStorage.setItem('cart', JSON.stringify([{ ...element, quantity: 1 }]))
            cartdispatch({ type: 'iscart' })

        }
    }


    const redirect = (id) => {

        navigate(`/viewproduct?_id=${id}`)

    }
    return (
        <div >
            <Carousel>
                <Carousel.Item interval={1000}>

                    <img
                        style={{ height: "550px" }}
                        className="d-block w-auto mx-auto"
                        src="/myimages/milada-vigerova-p8Drpg_duLw-unsplash.jpg"
                        alt="First slide"
                        loading="lazy"
                    />
                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img
                        style={{ height: "550px" }}
                        className="d-block w-100"
                        src="/myimages/di_an_h-g_8MrEZAvyE-unsplash.jpg"
                        alt="Second slide"
                        loading="lazy"

                    />
                    <Carousel.Caption>
                        {/* <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                    </Carousel.Caption>
                </Carousel.Item >
                <Carousel.Item interval={1000}>
                    <img
                        style={{ height: "550px" }}
                        className="d-block w-100"
                        src="/myimages/clark-street-mercantile-P3pI6xzovu0-unsplash.jpg"
                        alt="Third slide"
                        loading="lazy"
                    />
                    <Carousel.Caption>
                        {/* <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <Container className="text-center my-5">
                <h3>Popular Products</h3>
                <Link to='/product' style={{ textDecoration: "none", color: 'black' }}><h4>view all</h4></Link>
            </Container>
            <Container className='my-5'>
                < Row className='g-5' >
                    {product &&
                        product.map((item) => (
                            <Col sm={12} md={4} lg={3}>
                                < Card style={{ width: '15rem' }}>
                                    <Card.Img variant="top" src={`./myimages/${item.product_image}`} onClick={() => redirect(item._id)} />
                                    <Card.Body>
                                        <Card.Title onClick={() => redirect(item._id)}>{item.product_name}</Card.Title>
                                        <Card.Text className='mb-1' onClick={() => redirect(item._id)}>Rs.{item.product_cost}</Card.Text>
                                        <Rating ratingValue={item.rating * 20} readonly={true} size={20} /><br />
                                        <Button className='my-1' variant="primary" onClick={() => addcart(item)}>add to cart</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                        )}
                </Row>
            </Container>
        </div>
    )
}
