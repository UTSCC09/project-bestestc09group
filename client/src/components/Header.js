import React from 'react';
import { Link } from 'react-router-dom';


/* ----- Styling ----- */
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import './Header.css';


const Header = ({logInHandler}) => {
    return (
        <Navbar bg="light">
            <Container fluid>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Nav className="justify-content-between container-fluid">
                    <Link to="/">
                        <Navbar.Brand>DiscoverWeeklyU</Navbar.Brand>
                    </Link>
                    <Link to="/recommendations">
                        <Button variant="secondary">My Recommendations</Button>
                    </Link>
                    <Button variant="primary" onClick={logInHandler}>Log in with Spotify</Button>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;
