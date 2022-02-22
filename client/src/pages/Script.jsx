import { CodeBlock, xt256 } from 'react-code-blocks'
import { useEffect, useState } from "react"
import { getScriptById, runScript } from "../api"
import { Button, LoadingIcon } from "../components"

const Script = (props) => {
    const [algorithm, setAlgorithm] = useState(null)
    const [loading, setLoading] = useState(true)
    const [runLoading, setRunLoading] = useState(false)
    const [results, setResults] = useState({})
    const [args, setArgs] = useState('')

    useEffect(async () => {
        if (!props.algorithm) return
        try {
            let script = await getScriptById(props.algorithm)
            console.log(script)
            setAlgorithm(script.data)
        } catch (error) { console.log(error) }
        setLoading(false)
    }, [props.algorithm])

    const run = async (_id) => {
        setRunLoading(true)
        try {
            let response = await runScript(_id, {}, { args: [args] })
            console.log(response.data)
            setResults(response.data)
        } catch (error) { console.log(error) }
        setRunLoading(false)
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
                <div className="mt-5 flex gap-2 sticky bottom-1">
                    <input onChange={(e) => setArgs(e.target.value)} value={args} className="bg-black rounded-lg text-md pl-4 pr-4 pt-2 pb-2 outline-none w-full"/>
                    <button onClick={() => run(props.algorithm)} className="flex items-center transform rounded-lg no-underline py-3 px-4 bg-black hover:bg-green-500 hover:scale-110 shadow-md transition-all duration-300">
                        { runLoading ? <LoadingIcon size={6}/> : <p> Run </p> }
                    </button>
                </div>
                <div className="mt-5">
                    <div className="flex">
                        <p> Output </p>
                        { results.time ? <p className="ml-auto">{results.time}ms</p> : null }
                    </div>
                    <div className="mt-3 bg-gray-900 rounded-lg pl-4 pr-4 pt-2 pb-2 min-h-[40px]">
                        <p className="overflow-hidden break-words"> { results.response || 'No output yet' }</p>
                    </div>
                </div>
            </div> : null ) }                
        </div>
    )
}

export default Script