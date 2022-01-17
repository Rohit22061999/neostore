import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap'
import SocialLogiin from './Sociallogin/SocialLogiin'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../config/Myservices'
import { useDispatch } from 'react-redux'


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [value, setValue] = useState({
        type: 'password',
        showpass: false
    })
    const userdispatch = useDispatch()


    const submit = () => {
        if (!email || !password) {
            alert("all fields are required")
        }
        else {
            let data = { email: email, password: password }
            login(data).then(res => {
                console.log(res.data)
                if (res.data.err == 0) {
                    sessionStorage.setItem('user', res.data.token)
                    userdispatch({ type: 'isuser' })
                    navigate('/home')
                }
                else {
                    alert('Register First')
                    // navigate('/register')
                }

            })

        }
    }
    return (
        <div style={{ margin: '50px', height: "50vh" }}>
            <Container >
                <Row >
                    <Col style={{ borderRight: "2px solid black", textAlign: "center", margin: '10px' }}>
                        <SocialLogiin />

                        <Button style={{ backgroundColor: '#1DA1F2', margin: '10px', width: '375px', border: 'none' }} size='lg'><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                        </svg>&nbsp;Login with twitter</Button><br />


                    </Col>
                    <Col className="login">
                        <h4>Login to NeoStore</h4>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <InputGroup>
                                    <Form.Control type="email" name='email' placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} />
                                    <div className="icons"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                    </svg></div>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <InputGroup>
                                    <Form.Control type={value.type} name='password' placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                                    <div className='icons'>{value.showpass ? <button type="button" className="icon-btn" onClick={() => { setValue({ type: "password", showpass: false }); console.log("yes") }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                    </svg></button> : <button className="icon-btn" type="button" onClick={() => { setValue({ type: "text", showpass: true }); console.log("no") }} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                                    </svg></button>}</div>
                                </InputGroup>
                            </Form.Group>

                            <Button variant="primary" type="button" onClick={() => submit()}>
                                Submit
                            </Button>
                        </Form>

                    </Col>
                </Row>
                <Row style={{ margin: '10px' }}>
                    <Col style={{ textAlign: "right", borderRight: '2px solid black' }}><Link to='/register'>Register</Link></Col>
                    <Col><Link to='/recoverpassword'>forget Password</Link></Col>
                </Row>
            </Container>
        </div >
    )
}
