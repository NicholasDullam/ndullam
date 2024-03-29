import React from 'react'
import zookeep1 from '../images/Zookeep1.jpeg'
import { FiLink } from 'react-icons/fi'
import { Button, Tag, Social } from '../components'
import { BsGithub } from 'react-icons/bs'

const Zookeep = (props) => {
    return (
        <div>
            <img src={zookeep1} style={{ width: '100%', height: '200px', objectFit: 'cover' }}/>
            <div className="p-8 pt-3">
                <div className="my-5" style={{ display: 'flex', alignItems: 'center', overflowX: 'scroll'}}>
                    <h1 className="text-4xl font-bold mb-0"> Zookeep </h1>
                    <div style={{ color: 'white', marginLeft: 'auto' }}>
                        <Social name="GitHub" link='https://github.com/NicholasDullam/zookeep'/>
                    </div>
                </div>   
                <div className="flex mb-5 overflow-x-scroll">
                    <Tag>Heroku</Tag>
                    <Tag>MongoDB</Tag>
                    <Tag>Node.js</Tag>
                    <Tag>React.js</Tag>
                    <Tag>Express.js</Tag>
                </div>
                <h6> An experimental project, seeking to test the integrations of information systems through an intuitive admin-level user experience </h6>
                <h3 className="text-xl font-bold mt-5 mb-2"> Description </h3>
                <p> ZooKeep is a zoo-management platform, offering an experience geared at increasing the efficacy of management integrations. This project was started as an experimental design, testing user experience with more complex manipulation of information systems through CS 348 (Information Systems) at Purdue.</p>
                <h3 className="text-xl font-bold mt-5 mb-2"> Role |<span className="text-base opacity-50"> Developer </span> </h3>
                <p>When working on ZooKeep, as served as one of three developers; programming both the frontend and backend implementations while focusing on continuous integrations and database management. </p>
                <h3 className="text-xl font-bold mt-5 mb-2"> Creating an Effective User Experience </h3>
                <p> User experience, especially when dealing with high-level interactions, requires design that is both intuitive and responsive. Creating navigation that is straight-forward, including the minimum interactions to complete a function, and ensuring that all interactions are direct and understood are crucial in providing the user with the response that they expect, when they expect it.</p>
                <h3 className="text-xl font-bold mt-5 mb-2"> Key Takeaways </h3>
                <p>Working on ZooKeep, I've understood the importance of concrete data construction for scalability, alongside the necessary precautions when integrating a user-experience to admin-level data manipulation. Ensuring DB transactions and isolation levels are properly seated are also steps that must be taken when dealing with concurrent changes. </p>
            </div>
        </div>
    )
}

export default Zookeep