import React, { useState, useContext, useEffect } from 'react';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import Record from './Record';
import { RecordContext } from './RecordPath';
import { Tree } from 'react-tree-graph';
import 'react-tree-graph/dist/style.css'
import '../css/Record.css';
import { api } from '../api';

export const UpdateRecordContext = React.createContext();

const RecordPathDetails = () => {
    const record = useContext(RecordContext).records;
    let data_tree = {};
    const [previousClicked, setPreviousClicked] = useState(null);
    const [data_for_tree, setDataForTree] = useState({});
    const [node_count, setNodeCount] = useState(0);
    const [selected_record, setSelectedRecord] = useState(null);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        api.getRecordsByRPID(record.rp_id, (err, rp_records) => {
            if (err) {
                console.log(err);
                return;
            }
            rp_records.data.recordsInRP.forEach((rp_record) => {
                data_tree[rp_record._id] = {
                    next: rp_record.next,
                    previous: rp_record.previous
                }
            });

            setNodeCount(Object.keys(data_tree).length);
            setDataForTree(getGraph(record._id));
        })
    }, [update])

    function getGraph(root) {
        let temp = {};
        temp['name'] = ''
        temp['id'] = root
        temp['children'] = [];
        data_tree[root].next.forEach((next_r_id) => {
            temp['children'].push(getGraph(next_r_id))
        });

        return temp;
    }

    function handleClick(event, node) {
        if (previousClicked) {
            previousClicked.style.stroke = '#000000'
            previousClicked.style.strokeWidth = '10px'
        }
        event.target.style.stroke = '#0d6efd';
        event.target.style.strokeWidth = '20px'
        setPreviousClicked(event.target);

        setSelectedRecord(null)
        api.getRecordsMongo([node], (err, doc) => {
            if (err) {
                return;
            }

            api.getPlaylistMongo(doc.data.records[0].recommendations, (err, playlist) => {
                if (err) {
                    return;
                }
                
                api.getTracks(playlist.data.playlists.tracks.slice(0, 50), (err, tracks_data) => {
                    if (err) {
                        return;
                    }
                    
                    setSelectedRecord(
                        <UpdateRecordContext.Provider value={{update: update, setUpdate: setUpdate}}>
                            <Record record={doc.data.records[0]} tracks={tracks_data}/>
                        </UpdateRecordContext.Provider>
                    );
                })
            })
        })
    }

    return (
        <Container fluid>
            <div id='tree_container' className='d-flex'>
                <Tree 
                    svgProps={{style: {"minWidth": (node_count*150), "marginLeft": '20px', overflow: 'visible'}}}
                    gProps={{
                        onClick: handleClick
                    }}
                    keyProp="id"
                    data={data_for_tree}
                    width={node_count*150}
                    height={400}
                />
            </div>
            {
                selected_record
            }
            {/* <button id='hi'>Cool Generate</button> */}
        </Container>
    );
}

export default RecordPathDetails;
