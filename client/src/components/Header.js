import React from 'react';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

const Header = ({ authHandler, auth }) => {
    if (!auth) {
        return (
            <Container fluid>
                <Navbar bg="light">
                    <Navbar.Brand>DiscoverWeeklyU</Navbar.Brand>
                    <Button variant="primary" onClick={authHandler}>Log in with Spotify</Button>
                </Navbar>
            </Container>
        );
    } else {
        return (            
            <Container fluid>
                <Navbar bg="light">
                    <Navbar.Brand>DiscoverWeeklyU</Navbar.Brand>
                    <Button variant="primary">Log Out</Button>
                </Navbar>
            </Container>
        );
    }
}

export default Header;
