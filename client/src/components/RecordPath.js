import React, { useEffect, useState } from 'react';
import Record from './Record';
import { api } from '../api';
import { useLocation } from 'react-router-dom';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';

export const RecordContext = React.createContext();

const RecordPath = () => {
    const [active, setActive] = useState(0);
    const {state} = useLocation();
    const [numRecords, setNumRecords] = useState(0);
    const [recordPath, setRecordPath] = useState({});
    const [currentRecordData, setCurrentRecordData] = useState(null);
    const [currentRecord, setCurrentRecord] = useState(null);

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
                setNumRecords(path.data.recordPath.count);
                setRecordPath(path.data.recordPath);

                api.getRecordsMongo([path.data.recordPath.starting_record], (err, record) => {
                    if (err) {
                        return;
                    }
        
                    console.log(record.data.records[0]);
                    setCurrentRecordData(record.data.records[0]);
                    api.getPlaylistMongo(record.data.records[0].recommendations, (err, playlist) => {
                        if (err) {
                            return
                        }

                        api.getTracks(playlist.data.playlists.tracks.slice(0, 50), (err, tracks_data) => {
                            if (err) {
                                return;
                            }
                            console.log(tracks_data);
                            setCurrentRecord(<RecordContext.Provider value={{records: record.data.records[0], tracks: tracks_data}}>
                                <Record starting={true}/>
                            </RecordContext.Provider>)
                        })
                    })
                })
            });
        });
    }

    function changePageNumber(number) {
        setActive(number);
    }

    function previousRecord() {
        setActive((active - 1 + numRecords) % numRecords)
        if (!currentRecordData.previous) {
            return;
        }
        api.getRecordsMongo([currentRecordData.previous], (err, record) => {
            if (err) {
                return;
            }

            console.log(record.data.records[0]);
            setCurrentRecordData(record.data.records[0]);
            api.getPlaylistMongo(record.data.records[0].recommendations, (err, playlist) => {
                if (err) {
                    return
                }

                api.getTracks(playlist.data.playlists.tracks.slice(0, 50), (err, tracks_data) => {
                    if (err) {
                        return;
                    }
                    console.log(tracks_data);
                    setCurrentRecord(<RecordContext.Provider value={{records: record.data.records[0], tracks: tracks_data}}>
                        <Record starting={true}/>
                    </RecordContext.Provider>)
                    
                })
            })
        })
    }

    function nextRecord() {
        setActive((active + 1) % numRecords)
        console.log(currentRecordData.next);
        if (!currentRecordData.next || currentRecordData.next.length == 0) {
            return;
        }
        api.getRecordsMongo([currentRecordData.next[0]], (err, record) => {
            if (err) {
                return;
            }

            console.log(record.data.records[0]);
            setCurrentRecordData(record.data.records[0]);
            api.getPlaylistMongo(record.data.records[0].recommendations, (err, playlist) => {
                if (err) {
                    return
                }

                api.getTracks(playlist.data.playlists.tracks.slice(0, 50), (err, tracks_data) => {
                    if (err) {
                        return;
                    }
                    console.log(tracks_data);
                    setCurrentRecord(<RecordContext.Provider value={{records: record.data.records[0], tracks: tracks_data}}>
                        <Record starting={true}/>
                    </RecordContext.Provider>)
                    
                })
            })
        })
    }

    function getPages() {
        let items = [];
        for (let number = 0; number < numRecords; number++) {
            items.push(
                <Pagination.Item className="disabled" key={number} active={number === active} onClick={() => changePageNumber(number)}>
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
                {currentRecord}
            </Row>
            <Row>
                <Pagination className="justify-content-center">
                    <Pagination.First onClick={() => setActive(0)}/>
                    <Pagination.Prev onClick={() => previousRecord()}/>
                    {getPages()}
                    <Pagination.Next onClick={() => nextRecord()}/>
                    <Pagination.Last onClick={() => setActive(numRecords - 1)}/>
                </Pagination>
            </Row>
        </Container>
    );
}

export default RecordPath;
