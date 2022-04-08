import { React, useState, useEffect } from 'react';
import {api} from '../api';
import { useLocation, useNavigate } from 'react-router-dom';

/* ----- Styling ----- */
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

const CreateRecordPath = () => {
    const {state} = useLocation();
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function renderPlaylists() {
        setLoading(true);
        api.getUserPlaylists((error, data) => {
            if (error) {
                console.log(error);
                return;
            }
            setPlaylists(data);
            setLoading(false);
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
                    api.getUserInfo((error, user) => {
                        if (error) {
                            console.log(error);
                            return;
                        }
                        api.newRecordPathMongo(starting_record.data.addRecord._id, state.name, user.id, (error, path) => {
                            if (error) {
                                console.log(error);
                                return;
                            }
                            let rp_id = path.data.addRecordPath._id;
                            if (!rp_id) {
                                alert("Could not create new Discovery Record, please choose a unique name and try again.");
                                navigate("/");
                                return;
                            }

                            api.updateRecordParentMongo(starting_record.data.addRecord._id, rp_id, (error, updated_record) => {
                                if (error) {
                                    console.log(error);
                                    return;
                                }

                                navigate("/recordpath/" + rp_id, {state: {rp_id: rp_id}});
                            })
                        });
                    });
                });
            });

        });

    }

    return (
        <Container fluid>
            {loading? <Spinner animation="border"/> : playlists.map((data) => {
                return (
                    <Card className="mb-3" key={data.name} onClick={() => addPath(data.id)}>
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
