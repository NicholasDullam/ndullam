import React, { useEffect, useState } from 'react'
import { GolfRoom } from './'
import { Button } from "../components"
import io from 'socket.io-client';

const Golf = (props) => {
    const [rooms, setRooms] = useState([])
    const [room, setRoom] = useState(null)
    const [socket, setSocket] = useState(null)
    const [connected, setConnected] = useState(false)
    const [userID, setUserID] = useState(Math.round(Math.random() * 1000))

    useEffect(() => {
        console.log(window.location.origin, process.env.REACT_APP_ENV)
        const socket = io(process.env.NODE_ENV === 'production' ? window.location.origin : 'http://localhost:8000', {
            auth: {
                user_id: userID
            }
        });

        setSocket(socket)
        
        socket.emit('get_rooms')

        socket.on('rooms', (response) => {
            setRooms(response)
        })

        socket.on('join', (response) => {
            setRoom(response)
        })

        socket.on('connect', () => {
            socket.emit('get_rooms')
            setConnected(true);
        });
    
        socket.on('disconnect', () => {
            setConnected(false);
        });
    
        return () => {
          socket.off('connect');
          socket.off('disconnect');
          socket.off('rooms');
          socket.close()
        };
    }, []);

    const joinRoom = (room_id) => {
        socket.emit('join_room', {
            room_id
        })
    }

    const createRoom = (room_id) => {
        socket.emit('create_room', {
            room_id
        })
    }

    const renderRooms = () => {
        return <div>
            <h3 className="text-xl font-bold mb-5"> Browse </h3>
            {
                rooms.map((room) => {
                    return <div onClick={() => joinRoom(room.id)} className="cursor-pointer flex bg-black hover:text-black hover:bg-white hover:scale-[101%] shadow-md transition-all duration-300 p-3 rounded-lg text-sm">
                        <p> { room.id } </p>
                        <p className="font-bold ml-auto"> {`${room.users.length} player${room.users.length === 1 ? '' : 's'}`} </p>
                    </div>
                })
            }
        </div>
    }

    return (
        <div style={{ height: 'calc(100% - 40px)', position: 'relative'}}>
            <div className="p-8 pt-3" style={{ height: '100%' }}>
                <h1 className="text-4xl font-bold my-5"> Golf </h1>
                <div className="flex items-center transform rounded-3xl no-underline py-2 px-3 shadow-md bg-neutral-700 transition-all duration-300" style={{ position: 'absolute', top: '35px', right: '100px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <p>{ connected ? 'Connected' : 'Disconnected' }</p>
                    <div style={{ position: 'relative' }}>
                        <div style={{ height: '10px', width: '10px', borderRadius: '50%' }} className={`${connected ? 'bg-green-400' : 'bg-red-400'}`}/>
                        <div style={{ height: '10px', width: '10px', borderRadius: '50%', position: 'absolute', top: '0px', left: '0px' }} className={`${connected ? 'bg-green-400' : 'bg-red-400'} animate-ping`}/>
                    </div>
                </div>
                { room ? <GolfRoom socket={socket} room={room} setRoom={setRoom} user_id={userID}/> : <div>
                    { renderRooms() }
                    <Button onClick={() => createRoom(Math.round(Math.random() * 1000))}> Create Room </Button>
                </div> }
            </div>
        </div>
    )
}

export default Golf