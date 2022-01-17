import React, { useState } from 'react'
import { Container, Button, Form, InputGroup } from 'react-bootstrap'
import SocialLogiin from './Sociallogin/SocialLogiin';
import { useNavigate } from 'react-router-dom';
import { register } from '../config/Myservices'
const regForName = RegExp(/^[A-Z a-z]{2,29}$/);
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPhone = RegExp(/^[7-9][0-9]{9}$/);
const regForPass = RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/);


export default function Register() {
    const [userinfo, setUserinfo] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmpassword: '',
        mobileno: ''
    })
    const navigate = useNavigate()
    const [value, setValue] = useState({
        type: 'password',
        showpass: false
    })
    const [showConfirmpassword, setShowConfirmpassword] = useState({
        type: 'password',
        showpass: false
    })
    const [error, setError] = useState({ firstname: '', lastname: '', email: '', password: '', confirmpassword: '', mobileno: '' })


    const validate = (event) => {
        switch (event.target.name) {
            case 'fname':
                if (!regForName.test(event.target.value)) {
                    setError({ ...error, firstname: "enter proper name" })
                    console.log(error)
                }
                else {
                    setError({ ...error, firstname: '' })
                    console.log(error)
                }
                break;
            case 'lname':
                if (!regForName.test(event.target.value)) {
                    setError({ ...error, lastname: 'enter proper lastname' })
                }
                else {
                    setError({ ...error, lastname: '' })
                }
                break;
            case 'email':
                if (!regForEmail.test(event.target.value)) {
                    setError({ ...error, email: 'enter proper email address' })
                }
                else {
                    setError({ ...error, email: '' })
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
                console.log(userinfo.password)
                if (!(event.target.value == userinfo.password)) {
                    setError({ ...error, confirmpassword: 'password not matched' })
                }
                else {
                    setError({ ...error, confirmpassword: '' })
                }
                break;
            case 'mobileno':
                if (!regForPhone.test(event.target.value)) {
                    setError({ ...error, mobileno: "invalid phone number" })
                }
                else {
                    setError({ ...error, mobileno: '' })
                }


        }
    }

    const submit = () => {
        if (!userinfo.firstname || !userinfo.lastname || !userinfo.email || !userinfo.password || !userinfo.confirmpassword || !userinfo.mobileno) {
            alert("all field required")
        }
        else {
            // console.log(userinfo)
            register(userinfo).then((res) => {
                console.log(res.data)
                if (res.data.err == 0) {
                    navigate('/home')
                }
                else {
                    alert(res.data.msg)
                }


            })

        }


    }
    return (
        <div>
            <Container style={{ textAlign: 'center' }}>

                <SocialLogiin />

                <hr />
                <Container className="login" style={{ width: "40vw" }}>
                    <h4>Register to NeoStore</h4>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicfirstName">
                            <InputGroup>
                                <Form.Control type="Text" name="fname" placeholder="First Name" onChange={event => { setUserinfo({ ...userinfo, firstname: event.target.value }); validate(event) }} />
                                <div className="icons"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fonts" viewBox="0 0 16 16">
                                    <path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z" />
                                </svg></div>
                            </InputGroup>
                            <div style={{ fontSize: '.7rem', color: "red" }}>{error.firstname}</div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasiclastName">
                            <InputGroup>
                                <Form.Control type="text" name='lname' placeholder="Last Name" onChange={event => { setUserinfo({ ...userinfo, lastname: event.target.value }); validate(event) }} />
                                <div className="icons"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fonts" viewBox="0 0 16 16">
                                    <path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z" />
                                </svg></div>
                            </InputGroup>
                            <div style={{ fontSize: '.7rem', color: "red" }}>{error.lastname}</div>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <InputGroup>
                                <Form.Control type="email" name='email' placeholder="Enter email" onChange={event => { setUserinfo({ ...userinfo, email: event.target.value }); validate(event) }} />
                                <div className="icons"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                </svg></div>
                            </InputGroup>
                            <div style={{ fontSize: '.7rem', color: "red" }}>{error.email}</div>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <InputGroup>
                                <Form.Control type={value.type} name='password' placeholder="Password" onChange={event => { setUserinfo({ ...userinfo, password: event.target.value }); validate(event) }} />
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
                            <span>                            <div style={{ fontSize: '.7rem', color: "red" }}>{error.password}</div>
                            </span>   <div className='text-muted' style={{ fontSize: '.6rem', textAlign: 'right' }}>0-12 Alphanumeric characters</div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicConfimPassword">
                            <InputGroup>
                                <Form.Control type={showConfirmpassword.type} name="confirmpassword" placeholder="Confirm Password" onChange={event => { setUserinfo({ ...userinfo, confirmpassword: event.target.value }); validate(event) }} />
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
                            <span>                            <div style={{ fontSize: '.7rem', color: "red" }}>{error.confirmpassword}</div>
                            </span> <div className='text-muted' style={{ fontSize: '.6rem', textAlign: 'right' }}>0-12 Alphanumeric characters</div>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicMobileNo">
                            <InputGroup>
                                <Form.Control type="text" name='mobileno' placeholder="Mobile No." onChange={event => { setUserinfo({ ...userinfo, mobileno: event.target.value }); validate(event) }} />
                                <div className='icons'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                </svg></div>
                            </InputGroup>
                            <span>                            <div style={{ fontSize: '.7rem', color: "red" }}>{error.mobileno}</div>
                            </span>
                            <div className='text-muted' style={{ fontSize: '.6rem', textAlign: 'right' }}>enter 10 digit number</div>
                        </Form.Group>

                        <Button variant="primary" type="button" onClick={() => submit()}>
                            Register
                        </Button>
                    </Form>
                </Container>

            </Container>

        </div >
    )
}
