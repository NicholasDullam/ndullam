import React, { useEffect, useState } from 'react'
import cardBack from '../images/card_back.png'

const GolfRoom = ({ socket, room, setRoom, user_id }) => {
    const [user, setUser] = useState(room.users.find((item) => item.id === user_id))

    useEffect(() => {
        setUser(room.users.find((item) => item.id === user_id))
    }, [room])

    useEffect(() => { 
        socket.on('leave', (body) => {
            setRoom(null)
        })

        socket.on('start', (body) => {
            setRoom(body)
        })

        socket.on('next_round', (body) => {
            setRoom(body)
        })

        socket.on('user_joined', (body) => {
            setRoom(body)
        })

        socket.on('user_left', (body) => {
            setRoom(body)
        })

        socket.on('draw', (body) => {
            setRoom(body)
        })

        socket.on('flip', (body) => {
            setRoom(body)
        })

        socket.on('replace', (body) => {
            setRoom(body)
        })

        socket.on('discard', (body) => {
            setRoom(body)
        })
        
        return () => {
            socket.off('leave')
            socket.off('start')
            socket.off('next_round')
            socket.off('user_joined')
            socket.off('user_left')
            socket.off('draw')
            socket.off('flip')
            socket.off('replace')
            socket.off('discard')
        };
    }, []);

    const drawCard = (room_id, user_id, discard) => {
        if (user.draw || user.id !== room.turn) return
        socket.emit('draw_card', {
            room_id,
            user_id,
            discard
        })
    }

    const replace = (room_id, user_id, card_id) => {
        socket.emit('replace', {
            room_id,
            card_id,
            user_id
        })
    }

    const replaceHandler = (room_id, user_id, card_id) => {
        if (user.draw) return replace(room_id, user_id, card_id)
        flip(room_id, user_id, card_id)
    }

    const flip = (room_id, user_id, card_id) => {
        if (user.hand.reduce((prev, curr) => prev + (curr.flipped ? 1 : 0), 0) === 2) return
        socket.emit('flip_card', {
            room_id,
            user_id,
            card_id
        })
    }

    const discard = (room_id, user_id) => {
        socket.emit('discard', {
            room_id
        })
    }

    const discardHandler = (room_id, user_id) => {
        if (user.id !== room.turn) return
        if (user.draw) return discard(room_id, user_id)
        drawCard(room_id, user_id, true)
    }

    const leaveRoom = (room_id, user_id) => {
        socket.emit('leave_room', {
            room_id,
            user_id
        })
    }

    const start = (room_id) => {
        socket.emit('start', {
            room_id
        })
    }

    const nextRound = (room_id) => {
        socket.emit('next_round', {
            room_id
        })
    }

    const renderHand = (temp) => {
        if (!temp.hand) return 
        return <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
            {
                temp.draw ? <div className='hover:scale-[110%] transition-all duration-300 cursor-pointer' style={{ height: '70px', width: '50px', borderRadius: '5px', border: '1px solid white', position: 'relative' }}>
                    <p style={{ position: 'absolute', top: '2px', left: '4px' }}> {temp.draw.value.toUpperCase()[0]} </p>
                    <p style={{ position: 'absolute', bottom: '2px', right: '6px', transform: 'rotate(180deg)' }}> {temp.draw.value.toUpperCase()[0]} </p>
                </div> : null
            }
            <div style={{ display: 'flex', gap: '5px' }}>
                {
                    temp.hand.map((card, i) => {
                        if (i > temp.hand.length / 2 - 1) return 
                        return <div onClick={() => user.id === temp.id ? replaceHandler(room.id, temp.id, i) : null} className='hover:scale-[110%] transition-all duration-300 cursor-pointer' style={{ height: '70px', width: '50px', borderRadius: '5px', border: '1px solid white', position: 'relative' }}>
                            {card.flipped ? <>
                                <p style={{ position: 'absolute', top: '2px', left: '4px' }}> {card.card.value.toUpperCase()[0]} </p>
                                <p style={{ position: 'absolute', bottom: '2px', right: '6px', transform: 'rotate(180deg)' }}> {card.card.value.toUpperCase()[0]} </p>
                            </> : <img src={cardBack} style={{ borderRadius: '5px' }}/> }
                        </div>
                    })
                }
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
                {
                    temp.hand.map((card, i) => {
                        if (i < temp.hand.length / 2) return 
                        return <div onClick={() => user.id === temp.id ? replaceHandler(room.id, temp.id, i) : null} className='hover:scale-[110%] transition-all duration-300 cursor-pointer' style={{ height: '70px', width: '50px', borderRadius: '5px', border: '1px solid white', position: 'relative' }}>
                            {card.flipped ? <>
                                <p style={{ position: 'absolute', top: '2px', left: '4px' }}> {card.card.value.toUpperCase()[0]} </p>
                                <p style={{ position: 'absolute', bottom: '2px', right: '6px', transform: 'rotate(180deg)' }}> {card.card.value.toUpperCase()[0]} </p>
                            </> : <img src={cardBack} style={{ borderRadius: '5px' }}/> }
                        </div>
                    })
                }
            </div>
        </div>
    }

    const getNextIndex = (array, index) => {
        let nextIndex = index + 1
        if (nextIndex === array.length) return 0
        return nextIndex
    }

    const renderPlayers = () => {
        const userIndex = room.users.findIndex((user) => user.id === user_id)
        let iterator = userIndex

        const leftPlayers = []
        const rightPlayers = []
        let acrossPlayer = null

        if (room.users.length > 2 && !(room.users.length % 2)) {
            let remainder = room.users.length - 1
            for (let i = 0; i < remainder; i++) {
                iterator = getNextIndex(room.users, iterator)
                if (i === Math.ceil(remainder / 2)) acrossPlayer = room.users[iterator]
                else if (i < remainder / 2 - 1) leftPlayers.push(room.users[iterator])
                else rightPlayers.push(room.users[iterator])
            }
        } else if (room.users.length > 2) {
            let remainder = room.users.length - 1
            for (let i = 0; i < remainder; i++) {
                iterator = getNextIndex(room.users, iterator)
                if (i < remainder / 2) leftPlayers.push(room.users[iterator])
                else rightPlayers.push(room.users[iterator])
            }
        } else if (room.users.length === 2) {
            acrossPlayer = room.users[getNextIndex(room.users, iterator)]
        }

        return <div>
            { /* Deck */ }
            <div style={{ position: 'absolute', bottom: '50%', left: '50%', transform: 'translateX(-50%) translateY(50%)'}}>
                <div style={{ display: 'flex', gap: '50px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div onClick={() => drawCard(room.id, user_id, false)} className='hover:scale-[110%] transition-all duration-300 cursor-pointer' style={{ height: '70px', width: '50px', borderRadius: '5px', border: '1px solid white', position: 'relative' }}>

                        </div>
                        <p style={{ textAlign: 'center' }}> Deck </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div onClick={() => discardHandler(room.id, user_id)} className='hover:scale-[110%] transition-all duration-300 cursor-pointer' style={{ height: '70px', width: '50px', borderRadius: '5px', border: '1px solid white', position: 'relative' }}>
                            { room.discard.length ? <>
                                <p style={{ position: 'absolute', top: '2px', left: '4px' }}> {room.discard[room.discard.length - 1].value.toUpperCase()[0]} </p>
                                <p style={{ position: 'absolute', bottom: '2px', right: '6px', transform: 'rotate(180deg)' }}> {room.discard[room.discard.length - 1].value.toUpperCase()[0]} </p>
                            </> : <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)' }}> Empty </p> }
                        </div>
                        <p style={{ textAlign: 'center' }}> Discard </p>
                    </div>
                </div>
                <p style={{ textAlign: 'center' }}> {room.turn === user.id ? 'Your' : `${room.turn}'s`} turn </p>
            </div>

            { /* Player hand */ }
            <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)'}}>
                { renderHand(room.users[userIndex]) }
                <p style={{ textAlign: 'center' }}> Your hand </p>
            </div>

            {/* Left players */}
            { leftPlayers.length ? <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', gap: '100px', bottom: '50%', left: '20px', transform: 'translateY(50%)' }}>
                {
                    leftPlayers.map((user) => {
                        return <div>
                            <div style={{ transform: 'rotate(90deg)' }}>
                                { renderHand(user) }
                            </div>
                            <p style={{ textAlign: 'center' }}> {user.id}'s hand </p>
                        </div>
                    })
                }
            </div> : null }

            {/* Right players */}
            { rightPlayers.length ? <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', gap: '100px', bottom: '50%', right: '20px', transform: 'translateY(50%)'}}>
                {
                    rightPlayers.map((user) => {
                        return <div>
                            <div style={{ transform: 'rotate(-90deg)' }}>
                                { renderHand(user) }
                            </div>
                            <p style={{ textAlign: 'center' }}> {user.id}'s hand </p>
                        </div>
                    })
                }
            </div> : null }

            {/* Across players */}
            { acrossPlayer ? <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)'}}>
                <div style={{ transform: 'rotate(180deg)' }}>
                    { renderHand(acrossPlayer) }
                </div>
                <p style={{ textAlign: 'center' }}> {acrossPlayer.id}'s hand </p>
            </div> : null }

            {/* Scoreboard */}
            <div style={{ position: 'absolute', bottom: '40px', left: '20px' }}>
                <p> Scoreboard </p>
                {
                    room.users.map((item) => {
                        return <p key={item.id} style={{}}> {item.id}: {item.points} </p>
                    })
                }
            </div>
        </div>
    }

    return (
        <div style={{ height: '100%', position: 'relative' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => leaveRoom(room.id, user_id)} className="flex items-center transform rounded-3xl no-underline py-3 px-4 bg-black hover:text-black hover:bg-white hover:scale-110 shadow-md transition-all duration-300">
                    <p>Leave</p>
                </button>
                { room.admin === user_id && !room.active ? <button onClick={() => start(room.id)} className="flex items-center transform rounded-3xl no-underline py-3 px-4 bg-black hover:text-black hover:bg-white hover:scale-110 shadow-md transition-all duration-300">
                    <p>Start</p>
                </button> : null }
                { room.admin === user_id && room.active ? <button onClick={() => nextRound(room.id)} className="flex items-center transform rounded-3xl no-underline py-3 px-4 bg-black hover:text-black hover:bg-white hover:scale-110 shadow-md transition-all duration-300">
                    <p>Next Round</p>
                </button> : null }
            </div>
            <h4 className="text-xl my-5"> Room {room.id} </h4>
            { room.active ? <h4 className="text-m my-5"> Round {room.round} </h4> : null }
            {
                room.active ? renderPlayers() : <div>
                    <p style={{ margin: '0px', color: 'white' }}> Player list </p>
                    { room.users.map((user) => {
                        return <p style={{ margin: '0px', color: 'white' }}> {user.id} {room.admin === user.id ? <b>owner</b> : null} </p>
                    }) }
                </div>
            }
        </div>
    )
}

export default GolfRoom