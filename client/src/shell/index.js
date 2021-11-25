import { useState } from 'react';
import { split } from 'shlex';

const useShell = (props) => {
    const def = {
        prompt: {
            callback: (args) => {
                if (args.length < 1) return 'Failed to change prompt'
                setPrompt(args[0])
                return <span>Prompt changed to <span style={{ color: 'blue' }}> {args[0]}</span></span>
            },
            description: '',
            params: []
        },
        clear: {
            callback: (args) => {
                setHistory([])
                return null
            },
            description: '',
            params: []
        },
        echo: {
            callback: (args) => {
                let string = ''
                args.forEach((arg) => string += `${arg} `)
                return string
            },
            description: '',
            params: []
        },
        help: {
            callback: (args) => {
                let listings = Object.entries(commands)
                return listings.map((listing) => {
                    let [key, command] = listing
                    return key !== 'help' ? <div>
                        <span style={{ color: 'blue' }}> {key}: </span>
                    </div> : null
                })
            },
            description: '',
            params: []
        }
    }

    const [prompt, setPrompt] = useState(props.prompt || 'myshell')
    const [history, setHistory] = useState(props.history || [])
    const [backlog, setBacklog] = useState(props.backlog || [])
    const [buffer, setBuffer] = useState(props.buffer || '')
    const [cursor, setCursor] = useState(props.cursor || -1)
    const [commands, setCommands] = useState(props.commands ? { ...props.commands, ...def } : def )

    const input = (value) => {
        let args = split(value)
        setHistory((hist) => [...hist, `${prompt}> ${value}`])
        let instance = commands[args[0]] ? commands[args[0]].callback(args.splice(1, args.length)) : (args[0] ? <span> Command <span style={{ color: 'red' }}>{args[0]}</span> not found </span> : null)
        if (instance) setHistory((hist) => [...hist, instance])
        if (args[0]) setBacklog([value, ...backlog])
        setBuffer('')
        return instance
    }

    const incrementCursor = () => {
        let newCursor = cursor + 1 < backlog.length ? cursor + 1 : 0
        setCursor(newCursor)
        return backlog[newCursor] || buffer
    }

    const decrementCursor = () => {
        let newCursor = cursor - 1 >= -1 ? cursor - 1 : -1
        setCursor(newCursor)
        return backlog[newCursor] || buffer
    }

    return {
        prompt,
        history,
        backlog,
        commands,
        buffer,
        cursor,
        input,
        incrementCursor,
        decrementCursor,
        setHistory,
        setBuffer
    }
}

export default useShell