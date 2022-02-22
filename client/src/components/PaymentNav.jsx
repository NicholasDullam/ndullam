import { useHistory } from "react-router"
import { LoadingIcon } from "."

const PaymentNav = (props) => {
    const history = useHistory()

    return (
        <div className="sticky top-0 bg-black w-full h-16 shadow-lg flex p-4 z-[2]">
            { <LoadingIcon size={10}/> }
            <div className="ml-auto flex gap-4">
                <button onClick={() => history.push('/create')} className="bg-transparent ring-2 ring-white ring-inset text-white rounded-xl ml-[auto] p-4 text-sm flex items-center hover:bg-white hover:text-black transition-all duration-300"> Sign Up </button>
                <button onClick={() => history.push('/login')} className="bg-white text-black rounded-xl ml-[auto] p-4 text-sm flex items-center hover:bg-cyan-400 hover:text-white transition-all duration-300"> Login </button>
            </div> 
        </div>  
    )
}

export default PaymentNav