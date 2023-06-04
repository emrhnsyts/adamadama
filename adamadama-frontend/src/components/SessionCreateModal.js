import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { addSession } from '../services/services';
import { toast } from 'react-toastify';
import { checkJwt, extractUsername } from '../helpers/jwtHelper';
import { useNavigate } from 'react-router-dom';
import { toastProps } from '../helpers/toastifyHelper';
import SessionContext from '../context/SessionContext';


const SessionCreateModal = () => {
    const { sessions, setSessions, city, totalElements, setTotalElements } = useContext(SessionContext)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate("/")

    const formik = useFormik({
        initialValues: {
            description: "",
            city: "ISTANBUL",
            district: "",
            facilityName: "",
            eventDate: "",
            playerLimit: "",
        },
        onSubmit: (values, onSubmitProps) => {
            if (checkJwt()) {
                const eventDate = new Date(values.eventDate)
                if (eventDate > Date.now()) {
                    const editedEventDate = values.eventDate.replace("T", " ")
                    addSession(values.description === "" ? null : values.description,
                        values.city,
                        values.district === "" ? null : values.district,
                        values.facilityName,
                        editedEventDate,
                        values.playerLimit)
                        .then((res) => {
                            if (city === values.city) {
                                const newSessions = [...sessions]
                                if (sessions.length >= 10) {
                                    newSessions.pop()
                                }
                                setSessions([res.data, ...newSessions,])
                                setTotalElements(totalElements + 1)
                            }
                            else if (window.location.pathname.endsWith(extractUsername())) {
                                res.data.owner = null;
                                res.data.city = values.city
                                setSessions([res.data, ...sessions,])
                            }
                            onSubmitProps.setSubmitting(false);
                            onSubmitProps.resetForm()
                            toast.success('Session created.', toastProps);
                            handleClose()
                        })
                        .catch((err) => {
                            toast.error(err.data, toastProps);
                        })
                }
                else {
                    onSubmitProps.setFieldError("eventDate", "Given date can not be past.")
                }
            }
            else {
                navigate("/")
            }
        },
        validationSchema: Yup.object({
            description: Yup.string()
                .min(2, 'Description length must exceed 2 letters.')
                .max(255, "Description length can not exceed 255 letters."),
            city: Yup.string()
                .min(2, "City length must exceed 2 letters.")
                .max(30, "City length can not exceed 30 letters.")
                .required("City is required."),
            district: Yup.string()
                .min(2, 'District length must exceed 2 letters.')
                .max(255, "District length can not exceed 255 letters."),
            facilityName: Yup.string()
                .min(2, 'Facility name length must exceed 2 letters.')
                .max(30, "Facility name length can not exceed 30 letters.")
                .required("Facility name is required."),
            eventDate: Yup.date()
                .required("Date is required."),
            playerLimit: Yup.number()
                .min(2, 'Player limit must exceed 2 letters.')
                .max(22, "Player limit can not exceed 22 letters.")
        })
    })

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                Create a Session
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a Session</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" as="textarea" value={formik.values.description}
                                onChange={formik.handleChange} id="description" />
                            {formik.touched.description && formik.errors.description ? (
                                <Form.Text>{formik.errors.description}</Form.Text>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>City</Form.Label>
                            <Form.Select value={formik.values.city} onChange={formik.handleChange} id="city">
                                <option value="TRABZON">Trabzon</option>
                                <option value="ISTANBUL">Istanbul</option>
                                <option value="ANKARA">Ankara</option>
                                <option value="IZMIR">Izmir</option>
                            </Form.Select>
                            {formik.touched.city && formik.errors.city ? (
                                <Form.Text>{formik.errors.city}</Form.Text>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>District</Form.Label>
                            <Form.Control type="text" value={formik.values.district}
                                onChange={formik.handleChange} id="district" />
                            {formik.touched.district && formik.errors.district ? (
                                <Form.Text>{formik.errors.district}</Form.Text>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Facility Name</Form.Label>
                            <Form.Control type="text" value={formik.values.facilityName}
                                onChange={formik.handleChange} id="facilityName" />
                            {formik.touched.facilityName && formik.errors.facilityName ? (
                                <Form.Text>{formik.errors.facilityName}</Form.Text>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Event Date</Form.Label>
                            <Form.Control type="datetime-local"
                                value={formik.values.eventDate}
                                onChange={formik.handleChange} id="eventDate" />
                            {formik.touched.eventDate && formik.errors.eventDate ? (
                                <Form.Text>{formik.errors.eventDate}</Form.Text>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Player Limit</Form.Label>
                            <Form.Control type="number" value={formik.values.playerLimit}
                                onChange={formik.handleChange} id="playerLimit" />
                            {formik.touched.playerLimit && formik.errors.playerLimit ? (
                                <Form.Text>{formik.errors.playerLimit}</Form.Text>
                            ) : null}
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Create
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );

}

export default SessionCreateModal