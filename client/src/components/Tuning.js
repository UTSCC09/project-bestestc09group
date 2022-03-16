import React from 'react';

/* ----- Styling ----- */
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const Tuning = ({tuning}) => {
    return (
        <Form>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formAcousticness">
                        <Form.Label>Acousticness</Form.Label>
                        <Row>
                            <Col> 
                                <Form.Control type="text" placeholder="Min" />
                            </Col>
                            <Col>
                                <Form.Control type="text" placeholder="Tgt" />
                            </Col>
                            <Col>  
                                <Form.Control type="text" placeholder="Max" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDanceability">
                        <Form.Label>Danceability</Form.Label>
                        <Row>
                            <Col > 
                                <Form.Control type="text" placeholder="Min" />
                            </Col>
                            <Col >
                                <Form.Control type="text" placeholder="Tgt" />
                            </Col>
                            <Col >  
                                <Form.Control type="text" placeholder="Max" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDuration">
                        <Form.Label>Duration</Form.Label>
                        <Row>
                            <Col > 
                                <Form.Control type="text" placeholder="Min" />
                            </Col>
                            <Col >
                                <Form.Control type="text" placeholder="Tgt" />
                            </Col>
                            <Col >  
                                <Form.Control type="text" placeholder="Max" />
                            </Col>
                        </Row>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formInstramentalness">
                        <Form.Label>Instrumentalness</Form.Label>
                        <Row>
                            <Col > 
                                <Form.Control type="text" placeholder="Min" />
                            </Col>
                            <Col >
                                <Form.Control type="text" placeholder="Tgt" />
                            </Col>
                            <Col >  
                                <Form.Control type="text" placeholder="Max" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formKey">
                        <Form.Label>Key</Form.Label>
                        <Row>
                            <Col > 
                                <Form.Control type="text" placeholder="Min" />
                            </Col>
                            <Col >
                                <Form.Control type="text" placeholder="Tgt" />
                            </Col>
                            <Col >  
                                <Form.Control type="text" placeholder="Max" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formLiveness">
                        <Form.Label>Liveness</Form.Label>
                        <Row>
                            <Col > 
                                <Form.Control type="text" placeholder="Min" />
                            </Col>
                            <Col >
                                <Form.Control type="text" placeholder="Tgt" />
                            </Col>
                            <Col >  
                                <Form.Control type="text" placeholder="Max" />
                            </Col>
                        </Row>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formPopularity">
                        <Form.Label>Popularity</Form.Label>
                        <Row>
                            <Col > 
                                <Form.Control type="text" placeholder="Min" />
                            </Col>
                            <Col >
                                <Form.Control type="text" placeholder="Tgt" />
                            </Col>
                            <Col >  
                                <Form.Control type="text" placeholder="Max" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formSpeechiness">
                        <Form.Label>Speechiness</Form.Label>
                        <Row>
                            <Col > 
                                <Form.Control type="text" placeholder="Min" />
                            </Col>
                            <Col >
                                <Form.Control type="text" placeholder="Tgt" />
                            </Col>
                            <Col >  
                                <Form.Control type="text" placeholder="Max" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formTempo">
                        <Form.Label>Tempo</Form.Label>
                        <Row>
                            <Col > 
                                <Form.Control type="text" placeholder="Min" />
                            </Col>
                            <Col >
                                <Form.Control type="text" placeholder="Tgt" />
                            </Col>
                            <Col >  
                                <Form.Control type="text" placeholder="Max" />
                            </Col>
                        </Row>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formLoudness">
                        <Form.Label>Loudness</Form.Label>
                        <Row>
                            <Col > 
                                <Form.Control type="text" placeholder="Min" />
                            </Col>
                            <Col >
                                <Form.Control type="text" placeholder="Tgt" />
                            </Col>
                            <Col >  
                                <Form.Control type="text" placeholder="Max" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formTimeSignature">
                        <Form.Label>Time Signature</Form.Label>
                        <Row>
                            <Col > 
                                <Form.Control type="text" placeholder="Min" />
                            </Col>
                            <Col >
                                <Form.Control type="text" placeholder="Tgt" />
                            </Col>
                            <Col >  
                                <Form.Control type="text" placeholder="Max" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formValence">
                        <Form.Label>Valence</Form.Label>
                        <Row>
                            <Col > 
                                <Form.Control type="text" placeholder="Min" />
                            </Col>
                            <Col >
                                <Form.Control type="text" placeholder="Tgt" />
                            </Col>
                            <Col >  
                                <Form.Control type="text" placeholder="Max" />
                            </Col>
                        </Row>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formMode">
                        <Form.Label>Mode</Form.Label>
                        <Row>
                            <Col > 
                                <Form.Control type="text" placeholder="Min" />
                            </Col>
                            <Col >
                                <Form.Control type="text" placeholder="Tgt" />
                            </Col>
                            <Col >  
                                <Form.Control type="text" placeholder="Max" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEnergy">
                        <Form.Label>Energy</Form.Label>
                        <Row>
                            <Col > 
                                <Form.Control type="text" placeholder="Min" />
                            </Col>
                            <Col >
                                <Form.Control type="text" placeholder="Tgt" />
                            </Col>
                            <Col >  
                                <Form.Control type="text" placeholder="Max" />
                            </Col>
                        </Row>
                    </Form.Group>
                </Col>
            </Row>
            <Button variant="primary" type="submit">Save Changes</Button>      
        </Form>
    );
}

export default Tuning;
