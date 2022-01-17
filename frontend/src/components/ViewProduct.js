import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Tab, Tabs, Form } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { viewproducts, updateRating } from '../config/Myservices'
import Magnifier from "react-magnifier"
import { Rating } from 'react-simple-star-rating'

import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon, RedditIcon, RedditShareButton, TwitterShareButton, TwitterIcon, PinterestIcon, PinterestShareButton } from 'react-share'
export default function ViewProduct() {
    const [data, setData] = useState({})
    const [index, setIndex] = useState(0)
    const location = useLocation()
    const [subimages, setSubimages] = useState([])
    const [rating, setRating] = useState(0)
    const [show, setShow] = useState(false)
    useEffect(() => {
        console.log(location.search)
        viewproducts(location.search).then(res => {
            console.log(res.data)
            setSubimages([res.data.product_image, ...res.data.subimages])
            setData(res.data)
        })
    }, [])
    const addcart = (element) => {
        if (localStorage.getItem('cart') != undefined) {
            let tmp = JSON.parse(localStorage.getItem('cart'))
            // console.log(tmp.filter(ele => ele.name == element.name))
            if (tmp.filter(ele => ele._id == element._id).length === 0) {
                tmp.push({ ...element, quantity: 1 })
                localStorage.setItem('cart', JSON.stringify(tmp))
            }
        }
        else {
            localStorage.setItem('cart', JSON.stringify([{ ...element, quantity: 1 }]))
        }
    }
    const handleRating = (rate) => {
        setRating(rate / 20)
        let newrating = Math.ceil((data.rating + rate / 20) / (data.ratingCount + 1))
        updateRating({ ...data, rating: newrating, ratingCount: data.ratingCount + 1 }).then(res => {
            setData(res.data)
        })

        setShow(false)

    }
    return (
        <div>
            {data &&
                <Row className='my-5' >
                    <Col >
                        {console.log(subimages)}
                        {data && subimages &&
                            <> <div style={{ height: '50vh', textAlign: 'center' }}>
                                <Magnifier src={`./myimages/${subimages[index]}`} height='100%' width='auto' />
                            </div>
                                <div className='my-5' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                    <img style={{ marginX: '10px', height: '70px' }} onClick={() => setIndex(0)} src={`./myimages/${subimages[0]}`} />
                                    <img style={{ marginX: '10px', height: '70px' }} onClick={() => setIndex(1)} src={`./myimages/${subimages[1]}`} />
                                    <img style={{ marginX: '10px', height: '70px' }} onClick={() => setIndex(2)} src={`./myimages/${subimages[2]}`} />
                                    <img style={{ marginX: '10px', height: '70px' }} onClick={() => setIndex(3)} src={`./myimages/${subimages[3]}`} />
                                </div >
                            </>
                        }
                    </Col>

                    <Col>

                        <h3>{data.product_name}</h3>
                        <hr />
                        <h6>Price: Rs. {data.product_cost}</h6>
                        <h6>Rating:<Rating ratingValue={data.rating * 20} readonly={true} size={20} />({data.ratingCount})
                        </h6>

                        {data.color_id && <h6 className='d-flex align-items-center'>Color: <Form.Control type='color' value={data.color_id.color_code} className='p-0 ms-1' /></h6>}

                        <h5>Share <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16">
                            <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
                        </svg></h5>
                        <div className='mx-2'>
                            <FacebookShareButton url={window.location} ><FacebookIcon size='2.5rem' round='true' className='me-2' /></FacebookShareButton>
                            <WhatsappShareButton url={window.location} windowWidth={1000} windowHeight={750} Window><WhatsappIcon size='2.5rem' round='true' className='me-2' /></WhatsappShareButton>
                            <TwitterShareButton url={window.location} windowWidth={1000} windowHeight={750} Window><TwitterIcon size='2.5rem' round='true' className='me-2' /></TwitterShareButton>
                            <RedditShareButton url={window.location} windowWidth={1000} windowHeight={750} Window><RedditIcon size='2.5rem' round='true' className='me-2' /></RedditShareButton>
                            <PinterestShareButton url={window.location} windowWidth={1000} windowHeight={750} Window><PinterestIcon size='2.5rem' round='true' className='me-2' /></PinterestShareButton>
                        </div>
                        <Button variant="success" className='my-3' onClick={() => addcart(data)}>add to cart</Button> &nbsp;
                        <Button variant="danger" className='my-3' onClick={() => setShow(true)} >add rating</Button><br />
                        {
                            show && <Rating onClick={handleRating} ratingValue={rating} />

                        }


                        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3 my-2">
                            <Tab eventKey="home" title="Description">
                                {data.description}
                            </Tab>
                            <Tab eventKey="profile" title="Feature">
                                {data.feature}
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            }
        </div >
    )
}
