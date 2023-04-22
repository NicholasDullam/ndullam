import { useState, useRef } from "react"
import { FiArrowUpRight } from 'react-icons/fi'

const Social = (props) => {
    const [isHovered, setIsHovered] = useState(false)

    const containerRef = useRef()
    
    return (
        <div>
            <a onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} ref={containerRef} style={{ display: 'flex', position: 'relative' }} href={props.link} target="_blank"> 
                {props.name} 
                <FiArrowUpRight/>
                <span style={{ width: isHovered ? 'calc(100%)' : '0px', borderBottom: '1px solid white', height: '1px', position: 'absolute', bottom: '0px', left: '0px', transition: 'all 300ms ease' }}/> 
            </a>
        </div>
    )
}

export default Social