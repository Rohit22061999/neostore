import React, { useState, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'
import jwt_decode from "jwt-decode";
import { getinfo } from '../config/Myservices';
import { useNavigate } from 'react-router-dom'

export default function Editprofile() {
    const [data, setData] = useState({})
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

            </Container>
            <Button variant="primary" > Add Address</Button>

        </div>
    )
}