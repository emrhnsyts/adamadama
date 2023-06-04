import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import { Link, useNavigate } from 'react-router-dom'
import SessionCreateModal from './SessionCreateModal'
import { checkJwt, extractUsername } from '../helpers/jwtHelper'

const AppNavbar = () => {
    const navigate = useNavigate()

    return (
        <Navbar className="mb-4" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand onClick={() => navigate("/")}>AdamAdama</Navbar.Brand>
                <Nav className="me-end">

                    {checkJwt() ? <>
                        <SessionCreateModal />
                        <Button variant="outline-primary" className="mx-2">
                            <Link to={`/profile/${extractUsername()}`} style={{ "textDecoration": "none" }}>Profile</Link>
                        </Button>
                        <Button variant="outline-danger" onClick={() => {
                            localStorage.clear()
                            navigate("/")
                        }}>
                            Logout
                        </Button>
                    </> : <> <Nav className="mx-2">
                        <LoginModal />
                    </Nav>
                        <Nav>
                            <RegisterModal />
                        </Nav>
                    </>}
                </Nav>
            </Container>
        </Navbar>
    )
}

export default AppNavbar