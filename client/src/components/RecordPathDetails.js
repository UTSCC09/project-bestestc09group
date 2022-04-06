import { React, useState, useContext, useEffect } from 'react';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import Record from './Record';
import { RecordContext } from './RecordPath';
import { Tree } from 'react-tree-graph';
import 'react-tree-graph/dist/style.css'
import '../css/Record.css';
import { api } from '../api';

const RecordPathDetails = () => {
    const [show, setShow] = useState(false);
    const record = useContext(RecordContext).records;
    let data_tree = {};
    const [previousClicked, setPreviousClicked] = useState(null);
    const [data_for_tree, setDataForTree] = useState({});
    const [node_count, setNodeCount] = useState(0);
    const [selected_record, setSelectedRecord] = useState(null);

    useEffect(() => {
        api.getRecordsByRPID(record.rp_id, (err, rp_records) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(rp_records.data.recordsInRP)
            rp_records.data.recordsInRP.forEach((rp_record) => {
                data_tree[rp_record._id] = {
                    next: rp_record.next,
                    previous: rp_record.previous
                }
            });
            console.log(data_tree);
            setNodeCount(Object.keys(data_tree).length);
            setDataForTree(getGraph(record._id));
            console.log(data_for_tree);
        })
    }, [])

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
        }
        event.target.style.stroke = '#0d6efd';
        setPreviousClicked(event.target);

        console.log(event.target.style);
        setSelectedRecord(null)
        api.getRecordsMongo([node], (err, doc) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log(doc.data.records[0]);
            api.getPlaylistMongo(doc.data.records[0].recommendations, (err, playlist) => {
                if (err) {
                    console.log(err);
                    return;
                }
                
                console.log(playlist.data.playlists.tracks);
                api.getTracks(playlist.data.playlists.tracks.slice(0, 50), (err, tracks_data) => {
                    if (err) {
                        return;
                    }
                    // setTracks(playlist.data.playlists.tracks);
                    console.log(tracks_data);
                    setSelectedRecord(<Record record={doc.data.records[0]} tracks={tracks_data}/>)
                })
            })
        })
    }

    return (
        <Container fluid>
            <div id='tree_container' className='d-flex'>
                <Tree 
                    svgProps={{style: {"minWidth": (node_count*200), "marginLeft": '20px'}}}
                    gProps={{
                        onClick: handleClick
                    }}
                    keyProp="id"
                    data={data_for_tree}
                    width={node_count*200}
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
