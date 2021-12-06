import React from 'react'
import zookeep1 from '../images/Zookeep1.jpeg'
import { FiLink } from 'react-icons/fi'
import { Button, Tag } from '../components'

const Zookeep = (props) => {
    return (
        <div style={{ color: 'white' }}>
            <img src={zookeep1} style={{ width: '100%', height: '200px', objectFit: 'cover' }}/>
            <div style={{ padding: '30px', paddingTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h1> ZooKeep </h1>
                    <a href={'https://zoo-keep.herokuapp.com/enclosures'} target={'_blank'} style={{ textDecoration: 'none', highlight: 'none', marginLeft: 'auto' }}>
                        <Button style={{ marginLeft: 'auto' }}>
                            <FiLink style={{ marginRight: '8px' }}/>
                            <p style={{ margin: '0px', textDecoration: 'none', highlight: 'none'  }}> Visit </p>
                        </Button>
                    </a>
                </div>
                <div style={{ display: 'flex', marginBottom: '20px', overflowX: 'scroll' }}>
                    <Tag> Heroku </Tag>
                    <Tag> MongoDB </Tag>
                    <Tag> Node.js </Tag>
                    <Tag> React.js </Tag>
                    <Tag> Express.js </Tag>
                </div>
                <h6> Communicode connects techies with non-profits in need. I lead all visual & experience decisions to develop a product that appealed to a diverse dual-toned audience. </h6>
                <h3> Description </h3>

                <h3> Role |<span style={{ opacity: '.7', fontSize: '14px' }}> Development Lead </span> </h3>

                <h3> Creating an Effective User Experience </h3>

                <h3> Key Takeaways </h3>
            </div>
        </div>
    )
}

export default Zookeep