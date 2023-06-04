import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserByUsername } from '../services/services'
import { Card, Row } from 'react-bootstrap'
import SessionContext from '../context/SessionContext'
import Sessions from "./Sessions"

const Profile = () => {
  const navigate = useNavigate()
  let { username } = useParams()
  const [user, setUser] = useState({
    username: "",
    email: "",
    nameAndSurname: "",
    phoneNumber: ""
  })

  const { sessions, setSessions } = useContext(SessionContext)

  useEffect(() => {
    getUserByUsername(username)
      .then((res) => {
        setUser({
          username: res.data.username,
          email: res.data.email,
          nameAndSurname: res.data.nameAndSurname,
          phoneNumber: res.data.phoneNumber
        })
        setSessions(res.data.sessions)
      })
      .catch(() => {
        navigate("/*")
      })
  }, [username])

  useEffect(() => () => { setSessions([]) }, [])

  return (
    <>
      <Row className="d-flex justify-content-center mb-4">
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{user.username}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
            <Card.Text>{user.nameAndSurname} </Card.Text>
            <Card.Text>{user.phoneNumber} </Card.Text>
          </Card.Body>
        </Card>
      </Row>
      <h3 className="d-flex justify-content-center mb-4">Owned Sessions</h3>
      {sessions.length !== 0 && <Sessions />}

    </>
  )
}

export default Profile