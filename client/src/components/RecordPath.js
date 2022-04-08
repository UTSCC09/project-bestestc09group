import React, { useEffect, useState } from 'react';
import RecordPathDetails from './RecordPathDetails';
import { api } from '../api';
import { useLocation } from 'react-router-dom';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

export const RecordContext = React.createContext();

const RecordPath = () => {
    const {state} = useLocation();
    const [currentRecord, setCurrentRecord] = useState(null);
    const [recordPathName, setRecordPathName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect( () => {
        function getNumRecords(){
            setLoading(true);
            api.getUserInfo((error, user) => {
                if (error) {
                    return;
                }
                api.getRecordPathMongo(state.rp_id, (error, path) => {
                    if (error) {
                        return;
                    }
                    
                    setRecordPathName(path.data.recordPath.name);
                    api.getRecordsMongo([path.data.recordPath.starting_record], (err, record) => {
                        if (err) {
                            return;
                        }
            
                        api.getPlaylistMongo(record.data.records[0].recommendations, (err, playlist) => {
                            if (err) {
                                return
                            }
    
                            api.getTracks(playlist.data.playlists.tracks.slice(0, 50), (err, tracks_data) => {
                                if (err) {
                                    return;
                                }
                                setLoading(false);
                                setCurrentRecord(<RecordContext.Provider value={{records: record.data.records[0]}}>
                                    <RecordPathDetails/>
                                </RecordContext.Provider>)
                            })
                        })
                    })
                });
            });
        }
        getNumRecords();
    }, [state.rp_id]);
    
    if (loading) {
        return <Spinner animation="border"/>;
    } else {
        return (
            <Container fluid>
                <Row className='d-flex h1 fw-bold justify-content-center'>
                    {recordPathName}
                </Row>
                <Row className='d-flex h3 justify-content-center'>
                    Click a node to get started!
                </Row>
                <Row>
                    {currentRecord}
                </Row>
            </Container>
        );
    }

}

export default RecordPath;
