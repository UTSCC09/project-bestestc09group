import React from 'react';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import TuningEdit from './TuningEdit';
import Playlist from './Playlist';

const Record = ({tuning}) => {
    return (
        <Container fluid>
            <Row>
                <Playlist/>
            </Row>
            <Row>
                <TuningEdit tuning={tuning}/>
            </Row>
        </Container>
    );
}

export default Record;
