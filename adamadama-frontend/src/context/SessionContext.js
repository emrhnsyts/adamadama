import React, { createContext, useState } from 'react'

const SessionContext = createContext()

export const SessionProvider = ({ children }) => {

    const [sessions, setSessions] = useState([])
    const [city, setCity] = useState("DEFAULT")
    const [totalElements, setTotalElements] = useState(0)

    const values = {
        sessions, setSessions, city, setCity, totalElements, setTotalElements,
    }
    return (
        <SessionContext.Provider value={values}>{children}</SessionContext.Provider>
    )
}

export default SessionContext;