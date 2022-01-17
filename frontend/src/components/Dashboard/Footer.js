import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { subscribe } from '../../config/Myservices'

export default function Footer() {

    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    console.log(email)


    const submit = () => {
        subscribe({ email: email }).then(res => {
            navigate('/thankyou')
        })
    }
    return (

        <div style={{ backgroundColor: "black", color: "white", bottom: "0", textAlign: 'center', paddingTop: '5px' }}>
            <div style={{ display: "flex", justifyContent: "space-around", fontSize: "1rem" }}>
                <div >
                    <h4>About Company</h4>
                    <p>NeoSOFT Technologies is here at your quick and easy services<br />
                        for shopping<br />
                        Contact information<br />
                        Email:contact@neosofttech.com<br />
                        Phone:+91 0000000000<br />
                        MUMBAI,INDIA
                    </p>
                </div>
                <div  >
                    <h4>information</h4>
                    <p>
                        <a style={{ textDecoration: "none", color: 'white' }} href='./NeoStoreTerms&Condition.pdf ' target='_blank'>Terms and Conditons</a>  <br />
                        guide and Return Policy<br />
                        Contact Us<br />
                        Privacy Policy<br />
                        <a style={{ textDecoration: "none", color: 'white' }} href='https://www.neosofttech.com/global-presence' target='_blank' >Locate Us</a> <br />
                    </p>
                </div>
                <div>
                    <h4>Newsletter</h4>
                    <p>
                        Signup to get exclusive offer from our favourite brands and to <br />
                        be well up in the news<br />
                        <br />
                        <input type="email" placeholder='your email' className="mx-auto" style={{ width: "50%" }} onChange={(e) => setEmail(e.target.value)} /> <br />
                        <br />
                        <button onClick={() => submit()}>Subscribe</button>
                    </p>
                </div>
            </div>
            <p >Copyright 2017 NeoSOFT Technologies .All rights reserved | Design by Rohit Singh Negi</p>

        </div>
    )
}
