import React from 'react'
import trafficrl1 from '../images/trafficrl1.png'
import { Social, Tag } from '../components'

import modelingreport from '../images/modelingreport.pdf'

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
                    <Tag>SUMO</Tag>
                    <Tag>SUMORL</Tag>
                </div>
                <h6 className="mt-5"> A project aimed at optimizing traffic-light patterns for improved realistic throughput of intersections. </h6>
                <h3 className="text-xl font-bold mt-5 mb-2"> Description </h3>
                <p> As a capstone project for CS 490, my team and I worked alongside a professor from Purdue's department of Civil Engineering to optimize traffic patterns with deep-reinforcement learning principles. </p>
                <h3 className="text-xl font-bold mt-5 mb-2"> Role |<span className="text-base opacity-50"> Member </span> </h3>
                <p> As a member of a team of six other developers, I worked to aid the group in data preparation, modeling, evaluations, and general understanding, while documenting reports of our results and processes for further repeatability. </p>
                <h3 className="text-xl font-bold mt-5 mb-2"> Modeling with Deep RL </h3>
                <p> In our case, given our use of reinforcement learning, it's important to note how we managed the state and environment. Based on 15 minutes of data from Lankershim boulevard, we created baseline aggregates, like turning volume, to use an a simulation tool known as SUMO -- this would end up being our way of creating a new data pool for our models.  Modeling with a focus on deep-reinforcement learning in our case can be broken down into three groups: use of deep-q networks (DQN), proximal policy optimization (PPO), and soft-actor critic (SAC). Each of these models was tested with two value functions to optimize throughout, one with judgement on aggregate vehicle delay, and the other on total vehicle stops. Results for our initial findings can also be found below.  </p>
                <div style={{ color: 'white', marginTop: '20px', display: 'flex' }}>
                    <Social name="Dataset" link="https://data.transportation.gov/Automobiles/Next-Generation-Simulation-NGSIM-Vehicle-Trajector/8ect-6jqj"/>
                </div>
                <div style={{ color: 'white', marginTop: '20px', display: 'flex' }}>
                    <Social name="Modeling" link={modelingreport}/>
                </div>
                <h3 className="text-xl font-bold mt-5 mb-2"> Key Takeaways </h3>
                <p> As a project heavy in development, understanding, and repeatability, it was important to cycle changes -- for instance, once we've developed a solution, but develop a new understanding of the data, it's crucial to cycle back and reflect the new understanding in the development process. As for repeatability, with things constantly changing, it's necessary to document the entire process to ensure any results can be matched by a reviewing third-party. </p>
            </div>
        </div>
    )
}

export default TrafficRL