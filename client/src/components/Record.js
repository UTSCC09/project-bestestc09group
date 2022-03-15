import React from 'react';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tuning from './Tuning';

const Record = ({tuning}) => {
    return (
        <Container fluid>
            <Row>
                
            </Row>
            <Row>
                <Tuning tuning={tuning}/>
            </Row>
        </Container>
    );
}

export default Record;
