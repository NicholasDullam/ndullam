import React, { useEffect, useState } from 'react'
import { Script } from "."
import { getScripts } from "../api"
import { Button, LoadingIcon } from "../components"
import { IoMdArrowRoundBack } from 'react-icons/io'

const Algorithms = (props) => {
    const [algorithm, setAlgorithm] = useState(null)
    const [scripts, setScripts] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(async () => {
        try { 
            const buffer = await getScripts()
            console.log(buffer)
            setScripts(buffer.data.data)
        } catch (error) { console.log(error) }

        setLoading(false)
    }, [])

    const renderAlgorithms = () => {
        if (!scripts) return null
        return <div>
            <h3 className="text-xl font-bold mb-5"> Browse </h3>
            {
                scripts.map((script) => {
                    let date = new Date(script.created_at)
                    return <div onClick={() => setAlgorithm(script._id)} className="cursor-pointer flex bg-black hover:text-black hover:bg-white hover:scale-[101%] shadow-md transition-all duration-300 p-3 rounded-lg text-sm">
                        <p> { script._id } </p>
                        <p className="font-bold ml-auto" onClick={() => setAlgorithm(script._id)}> { `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}` } </p>
                    </div>
                })
            }
        </div>
    }

    return (
        <div>
            <div className="p-8 pt-3">
                <h1 className="text-4xl font-bold my-5"> Algorithms </h1>
                { 
                    algorithm ? <div>
                        <button onClick={() => setAlgorithm(null)} className="flex items-center transform rounded-3xl no-underline py-3 px-4 bg-black hover:text-black hover:bg-white hover:scale-110 shadow-md transition-all duration-300">
                            <IoMdArrowRoundBack className="mr-2"/>
                            <p>Browse</p>
                        </button>
                        <Script algorithm={algorithm}/>
                    </div> : ( loading ? <div className="flex items-center justify-center">
                        <LoadingIcon size={20}/>
                    </div> : renderAlgorithms(scripts) )
                }
            </div>
        </div>
    )
}

export default Algorithms