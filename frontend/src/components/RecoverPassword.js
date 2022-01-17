import React, { useState } from 'react'
import { Container, Form, InputGroup, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { sendotp } from '../config/Myservices'


export default function RecoverPassword() {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const submit = () => {
        let data = { email: email }
        sendotp(data).then(res => {
            if (res.data.err == 0) {
                sessionStorage.setItem('token', res.data.token)
                navigate('/forgetpassword')
            }
            else {
                alert(res.data.msg)
            }
        })

    }


    return (

        <div style={{ height: '60vh' }} >
            <Container className="login" style={{ width: "40vw", textAlign: "center", marginTop: "50px", marginBottom: "50px" }}>
                <h4>Forget Password</h4>
                <hr />
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <InputGroup>
                            <Form.Control type="email" name='email' placeholder="Enter your email" onChange={(event) => setEmail(event.target.value)} />
                            <div className="icons"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                            </svg></div>
                        </InputGroup>

                    </Form.Group>

                </Form>
                <Button variant="primary" type="button" onClick={() => submit()} >
                    Submit
                </Button>

            </Container>

        </div>
    )
}
