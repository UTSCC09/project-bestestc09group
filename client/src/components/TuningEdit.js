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
    console.log("HI RECORD")
    const [tuning_data, setTuningData] = useState(tuning);
    let forms = Object.keys(tuning_data).map((key) => {
        return <Form.Group className="mb-3" controlId={"form" + key}>
            <Form.Label>{key.toUpperCase()}</Form.Label>
            <Row>
                <Col> 
                    <Form.Control name={key + ":min"} onChange={handleChange} type="text" value={tuning_data[key].min} placeholder="Min" />
                </Col>
                <Col>
                    <Form.Control name={key + ":target"} onChange={handleChange} type="text" value={tuning_data[key].target} placeholder="Tgt" />
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
            seed_tracks: seed_tracks.slice(0, 5),
            seed_genre: []//seed_genre.slice(0, 5)
        }

        api.getRecommendations("seed_artists=" + query.seed_artists.join(',') + "&seed_tracks=" + query.seed_tracks.join(',') + "&seed_genres=" + query.seed_genre.join(','), (err, recommendations) => {
            if (err) {
                return;
            }

            console.log(recommendations);
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
