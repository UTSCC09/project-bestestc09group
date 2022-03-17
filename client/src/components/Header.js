import React from 'react';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Header = ({ authHandler, auth }) => {
    if (!auth) {
        return (
            <Container fluid>
                <Navbar bg="light">
                    <Link to="/"><Navbar.Brand>DiscoverWeeklyU</Navbar.Brand></Link>
                    <Button variant="primary" onClick={authHandler}>Log in with Spotify</Button>
                </Navbar>
            </Container>
        );
    } else {
        return (            
            <Container fluid>
                <Navbar bg="light">
                    <Link to="/"><Navbar.Brand>DiscoverWeeklyU</Navbar.Brand></Link>
                    <Button variant="primary">Log Out</Button>
                </Navbar>
            </Container>
        );
    }
}

export default Header;
