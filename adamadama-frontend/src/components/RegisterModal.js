import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { register } from '../services/services';
import { toast } from 'react-toastify';
import { toastProps } from '../helpers/toastifyHelper';

const RegisterModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const formik = useFormik({
        initialValues: {
            registerUsername: "",
            name: "",
            surname: "",
            phoneNumber: "",
            email: "",
            registerPassword: "",
        },
        onSubmit: (values, onSubmitProps) => {
            register(values.registerUsername, values.registerPassword, values.email, values.phoneNumber,
                values.name, values.surname).then((res) => {
                    onSubmitProps.setSubmitting(false);
                    onSubmitProps.resetForm()
                    toast.success('Successfully registered, you can now login.', toastProps);
                    handleClose()
                }).catch((err) => {
                    toast.error(err.data, toastProps);
                })
        },
        validationSchema: Yup.object({
            registerUsername: Yup.string()
                .min(2, 'Username length must exceed 2 letters.')
                .max(20, "Username length can not exceed 20 letters.")
                .required("Username is required."),
            name: Yup.string()
                .min(2, 'Name length must exceed 2 letters.')
                .max(30, "Name length can not exceed 30 letters.")
                .required("Name is required."),
            surname: Yup.string()
                .min(2, 'Surname length must exceed 2 letters.')
                .max(30, "Surname length can not exceed 30 letters.")
                .required("Surname is required."),
            phoneNumber: Yup.string()
                .min(8, 'Phone number length must exceed 8 letters.')
                .max(12, "Phone number length can not exceed 12 letters.")
                .required("Phone number is required."),
            registerPassword: Yup.string()
                .min(5, "Password length must exceed 5 letters.")
                .max(30, "Password length can not exceed 30 letters.")
                .required("Password is required."),
            email: Yup.string()
                .email("Email must be in a proper form.")
                .required("Email is required."),
        })
    })

    return (
        <>
            <Button variant="outline-primary" onClick={handleShow}>
                Register
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={formik.values.registerUsername}
                                onChange={formik.handleChange} id="registerUsername" />
                            {formik.touched.registerUsername && formik.errors.registerUsername ? (
                                <Form.Text>{formik.errors.registerUsername}</Form.Text>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={formik.values.registerPassword}
                                onChange={formik.handleChange} id="registerPassword" />
                            {formik.touched.registerPassword && formik.errors.registerPassword ? (
                                <Form.Text>{formik.errors.registerPassword}</Form.Text>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={formik.values.name}
                                onChange={formik.handleChange} id="name" />
                            {formik.touched.name && formik.errors.name ? (
                                <Form.Text>{formik.errors.name}</Form.Text>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Surname</Form.Label>
                            <Form.Control type="text" value={formik.values.surname}
                                onChange={formik.handleChange} id="surname" />
                            {formik.touched.surname && formik.errors.surname ? (
                                <Form.Text>{formik.errors.surname}</Form.Text>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="number" value={formik.values.phoneNumber}
                                onChange={formik.handleChange} id="phoneNumber" />
                            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                <Form.Text>{formik.errors.phoneNumber}</Form.Text>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" value={formik.values.email}
                                onChange={formik.handleChange} id="email" />
                            {formik.touched.email && formik.errors.email ? (
                                <Form.Text>{formik.errors.email}</Form.Text>
                            ) : null}
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Register
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default RegisterModal