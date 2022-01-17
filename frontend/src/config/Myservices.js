import axios from 'axios'
import { MAIN_URL } from "./URL"

export function register(data) {
    return axios.post(`${MAIN_URL}/register`, data);
}
export function login(data) {
    return axios.post(`${MAIN_URL}/login`, data)
}
export function sociallogin(data) {
    return axios.post(`${MAIN_URL}/sociallogin`, data)
}
export function sendotp(data) {
    return axios.post(`${MAIN_URL}/sendotp`, data)
}
export function getinfo(data) {
    return axios.post(`${MAIN_URL}/getinfo`, data)
}
export function changepassword(data) {
    return axios.post(`${MAIN_URL}/changepassword`, data)
}
export function getproducts(data) {
    return axios.get(`${MAIN_URL}/getproducts${data}`)
}

export function forgetpassword(data) {
    return axios.post(`${MAIN_URL}/forgetpassword`, data)
}
export function addAddress(data) {
    return axios.post(`${MAIN_URL}/addAddress`, data)
}
export function viewproducts(id) {
    return axios.get(`${MAIN_URL}/viewproduct${id}`)
}
export function setAddress(data) {
    return axios.post(`${MAIN_URL}/setAddress`, data)
}
export function setcart(data) {
    return axios.post(`${MAIN_URL}/setcart`, data)
}
export function setorder(data) {
    return axios.post(`${MAIN_URL}/setorder`, data)
}
export function getorder(data) {
    return axios.post(`${MAIN_URL}/getorder`, data)
}

export function getcartinfo(data) {
    return axios.post(`${MAIN_URL}/getcartinfo`, data)
}

export function getCategory() {
    return axios.get(`${MAIN_URL}/getCategory`)
}
export function getColor() {
    return axios.get(`${MAIN_URL}/getColor`)
}

export function updateRating(data) {
    return axios.post(`${MAIN_URL}/updateRating`, data)
}

export function getsearch(data) {
    return axios.post(`${MAIN_URL}/getsearch`, data);
}

export function subscribe(data) {
    return axios.post(`${MAIN_URL}/subscribe`, data)
}