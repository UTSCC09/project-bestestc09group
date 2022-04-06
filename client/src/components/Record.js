import { React, useState, useContext, useEffect } from 'react';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import TuningEdit from './TuningEdit';
import Playlist from './Playlist';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/esm/Collapse';
import { RecordContext } from './RecordPath';
import { Tree } from 'react-tree-graph';
import '../css/Record.css';
import { api } from '../api';

const Record = ({starting}) => {
    const [show, setShow] = useState(false);
    const record = useContext(RecordContext).records;
    let data_tree = {};
    const [data_for_tree, setDataForTree] = useState({});

    /*
        {
            name: currentRecord.name,
            children: []
        }
    */

    useEffect(() => {
        constructData(record);
        // document.querySelector('#hi').addEventListener('click', () => {
            
        // })
    }, [])

    function constructData(currentRecord) {
        api.getRecordsByRPID(currentRecord.rp_id, (err, rp_records) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(rp_records.data.recordsInRP)
            rp_records.data.recordsInRP.forEach((rp_record) => {
                data_tree[rp_record._id] = {
                    next: rp_record.next,
                    previous: rp_record.previous
                }
            });
            console.log(data_tree);
            setDataForTree(getGraph(currentRecord._id));
            console.log(data_for_tree);
        })
    }

    function getGraph(root) {
        let temp = {};
        temp['name'] = root
        temp['children'] = [];
        data_tree[root].next.forEach((next_r_id) => {
            temp['children'].push(getGraph(next_r_id))
        });

        return temp;
    }

    return (
        <Container fluid>
            <Tree 
                data={data_for_tree}
                height={400}
                width={600}
            />
            {/* <button id='hi'>Cool Generate</button> */}
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
                <Playlist title={starting ? "Starting Playlist" : "Recommendations"}/>
            </Row>        
        </Container>
    );
}

export default Record;
