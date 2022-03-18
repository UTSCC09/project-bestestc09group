import React, { useEffect, useState } from 'react';

/* ----- Styling ----- */
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const TuningEdit = ({tuning}) => {
    const [forms, setForms] = useState(<p>Hi</p>);

    useEffect(() => {
        const formElements = Object.keys(tuning).map((key) => {
            return <Form.Group className="mb-3" controlId={"form" + key}>
                <Form.Label>{key.toUpperCase()}</Form.Label>
                <Row>
                    <Col> 
                        <Form.Control type="text" value={tuning[key].min} placeholder="Min" />
                    </Col>
                    <Col>
                        <Form.Control type="text" value={tuning[key].target} placeholder="Tgt" />
                    </Col>
                    <Col>  
                        <Form.Control type="text" value={tuning[key].max} placeholder="Max" />
                    </Col>
                </Row>
            </Form.Group>
        })

        console.log(formElements)
        setForms(formElements);
    }, [])

    return (
        <Form className='d-flex justify-content-center flex-column'>
            <Row>
                <Col>
                    {forms}
                </Col>
            </Row>
            <Button variant="primary" type="submit">Save Changes</Button>      
        </Form>
    );
}

export default TuningEdit;
