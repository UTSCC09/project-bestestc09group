import React, { useState, useEffect } from 'react';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import RecommendCard from './RecommendCard';

const fake_data = [{title: "test1", date:"2022-03-04"}, {title: "test2", date:"2021-07-26"},{title: "test3", date:"2022-05-01"}, {title: "test4", date:"2021-08-05"}]

const Browse = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>  
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new Discover Record</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Row>
                            <Col>Manual</Col>
                            <Col>Similarity</Col>
                            <Col>Algorithm</Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
            <Container fluid>
                <Row>
                    <Col sm="3">
                        <Card onClick={handleShow}>
                            <Card.Body>
                                <Card.Title>Create New</Card.Title>
                                <Card.Text>Add a new Discovery Record</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    {fake_data.map((data) => (
                        <Col sm="3" key={data.title}>
                            <RecommendCard title={data.title} date={data.date}/>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default Browse;
