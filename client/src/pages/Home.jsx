import React, { useEffect, useRef, useState } from 'react'
import { Communicode, Zookeep, Resume, Sustainably, TravelingMerchant, Algorithms, Golf } from '.'
import { Loading, Shell, Simulator } from '../components'
import { IoClose } from 'react-icons/io5'
import { BsChevronBarDown, BsChevronDown, BsFullscreenExit, BsGithub, BsLinkedin, BsStackOverflow, BsMailbox2 } from "react-icons/bs"
import { BsArrowsFullscreen } from 'react-icons/bs'
import { useParams } from 'react-router'

// @TODO collision counter, explain difference between open and projects

const Home = (props) => {
    const [subshells, setSubshells] = useState({})
    const subshellsRef = useRef(subshells)

    const [activeSubshell, setActiveSubshell] = useState(null)
    const activeSubshellRef = useRef(activeSubshell)

    const [fullscreen, setFullscreen] = useState(false)
    const [subshellExpanded, setSubshellExpanded] = useState(true)

    const { env_id } = useParams()

    useEffect(() => {
        if (env_id) handleCreateSubshell(env_id, environments[env_id])
    }, [])

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
        setActiveSubshell(next[0])
    }

    const closeTab = (e, subshell) => {
        e.stopPropagation()
        
        setSubshells((sample) => {
            delete sample[subshell]
            return { ...sample }
        })
       
        if (activeSubshell !== subshell) return

        const active = Object.entries(subshells).find((pair) => Number(pair[0]) !== subshell)

        setActiveSubshell(Number(active[0])) 
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
        'traveling_merchant' : {
            render: TravelingMerchant,
            prompt: 'traveling_merchant',
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
        },
        'golf' : {
            render: Golf,
            prompt: 'golf',
            can_fullscreen: true,
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
                    <span style={{ color: 'cyan', cursor: 'pointer' }} onClick={() => handleCreateSubshell('communicode', environments['communicode'])}> communicode  </span>
                    <span style={{ color: 'cyan', cursor: 'pointer' }} onClick={() => handleCreateSubshell('sustainably', environments['sustainably'])}> sustainably </span>
                    <span style={{ color: 'cyan', cursor: 'pointer' }} onClick={() => handleCreateSubshell('traveling_merchant', environments['traveling_merchant'])}> traveling_merchant </span>
                    <span style={{ color: 'cyan', cursor: 'pointer' }} onClick={() => handleCreateSubshell('zookeep', environments['zookeep'])}> zookeep </span>
                    <span style={{ color: 'cyan', cursor: 'pointer' }} onClick={() => handleCreateSubshell('simulator', environments['simulator'])}> simulator </span>
                    <span style={{ color: 'cyan', cursor: 'pointer' }} onClick={() => handleCreateSubshell('algorithms', environments['algorithms'])}> algorithms </span>
                    <span style={{ color: 'cyan', cursor: 'pointer' }} onClick={() => handleCreateSubshell('golf', environments['golf'])}> golf </span>
                    <span style={{ color: 'yellow' }}> 🚧 shell 🚧 </span>
                    <span style={{ color: 'yellow' }}> 🚧 java_arm 🚧 </span>
                    <span style={{ color: 'yellow' }}> 🚧 sociable 🚧 </span>
                    <span style={{ color: 'yellow' }}> 🚧 traffic_rl 🚧 </span>
                </div>
            },
            description: 'lists all current projects',
            params: []
        },
        'contact' : {
            callback: (args) => {
                return <div className="flex-col">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}> <BsMailbox2/> Email: <a target='_blank' href={'mailto: npdullam@gmail.com'} style={{ color: '#1E90FF', textOverflow: 'ellipsis', width: '200px', overflow: 'hidden' }}>npdullam@gmail.com</a></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}> <BsLinkedin/> LinkedIn: <a target='_blank' href={'https://www.linkedin.com/in/ndullam/'} style={{ color: '#1E90FF', textOverflow: 'ellipsis', width: '200px', overflow: 'hidden' }}>linkedin.com/in/ndullam/</a></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}> <BsGithub/> Github: <a target='_blank' href={'https://github.com/NicholasDullam'} style={{ color: '#1E90FF', textOverflow: 'ellipsis', width: '200px', overflow: 'hidden' }}>github.com/NicholasDullam</a></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}> <BsStackOverflow/> Stack: <a target='_blank' href={'https://stackoverflow.com/users/12109958/nicholas-dullam'} style={{ color: '#1E90FF', textOverflow: 'ellipsis', width: '200px', overflow: 'hidden', whiteSpace: 'nowrap' }}>stackoverflow.com/users/12109958/nicholas-dullam</a></div>
                        </div>
            },
            description: 'lists all available contact information',
            params: []
        },
        'open' : {
            callback: (args) => {
                if (args.length < 1) return <div style={{ display: 'flex', flexDirection: 'column'}}>
                    {
                        [Object.entries(environments).map((pair) => {
                            let [key, environment] = pair
                            return <span style={{ color: 'cyan', cursor: 'pointer' }} onClick={() => handleCreateSubshell(key, environment)}> {key} </span>
                        }), [
                            <span style={{ color: 'yellow' }}> 🚧 shell 🚧 </span>,
                            <span style={{ color: 'yellow' }}> 🚧 java_arm 🚧 </span>,
                            <span style={{ color: 'yellow' }}> 🚧 sociable 🚧 </span>,
                            <span style={{ color: 'yellow' }}> 🚧 traffic_rl 🚧 </span>
                        ]]
                    } 
                </div>
                if (!environments[args[0].toLowerCase()]) return 'Environment does not exist'
                handleCreateSubshell(args[0].toLowerCase(), environments[args[0].toLowerCase()])
                return <span> Opening <span style={{ color: '#1E90FF' }}>{args[0].toLowerCase()}</span> in a subshell...</span>
            },
            description: 'opens the parametrized environment in a subshell; listing all if no parameter is passed',
            params: ['<ENV_NAME>?']  
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
        if (!Component) return
        return <Component {...props} shell={subshells[activeSubshell]}/>
    }

    return (
        <div style={{ height: '100%', width: '100%', display: 'flex', position: 'relative', overflow: 'hidden' }}>
            <div style={{ width: window.innerWidth > 800 && (!fullscreen || !subshells[activeSubshell]?.can_fullscreen) ? '50%' : (!Object.entries(subshells).length ? '100%' : '0%'), backgroundColor: 'black', color: 'white', display: 'flex', flexDirection: 'column', fontSize: '16px', overflowY: 'scroll', transition: 'width 300ms ease' }}>
                <div style={{ height: 'calc(100% + 60px)', display: 'flex', flexDirection: 'column' }}>
                    <Shell restore={{ commands, history: [
                        <div style={{ whiteSpace: 'pre-wrap'}}>
                            <Loading/>
                            <div>Hi there, I'm Nich 👋 </div>
                            <div>- To get started, enter <span style={{ color: '#1E90FF' }}>projects</span> or <span style={{ color: '#1E90FF' }}>open</span></div>
                            <div>- Click, or open an environment by entering <span style={{ color: '#1E90FF'}}>open <span style={{ color: 'orange'}}>{'<ENV_NAME>'}</span></span></div>
                            <div>- To exit, enter <span style={{ color: '#1E90FF' }}>exit</span> into the subshell's prompt</div>
                            <div>- Enter <span style={{ color: '#1E90FF' }}>help</span> to see a list of commands</div>
                            <div style={{ whiteSpace: 'pre-wrap' }}>  </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}> <BsMailbox2/> Email: <a target='_blank' href={'mailto: npdullam@gmail.com'} style={{ color: '#1E90FF', textOverflow: 'ellipsis', width: '200px', overflow: 'hidden' }}>npdullam@gmail.com</a></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}> <BsLinkedin/> LinkedIn: <a target='_blank' href={'https://www.linkedin.com/in/ndullam/'} style={{ color: '#1E90FF', textOverflow: 'ellipsis', width: '200px', overflow: 'hidden' }}>linkedin.com/in/ndullam/</a></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}> <BsGithub/> Github: <a target='_blank' href={'https://github.com/NicholasDullam'} style={{ color: '#1E90FF', textOverflow: 'ellipsis', width: '200px', overflow: 'hidden' }}>github.com/NicholasDullam</a></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}> <BsStackOverflow/> Stack: <a target='_blank' href={'https://stackoverflow.com/users/12109958/nicholas-dullam'} style={{ color: '#1E90FF', textOverflow: 'ellipsis', width: '200px', overflow: 'hidden', whiteSpace: 'nowrap' }}>stackoverflow.com/users/12109958/nicholas-dullam</a></div>
                            <div style={{ whiteSpace: 'pre-wrap' }}>  </div>
                            <div>🚧 This site is always under construction 🚧</div>
                            <div style={{ whiteSpace: 'pre-wrap' }}>  </div>
                            <div>Projects: </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ color: 'cyan', cursor: 'pointer' }} onClick={() => handleCreateSubshell('communicode', environments['communicode'])}>communicode  </span>
                                <span style={{ color: 'cyan', cursor: 'pointer' }} onClick={() => handleCreateSubshell('sustainably', environments['sustainably'])}>sustainably </span>
                                <span style={{ color: 'cyan', cursor: 'pointer' }} onClick={() => handleCreateSubshell('traveling_merchant', environments['traveling_merchant'])}>traveling_merchant </span>
                                <span style={{ color: 'cyan', cursor: 'pointer' }} onClick={() => handleCreateSubshell('zookeep', environments['zookeep'])}>zookeep </span>
                                <span style={{ color: 'cyan', cursor: 'pointer' }} onClick={() => handleCreateSubshell('simulator', environments['simulator'])}>simulator </span>
                                <span style={{ color: 'cyan', cursor: 'pointer' }} onClick={() => handleCreateSubshell('algorithms', environments['algorithms'])}>algorithms </span>
                                <span style={{ color: 'cyan', cursor: 'pointer' }} onClick={() => handleCreateSubshell('golf', environments['golf'])}>golf </span>
                                <span style={{ color: 'yellow' }}>🚧 shell 🚧 </span>
                                <span style={{ color: 'yellow' }}>🚧 java_arm 🚧 </span>
                                <span style={{ color: 'yellow' }}>🚧 sociable 🚧 </span>
                                <span style={{ color: 'yellow' }}>🚧 traffic_rl 🚧 </span>
                            </div>
                            <div style={{ whiteSpace: 'pre-wrap' }}> </div>
                        </div>                         
                    ] }}/>
                </div>
            </div>
            <div style={{ width: window.innerWidth > 800 && (!fullscreen || !subshells[activeSubshell]?.can_fullscreen) ? '50%' : (Object.entries(subshells).length ? '100%' : '0%'), backgroundColor: 'rgba(0,0,0,.95)', display: 'flex', flexDirection: 'column', color: 'white', position: 'relative', transition: 'width 300ms ease', overflowX: 'hidden' }}>
                { Object.entries(subshells).length && subshells[activeSubshell].can_fullscreen ? <div onClick={() => setFullscreen(!fullscreen)} className='text-white bg-neutral-700 p-3 rounded-[25px] right-6 flex gap-3 hover:scale-110 transition-all duration-300 hover:bg-white hover:text-black cursor-pointer' style={{ position: 'absolute', zIndex: '1000', top: '100px', right: '30px' }}>
                    { !fullscreen ? <BsArrowsFullscreen/> : <BsFullscreenExit/> }
                </div> : null }
                { Object.entries(subshells).length ? <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', overflowX: 'hidden' }}>
                    <div style={{ display: 'flex', backgroundColor: 'black', zIndex: '5', position: 'sticky', top: '0px' }}>
                        <div style={{ overflowX: 'scroll', display: 'flex' }}>
                            { 
                                Object.entries(subshells).map((pair, i) => {
                                    let [key, subshell] = pair
                                    return (
                                        <div key={i} onClick={() => setActiveSubshell(key)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', backgroundColor: key === activeSubshell ? 'rgba(255,255,255,.05)' : '', transition: 'background-color 300ms ease',  padding: '20px' }}>
                                            <p className="mr-2" style={{ color: 'white', textOverflow: 'ellipsis', whiteSpace: 'nowrap', userSelect: 'none' }}> {subshell.name} </p>
                                            <div onClick={(e) => closeTab(e, key)} className="text-neutral-600 hover:bg-neutral-800 rounded-full p-[2px] transition-all duration-300">
                                                <IoClose/>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div style={{ width: '100%', height: '100%', overflowY: 'scroll' }}>
                        { subshells[activeSubshell] ? renderSubshell(subshells[activeSubshell].render, {}) : null }
                    </div>
                    <div style={{ marginTop: 'auto', padding: '20px', position: 'sticky', bottom: '0px', backgroundColor: 'rgba(20,20,20,1)', position: 'relative', marginBottom: !subshellExpanded ? '-50px' : '0px', transition: 'all 300ms ease' }}>
                        <BsChevronDown onClick={() => setSubshellExpanded(!subshellExpanded)} style={{ position: 'absolute', top: '10px', left: '50%', transform: `translateX(-50%) ${!subshellExpanded ? 'rotate(180deg)' : ''}`, transition: 'all 300ms ease'}} />
                        <Shell sub key={activeSubshell} id={activeSubshell} style={{ padding: '0px', height: '100%' }} restore={subshells[activeSubshell]} handleExit={handleExit}/>
                    </div>
                </div> : <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '16px', fontFamily: 'Menlo' }}>
                    <p> No current subshells </p>
                    <p className="opacity-70"> Enter <span style={{ color: '#1E90FF' }}>projects</span> to get started </p>
                </div> }
            </div>
            <div className="fixed bottom-6 text-white bg-neutral-700 p-3 rounded-[25px] right-6 flex gap-3 hover:scale-110 transition-all duration-300 hover:bg-white hover:text-black cursor-pointer">
                <a className="hover:text-neutral-300 transition-all duration-150" target='_blank' href='https://github.com/NicholasDullam'><BsGithub/></a>
                <a className="hover:text-neutral-300 transition-all duration-150" target='_blank' href='https://www.linkedin.com/in/ndullam/'><BsLinkedin/></a>
                <a className="hover:text-neutral-300 transition-all duration-150" target='_blank' href='https://stackoverflow.com/users/12109958/nicholas-dullam'><BsStackOverflow/></a>
            </div>
        </div>
    )
}

export default Home;