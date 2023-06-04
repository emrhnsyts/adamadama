import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { login } from '../services/services';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toastProps } from '../helpers/toastifyHelper';


const LoginModal = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            loginUsername: "",
            loginPassword: ""
        },

        onSubmit: values => {
            login(values.loginUsername, values.loginPassword).then((res) => {
                localStorage.setItem("jwt", res.data)
                navigate(`/profile/${values.loginUsername}`)
            }).catch((err) => {
                toast.error(err.response.data.detail, toastProps);
            })
        },
        validationSchema: Yup.object({
            loginUsername: Yup.string()
                .min(2, 'Username length must exceed 2 letters.')
                .max(20, "Username length can not exceed 20 letters.")
                .required("Username is required."),
            loginPassword: Yup.string()
                .min(5, "Password length must exceed 5 letters.")
                .max(20, "Password length can not exceed 20 letters.")
                .required("Password is required.")
        })
    })
    return (
        <>
            <Button variant="outline-primary" onClick={handleShow}>
                Login
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={formik.values.loginUsername}
                                onChange={formik.handleChange} id="loginUsername" />
                            {formik.touched.loginUsername && formik.errors.loginUsername ? (
                                <Form.Text>{formik.errors.loginUsername}</Form.Text>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={formik.values.loginPassword}
                                onChange={formik.handleChange} id="loginPassword" />
                            {formik.touched.loginPassword && formik.errors.loginPassword ? (
                                <Form.Text>{formik.errors.loginPassword}</Form.Text>
                            ) : null}
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default LoginModal