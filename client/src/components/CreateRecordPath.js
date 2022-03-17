import { React, useState, useEffect } from 'react';
import {api} from '../api';
import { useLocation } from 'react-router-dom';

/* ----- Styling ----- */
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';

const CreateRecordPath = () => {
    const {state} = useLocation();
    const [playlists, setPlaylists] = useState([]);

    function renderPlaylists() {
        api.getUserPlaylists((error, data) => {
            if (error) {
                console.log(error);
                return;
            }
            setPlaylists(data);
        });
    }

    useEffect(() => {
        renderPlaylists();
    }, []);

    function addPath() {
        api.newStartingRecordMongo((error, starting_record) => {
            if (error) {
                console.log(error);
                return;
            }
            api.newRecordPathMongo(starting_record.data.addRecord._id, state.name, (error, path) => {
                if (error) {
                    console.log(error);
                    return;
                }

            });
        });
    }

    return (
        <Container fluid>
            {playlists.map((data) => {
                return (
                    <Card key={data.name} onClick={() => addPath()}>
                        <Card.Body>
                            <Card.Title>{data.name}</Card.Title>
                        </Card.Body>
                    </Card>
                );
            })}
        </Container>
    );
}

export default CreateRecordPath;
