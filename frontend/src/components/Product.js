import React, { useState, useEffect } from 'react'
import { Row, Col, Collapse, Card, Button, Form } from 'react-bootstrap'
import { getproducts, getCategory, getColor } from '../config/Myservices';
import ReactPaginate from 'react-paginate';
import { useNavigate, useLocation } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import { useDispatch } from 'react-redux'




export default function Product() {
    const [open, setOpen] = useState(false);
    const [copen, setCopen] = useState(false);
    const [product, setProduct] = useState([])
    const [category, setCategory] = useState([])
    const [color, setColor] = useState([])
    // const [cart, setCart] = useState([])
    const location = useLocation();
    const navigate = useNavigate(0);
    const cartdispatch = useDispatch()


    useEffect(() => {
        getproducts(location.search).then(res => {
            console.log(res.data)
            // localStorage.setItem('products', JSON.stringify(res.data))
            setProduct(res.data)
        })

        getCategory().then(res => {
            console.log(res.data)
            // localStorage.setItem('products', JSON.stringify(res.data))
            setCategory(res.data)
        })

        getColor().then(res => {
            console.log(res.data)
            // localStorage.setItem('products', JSON.stringify(res.data))
            setColor(res.data)
        })
    }, [])

    const redirect = (id) => {

        navigate(`/viewproduct?_id=${id}`)

    }

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

    const sortByRating = () => {
        let temp = [...product];
        let sortData = temp.sort((a, b) => {
            return b.rating - a.rating;
        })
        setProduct(sortData)
    }
    const sortByPriceUP = () => {
        let temp = [...product];
        let sortData = temp.sort((a, b) => {
            return b.product_cost - a.product_cost;
        })
        setProduct(sortData)
    }
    const sortByPriceDown = () => {
        let temp = [...product];
        let sortData = temp.sort((a, b) => {
            return a.product_cost - b.product_cost;
        })
        setProduct(sortData)
    }


    function Items({ currentItems }) {
        return (
            <>
                < Row className='g-5 paginationcss' >
                    {currentItems &&
                        currentItems.map((item) => (
                            <Col sm={3} md={6} lg={4}>
                                < Card style={{ maxWidth: "100%" }}>
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
            </>
        );
    }

    function PaginatedItems({ itemsPerPage }) {
        // We start with an empty list of items.
        const [currentItems, setCurrentItems] = useState(null);
        const [pageCount, setPageCount] = useState(0);
        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0);

        useEffect(() => {
            // Fetch items from another resources.
            const endOffset = itemOffset + itemsPerPage;
            console.log(`Loading items from ${itemOffset} to ${endOffset}`);
            setCurrentItems(product.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(product.length / itemsPerPage));
        }, [itemOffset, itemsPerPage]);

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % product.length;
            console.log(
                `User requested page number ${event.selected}, which is offset ${newOffset}`
            );
            setItemOffset(newOffset);
        };

        return (
            <>
                <Items currentItems={currentItems} />
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                />
            </>
        );
    }



    return (
        <div >
            <Row style={{ textAlign: 'right', margin: '10px' }}>
                <h5>sort by:
                    <button onClick={() => sortByRating()} className='icon-btn mx-3'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg></button>
                    <button onClick={() => sortByPriceUP()} className='icon-btn mx-3'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                    </svg></button>
                    <button onClick={() => sortByPriceDown()} className='icon-btn mx-3'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                    </svg></button>
                </h5>

            </Row>
            <Row style={{ width: '95vw' }}>
                <Col xs={2} style={{ paddingLeft: "20px", backgroundColor: 'grey', color: "white", textAlign: 'center' }}>
                    <button className='icon-btn product-btn w-75 ' onClick={() => { navigate('/product'); window.location.reload(false) }} >ALL PRODUCTS</button>
                    <Form className='text-center'>
                        <button
                            className='icon-btn product-btn w-75'
                            style={{ fontSize: 'larger', marginBottom: '5px' }}
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            type='button'

                        >
                            Categories
                        </button><br />
                        <Collapse in={open}>
                            <div id="example-collapse-text">

                                <ul style={{ listStyle: 'none' }}>
                                    {category && category.map(item =>
                                        <li>  <Form.Check name='category_id' value={item._id} label={item.category_name} /></li>
                                    )}
                                </ul>
                            </div>
                        </Collapse>

                        <button
                            className='icon-btn product-btn w-75'
                            style={{ fontSize: 'larger', marginBottom: '5px' }}
                            onClick={() => setCopen(!copen)}
                            aria-controls="example-collapse-text"
                            aria-expanded={copen}
                            type='button'
                        >
                            Color
                        </button>
                        <Collapse in={copen}>
                            <div id="example-collapse-text">
                                <ul style={{ listStyle: 'none' }}>
                                    {color && color.map(item =>
                                        <li>  <Form.Check name='color_id' value={item._id} label={item.color_name} /></li>
                                    )}
                                </ul>
                            </div>
                        </Collapse>
                        <Button varient='warning' type='submit' >Apply filter</Button>
                    </Form>
                </Col>

                <Col xs={10}>
                    <PaginatedItems itemsPerPage={6} />
                </Col>
            </Row>

        </div >
    )
}
