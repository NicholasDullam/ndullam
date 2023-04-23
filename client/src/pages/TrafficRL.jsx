import React from 'react'
import trafficrl1 from '../images/trafficrl1.png'
import { Social, Tag } from '../components'

const TrafficRL = (props) => {
    return (
        <div>
            <img src={trafficrl1} className="w-full h-[200px] object-cover"/>
            <div className="p-8 pt-3">
                <div className="my-5" style={{ display: 'flex', alignItems: 'center', overflowX: 'scroll'}}>
                    <h1 className="text-4xl font-bold mb-0"> Traffic Deep RL </h1>
                </div>                
                <div className="flex mb-5 overflow-x-scroll">
                    <Tag>Python</Tag>
                    <Tag>Numpy</Tag>
                    <Tag>Rllib</Tag>
                    <Tag>Sumo</Tag>
                    <Tag>SumoRL</Tag>
                </div>
                <h6 className="mt-5"> A project aimed at optimizing traffic-light patterns for improved realistic throughput of intersections. </h6>
                <h3 className="text-xl font-bold mt-5 mb-2"> Description </h3>
                <p> Communicode was a start-up project that used machine learning to connect developers and designers with non-profit organizations in need of a digital update. Designers and developers would be matched with non-profit organizations based on their interests and skills, or they could browse projects posted by non-profits. </p>
                <h3 className="text-xl font-bold mt-5 mb-2"> Role |<span className="text-base opacity-50"> Member </span> </h3>
                At Communicode, I served as the Vice President of Engineering; overseeing integrations, server architectures, and ensuring the continuity of the backend development process as we expanded to an LLC. 
                <h3 className="text-xl font-bold mt-5 mb-2"> Creating <i>Shapiro</i> </h3>
                <p> One of my major feats at Communicode was the development of a backend matching algorithm; namely, <i>Shapiro</i>. <i>Shapiro</i> was an algorithm, written in python, based upon the principles of k-nearest neighbors clustering with adaptions driven towards optimizing our user experience. </p>
                <h3 className="text-xl font-bold mt-5 mb-2"> Key Takeaways </h3>
                <p> Working at Communicode was one of my first real-world application of what I've learned throughout my life programming. I had never been exposed to web development, nor an outside work environment before this point. What I learned here pushed me into where I am today, studying Computer Science, Data Science, and Applied Statistics at Purdue. </p>
            </div>
        </div>
    )
}

export default TrafficRL