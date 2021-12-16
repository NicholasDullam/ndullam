import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'
import useShell from '../shell';

const Cursor = styled.div`
    animation-name: pulse;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    @keyframes pulse {
        from {
            opacity: .2;
        }

        80% {
            opacity: 1;
        }

        to {
            opacity: .2;
        }
    }
`

const Shell = (props) => {
    const [contentHeight, setContentHeight] = useState(0)
    const [focused, setFocused] = useState(false)
    const [buffer, setBuffer] = useState('')
    const [selection, setSelection] = useState(0)

    const shell = useShell(props.restore || {})
    const shellRef = useRef(shell)

    const inputRef = useRef()
    const contentRef = useRef()

    useEffect(() => {
        shellRef.current = shell
    }, [shell])

    useEffect(() => {
        if (props.commands) props.commands.forEach((command) => {
            shell.addCommand(command.name, command)
        })

        if (inputRef.current) {
            inputRef.current.focus()
            setFocused(true)
        }

        return () => {
            return props.handleExit ? props.handleExit(props.id, {
                name: props.restore ? props.restore.name : null,
                render: props.restore ? props.restore.render : null,
                history: shellRef.current.history,
                backlog: shellRef.current.backlog,
                commands: shellRef.current.commands,
                buffer: shellRef.current.buffer,
                cursor: shellRef.current.cursor,
                prompt: shellRef.current.prompt
            }) : null
        }
    }, [])

    useEffect(() => {
        if (!contentRef.current) return null
        setContentHeight(contentRef.current.getBoundingClientRect().height)
    }, [shell.history])

    useEffect(() => {
        if (!inputRef.current) return
        setSelection(inputRef.current.selectionStart)
    }, [buffer])

    // ref handler
    const getInputBounds = () => {
        if (!inputRef.current || !contentRef.current) return {}
        let { left, width} = inputRef.current.getBoundingClientRect()
        return { left: left - 29, top: contentHeight - 20, width, selection }
    }

    // input handlers
    const handleKeyPress = (event) => {
        switch (event.key) {
            case ('Enter') : {
                shell.input(buffer)
                return setBuffer('')
            }

            default : {
                return null
            }
        }
    }

    const handleKeyDown = (event) => {
        switch (event.key) {
            case ('ArrowUp') : {
                let backlog = shell.incrementCursor()
                return setBuffer(backlog)            
            }

            case ('ArrowDown') : {
                let backlog = shell.decrementCursor()
                return setBuffer(backlog)
            }

            default : {
                return null
            }
        }
    }

    const handleSelection = (event) => {
        setSelection(event.target.selectionStart)
    }

    const handleChange = (event) => {
        shell.setBuffer(event.target.value)
        setBuffer(event.target.value)
    }

    const handleFocus = (event) => {
        if (!inputRef.current) return
        inputRef.current.focus()
        setFocused(true)
    }

    return (
        <div style={{ height: 'calc(100% + 60px)', padding: '30px', ...props.style }} onClick={handleFocus}>
            <div ref={contentRef} style={{ display: 'flex', flexDirection: 'column', padding: '10px', position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {
                        shell.history.slice(props.sub ? shell.history.length - 2 : 0, shell.history.length).map((line, i) => {
                            return (
                                <code key={i} style={{ whiteSpace: false ? 'break-spaces' : ''}}>{line}</code>
                            )
                        })
                    }
                </div>
                <div style={{ display: 'flex' }}>
                    <code> {`${shell.prompt}>`}&nbsp; </code>
                    <input onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onSelect={handleSelection} ref={inputRef} value={buffer} onChange={handleChange} type='text' style={{ backgroundColor: 'inherit', border: 'none', color: 'white', padding: '0px', highlight: 'none', outline: 'none', fontSize: '16px', color: 'transparent', margin: '0px', textShadow: '0px 0px 0px #fff', width: '100%' }} onKeyPress={handleKeyPress} onKeyDown={handleKeyDown}/>
                    { focused ? <Cursor style={{ height: '1.2ch', width: '.8ch', borderBottom: '1px solid white', borderRight: '1px solid white', borderRadius: '1px', position: `absolute`, left: `calc(${getInputBounds().left}px + min(${(getInputBounds().selection - 1)}ch, ${getInputBounds().width || 0}px) + 4px)`, top: getInputBounds().top - 4, transition: `top 150ms ease, left 150ms ease` }}/> : null }
                </div>
            </div>
        </div>
    )
}

export default Shell