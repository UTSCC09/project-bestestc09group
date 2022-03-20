import React, { useEffect, useState, useRef } from 'react';

import { api } from '../api';

/* ----- Styling ----- */
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { RecordContext } from './RecordPath';


const TuningEdit = ({tuning}) => {
    // const [forms, setForms] = useState();
    const tracks = React.useContext(RecordContext).tracks;
    const record = React.useContext(RecordContext).records;
    console.log(record);
    console.log("HI RECORD")
    const [tuning_data, setTuningData] = useState(tuning);
    let forms = Object.keys(tuning_data).map((key) => {
        return <Form.Group key={key} className="mb-3" controlId={"form" + key}>
            <Form.Label>{key.toUpperCase()}</Form.Label>
            <Row>
                <Col> 
                    <Form.Control name={key + ":min"} onChange={handleChange} type="text" value={tuning_data[key].min} placeholder="Min" />
                </Col>
                <Col>
                    <Form.Control name={key + ":target"} onChange={handleChange} type="text" value={tuning_data[key].target} min={tuning_data[key].min} max={tuning_data[key].max} placeholder="Tgt" />
                </Col>
                <Col>  
                    <Form.Control name={key + ":max"} onChange={handleChange} type="text" value={tuning_data[key].max} placeholder="Max" />
                </Col>
            </Row>
        </Form.Group>
    })

    function handleChange(event) {
        let target = event.target;
        let name_arr = target.name.split(":");
        let key = name_arr[0];
        let attribute = name_arr[1];
        let val = target.value;

        let new_tuning_data = {...tuning_data};
        new_tuning_data[key][attribute] = val;
        setTuningData(new_tuning_data);
        console.log(new_tuning_data)
    }

    function convertTuningToQuery(tuning_json) {
        const tuning_query = Object.keys(tuning_json).map((attribute) => {
            return Object.keys(tuning_json[attribute]).map((level) => {
                return level + "_" + attribute + "=" + tuning_json[attribute][level];
            }).join('&');
        }).join("&");

        return tuning_query;
    }

    function handleSubmission(event) {
        event.preventDefault();
        
        // let seed_artists = tracks.map((track) => {
        //     return track.artists[0].id;
        // });

        // seed_artists = [...new Set(seed_artists)]
        
        let seed_tracks = tracks.map((track) => {
            return track.id;
        });

        seed_tracks = [...new Set(seed_tracks)]

        let query = {
            seed_artists: [],//seed_artists.slice(0, 5),
            seed_tracks: seed_tracks,
            seed_genre: []//seed_genre.slice(0, 5)
        }

        api.getRecommendations("seed_artists=" + query.seed_artists.join(',') + "&seed_tracks=" + query.seed_tracks.join(',') + "&seed_genres=" + query.seed_genre.join(',') + "&" + convertTuningToQuery(tuning_data), (err, recommendations) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log(recommendations);

            let new_tracks = []

            recommendations.forEach((recommendation) => {
                recommendation.tracks.forEach((track) => {
                    new_tracks.push(track.id);
                })
            })

            new_tracks = [...new Set(new_tracks)]

            console.log(new_tracks)

            // using recommendations create mongo playlist object
            api.newPlaylistMongo(new_tracks, (err, created_playlist) => {
                if (err) {
                    console.log(err);
                    return;
                }

                console.log(created_playlist.data.addPlaylist);

                // make a new record with the created playlist and tuning data
                api.newRecordMongo(record._id, tuning_data, created_playlist.data.addPlaylist._id, record.rp_id, (err, created_record) => {
                    if (err) { 
                        return
                    }

                    console.log(created_record);
                    const next_record_length = record.next.length
                    console.log(next_record_length);
                    // add new record id to previous records next array
                    api.updateRecordNextMongo(record._id, created_record.data.addRecord._id, (err, updated_record) => {
                        if (err) {
                            console.log(err);
                            return;
                        }

                        // console.log(updated_record);
                        if (next_record_length == 0) {
                            api.incrementRPCount(record.rp_id, 1, (err, new_parent_RP) => {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
    
                                console.log(new_parent_RP);
                                window.location.reload();
                            })
                        }
                    })
                })
            })
        })

        // api.getArtists(seed_artists, (err, artists) => {
        //     console.log(artists);
        //     let seed_genre = artists.map((artist) => {
        //         return encodeURIComponent(artist.genres[0]);
        //     }).filter((genre) => {
        //         return genre != "undefined";
        //     })

        //     seed_genre = [...new Set(seed_genre)]
    
        //     // Get Recommendations
        //     let query = {
        //         seed_artists: seed_artists.slice(0, 5),
        //         seed_tracks: seed_tracks.slice(0, 5),
        //         seed_genre: seed_genre.slice(0, 5)
        //     }

        //     console.log(query);
        //     api.getRecommendations("seed_artists=" + query.seed_artists.join(',') + "&seed_tracks=" + query.seed_tracks.join(',') + "&seed_genres=" + query.seed_genre.join(','), (err, recommendations) => {
        //         if (err) {
        //             return;
        //         }

        //         console.log(recommendations);
        //     })
        // })
        // api.getRecommendations()
    }

    return (
        <Form className='d-flex justify-content-center flex-column' onSubmit={handleSubmission}>
            <Row>
                <Col>
                    {forms}
                </Col>
            </Row>
            <Button variant="primary" type="submit">Generate New Recommendations</Button>      
        </Form>
    );
}

export default TuningEdit;
