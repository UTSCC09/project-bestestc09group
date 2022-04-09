import React, { useState, useContext, useRef } from 'react';
import { UpdateRecordContext } from './RecordPathDetails';
import { api } from '../api';

/* ----- Styling ----- */
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

const tooltips = {
    "acousticness": {
        description: <>How acoustic a track is. Decimal &ge;0, &le;1</>,
        max: 1,
        step: '.001',
        min: 0
    },
    "danceability": {
        description: <>How suitable a track is for dancing. Decimal &ge; 0, &le; 1</>,
        max: 1,
        step: '.001',
        min: 0
    },
    "duration_ms": {
        description: <>Duration of a track in milliseconds. Number &gt; 0</>,
        min: 0
    },
    "energy": {
        description: <>How intense and active a track is (fast, loud, noisy). Decimal &ge; 0, &le; 1</>,
        max: 1,
        step: '.001',
        min: 0
    },
    "instrumentalness": {
        description: <>How much of a track is instrumental. Decimal &ge; 0, &le; 1</>,
        max: 1,
        step: '.001',
        min: 0
    },
    "key": {
        description: <>The track's key, -1 = no key, 0 = C, 1 = C♯/D♭, 2 = D, etc. Number &ge; -1, &le; 11</>,
        max: 11,
        min: -1
    },
    "liveness": {
        description: <>Detects whether an audience is present in a track. Decimal &ge; 0, &le; 1</>,
        max: 1,
        step: '.001',
        min: 0
    },
    "loudness": {
        description: <>How loud a track is on average, measured in decibels (dB). Number typically &ge; -60, &le; 0</>,
        max: 0,
        step: '.001',
        min: -70
    },
    "mode": {
        description: <>Whether the track's modality is minor or major. 0 (minor) or 1 (major)</>,
        max: 1,
        min: 0
    },
    "popularity": {
        description: <>How popular a track is. Number &ge; 0, &le; 100</>,
        max: 100,
        min: 0
    },
    "speechiness": {
        description: <>How much of a track is spoken words. Decimal &ge; 0, &le; 1</>,
        max: 1,
        step: '.001',
        min: 0
    },
    "tempo": {
        description: <>Estimated tempo of a track in beats per minute (BPM). Decimal &gt; 0</>,
        step: '.001',
        min: 0
    },
    "time_signature": {
        description: <>Estimated number of beats (quarter notes in this case) in a bar. Number &ge; 3, &le; 7</>,
        max: 7,
        min: 3
    },
    "valence": {
        description: <>How positive (cheerful, happy) a track is. Decimal &ge; 0, &le; 1</>,
        max: 1,
        step: '.001',
        min: 0
    }
}

