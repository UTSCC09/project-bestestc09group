import React from 'react';

/* ----- Styling ----- */
import Card from 'react-bootstrap/Card';


const RecommendCard = ({ title, date, clickHandler }) => {
    return (
        <Card onClick={clickHandler}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{date}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default RecommendCard;
