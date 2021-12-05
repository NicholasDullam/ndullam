import React, { useEffect, useRef, useState } from 'react'
import { Communicode, Zookeep, Resume } from '.'
import { Shell, Simulator } from '../components'
import { Document, Page, pdfjs } from 'react-pdf'
const Home = (props) => {
    const [subshells, setSubshells] = useState({})
    const subshellsRef = useRef(subshells)

    const [activeSubshell, setActiveSubshell] = useState(null)
    const activeSubshellRef = useRef(activeSubshell)

    useEffect(() => {
        subshellsRef.current = subshells
    }, [subshells])

    useEffect(() => {
        activeSubshellRef.current = activeSubshell
    }, [activeSubshell])

    const environments = {
        'communicode' : {
            render: <Communicode/>,
            prompt: 'communicode',
            commands: {
                exit: {
                    callback: () => {
                        setSubshells((newSubshells) => {
                            delete newSubshells[activeSubshellRef.current]
                            return { ...newSubshells }
                        })
                        
                        const next = Object.entries(subshellsRef.current).find((pair) => pair[0] !== activeSubshellRef.current)
                        if (next) setActiveSubshell(next[0])
                    }
                }
            }
        },
        'sustainably' : {

        },
        'zookeep' : {
            render: <Zookeep/>,
            commands: {
                exit: {
                    callback: () => {
                        setSubshells((newSubshells) => {
                            delete newSubshells[activeSubshellRef.current]
                            return { ...newSubshells }
                        })
                        
                        const next = Object.entries(subshellsRef.current).find((pair) => pair[0] !== activeSubshellRef.current)
                        if (next) setActiveSubshell(next[0])
                    }
                }
            }
        },
        'traveling merchant' : {

        },
        'simulator' : {
            render: <Simulator/>,            
            commands: {
                exit: {
                    callback: () => {
                        setSubshells((newSubshells) => {
                            delete newSubshells[activeSubshellRef.current]
                            return { ...newSubshells }
                        })
                        
                        const next = Object.entries(subshellsRef.current).find((pair) => pair[0] !== activeSubshellRef.current)
                        if (next) setActiveSubshell(next[0])
                    }
                }
            }
        },
        'resume' : {
            render: <Resume/>,
            commands: {
                exit: {
                    callback: () => {
                        setSubshells((newSubshells) => {
                            delete newSubshells[activeSubshellRef.current]
                            return { ...newSubshells }
                        })
                        
                        const next = Object.entries(subshellsRef.current).find((pair) => pair[0] !== activeSubshellRef.current)
                        if (next) setActiveSubshell(next[0])
                    }
                }
            }
        }
    }

    const commands = {
        'projects' : {
            callback: (args) => {
                return <div style={{ display: 'flex', flexDirection: 'column'}}>
                    <span style={{ color: 'cyan', cursor: 'pointer' }} onClick={() => handleCreateSubshell('communicode', environments['communicode'])}> communicode </span>
                    <span style={{ color: 'cyan', cursor: 'pointer' }} onClick={() => handleCreateSubshell('sustainably', environments['sustainably'])}> sustainably </span>
                    <span style={{ color: 'cyan', cursor: 'pointer' }} onClick={() => handleCreateSubshell('traveling merchant', environments['traveling merchant'])}> traveling merchant <span style={{ color: 'red', fontStyle: 'italic' }}> *in progress* </span> </span>
                    <span style={{ color: 'cyan', cursor: 'pointer' }} onClick={() => handleCreateSubshell('zookeep', environments['zookeep'])}> zookeep <span style={{ color: 'red', fontStyle: 'italic' }}> *in progress* </span> </span>
                    <span style={{ color: 'cyan', cursor: 'pointer' }} onClick={() => handleCreateSubshell('simulator', environments['simulator'])}> simulator <span style={{ color: 'red', fontStyle: 'italic' }}> *in progress* </span> </span>
                </div>
            },
            description: '',
            params: []
        },
        'contact' : {
            callback: (args) => {
                return <span> Contact me by email, <span style={{ color: 'blue' }}>npdullam@gmail.com</span></span>
            },
            description: '',
            params: []
        },
        'open' : {
            callback: (args) => {
                if (args.length < 1) return <div style={{ display: 'flex', flexDirection: 'column'}}>
                    {
                        Object.entries(environments).map((pair) => {
                            let [key, environment] = pair
                            return <span style={{ color: 'cyan', cursor: 'pointer' }} onClick={() => handleCreateSubshell(key, environment)}> {key} </span>
                        })
                    } 
                </div>
                if (!environments[args[0]]) return 'Environment does not exist'
                handleCreateSubshell(args[0], environments[args[0]])
                return <span> Opening <span style={{ color: 'blue' }}>{args[0]}</span> in a subshell...</span>
            },
            description: '',
            params: []  
        }
    }

    const handleCreateSubshell = (name, environment) => {
        let id = Date.now()
        setSubshells((newSubshells) => {
            return {
                ...newSubshells, 
                [id] : { 
                    name,
                    ...environment
                }
            }
        })

        setActiveSubshell(`${id}`)
    }

    const handleExit = (id, subshell) => {
        if (!subshellsRef.current[id]) return
        setSubshells((newSubshells) => {
            return {
                ...newSubshells,
                [id] : { 
                    ...subshell 
                } 
            }
        })
    }

    return (
        <div style={{ height: '100%', width: '100%', display: 'flex', position: 'relative', overflow: 'hidden' }}>
            <div style={{ width: '50%', backgroundColor: 'black', color: 'white', display: 'flex', flexDirection: 'column', fontSize: '16px', overflowY: 'scroll' }}>
                <div style={{ height: 'calc(100% + 60px)', display: 'flex', flexDirection: 'column' }}>
                    <Shell restore={{ commands, history: [
                        "Hello, I'm Nicholas Dullam",                          
                    ] }}/>
                </div>
            </div>
            <div style={{ width: '50%', backgroundColor: 'rgba(0,0,0,.95)', display: 'flex', flexDirection: 'column', color: 'white', position: 'relative' }}>
                { Object.entries(subshells).length ? <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', overflowX: 'hidden' }}>
                    <div style={{ display: 'flex', backgroundColor: 'black', zIndex: '5', position: 'sticky', top: '0px' }}>
                        <div style={{ overflowX: 'scroll', display: 'flex' }}>
                            { 
                                Object.entries(subshells).map((pair, i) => {
                                    let [key, subshell] = pair
                                    return (
                                        <div key={i} onClick={() => setActiveSubshell(key)} style={{ cursor: 'pointer' }}>
                                            <p style={{ margin: '0px', color: 'white', padding: '20px', backgroundColor: key === activeSubshell ? 'rgba(255,255,255,.05)' : '', transition: 'background-color 300ms ease', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}> {subshell.name} </p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div style={{ width: '100%', height: '100%', overflowY: 'scroll' }}>
                        { subshells[activeSubshell].render }
                    </div>
                    <div style={{ marginTop: 'auto', padding: '20px', position: 'sticky', bottom: '0px', backgroundColor: 'rgba(20,20,20,1)' }}>
                        <Shell sub key={activeSubshell} id={activeSubshell} style={{ padding: '0px', height: '100%' }} restore={subshells[activeSubshell]} handleExit={handleExit}/>
                    </div>
                </div> : <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '16px', fontFamily: 'Menlo' }}>
                    <p style={{ margin: '0px' }}> No current subshells </p>
                    <p style={{ margin: '0px', opacity: '.7', marginTop: '5px' }}> Enter <span style={{ color: 'blue' }}>projects</span> to get started </p>
                </div> }
            </div>
        </div>
    )
}

export default Home;