import React from 'react';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Header = ({ authHandler, auth, logout }) => {
    if (!auth) {
        return (
            <Container fluid className="mb-3">
                <Navbar bg="light">
                    <div className='col'>
                        <Link to="/" className='text-decoration-none'><Navbar.Brand className='fw-bold'>DiscoverWeeklyU</Navbar.Brand></Link>
                    </div>
                    <div className='col d-flex justify-content-end'>
                        <Button variant="primary" onClick={authHandler}>Log in with Spotify</Button>
                    </div>
                </Navbar>
            </Container>
        );
    } else {
        return (            
            <Container fluid className="mb-3">
                <Navbar bg="light">
                    <div className='col'>
                        <Link to="/" className='text-decoration-none'><Navbar.Brand className='fw-bold'>DiscoverWeeklyU</Navbar.Brand></Link>
                        <Link to="/top" className='text-decoration-none text-body'>Top Artists/Tracks</Link>
                    </div>
                    <div className='col d-flex justify-content-end'>
                        <Button variant="primary" onClick={logout}>Log Out</Button>
                    </div>
                </Navbar>
            </Container>
        );
    }
}

export default Header;
