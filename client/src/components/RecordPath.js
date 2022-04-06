import React, { useEffect, useState } from 'react';
import RecordPathDetails from './RecordPathDetails';
import { api } from '../api';
import { useLocation } from 'react-router-dom';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';

export const RecordContext = React.createContext();

const RecordPath = () => {
    const {state} = useLocation();
    const [currentRecord, setCurrentRecord] = useState(null);
    const [recordPathName, setRecordPathName] = useState("");

    useEffect( () => {
        console.log("RECORDPATH")
        getNumRecords();
    }, []);
    
    function getNumRecords(){
        api.getUserInfo((error, user) => {
            if (error) {
                console.log(error);
                return;
            }
            api.getRecordPathMongo(state.rp_id, (error, path) => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(path.data.recordPath);
                setRecordPathName(path.data.recordPath.name);
                api.getRecordsMongo([path.data.recordPath.starting_record], (err, record) => {
                    if (err) {
                        return;
                    }
        
                    console.log(record.data.records[0]);
                    api.getPlaylistMongo(record.data.records[0].recommendations, (err, playlist) => {
                        if (err) {
                            return
                        }

                        api.getTracks(playlist.data.playlists.tracks.slice(0, 50), (err, tracks_data) => {
                            if (err) {
                                return;
                            }
                            console.log(tracks_data);
                            setCurrentRecord(<RecordContext.Provider value={{records: record.data.records[0]}}>
                                <RecordPathDetails/>
                            </RecordContext.Provider>)
                        })
                    })
                })
            });
        });
    }


    return (
        <Container fluid>
            <Row className='d-flex h1 fw-bold justify-content-center'>
                {recordPathName}
            </Row>
            <Row>
                {currentRecord}
            </Row>
        </Container>
    );
}

export default RecordPath;
