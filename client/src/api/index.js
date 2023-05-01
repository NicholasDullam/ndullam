import axios from 'axios'

const api = axios.create({
	baseURL: process.env.NODE_ENV === 'production' ? `${process.env.PUBLIC_URL}/api` : 'http://localhost:8000/api',
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
const updateUserById = (user_id, req, body) => api.put(`/users/${user_id}`, body, req)
const deleteUserById = (user_id, req) => api.delete(`/users/${user_id}`, req)

// script routes
const getScripts = (req) => api.get('/scripts', req)
const getScriptById = (script_id, req) => api.get(`/scripts/${script_id}`, req)
const runScript = (script_id, req, body) => api.post(`/scripts/${script_id}`, body ,req)

// compiler routes
const compileCode = (req, body) => api.post('/java-arm/compile', body, req)

export {
    login,
    logout,
    verifyToken,
    createUser,
    getUsers,
    getUserById,
    getFriends,
    updateUserById,
    deleteUserById,
    getScripts,
    getScriptById,
    runScript,
    compileCode
}