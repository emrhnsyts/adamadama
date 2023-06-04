import axios from "axios"

const apiUrl = "/api/v1"



export const login = (username, password) => {
    return axios.post(`${apiUrl}/users/login`, {
        username, password
    })
}

export const register = (username, password, email, phoneNumber, name, surname) => {
    return axios.post(`${apiUrl}/users/register`, {
        username, password, email, phoneNumber, name, surname,
    })
}

export const getUserByUsername = (username) => {
    return axios.get(`${apiUrl}/users/${username}`)
}

export const addSession = (description, city, district, facilityName, eventDate, playerLimit) => {
    return axios.post(`${apiUrl}/sessions`, {
        description, city, district, facilityName, eventDate, playerLimit
    },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })
}

export const getSessionsByCity = (city, page = 0, size = 10) => {
    return axios.get(`${apiUrl}/sessions?city=${city}&page=${page}&size=${size}`)
}

export const deleteSession = (sessionId) => {
    return axios.delete(`${apiUrl}/sessions/${sessionId}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })
}

export const joinSession = (sessionId) => {
    return axios.post(`${apiUrl}/sessions/${sessionId}`, null,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })
}

export const leaveSession = (sessionId) => {
    return axios.put(`${apiUrl}/sessions/${sessionId}`, null,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })
}