const TuningEdit = ({ tuning, record, tracks }) => {
    const [tuning_data, setTuningData] = useState(tuning);
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [seeded, setSeeded] = useState(true);
    const { update, setUpdate } = useContext(UpdateRecordContext);
    let updated = useRef(update);

    function handleError(msg) {
        setShowError(true);
        setError(msg)
    }

    function dismissError() {
        setShowError(false);
        setError('');
    }

    function handleChange(event) {
        let target = event.target;
        let name_arr = target.name.split(":");
        let key = name_arr[0];
        let attribute = name_arr[1];
        let val = target.value;

        let new_tuning_data = { ...tuning_data };
        new_tuning_data[key][attribute] = val;
        setTuningData(new_tuning_data);
    }

    function convertTuningToQuery(tuning_json) {
        const tuning_query = Object.keys(tuning_json).map((attribute) => {
            return Object.keys(tuning_json[attribute]).map((level) => {
                return level + "_" + attribute + "=" + tuning_json[attribute][level];
            }).join('&');
        }).join("&");

        return tuning_query;
    }

    function getSimilarityTuning() {
        api.getSimilarityTuning(record.rp_id, (error, res) => {
            if (error) {
                console.log(error);
                return;
            }

            if (!res.data.similarity) {
                handleError("Please like at least one song to Tune by similarity")
                return;
            }
            
            let tuning = {...tuning_data};
            let sim = res.data.similarity;
            Object.keys(tuning_data).forEach(key => {
                if (key in sim)
                    tuning[key].target = sim[key];
            });
            setTuningData(tuning);
        });
    }

    function handleSubmission(event) {
        event.preventDefault();
        setLoading(true);

        api.getRPTracks(record.rp_id, (err, rp_tracks) => {
            let seed_tracks;

            if (!seeded || rp_tracks.data.tracks.likes.length === 0) {
                seed_tracks = tracks.map((track) => {
                    return track.id;
                });
            } else {
                seed_tracks = rp_tracks.data.tracks.likes;
            }
    
            seed_tracks = [...new Set(seed_tracks)]
    
            let query = {
                seed_artists: [],
                seed_tracks: seed_tracks,
                seed_genre: []
            }
            api.getRecommendations("seed_artists=" + query.seed_artists.join(',') + "&seed_tracks=" + query.seed_tracks.join(',') + "&seed_genres=" + query.seed_genre.join(',') + "&" + convertTuningToQuery(tuning_data), (err, recommendations) => {
                if (err) {
                    console.log(err);
                    return;
                }

                let new_tracks = []

                recommendations.forEach((recommendation) => {
                    recommendation.tracks.forEach((track) => {
                        new_tracks.push(track.id);
                    })
                })

                new_tracks = [...new Set(new_tracks)]

                // using recommendations create mongo playlist object
                if (err) {
                    console.log(err);
                    return;
                }

                new_tracks = new_tracks.filter((track) => {
                    return rp_tracks.data.tracks.likes.indexOf(track) === -1;
                })

                new_tracks = new_tracks.filter((track) => {
                    return rp_tracks.data.tracks.dislikes.indexOf(track) === -1;
                })

                api.newPlaylistMongo(new_tracks, (err, created_playlist) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    // make a new record with the created playlist and tuning data
                    api.newRecordMongo(record._id, tuning_data, created_playlist.data.addPlaylist._id, record.rp_id, (err, created_record) => {
                        if (err) {
                            return
                        }

                        // add new record id to previous records next array
                        api.updateRecordNextMongo(record._id, created_record.data.addRecord._id, (err, updated_record) => {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            setLoading(false);
                            updated.current = !updated.current;
                            setUpdate(updated.current);
                        })
                    })
                })
            })
        })
    }

    return (
        <Form onSubmit={handleSubmission} className="border-top pt-3">
            <Alert variant="danger" show={showError} onClose={dismissError} dismissible>
                <Alert.Heading>Something went wrong...</Alert.Heading>
                <p>{error}</p>
            </Alert>
            <Col className='mb-2'>
                <Button variant="primary" type="submit">{loading? <Spinner animation="border"/> : "Generate Recommendations"}</Button>
            </Col>
            <Col className='mb-2'>
                <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={<Tooltip>{"Generates a tuning based on liked songs."}</Tooltip>}>
                    <Button variant="primary" onClick={getSimilarityTuning}>Tune by similarities</Button>
                </OverlayTrigger>
            </Col>
            <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={<Tooltip>{"Recommendations are seeded based on liked songs (default), by record otherwise"}</Tooltip>}>
                <Form.Check type="switch" label="&#9432; seed" checked={seeded} onChange={() => setSeeded(!seeded)}/>
            </OverlayTrigger>
            <Row>
                <Col>
                    <h4>Min</h4>
                </Col>
                <Col>
                    <h4>Target</h4>
                </Col>
                <Col>
                    <h4>Max</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    {
                        Object.keys(tuning_data).map((key) => {
                            return <Form.Group key={key} className="mb-3" controlId={"form" + key}>
                                <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={<Tooltip>{tooltips[key]['description']}</Tooltip>}>
                                    <Form.Label>{key.toUpperCase()} &#9432;</Form.Label>
                                </OverlayTrigger>
                                <Row>
                                    <Col>
                                        <Form.Control name={key + ":min"} onChange={handleChange} type="number" min={tooltips[key]['min']} step={tooltips[key]['step']} max={tooltips[key]['max']} value={tuning_data[key].min} placeholder="Min" />
                                    </Col>
                                    <Col>
                                        <Form.Control name={key + ":target"} onChange={handleChange} type="number" step={tooltips[key]['step']} value={tuning_data[key].target} min={tuning_data[key].min} max={tuning_data[key].max} placeholder="Tgt" />
                                    </Col>
                                    <Col>
                                        <Form.Control name={key + ":max"} onChange={handleChange} type="number" min={tooltips[key]['min']} step={tooltips[key]['step']} max={tooltips[key]['max']} value={tuning_data[key].max} placeholder="Max" />
                                    </Col>
                                </Row>
                            </Form.Group>
                        })
                    }
                </Col>
            </Row>
        </Form>
    );
}

export default TuningEdit;
