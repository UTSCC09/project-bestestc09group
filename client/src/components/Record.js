import { React, useState } from 'react';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import TuningEdit from './TuningEdit';
import Playlist from './Playlist';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/esm/Collapse';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import 'react-tree-graph/dist/style.css'
import '../css/Record.css';
import { api } from '../api';

const Record = ({record, tracks}) => {
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const [name, setName] = useState('');

    function savePlaylist(e) {
        e.preventDefault();
        api.createPlaylist(name, (err, playlist) => {
            if (err) {
                console.log(err);
                return;
            }

            const track_args = tracks.map((track) => {
                return track.uri
            });

            api.addTracksToPlaylist(track_args, playlist.id, (err, playlist_snapshot) => {
                if (err) {
                    console.log(err);
                    return;
                }

                handleClose();
            })
        })
    }

    return (
        <div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new Spotify Playlist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={savePlaylist}>
                        <Form.Group className="mb-3" controlId="formPlaylist">
                            <Form.Label>Playlist Name</Form.Label>
                            <Form.Control type="text" placeholder="ex. My New Playlist" value={name} onChange={e => setName(e.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">Save Playlist</Button>  
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
            <div className='d-flex justify-content-center mt-3'>
                <Button className="mb-3 w-25" onClick={handleShow}>Save Playlist to Spotify</Button>
            </div>
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
