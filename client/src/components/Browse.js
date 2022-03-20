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

const fake_data = [{title: "test1", date:"2022-03-04"}, {title: "test2", date:"2021-07-26"},{title: "test3", date:"2022-05-01"}, {title: "test4", date:"2021-08-05"}]

const Browse = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState('');
    const [recordPaths, setRecordPaths] = useState([]);
    const navigate = useNavigate();

    function navigateCreatePage(e) {
        e.preventDefault();
        navigate("/create", { state: {name: name}})
    }

    function updateRecordPaths() {
        api.getUserInfo((error, user) => {
          if (error) {
            console.log(error);
            return;
          }
          api.getRecordPathsMongo(user.id, (error, paths) => {
            if (error) {
              console.log(error);
              return;
            }
            console.log(paths.data.recordPaths);
            setRecordPaths(paths.data.recordPaths);
          });
        });
    }

    useEffect(() => {
        updateRecordPaths();
    }, []);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
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
                    <Button variant="danger" onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
            <Container fluid>
                <Row>
                    <Col className="mb-4" sm="3">
                        <Card onClick={handleShow}>
                            <Card.Body>
                                <Card.Title>Create New</Card.Title>
                                <Card.Text>Add a new Discovery Record</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    {recordPaths.map((data) => {
                        return (
                            <Col sm="3" key={data.name}>
                                <RecordPathCard title={data.name} date={data.updatedAt} rp_id={data._id}/>
                            </Col> 
                        );
                    })}
                </Row>
            </Container>
        </>
    );
}

export default Browse;
