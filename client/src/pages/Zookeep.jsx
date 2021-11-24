import React from 'react'
import Zookeep1 from '../images/Zookeep1.jpeg'

const Zookeep = (props) => {
    return (
        <div style={{ color: 'white' }}>
            <img src={Zookeep1} style={{ width: '100%', height: '200px', objectFit: 'cover' }}/>
            <div style={{ padding: '30px' }}>
                <h1> Zookeep </h1>
            </div>
        </div>
    )
}

export default Zookeep