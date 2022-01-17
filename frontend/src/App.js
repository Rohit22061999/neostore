import './App.css';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
const Nav = lazy(() => import('./components/Dashboard/Navbar'));
const Footer = lazy(() => import('./components/Dashboard/Footer'))
const Login = lazy(() => import('./components/Login'))
const Register = lazy(() => import('./components/Register'))
const Forgetpassword = lazy(() => import('./components/Forgetpassword'))
const Home = lazy(() => import('./components/Home'))
const Product = lazy(() => import('./components/Product'))
const Cart = lazy(() => import('./components/Cart'))
const Profile = lazy(() => import('./Profile/Profile'))
const RecoverPassword = lazy(() => import('./components/RecoverPassword'))
const ViewProduct = lazy(() => import('./components/ViewProduct'))
const Checkout = lazy(() => import('./components/Checkout'))
const Invoice = lazy(() => import('./components/Invoice'))
const Thankyou = lazy(() => import('./components/Dashboard/Thankyou'))

// import Nav from './components/Dashboard/Navbar';
// import Footer from './components/Dashboard/Footer'
// import Login from './components/Login';
// import Register from './components/Register'
// import Forgetpassword from './components/Forgetpassword';
// import Home from './components/Home';
// import Product from './components/Product';
// import Cart from './components/Cart'
// import Profile from './Profile/Profile'
// import RecoverPassword from './components/RecoverPassword';
// import ViewProduct from './components/ViewProduct';
// import Checkout from './components/Checkout'
// import Invoice from './components/Invoice';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Nav />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgetpassword' element={<Forgetpassword />} />
            <Route path='/home' element={<Home />} />
            <Route path='/product' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/recoverpassword' element={<RecoverPassword />} />
            <Route path='/viewproduct' element={<ViewProduct />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/invoice' element={<Invoice />} />
            <Route path='/thankyou' element={<Thankyou />} />
          </Routes>
          <Footer />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
