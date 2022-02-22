import { useEffect } from "react"
import testing from '../images/testing.jpg'

const FriendNav = (props) => {
    useEffect(() => {
        // loading friends
    }, [])

    return (
        <div className="sticky top-0 h-full w-[400px] bg-white shadow-lg text-black p-7">
            <h2 className="sticky font-bold text-lg bg-inherit mb-4"> Friends </h2>
            <div className="flex-col flex gap-4">
                <div className="h-14 bg-neutral-200 w-full rounded-xl flex p-3 items-center transition-all duration-300 cursor-pointer ring-inset hover:ring-1 ring-black">
                    <img src={testing} className="rounded-[50%] h-10 w-10 object-cover"/>
                    <div className="grow ml-3">
                        <p className="grow text-sm"> Daniel Fitzgerald</p>
                        <p className="text-[10px] opacity-70"> danielfitzgerald</p>
                    </div>
                </div>
                <div className="h-14 bg-neutral-200 w-full rounded-xl flex p-3 items-center transition-all duration-300 cursor-pointer ring-inset hover:ring-1 ring-black">
                    <img src={testing} className="rounded-[50%] h-10 w-10 object-cover"/>
                    <div className="grow ml-3">
                        <p className="grow text-sm"> Wei Bin Cheah </p>
                        <p className="text-[10px] opacity-70"> weibincheah</p>
                    </div>
                </div>
                <button className="w-full bg-black h-10 rounded-xl text-white sticky"> Add Friends </button>
            </div>
        </div>
    )
}

export default FriendNav