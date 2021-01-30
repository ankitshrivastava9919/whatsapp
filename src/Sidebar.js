import React , {useState,useEffect} from 'react';
import {Avatar, IconButton} from '@material-ui/core';
import DonutLarge from "@material-ui/icons/DonutLarge";
import Chat from "@material-ui/icons/Chat";
// import MoreVert from "@material-ui/icons/MoreVert";
import db from './firebase';

import './Sidebar.css';
import { MoreVert, SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';

import {useStateValue} from "./StateProvider"


function Sidebar() {
    const [rooms, setrooms] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot((Snapshot) =>
            setrooms(Snapshot.docs.map((doc)=>({
                id: doc.id,
                data: doc.data(),
            }))
        )
        );
        return ()=>{
            unsubscribe();
        }
    }, [])
        

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLarge/>
                    </IconButton>
                    <IconButton>
                        <Chat/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                    
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder = " search or start new chat" type="text"/>
            
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>

        </div>
    )
}

export default Sidebar
