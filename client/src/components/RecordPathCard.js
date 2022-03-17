import React from 'react';

/* ----- Styling ----- */
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const RecordPathCard = ({ title, date, rp_id }) => {
    const history = useNavigate();
    function navigate() {
        history("/recordpath/" + rp_id, {state: {rp_id: rp_id}});
    }
    
    return (
        <Card onClick={navigate}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{date}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default RecordPathCard;
