import axios from 'axios'

const api = axios.create({
	baseURL: process.env.NODE_ENV === 'production' ? `${process.env.PUBLIC_URL}/api` : 'http://localhost:8000/api',
	withCredentials: true 
})

// auth routes
const login = (req, body) => api.post('/auth/login', req, body)
const logout = (req, body) => api.post('/auth/logout', req, body)
const verifyToken = (req, body) => api.post('/auth/token', req, body)

// user routes
const createUser = (req, body) => api.post('/users', req, body)
const getUsers = (req) => api.get('/users', req)
const getUserById = (user_id, req) => api.get(`/users/${user_id}`, req)
const getFriends = (user_id, req) => api.get(`/users/${user_id}/friends`, req)
const updateUserById = (user_id, req, body) => api.put(`/users/${user_id}`, req, body)
const deleteUserById = (user_id, req, body) => api.delete(`/users/${user_id}`)

export {
    login,
    logout,
    verifyToken,
    createUser,
    getUsers,
    getUserById,
    getFriends,
    updateUserById,
    deleteUserById
}