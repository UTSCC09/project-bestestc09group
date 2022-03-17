import React, { useState, useEffect } from 'react';
import Record from './Record';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const fake_records = [];

const RecordPath = () => {
    const [active, setActive] = useState(1);
    
    function getNumRecords(){
        return 5;
    }

    function changePageNumber(number) {
        setActive(number);
    }

    function getRecord() {
        return (<Record />);
    }

    function getPages() {
        let items = [];
        for (let number = 0; number < getNumRecords(); number++) {
            items.push(
                <Pagination.Item key={number} active={number === active} onClick={() => changePageNumber(number)}>
                    {number + 1}
                </Pagination.Item>
            )
        }
        console.log(items);
        return items;
    } 

    return (
        <Container fluid>
            <Row>
                {getRecord()}
            </Row>
            <Row>
                <Pagination className="justify-content-center">
                    <Pagination.First onClick={() => setActive(0)}/>
                    <Pagination.Prev onClick={() => setActive((active - 1 + getNumRecords()) % getNumRecords())}/>
                    {getPages()}
                    <Pagination.Next onClick={() => setActive((active + 1) % getNumRecords())}/>
                    <Pagination.Last onClick={() => setActive(getNumRecords() - 1)}/>
                </Pagination>
            </Row>
        </Container>
    );
}

export default RecordPath;
