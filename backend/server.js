const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 9000
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer");
const saltRounds = 10
const axios = require('axios')
const jwtSecret = 'asdfghjklqwertyuiop12345'
app.use(cors())
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect('mongodb://localhost:27017/NeoStore', { useNewUrlParser: true },
    (err) => {
        if (err) throw err;
        else {
            console.log("mongoDB connected")
        }
    }
)
const catModel = require('./db/categorySchema');
const colorModel = require('./db/colorSchema');
const proModel = require('./db/productSchema');
const userModel = require('./db/userSchema')
const orderModel = require('./db/orderSchema')
const subsModel = require('./db/subscriberSchema')

app.get('/', (req, res) => {
    res.send("ok")

})

app.get('/getproducts', (req, res) => {
    console.log(req.query)
    proModel.find(req.query)
        .populate(["category_id", "color_id"])
        .then(product => {
            res.send(product)
        })
})


app.post('/login', (req, res) => {
    console.log(req.body)
    userModel.findOne({ email: req.body.email }, (err, data) => {
        if (err) {
            console.log('1')
            res.send({ 'err': 1, "msg": "Register first" })
        }
        else if (data == null) {
            console.log('2')
            res.send({ "err": 1, "msg": "register first or login with social account" })
        }
        else {
            console.log(data)
            let payload = {
                uid: data.email,
                account: data.type
            }
            console.log(payload, "1")
            const token = jwt.sign(payload, jwtSecret, { expiresIn: 36000000 })
            bcrypt.compare(req.body.password, data.password, function (err, result) {
                console.log(result)
                if (err) throw err;
                else if (result == true) {
                    res.send({ "err": 0, "data": data, "token": token })
                }
                else {
                    res.send({ "err": 1, msg: "incorrect password" })
                }
            });


        }

    })
})


app.post('/register', (req, res) => {
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            console.log(hash)
            let inc = new userModel({ firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: hash, mobileno: req.body.mobileno, type: 'manual' })
            // let inc = new userModel(req.body)
            inc.save((err) => {
                if (err) {
                    res.send({ "err": 1, "msg": "user already exist" })
                }
                else {
                    res.send({ "err": 0 })
                }
            })


        });
    });

})


