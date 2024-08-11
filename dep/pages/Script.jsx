import { CodeBlock, xt256 } from 'react-code-blocks'
import { useEffect, useState } from "react"
import { getScriptById, runScript } from "../api"
import { Button, LoadingIcon } from "../components"

const Script = (props) => {
    const [algorithm, setAlgorithm] = useState(null)
    const [loading, setLoading] = useState(true)
    const [runLoading, setRunLoading] = useState(false)
    const [results, setResults] = useState({})
    const [error, setError] = useState({})
    const [args, setArgs] = useState({})

    useEffect(async () => {
        if (!props.algorithm) return
        try {
            let script = await getScriptById(props.algorithm)
            setAlgorithm(script.data)
        } catch (error) { console.log(error) }
        setLoading(false)
    }, [props.algorithm])

    const run = async (_id) => {
        setRunLoading(true)
        try {
            let response = await runScript(_id, {}, args)
            setResults(response.data)
        } catch (error) { 
            console.log(error)
            setError(error.response.data) }
        setRunLoading(false)
    }

    const handleKeyPress = (event) => {
        if (event.key !== 'Enter') return
        run(props.algorithm)
    }

    const handleChange = (event, argument) => {
        setArgs({ ...args, [argument] : event.target.value })
    }

    const renderArgs = () => {
        if (!algorithm.args) return
        return algorithm.args.map((argument, i) => {
            return (
                <div className="mt-5">
                    <p> {argument.var} </p>
                    <div className="mt-3 flex gap-2 bottom-1">
                        <input onKeyPress={handleKeyPress} onChange={(e) => handleChange(e, argument.var)} value={args[algorithm.var]} className="bg-black rounded-lg text-md pl-4 pr-4 pt-2 pb-2 outline-none w-full"/>
                        { i === algorithm.args.length - 1 ? <button onClick={() => run(props.algorithm)} className="flex items-center transform rounded-lg no-underline py-3 px-4 bg-black hover:bg-green-500 hover:scale-110 shadow-md transition-all duration-300">
                            { runLoading ? <LoadingIcon size={6}/> : <p> Run </p> }
                        </button> : null }
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="flex-col">
            <h3 className="text-xl font-bold mt-5 mb-2"> { props.algorithm } </h3>
            { loading ? <div className="flex items-center justify-center h-max">
                <LoadingIcon size={20}/>
            </div> : ( algorithm ? <div>
                <p> { algorithm.description } </p>
                <div className="mt-5 bg-black pl-2 pr-2 rounded-lg">
                    <CodeBlock className='mt-5' text={algorithm.code} language={algorithm.language} showLineNumbers={false} theme={xt256}/>
                </div>
                { renderArgs() }
                <div className="mt-5">
                    <div className="flex">
                        <p> Output </p>
                        { results.time ? <p className="ml-auto">{results.time}ms</p> : null }
                    </div>
                    <div className="mt-3 bg-gray-900 rounded-lg pl-4 pr-4 pt-2 pb-2 min-h-[40px]">
                        <p className="overflow-hidden break-words"> { results.response ? (results.response.replace('\n', '').length ? results.response : 'Empty response') : 'No stdout' }</p>
                    </div>
                </div>
                <div className="mt-5">
                    <div className="flex">
                        <p> Error </p>
                    </div>
                    <div className="mt-3 bg-red-900 rounded-lg pl-4 pr-4 pt-2 pb-2 min-h-[40px]">
                        <p className="overflow-hidden break-words"> { error.error ? (error.error.replace('\n', '').length ? error.error : 'Empty response') : 'No stderr' }</p>
                    </div>
                </div>
            </div> : null ) }                
        </div>
    )
}

export default Script