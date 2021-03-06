import { Avatar } from '@material-ui/core';
import React  from 'react';
import './SidebarChat.css';
import { useEffect ,  useState } from "react";
import db from './firebase';
import {Link} from "react-router-dom"

function SidebarChat({id,name,addNewChat}) {
    const [seed,setseed ] = useState("")
    const [messages, setmessages] = useState("")

    useEffect(() => {
        if(id){
            db.collection('rooms').doc(id).collection("messages").
            orderBy("timestamp","desc").onSnapshot((snapshot)=>
            setmessages(snapshot.docs.map((doc)=>
            doc.data())))
        }
    }, [id])
    
    useEffect(() => {
        setseed(Math.floor(Math.random()*5000));
    }, []);

    const createChat = ()=> {
        const roomName = prompt(" please enter name for chat");
        
        if(roomName){
            // do some clever database stuff.......
            db.collection('rooms').add({
                name:roomName,
            });
        }
    };

    return !addNewChat ? (
        <Link to ={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src ={`https://avatars.dicebear.com/4.5/api/human/${seed}.svg`}/>
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <h2>{messages[0]?.message}</h2>
                </div>
            </div>
        </Link>
    ):(
        <div onClick={createChat} className="sidebarChat">
            <h2>Add NEw Chat</h2>
        </div>
    )
}

export default SidebarChat
