import React, { useEffect, useRef, useState } from 'react'
import cardBack from '../images/card_back.png'
import { Shell } from '../components'
import styled from 'styled-components'

const Card = styled.div`
    animation-name: test;
    animation-duration: 300ms;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;

    @keyframes test {
        from {
            opacity: 0;
            transform: translateY(-100%);
        }

        to {
            opacity: 1;
        }
    }
`

const cardDisplays = {
    "ace" : "A",
    "2" : "2",
    "3" : "3",
    "4" : "4",
    "5" : "5",
    "6" : "6",
    "7" : "7",
    "8" : "8",
    "9" : "9",
    "10" : "10",
    "jack" : "J",
    "queen" : "Q",
    "king" : "K"
}

const GolfRoom = ({ socket, room, setRoom, user_id }) => {
    const [user, setUser] = useState(room.users.find((item) => item.id === user_id))
    const [cursor, setCursor] = useState({ })
    const [lastPolled, setLastPolled] = useState({ })
    const [prevRoom, setPrevRoom] = useState(null)
    const pollingRate = 50


    const gameRef = useRef()

    useEffect(() => {
        if (prevRoom?.turn !== room.turn) setCursor({ x: 0, y: 0 })
        setUser(room.users.find((item) => item.id === user_id) || room.spectators.find((item) => item.id === user_id))
        const mouseHandler = (e) => {
            setLastPolled((temp) => {
                if (temp + pollingRate > Date.now()) return temp
                const container = gameRef.current.getBoundingClientRect()
                socket.emit('mouse_move', { x: e.clientX - container.x, y: e.clientY - container.y, room_id: room.id })
                return Date.now()
            })
        }
        gameRef.current.addEventListener('mousemove', mouseHandler)
        setPrevRoom(room)
        return () => gameRef.current.removeEventListener('mousemove', mouseHandler) 
    }, [room])

    useEffect(() => { 
        socket.on('leave', (body) => {
            setRoom(null)
        })

        socket.on('mouse_move', (body) => {
            console.log('getting mouse movements')
            setCursor(body)
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
        if (room.complete === room.turn) return
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
        if (room.complete === room.turn) return
        if (user.draw) return replace(room_id, user_id, card_id)
        flip(room_id, user_id, card_id)
    }

    const flip = (room_id, user_id, card_id) => {
        if (user.hand.reduce((prev, curr) => prev + (curr.flipped ? 1 : 0), 0) >= 2) return
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
        if (room.complete === room.turn) return
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
        if (!temp?.hand) return 
        return <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
            {
                temp.draw ? <Card>
                    <div className='hover:scale-[110%] transition-all duration-300 cursor-pointer' style={{ height: '70px', width: '50px', borderRadius: '5px', border: '1px solid white', position: 'relative' }}>
                        <p style={{ position: 'absolute', top: '2px', left: '4px', userSelect: 'none' }}> {cardDisplays[temp.draw.value]} </p>
                        <p style={{ position: 'absolute', bottom: '2px', right: '4px', transform: 'rotate(180deg)', userSelect: 'none' }}> {cardDisplays[temp.draw.value]} </p>
                    </div>
                </Card> : null
            }
            <div style={{ width: temp.id === room.turn || room.complete === temp.id ? '100%' : '0px', transition: 'all 300ms ease', height: '5px', backgroundColor: room.complete === temp.id ? 'rgba(74,222,128)' : 'white', borderRadius: '10px', margin: '20px 0px' }}/>
            <div style={{ display: 'flex', gap: '5px' }}>
                {
                    temp.hand.map((card, i) => {
                        if (i > temp.hand.length / 2 - 1) return 
                        return <div onClick={() => user.id === temp.id ? replaceHandler(room.id, temp.id, i) : null} className='hover:scale-[110%] transition-all duration-300 cursor-pointer' style={{ height: '70px', width: '50px', borderRadius: '5px', border: '1px solid white', position: 'relative' }}>
                            {card.flipped ? <div style={{ overflow: 'hidden' }}>
                                <p style={{ position: 'absolute', userSelect: 'none', top: '2px', left: '4px' }}> {cardDisplays[card.card.value]} </p>
                                <p style={{ position: 'absolute', userSelect: 'none', bottom: '2px', right: '4px', transform: 'rotate(180deg)' }}> {cardDisplays[card.card.value]} </p>
                            </div> : <img src={cardBack} style={{ borderRadius: '3px', userSelect: 'none' }}/> }
                        </div>
                    })
                }
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
                {
                    temp.hand.map((card, i) => {
                        if (i < temp.hand.length / 2) return 
                        return <div onClick={() => user.id === temp.id ? replaceHandler(room.id, temp.id, i) : null} className='hover:scale-[110%] transition-all duration-300 cursor-pointer' style={{ height: '70px', width: '50px', borderRadius: '5px', border: '1px solid white', position: 'relative' }}>
                            { card.flipped ? <div style={{ overflow: 'hidden' }}>
                                <p style={{ position: 'absolute', top: '2px', left: '4px', userSelect: 'none' }}> {cardDisplays[card.card.value]} </p>
                                <p style={{ position: 'absolute', bottom: '2px', right: '4px', transform: 'rotate(180deg)', userSelect: 'none' }}> {cardDisplays[card.card.value]} </p>
                            </div> : <img src={cardBack} style={{ borderRadius: '3px', userSelect: 'none' }}/> }
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
                if (i === Math.floor(remainder / 2)) acrossPlayer = room.users[iterator]
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

        leftPlayers.reverse()

        return <div>
            { /* Deck */ }
            <div style={{ position: 'absolute', bottom: '50%', left: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: 'translateX(-50%) translateY(50%)'}}>
                <div style={{ display: 'flex', gap: '50px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div onClick={() => drawCard(room.id, user_id, false)} className='hover:scale-[110%] transition-all duration-300 cursor-pointer' style={{ height: '70px', width: '50px', borderRadius: '5px', border: '1px solid white', position: 'relative', overflow: 'hidden' }}>
                            <img src={cardBack} style={{ borderRadius: '3px', userSelect: 'none' }}/>
                        </div>
                        <p style={{ textAlign: 'center', userSelect: 'none', marginTop: '5px' }}> Deck </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div onClick={() => discardHandler(room.id, user_id)} className='hover:scale-[110%] transition-all duration-300 cursor-pointer' style={{ height: '70px', width: '50px', borderRadius: '5px', border: '1px solid white', position: 'relative' }}>
                            { room.discard.length ? <>
                                <p style={{ position: 'absolute', top: '2px', left: '4px', userSelect: 'none' }}> {cardDisplays[room.discard[room.discard.length - 1].value]} </p>
                                <p style={{ position: 'absolute', bottom: '2px', right: '4px', transform: 'rotate(180deg)', userSelect: 'none' }}> {cardDisplays[room.discard[room.discard.length - 1].value]} </p>
                            </> : <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)', userSelect: 'none' }}> Empty </p> }
                        </div>
                        <p style={{ textAlign: 'center', userSelect: 'none', marginTop: '5px' }}> Discard </p>
                    </div>
                </div>
                { room.complete !== room.turn ? <div>
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                        <p style={{ textAlign: 'center', userSelect: 'none' }}> {room.turn === user?.id ? 'Your' : `${room.users.find((item) => item.id === room.turn)?.name}'s`} {room.complete ? 'last' : null} turn </p>
                        { room.users.find((item) => item.id === room.turn).profile_picture ? <img src={room.users.find((item) => item.id === room.turn).profile_picture} style={{ height: '70px', width: '70px', borderRadius: '50%' }}/> : null }
                    </div>
                </div> : <p style={{ textAlign: 'center', userSelect: 'none', marginTop: '10px' }}> Round complete </p> }
            </div>

            { /* Player hand */ }
            <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                { renderHand(room.users[userIndex]) }
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '15px' }}>
                    { room.users[userIndex].profile_picture ? <img src={room.users[userIndex].profile_picture} style={{ height: '40px', width: '40px', borderRadius: '50%' }}/> : null }
                    <p style={{ textAlign: 'center', userSelect: 'none' }}> Your hand </p>
                </div>
            </div>

            {/* Left players */}
            { leftPlayers.length ? <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', gap: '100px', bottom: '50%', left: '20px', transform: 'translateY(50%)' }}>
                {
                    leftPlayers.map((user) => {
                        return <div>
                            <div style={{ transform: 'rotate(90deg)' }}>
                                { renderHand(user) }
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '15px' }}>
                                    { user.profile_picture ? <img src={user.profile_picture} style={{ height: '40px', width: '40px', borderRadius: '50%' }}/> : null }
                                    <p style={{ textAlign: 'center', userSelect: 'none' }}> {user.name}'s hand </p>
                                </div>
                            </div>
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
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '15px' }}>
                                    { user.profile_picture ? <img src={user.profile_picture} style={{ height: '40px', width: '40px', borderRadius: '50%' }}/> : null }
                                    <p style={{ textAlign: 'center', userSelect: 'none' }}> {user.name}'s hand </p>
                                </div>                            
                            </div>
                        </div>
                    })
                }
            </div> : null }

            {/* Across players */}
            { acrossPlayer ? <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)'}}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                    { user.profile_picture ? <img src={user.profile_picture} style={{ height: '40px', width: '40px', borderRadius: '50%' }}/> : null }
                    <p style={{ textAlign: 'center', userSelect: 'none' }}> {user.name}'s hand </p>
                </div>
                <div style={{ transform: 'rotate(180deg)' }}>
                    { renderHand(acrossPlayer) }
                </div>
            </div> : null }

            {/* Scoreboard */}
            <div style={{ position: 'absolute', bottom: '40px', left: '20px' }}>
                {
                    room.spectators.length ? <div style={{ marginBottom: '20px' }}>
                        <p> Spectators </p>
                        {
                            room.spectators.map((item) => {
                                return <p key={item.id}> {item.name} </p>
                            })
                        }
                    </div> : null 
                }
                <p> Scoreboard </p>
                {
                    room.users.map((item) => {
                        return <p key={item.id} style={{}}> {item.name}: {room.complete === room.turn ?  `${item.points - item.history[item.history.length - 1]} + ${item.history[item.history.length - 1]}` : item.points} </p>
                    })
                }
            </div>
        </div>
    }

    return (
        <div style={{ height: '100%', position: 'relative' }} ref={gameRef}>
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
            { room.turn !== user?.id ? <div style={{ position: 'absolute', top: cursor.y, left: cursor.x, transition: 'all 100ms ease', zIndex: '10' }}>
                <div style={{ display: 'flex' }}>
                    <div style={{ backgroundColor: 'cyan', height: '8px', width: '8px', marginRight: '3px' }}/>
                    <p style={{ color: 'cyan' }}> {room.users.find((temp) => temp.id === room.turn)?.name} </p>
                </div>
            </div> : null }
            <h4 className="text-xl my-5"> Room {room.id} </h4>
            { room.active ? <h4 className="text-m my-5"> Round {room.round} </h4> : null }
            {
                room.active ? renderPlayers() : <div>
                    <p style={{ margin: '0px', color: 'white' }}> Player list </p>
                    { room.users.map((user) => {
                        return <p style={{ margin: '0px', color: 'white' }}> {user.name} {room.admin === user.id ? <b>owner</b> : null} </p>
                    }) }
                </div>
            }
            { /* <Shell/> */ }
        </div>
    )
}

export default GolfRoom