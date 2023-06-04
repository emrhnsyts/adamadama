import React, { useContext, useState } from 'react'
import SessionContext from '../context/SessionContext'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SimpleDateTime from 'react-simple-timestamp-to-date'
import { checkJwt, extractUsername } from '../helpers/jwtHelper'
import { deleteSession, joinSession, leaveSession } from '../services/services'
import { toast } from 'react-toastify'
import { toastProps } from '../helpers/toastifyHelper'

const Sessions = () => {
    const { sessions, setSessions, totalElements, setTotalElements } = useContext(SessionContext)

    const navigate = useNavigate()
    let { username } = useParams()
    const [disabled, setDisabled] = useState(false)

    const buttons = (session) => {
        if (Date.parse(session.eventDate) > Date.now() && checkJwt()) {
            if (session.owner === extractUsername() || username === extractUsername()) {
                return <Button variant="danger" disabled={disabled} onClick={() => { handleCancel(session.id) }}>Cancel</Button>
            }
            else {
                if (session.users.includes(extractUsername())) {
                    return <Button variant="danger" disabled={disabled} onClick={() => { handleLeave(session.id) }}>Leave</Button>
                }
                else {
                    return <Button variant="primary" disabled={disabled} onClick={() => { handleJoin(session.id) }}>Join</Button>
                }
            }
        }
        return null;
    }

    const handleCancel = (sessionId) => {
        if (checkJwt()) {
            setDisabled(true)
            deleteSession(sessionId).then((res) => {
                setSessions(sessions.filter((s) => s.id !== sessionId))
                setTotalElements(totalElements - 1)
                toast.error('Session deleted.', toastProps);
                setDisabled(false)
            })
                .catch((err) => {
                    toast.error(err.data, toastProps);
                    setDisabled(false)
                })
        }
        else {
            navigate("/")
        }
    }

    const handleJoin = (sessionId) => {
        if (checkJwt()) {
            setDisabled(true)
            joinSession(sessionId).then((res) => {
                setSessions(
                    sessions.map((session) => {
                        if (session.id === sessionId) {
                            session.users.push(extractUsername())
                            return session;
                        }
                        return session;
                    })
                )
                toast.success('Joined the session.', toastProps);
                setDisabled(false)
            })
                .catch((err) => {
                    toast.error(err.response.data.detail, toastProps);
                    setDisabled(false)
                })
        }
        else {
            navigate("/")
        }
    }
    const handleLeave = (sessionId) => {
        if (checkJwt()) {
            setDisabled(true)
            leaveSession(sessionId).then((res) => {
                setSessions(
                    sessions.map((session) => {
                        if (session.id === sessionId) {
                            session.users.pop(extractUsername())
                            return session;
                        }
                        return session;
                    })
                )
                toast.error('Left the session.', toastProps);
                setDisabled(false)
            })
                .catch((err) => {
                    toast.error(err.data, toastProps);
                    setDisabled(false)
                })
        }
        else {
            navigate("/")
        }

    }
    return (
        <Row>
            {
                sessions.map((s) => {
                    return <Col className="mb-2" xl={6} key={s.id}>
                            <Card bg="dark" text="light" className="text-center">
                                <Card.Header>
                                    {s.owner ?
                                        <Link style={{ textDecoration: "none" }} to={`/profile/${s.owner}`}>{s.owner}</Link>
                                        : <div>
                                            {s.city}</div>}
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>Facility Name: {s.facilityName}</Card.Title>
                                    <Card.Text>District:   {s.district}</Card.Text>
                                    <Card.Text>Description: {s.description}</Card.Text>
                                    <Card.Text>Event date: <SimpleDateTime dateSeparator="-" timeSeparator=":">{s.eventDate}</SimpleDateTime>
                                    </Card.Text>
                                    <Card.Text>Player limit: {s.playerLimit}</Card.Text>
                                    <Card.Text>Players joined: </Card.Text>
                                    <Row>
                                        {s.users.map((user) => {
                                            return <Col md={2} key={user}>
                                                <Link style={{ textDecoration: "none" }} to={`/profile/${user}`}>{user}</Link>
                                            </Col>
                                        })}
                                    </Row>
                                    {buttons(s)}
                                </Card.Body>
                                <Card.Footer className="text-muted">Created at: <SimpleDateTime dateSeparator="-" timeSeparator=":">{s.createdAt}</SimpleDateTime>
                                </Card.Footer>
                            </Card>
                        </Col>
                })
            }
        </Row>
    )
}

export default Sessions