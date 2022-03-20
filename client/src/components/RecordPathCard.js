import React from 'react';
import { useNavigate } from 'react-router-dom';

/* ----- Styling ----- */
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const RecordPathCard = ({ title, date, rp_id, handleDelete }) => {
    const history = useNavigate();
    function navigate() {
        history("/recordpath/" + rp_id, {state: {rp_id: rp_id}});
    }
    
    return (
        <Card className="mb-4" onClick={navigate}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{date}</Card.Text>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Card.Body>
        </Card>
    );
}

export default RecordPathCard;
