import { React, useState } from 'react';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import TuningEdit from './TuningEdit';
import Playlist from './Playlist';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/esm/Collapse';

const Record = ({tuning}) => {
    const [show, setShow] = useState(false);

    return (
        <Container fluid>
            <Row>
                <Playlist/>
            </Row>
            
            <Button className="mb-3" onClick={() => setShow(!show)}>Edit Tuning</Button>
            <Row>
                <Collapse in={show}>
                    <Container fluid>
                        <TuningEdit tuning={tuning}/>
                    </Container>
                </Collapse>
            </Row>
        </Container>
    );
}

export default Record;
