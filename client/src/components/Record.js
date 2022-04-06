import { React, useState, useContext, useEffect } from 'react';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import TuningEdit from './TuningEdit';
import Playlist from './Playlist';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/esm/Collapse';
import { RecordContext } from './RecordPath';
import 'react-tree-graph/dist/style.css'
import '../css/Record.css';
import { api } from '../api';

const Record = ({record, tracks}) => {
    console.log(record);
    const [show, setShow] = useState(false);

    return (
        <div>
            <div className='d-flex justify-content-center mt-3'>
                <Button className="mb-3 w-25" onClick={() => setShow(!show)}>Edit Tuning</Button>
            </div>
            <Row>
                <Collapse in={show} className="w-50">
                    <Container fluid>
                        <TuningEdit tuning={record.tuning}/>
                    </Container>
                </Collapse>
            </Row>
            <Row>
                <Playlist tracks={tracks}/>
            </Row>           
        </div> 
    );
}

export default Record;
