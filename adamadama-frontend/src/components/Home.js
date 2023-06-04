import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { getSessionsByCity, } from '../services/services'
import SessionContext from '../context/SessionContext'
import Sessions from './Sessions'

const Home = () => {

  const { sessions, setSessions, city, setCity, totalElements, setTotalElements } = useContext(SessionContext)
  const [selectedPageNumber, setSelectedPageNumber] = useState(0);

  useEffect(() => {
    if (city !== "DEFAULT") {
      getSessionsByCity(city).then((res) => {
        setSessions(res.data.content)
        setTotalElements(res.data.totalElements)
        setSelectedPageNumber(0)
      })
    }
  }, [city])

  useEffect(() => () => {
    setCity("DEFAULT")
    setSessions([])
    setSelectedPageNumber(0)
    setTotalElements(0)
  }, [])

  const arrayRange = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    );

  const handleChange = (e) => {
    setCity(e.target.value)
  }

  return (<>
    <Col lg={{ span: 4, offset: 4 }}>
      <Form.Select size="lg" className="mb-4" onChange={handleChange}>
        <option value="DEFAULT">Please choose a city to see the sessions.</option>
        <option value="TRABZON">Trabzon</option>
        <option value="ISTANBUL">Istanbul</option>
        <option value="ANKARA">Ankara</option>
        <option value="IZMIR">Izmir</option>
      </Form.Select>
    </Col>

    {totalElements > 10 &&
      <div className="d-flex justify-content-center mb-4">
        {arrayRange(1, Number.isInteger(totalElements / 10)
          ? Math.trunc(totalElements / 10)
          : Math.trunc(totalElements / 10) + 1, 1).map((p) => {
            return <Button variant="dark" className="me-2" key={p} active={selectedPageNumber === p - 1}
              onClick={() => {
                getSessionsByCity(city, p - 1).then((res) => {
                  setSelectedPageNumber(p - 1)
                  setSessions(res.data.content)
                })
              }}>
              {p}
            </Button>
          })
        }
      </div>}

    <Row>
      {sessions.length === 0 && city !== "DEFAULT"
        ?
        <div>not found</div>
        :
        <Sessions />
      }
    </Row>
  </>
  )
}

export default Home