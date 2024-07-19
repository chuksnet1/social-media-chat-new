import axios from "axios"

const API = axios.create({baseURL: "http://localhost:5000"})

//formData is received from our action
export const logIn =(formData) => API.post('/auth/login', formData)
console.log(logIn)
export const signUp =(formData) => API.post('/auth/register', formData)

