import React from 'react'
import { FiLink } from 'react-icons/fi'
import travelingMerchant1 from '../images/TravelingMerchant1.png'
import { Button, Tag } from '../components'

const TravelingMerchant = (props) => {
    return (
        <div>
            <img src={travelingMerchant1} style={{ width: '100%', height: '200px', objectFit: 'cover' }}/>
            <div style={{ padding: '30px', paddingTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h1> Traveling Merchant </h1>
                    <a href={'https://traveling-merchant-main.herokuapp.com/'} target={'_blank'} style={{ textDecoration: 'none', highlight: 'none', marginLeft: 'auto' }}>
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
                    <Tag> Socket.io </Tag>
                </div>
                <h6> Communicode connects techies with non-profits in need. I lead all visual & experience decisions to develop a product that appealed to a diverse dual-toned audience. </h6>
                <h3> Description </h3>
                <h3> Role |<span style={{ opacity: '.7', fontSize: '14px' }}> Development Lead </span> </h3>

                <h3> Creating a Marketplace </h3>

                <h3> Key Takeaways </h3>
            </div>
        </div>
    )
}

export default TravelingMerchant