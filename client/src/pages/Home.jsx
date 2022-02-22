import React, { useEffect, useRef, useState } from 'react'
import { Communicode, Zookeep, Resume, Sustainably, TravelingMerchant, Algorithms } from '.'
import { Loading, Shell, Simulator } from '../components'

// @TODO collision counter, explain difference between open and projects

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
    
    const exit = () => {
        setSubshells((newSubshells) => {
            delete newSubshells[activeSubshellRef.current]
            return { ...newSubshells }
        })
        
        const next = Object.entries(subshellsRef.current).find((pair) => pair[0] !== activeSubshellRef.current)
        if (next) setActiveSubshell(next[0])
    }

    const environments = {
        'communicode' : {
            render: Communicode,
            prompt: 'communicode',
            commands: {
                exit: {
                    callback: exit,
                    desc: 'Exits subshell'
                }
            }
        },
        'sustainably' : {
            render: Sustainably,
            prompt: 'sustainably',
            commands: {
                exit: {
                    callback: exit,
                    desc: 'Exits subshell'
                }
            }
        },
        'zookeep' : {
            render: Zookeep,
            prompt: 'zookeep',
            commands: {
                exit: {
                    callback: exit,
                    desc: 'Exits subshell'
                }
            }
        },
        'traveling merchant' : {
            render: TravelingMerchant,
            prompt: 'travelingmerchant',
            commands: {
                exit: {
                    callback: exit,
                    desc: 'Exits subshell'
                }
            }
        },
        'simulator' : {
            render: Simulator,  
            prompt: 'simulator',          
            commands: {
                exit: {
                    callback: exit,
                    desc: 'Exits subshell'
                }
            }
        },
        'resume' : {
            render: Resume,
            prompt: 'resume',
            commands: {
                exit: {
                    callback: exit,
                    desc: 'Exits subshell'
                }
            }
        },
        'algorithms' : {
            render: Algorithms,
            prompt: 'algorithms',
            commands: {
                exit: {
                    callback: exit,
                    desc: 'Exits subshell'
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
            description: 'lists all current projects',
            params: []
        },
        'contact' : {
            callback: (args) => {
                return <span> Contact me by email, <span style={{ color: '#1E90FF' }}>npdullam@gmail.com</span></span>
            },
            description: 'lists all available contact information',
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
                if (!environments[args[0].toLowerCase()]) return 'Environment does not exist'
                handleCreateSubshell(args[0].toLowerCase(), environments[args[0].toLowerCase()])
                return <span> Opening <span style={{ color: '#1E90FF' }}>{args[0].toLowerCase()}</span> in a subshell...</span>
            },
            description: 'opens the parametrized environment in a subshell; listing all if no parameter is passed',
            params: ['<PROJECT_NAME>?']  
        },
        'easteregg' : {
            callback: (args) => {
                let egg = [
                    '                                     ',
                    '              ████████               ',                   
                    '            ██        ██             ',                  
                    '          ██▒▒▒▒        ██           ',                   
                    '        ██▒▒▒▒▒▒      ▒▒▒▒██         ',                
                    '        ██▒▒▒▒▒▒      ▒▒▒▒██         ',                   
                    '      ██  ▒▒▒▒        ▒▒▒▒▒▒██       ',                   
                    '      ██                ▒▒▒▒██       ',                   
                    '    ██▒▒      ▒▒▒▒▒▒          ██     ',                   
                    '    ██      ▒▒▒▒▒▒▒▒▒▒        ██     ',                   
                    '    ██      ▒▒▒▒▒▒▒▒▒▒    ▒▒▒▒██     ',                   
                    '    ██▒▒▒▒  ▒▒▒▒▒▒▒▒▒▒  ▒▒▒▒▒▒██     ',                   
                    '      ██▒▒▒▒  ▒▒▒▒▒▒    ▒▒▒▒██       ',                   
                    '      ██▒▒▒▒            ▒▒▒▒██       ',                   
                    '        ██▒▒              ██         ',                   
                    '          ████        ████           ',                   
                    '              ████████               ',
                    '                                     '   
                ]

                return <div>
                    {
                        egg.map((entry) => {
                            return <div style={{ whiteSpace: 'break-spaces'}}>
                                {entry}
                            </div>
                        })
                    }
                </div>
            },
            description: ':)',
            params: []
        },
        'resume': {
            callback: (args) => {
                handleCreateSubshell('resume', environments['resume'])
                return <span> Opening <span style={{ color: '#1E90FF' }}>resume</span> in a subshell...</span>
            },
            description: 'opens resume in a new subshell',
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

    const renderSubshell = (Component, props) => {
        return <Component {...props} shell={subshells[activeSubshell]}/>
    }

    return (
        <div style={{ height: '100%', width: '100%', display: 'flex', position: 'relative', overflow: 'hidden' }}>
            <div style={{ width: window.innerWidth > 600 ? '50%' : (!Object.entries(subshells).length ? '100%' : '0%'), backgroundColor: 'black', color: 'white', display: 'flex', flexDirection: 'column', fontSize: '16px', overflowY: 'scroll', transition: 'width 300ms ease' }}>
                <div style={{ height: 'calc(100% + 60px)', display: 'flex', flexDirection: 'column' }}>
                    <Shell restore={{ commands, history: [
                        <div style={{ whiteSpace: 'pre-wrap'}}>
                            <Loading/>
                            <div>/* </div>
                            <div> * Hello, I'm Nicholas Dullam </div>
                            <div> * - To get started, enter <span style={{ color: '#1E90FF' }}>projects</span> or <span style={{ color: '#1E90FF' }}>open</span></div>
                            <div> * - Click a response, or open an environment by entering <span style={{ color: '#1E90FF'}}>open <span style={{ color: 'orange'}}>{'<PROJECT_NAME>'}</span></span></div>
                            <div> * - To exit a subshell, enter <span style={{ color: '#1E90FF' }}>exit</span> into the subshell's command prompt</div>
                            <div> * - Need help? Enter <span style={{ color: '#1E90FF' }}>help</span> to see a list of commands and their function</div>
                            <div> * Happy exploring :D </div>
                            <div style={{ whiteSpace: 'pre-wrap' }}> */ {'\n'} </div>
                        </div>                         
                    ] }}/>
                </div>
            </div>
            <div style={{ width: window.innerWidth > 600 ? '50%' : (Object.entries(subshells).length ? '100%' : '0%'), backgroundColor: 'rgba(0,0,0,.95)', display: 'flex', flexDirection: 'column', color: 'white', position: 'relative', transition: 'width 300ms ease', overflowX: 'hidden' }}>
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
                        { renderSubshell(subshells[activeSubshell].render, {}) }
                    </div>
                    <div style={{ marginTop: 'auto', padding: '20px', position: 'sticky', bottom: '0px', backgroundColor: 'rgba(20,20,20,1)' }}>
                        <Shell sub key={activeSubshell} id={activeSubshell} style={{ padding: '0px', height: '100%' }} restore={subshells[activeSubshell]} handleExit={handleExit}/>
                    </div>
                </div> : <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '16px', fontFamily: 'Menlo' }}>
                    <p> No current subshells </p>
                    <p className="opacity-70"> Enter <span style={{ color: '#1E90FF' }}>projects</span> to get started </p>
                </div> }
            </div>
        </div>
    )
}

export default Home;