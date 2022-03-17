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

    function addPath(playlist_id) {
        api.getPlaylistInfo(playlist_id, (error, playlist) => {
            if (error) {
                console.log(error);
                return;
            }
            let tracks = [];

            playlist.tracks.items.forEach(track => {
                if (!track.track.is_local)
                    tracks.push(track.track.id);
            });
            api.newPlaylistMongo(tracks, (error, mongo_playlist) => {
                if (error) {
                    console.log(error);
                    return;
                }
                api.newStartingRecordMongo(mongo_playlist.data.addPlaylist._id, (error, starting_record) => {
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
            });

        });

    }

    return (
        <Container fluid>
            {playlists.map((data) => {
                return (
                    <Card key={data.name} onClick={() => addPath(data.id)}>
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
