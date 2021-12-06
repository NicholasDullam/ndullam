import React from 'react'
import { FiLink } from 'react-icons/fi'
import { BsGithub } from 'react-icons/bs'
import travelingMerchant1 from '../images/TravelingMerchant1.png'
import { Button, Tag } from '../components'

const TravelingMerchant = (props) => {
    return (
        <div>
            <img src={travelingMerchant1} style={{ width: '100%', height: '200px', objectFit: 'cover' }}/>
            <div style={{ padding: '30px', paddingTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h1> Traveling Merchant </h1>
                    <div style={{ display: 'flex', marginLeft: 'auto' }}>
                        <a href={'https://github.com/NicholasDullam/traveling_merchant'} target={'_blank'} style={{ textDecoration: 'none', highlight: 'none', marginLeft: 'auto', margin: '5px' }}>
                            <Button style={{ marginLeft: 'auto' }}>
                                <BsGithub style={{ marginRight: '8px' }}/>
                                <p style={{ margin: '0px', textDecoration: 'none', highlight: 'none'  }}> Github </p>
                            </Button>
                        </a>
                        <a href={'https://traveling-merchant-main.herokuapp.com/'} target={'_blank'} style={{ textDecoration: 'none', highlight: 'none', marginLeft: 'auto', margin: '5px' }}>
                            <Button style={{ marginLeft: 'auto' }}>
                                <FiLink style={{ marginRight: '8px' }}/>
                                <p style={{ margin: '0px', textDecoration: 'none', highlight: 'none'  }}> Visit </p>
                            </Button>
                        </a>
                    </div>
                </div>
                <div style={{ display: 'flex', marginBottom: '20px', overflowX: 'scroll' }}>
                    <Tag> Heroku </Tag>
                    <Tag> MongoDB </Tag>
                    <Tag> Node.js </Tag>
                    <Tag> React.js </Tag>
                    <Tag> Express.js </Tag>
                    <Tag> Socket.io </Tag>
                </div>
                <h6> Trading virtual items and managing the logistics of virtual trades and transactions can be inherently difficult. Traveling Merchant was created to be the hub for any sales gone virtual. </h6>
                <h3> Description </h3>
                <p> Traveling Merchant is an online marketplace focused on the sale and logistics assosciated with virtual trades and services. It was a project started on the basis of my former roommates experiences when starting his own online business; dealing with eBay, game developers, and third-party processing, I sought to solve his problems for him. The project evolved when I was given the opportunity to lead a team through CS 307 (Software Engineering I) at Purdue. Being a semester long project, I also used the project as the basis for startup analysis in ENTR 310 (Marketing for Small Ventures).</p> 
                <h3> Role |<span style={{ opacity: '.7', fontSize: '14px' }}> Development Lead </span> </h3>
                <p>Working on Traveling Merchant I've served as the Development Lead, managing a team of three developers under SCRUM and Agile principles. While performing code reviews, managing pull requests and committing head-on, I lead the project in it's technical entirety.</p>
                <h3> Creating a Marketplace </h3>
                <p>By aiming to development a powerful online marketplace, traditionally two audiences are sought out with different user experiences; however, we looked to change that. When developing Traveling Merchant, we took the marketplace concept to the next level, integrating the buyer and seller experiences with variable commissions based on user level (affected by total site spending/earnings), and creating responsive messaging and notifications right out of the box.</p>
                <h3> Key Takeaways </h3>
                <p>What I've learned from Traveling Merchant thus far is that, creating a startup and managing a team can be an inherently difficult process; especially when balancing workloads. People won't always fulfill what they're set out to do, and when developing, you need to be prepared for that. </p>
            </div>
        </div>
    )
}

export default TravelingMerchant