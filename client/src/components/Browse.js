import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import RecordPathCard from './RecordPathCard';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

const Browse = () => {
    
    const navigate = useNavigate();

    /* States */
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [recordPaths, setRecordPaths] = useState([]);
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); 

    function handleError(msg) {
        console.log("ERROR: ", msg);
        setShowError(true);
        setError(msg)
    }

    function dismissError() {
        setShowError(false);
        setError('');
    }

    function navigateCreatePage(e) {
        e.preventDefault();
        let record_path = recordPaths.find(rp => rp.name === name);
        if (!name) {
            handleError("Cannot have a blank name");
            setShow(false);
            return;
        }
        if (record_path === undefined)
            navigate("/create", { state: {name: name}})
        else {
            setShow(false);
            handleError("Record path with name: " + name + " already exists");
        }
    }

    function updateRecordPaths() {
        setLoading(true);
        api.getUserInfo((error, user) => {
          if (error) {
            return;
          }
          api.getRecordPathsMongo(user.id, (error, paths) => {
            if (error) {
              return;
            }
            setRecordPaths(paths.data.recordPaths);
            setLoading(false);
          });
        });
    }

    function deleteRP(rp_id) {
        return function (event) {            
            event.stopPropagation();
            api.deleteRecordPath(rp_id, (error, data) => {
                if (error) {
                    console.log(error);
                }
                updateRecordPaths();
            })
        }
    }

    useEffect(() => {
        updateRecordPaths();
    }, []);

    return (
        <>
            <Alert variant="danger" show={showError} onClose={dismissError} dismissible>
                <Alert.Heading>Something went wrong...</Alert.Heading>
                <p>{error}</p>
            </Alert>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new Discover Record</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={navigateCreatePage}>
                        <Form.Group className="mb-3" controlId="formRecordPath">
                            <Form.Label>Record Path Name</Form.Label>
                            <Form.Control type="text" placeholder="ex. My recommendations" value={name} onChange={e => setName(e.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">Create</Button>  
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShow(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal>
            <Container fluid>
                <Row>
                    <Col sm="3">
                        <Card onClick={() => setShow(true)}>
                            <Card.Body>
                                <Card.Title>Create New</Card.Title>
                                <Card.Text>Add a new Discovery Record</Card.Text>
                                <Button onClick={() => setShow(true)}>Create</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    {loading? <Spinner animation="border"/> :
                    recordPaths.map((data) => {
                        return (
                            <Col sm="3" key={data.name}>
                                <RecordPathCard title={data.name} date={data.updatedAt} rp_id={data._id} handleDelete={deleteRP(data._id)}/>
                            </Col> 
                        );
                    })}
                </Row>
            </Container>
        </>
    );
}

export default Browse;
