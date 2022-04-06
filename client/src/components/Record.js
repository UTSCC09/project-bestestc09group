import { React, useState } from 'react';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import TuningEdit from './TuningEdit';
import Playlist from './Playlist';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/esm/Collapse';
import 'react-tree-graph/dist/style.css'
import '../css/Record.css';

const Record = ({record, tracks}) => {
    const [show, setShow] = useState(false);

    return (
        <div>
            <div className='d-flex justify-content-center mt-3'>
                <Button className="mb-3 w-25" onClick={() => setShow(!show)}>Edit Tuning</Button>
            </div>
            <Row>
                <Collapse in={show} className="w-50">
                    <Container fluid>
                        <TuningEdit tuning={record.tuning} tracks={tracks} record={record}/>
                    </Container>
                </Collapse>
            </Row>
            <Row>
                <Playlist tracks={tracks} rp_id={record.rp_id}/>
            </Row>           
        </div> 
    );
}

export default Record;
