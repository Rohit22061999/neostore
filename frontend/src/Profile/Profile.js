import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import ChangePassword from './ChangePassword'
import ChangeAddress from './ChangeAddress'
import Editprofile from './Editprofile'
import Order from './Order'
import { getinfo } from '../config/Myservices'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'
import Avatar from 'react-avatar';


export default function Profile() {
    const [open, setOpen] = useState({ order: true, editprofile: false, editaddress: false, editpassword: false })
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
        <div className='my-5'>
            <div className='mx-5'><h3>My Account</h3></div>
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: "10px", marginBottom: '50px' }}>
                <Container className='py-5' style={{ width: '30%', borderRight: '2px solid black', textAlign: 'center' }}>
                    <Avatar name={`${data.firstname} ${data.lastname}`} size="150" round />
                    {data && <p>{data.firstname} {data.lastname}</p>}
                    <button onClick={() => setOpen({ ...open, order: true, editaddress: false, editpassword: false, editprofile: false })} className='icon-btn'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-ul" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                    </svg>  Orders</button><br />
                    <button onClick={() => setOpen({ ...open, editprofile: true, order: false, editaddress: false, editpassword: false })} className='icon-btn'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>  Profile</button><br />
                    <button onClick={() => setOpen({ ...open, editaddress: true, order: false, editprofile: false, editpassword: false })} className='icon-btn'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                    </svg>  Address</button><br />
                    <button onClick={() => setOpen({ ...open, editpassword: true, order: false, editprofile: false, editaddress: false })} className='icon-btn'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z" />
                    </svg>  Change Password</button><br />
                </Container>
                <Container className="login" style={{ width: '60%' }} >
                    {open.order ? <Order /> : ""}
                    {open.editaddress ? <ChangeAddress /> : ''}
                    {open.editpassword ? <ChangePassword /> : ''}
                    {open.editprofile ? <Editprofile /> : ''}
                </Container>
            </div>
        </div >
    )
}