app.post('/sociallogin', (req, res) => {
    userModel.findOne({ email: req.body._profile.email }, async (err, data) => {
        if (err) throw err;
        else if (data != null) {
            console.log(data)
            console.log(req.body)
            if (req.body._provider == 'google') {
                let verify = await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${req.body._token.accessToken}`)
                console.log(verify)
                if (verify.data.verified_email != undefined && verify.data.verified_email == true) {
                    let payload = {
                        uid: req.body._profile.email,
                        account: 'social'
                    }
                    const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 })
                    res.send({ 'err': 0, 'msg': "login success", 'token': token })
                }
                else {
                    res.status(200).send({ err: 1, msg: 'unauthorised login' })
                }
            }

            else {
                let payload = {
                    uid: req.body._profile.email
                }
                const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 })

                res.send({ 'err': 0, msg: 'login ', 'token': token })
            }
        }
        else {
            let inc = new userModel({ firstname: req.body._profile.firstName, lastname: req.body._profile.lastName, email: req.body._profile.email, type: 'social' })
            inc.save((err) => {
                if (err) throw err;
                else {
                    res.send({ 'err': 0, 'msg': "register success" })

                }
            })
        }
    })
})


app.post('/sendotp', (req, res) => {
    userModel.findOne({ email: req.body.email }, (err, data) => {
        if (err) {
            console.log('1')
            res.send({ 'err': 1, "msg": "Invalid mail ID" })
        }
        else if (data == null) {
            console.log('2')
            res.send({ "err": 1, "msg": "INVALID MAIL" })
        }
        else {

            let otp = Math.random();
            otp = otp * 1000000;
            otp = parseInt(otp);
            console.log(otp);
            let mailTransporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.auth,
                    pass: process.env.pass
                }
            });

            let mailDetails = {
                from: 'nstcoders@gmail.com',
                // to: 'rohitsinghnegi68@gmail.com',
                to: req.body.email,
                subject: 'OTP Verification Code',
                html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>",

            };

            mailTransporter.sendMail(mailDetails, function (err, data) {
                if (err) {
                    console.log('Error Occurs', err);
                } else {
                    let payload = {
                        uid: otp,
                        email: req.body.email
                    }
                    const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 })
                    console.log('Email sent successfully');
                    res.send({ 'err': 0, 'msg': 'Email sent successfully', 'token': token })
                }
            });

        }

    })
})


app.post('/add', (req, res) => {
    let inc = new proModel({ ...req.body })
    inc.save((err) => {
        if (err) throw err
        else {
            res.send("data added")
        }

    })
})


app.post('/getinfo', (req, res) => {
    console.log(req.body)
    userModel.findOne({ email: req.body.email }, (err, data) => {
        if (err) throw err;
        else if (data == null) {
            res.send({ err: 1, msg: "profle no found" })
        }
        else {
            console.log(data)
            res.send(data)
        }
    })
})


app.post('/getcartinfo', (req, res) => {
    console.log(req.body)
    userModel.findOne({ email: req.body.email }, (err, data) => {
        if (err) throw err;
        else if (data == null) {
            res.send({ err: 1, msg: "profle no found" })
        }
        else {
            console.log(data)
            userModel.findOneAndUpdate({ email: req.body.email }, { $set: { cart: [] } }).then(res)
            res.send(data)
        }
    })
})


app.post('/changepassword', (req, res) => {
    console.log(req.body)
    userModel.findOne({ email: req.body.email }, (err, data) => {
        if (err) throw err;
        else if (data == null) {
            res.send({ err: 1, msg: "profle no found" })
        }
        else {
            bcrypt.compare(req.body.oldpassword, data.password, function (err, result) {
                // result == true
                if (err) throw err;
                else if (result == true) {
                    console.log(data)
                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        bcrypt.hash(req.body.password, salt, function (err, hash) {
                            console.log(hash)
                            userModel.updateOne({ email: data.email }, { $set: { password: hash } }, (err) => {
                                if (err) throw err;
                                else {
                                    res.send({ err: 0, msg: "password updated" })
                                }
                            })

                        });
                    });

                }
                else {
                    console.log("empty")
                    res.send()
                }
            })
        }
    })
})


app.post('/forgetpassword', (req, res) => {
    console.log(req.body)
    userModel.findOne({ email: req.body.email }, (err, data) => {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                userModel.updateOne({ email: data.email }, { $set: { password: hash } }, (err) => {
                    if (err) throw err;
                    else {
                        res.send({ err: 0, msg: "password updated" })
                    }
                })

            });
        });
    })
    res.send()
})


app.post('/addAddress', (req, res) => {
    console.log(req.body)
    userModel.findOneAndUpdate({ email: req.body.email }, { $push: { address: req.body } }, (err) => {
        if (err) throw err;
        else {
            res.send({ err: 0, msg: 'address Added' })
        }
    })
})



app.get('/viewproduct', (req, res) => {
    console.log(req.query)
    proModel.findOne(req.query).populate(["category_id", "color_id"]).then(data => {
        console.log(data)
        res.send(data)

    })
})


app.post('/setAddress', (req, res) => {
    console.log(req.body)
    userModel.findOneAndUpdate({ email: req.body.email }, { $set: { address: req.body.address } }, (err) => {
        if (err) throw err;
        else {
            res.send()
        }
    })
})

app.post('/setcart', (req, res) => {
    console.log(req.body)
    userModel.findOneAndUpdate({ email: req.body.email }, { $set: { cart: req.body.cartitem } }, (err, data) => {
        if (err) throw err;
        else {
            // console.log(data)
            res.send()
        }

    })
})

app.post('/setorder', (req, res) => {
    console.log(req.body)
    let inc = new orderModel(req.body)
    inc.save((err) => {
        if (err) throw err;
        else {
            res.send('Order Successfully added')
        }
    })

})

app.post('/getorder', (req, res) => {
    console.log(req.body)
    orderModel.find({ buyer: req.body.email }, (err, data) => {
        if (err) throw err;
        else {
            console.log(data)
            res.send(data)
        }
    })
})


app.get('/getCategory', (req, res) => {
    catModel.find({}, (err, data) => {
        if (err) throw err;
        else {
            res.send(data)
        }
    })
})

app.get('/getColor', (req, res) => {
    colorModel.find({}, (err, data) => {
        if (err) throw err;
        else {
            res.send(data)
        }
    })
})

app.post('/updateRating', (req, res) => {
    proModel.findOneAndUpdate({ _id: req.body._id }, { $set: { rating: req.body.rating, ratingCount: req.body.ratingCount } }, { new: true }, (err, data) => {
        if (err) throw err;
        else {
            console.log(data)
            res.send(data)
        }
    })
})

app.post("/getsearch", (req, res) => {
    proModel.find({ product_name: { $regex: req.body.data, $options: '$i' } }, "product_name").populate(['category_id', 'color_id'])
        .then(response => {
            res.json(response)
        })
})


app.post('/subscribe', (req, res) => {
    let inc = new subsModel(req.body)
    inc.save((err) => {
        if (err) throw err;
        else {
            res.send()
        }
    })
})

app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`)
})