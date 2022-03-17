import React from 'react';

/* ----- Styling ----- */
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const RecordPathCard = ({ title, date }) => {
    const history = useNavigate();
    function navigate() {
        history("/recordpath/" + title);
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
