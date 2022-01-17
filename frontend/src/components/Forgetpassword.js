import React, { useState } from 'react'
import { Container, Form, InputGroup, Button } from 'react-bootstrap'
import { forgetpassword } from '../config/Myservices'
import jwt_decode from "jwt-decode";
const regForPass = RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/);

export default function Forgetpassword() {
    const [confirmpassword, setConfirmpassword] = useState('')
    const [password, setPassword] = useState('')
    const [verificationCode, setVerificationCode] = useState('')
    const [error, setError] = useState({ verificationcode: '', password: '', confirmpassword: '' })
    const item = jwt_decode(sessionStorage.getItem('token'))

    const [value, setValue] = useState({
        type: 'password',
        showpass: false
    })
    const [showConfirmpassword, setShowConfirmpassword] = useState({
        type: 'password',
        showpass: false
    })

    const validate = (event) => {
        switch (event.target.name) {
            case 'verificationcode':
                console.log(item)
                console.log(event.target.value)
                if (event.target.value != item.uid) {
                    console.log()
                    setError({ ...error, verificationcode: 'otp is not correct' })
                }
                else {
                    setError({ ...error, verificationcode: '' })
                }
                break;

            case 'password':
                if (!regForPass.test(event.target.value)) {
                    console.log(error)
                    setError({ ...error, password: "password should contain 0-12 alphanumeric character" })
                }
                else {
                    setError({ ...error, password: '' })
                }
                break;

            case 'confirmpassword':
                console.log(event.target.value)
                if (!(event.target.value == password)) {
                    setError({ ...error, confirmpassword: 'password not matched' })
                }
                else {
                    setError({ ...error, confirmpassword: '' })
                }
                break;
        }

    }
    const submit = () => {
        if (!password || !confirmpassword || !verificationCode) {
            alert("all field required")
        }
        else if (error.password || error.confirmpassword || error.oldpassword) {
            console.log(error)
            alert('all entries should be correct')
        }
        else {
            console.log('ok')
            forgetpassword({ password: password, email: item.email })
        }
    }


    return (
        <div style={{ height: '60vh' }} >
            <Container className="login" style={{ width: "40vw", textAlign: "center", marginTop: "50px", marginBottom: "50px" }}>
                <h4>Recover Password</h4>
                <hr />
                <Form>
                    <p style={{ color: 'red' }}><span style={{ borderRadius: "50%", backgroundColor: "red", width: "10px", height: "10px", display: "inline-block" }}></span> Verification code has been sent to your registered mail ID</p>
                    <Form.Group className="mb-3" controlId="formBasicVerificationCode">
                        <Form.Control type="Text" name="verificationcode" placeholder="Verification Code" onChange={event => { setVerificationCode(event.target.value); validate(event) }} />
                    </Form.Group>
                    <span><div style={{ fontSize: '.7rem', color: "red" }}>{error.verificationcode}</div></span>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <InputGroup>
                            <Form.Control type={value.type} name='password' placeholder="Enter New Password" onChange={event => { setPassword(event.target.value); validate(event) }} />
                            <div className='icons'>
                                {value.showpass ?
                                    <button type="button" className="icon-btn" onClick={() => { setValue({ type: "password", showpass: false }); console.log("yes") }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                    </svg></button>
                                    : <button className="icon-btn" type="button" onClick={() => { setValue({ type: "text", showpass: true }); console.log("no") }} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                                    </svg></button>}</div>
                        </InputGroup>
                        <span><div style={{ fontSize: '.7rem', color: "red" }}>{error.password}</div></span>

                        <div className='text-muted' style={{ fontSize: '.6rem', textAlign: 'right' }}>0-12 Alphanumeric characters</div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicConfimPassword">
                        <InputGroup>
                            <Form.Control type={showConfirmpassword.type} name="confirmpassword" placeholder="Confirm Password" onChange={event => { setConfirmpassword(event.target.value); validate(event) }} />
                            <div className='icons'>
                                {showConfirmpassword.showpass ?
                                    <button type="button" className="icon-btn" onClick={() => { setShowConfirmpassword({ type: "password", showpass: false }) }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                    </svg></button>
                                    : <button className="icon-btn" type="button" onClick={() => { setShowConfirmpassword({ type: "text", showpass: true }) }} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                                    </svg></button>}</div>
                        </InputGroup>
                        <span><div style={{ fontSize: '.7rem', color: "red" }}>{error.confirmpassword}</div></span>
                        <div className='text-muted' style={{ fontSize: '.6rem', textAlign: 'right' }}>0-12 Alphanumeric characters</div>

                    </Form.Group>
                </Form>
                <Button variant="primary" type="button" onClick={() => submit()}>
                    Submit
                </Button>
            </Container>
        </div >
    )
}
