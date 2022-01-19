import React, { useState, useEffect } from 'react'
import { Container, Button, Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { getcartinfo } from '../config/Myservices'
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux'



export default function Cart() {
    const [items, setItems] = useState([])
    const [g, setG] = useState(0)
    const [gst, setGst] = useState(0)
    const [ordertotal, setOrdertotal] = useState(0)
    const [userdetail, setUserdetail] = useState({})
    const navigate = useNavigate()
    const cartdispatch = useDispatch()

    useEffect(() => {

        //when user is not logged in
        if (sessionStorage.getItem('user') == undefined) {
            if (localStorage.getItem('cart') != undefined) {
                let tmp = JSON.parse(localStorage.getItem('cart'))
                setItems([...tmp])
                total(tmp)
            }
        }
        //when user is logged in
        else {
            let item = sessionStorage.getItem('user')
            let data = (jwt_decode(item))
            let userCart = []
            console.log(data.uid)
            getcartinfo({ email: data.uid }).then(res => {
                setUserdetail(res.data)
                userCart = res.data.cart
                console.log(res.data.cart)
                console.log('ok')

                //checking cart in backend is empty
                if (res.data.cart.length != 0) {
                    if (localStorage.getItem('cart') != undefined) {
                        let tmp = JSON.parse(localStorage.getItem('cart'))
                        console.log(userCart)
                        tmp.map((x) => {
                            let check = 1;
                            userCart.map((y) => {
                                if (x._id == y._id) {
                                    y.quantity += x.quantity;
                                    check = 0;
                                }
                            })
                            if (check) {
                                userCart.push(x)
                            }
                        })
                        console.log(userCart)
                        setItems([...userCart])
                        localStorage.setItem('cart', JSON.stringify([...userCart]))
                        total(userCart)
                    }
                    else {
                        localStorage.setItem('cart', JSON.stringify(userCart))
                        setItems([...userCart])
                        total(userCart)

                    }
                }
                //backend is 
                else {
                    if (localStorage.getItem('cart') != undefined) {
                        let tmp = JSON.parse(localStorage.getItem('cart'))
                        console.log(tmp)
                        setItems([...tmp])
                        total(tmp)
                    }

                }
            })

        }

    }, [])

    const del = (index) => {
        let tmp = items
        tmp.splice(index, 1)
        setItems([...tmp])
        localStorage.setItem('cart', JSON.stringify([...tmp]))
        cartdispatch({ type: 'iscart' })
        let item = (tmp.reduce((sum, ele) => sum += Number(ele.product_cost) * Number(ele.quantity), 0))

        setG(item)
        setGst(Math.ceil(0.05 * item))
        setOrdertotal(Math.ceil(item + 0.05 * item))


    }

    const incquantity = (index) => {
        let temp = [...items]
        if (temp[index].quantity < 10) {
            temp[index].quantity++
            setItems(temp)
            localStorage.setItem('cart', JSON.stringify(items))
        }
        else {
            alert('only 10 products you can add')
        }

    }

    const desquantity = (index) => {
        console.log('hoja bhai')
        let temp = [...items]
        if (temp[index].quantity <= 1) {
            temp[index].quantity = 1
        }
        else {
            temp[index].quantity--
            setItems(temp)
            localStorage.setItem('cart', JSON.stringify(items))
        }


    }

    const total = (items) => {
        let temp = items.reduce((sum, ele) => Number(ele.product_cost) * Number(ele.quantity) + sum, 0)
        setG(temp)
        setGst(Math.ceil(0.05 * temp))
        setOrdertotal(Math.ceil(temp + 0.05 * temp))
    }



    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: "10px", marginBottom: '50px' }}>
                <Container className="login" style={{ width: '60%', height: 'fit-content' }}>
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
                        {items.map((ele, index) => {
                            return (
                                <tbody key={index}>
                                    <tr className='xyz' >
                                        <td><img width='50px' src={`./myimages/${ele.subimages[0]}`} /> &nbsp;{ele.product_name}</td>
                                        <td ><button className=' button-30' onClick={() => { incquantity(index); total(items) }}>+</button><span className='mx-2'>{ele.quantity}</span><button className='button-30' onClick={() => { desquantity(index); total(items) }}>-</button></td>
                                        <td >{ele.product_cost}</td>
                                        <td >{ele.product_cost * ele.quantity}</td>
                                        <td ><svg onClick={() => del(index)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                        </svg></td>
                                    </tr>
                                </tbody>
                            )
                        }
                        )}
                    </Table>

                </Container>
                <Container className="login" style={{ width: '30%', maxHeight: '80vh' }}>
                    <h4>Review Order</h4><br />
                    <h5>Subtotal:      {g}</h5><hr />
                    <h5>GST(5%) :      {gst}</h5><hr />
                    <h5>Order Total:   {ordertotal}</h5><hr />

                    {!sessionStorage.getItem('user') ?
                        <Button variant="primary" style={{ width: '100%' }} onClick={() => { alert('Login required for further actions'); navigate('/') }}>Proceed to Buy</Button>
                        :
                        <Button variant="primary" style={{ width: '100%' }} onClick={() => navigate('/checkout', { state: ordertotal })}>Proceed to Buy</Button>
                    }
                </Container>

            </div>
        </div >
    )
}
