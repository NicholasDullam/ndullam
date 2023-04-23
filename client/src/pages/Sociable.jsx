import React from 'react'
import Communicode1 from '../images/communicode1.jpeg'
import { Tag, Social } from '../components'

import sociable1 from '../images/sociable1.jpg'

const Sociable = (props) => {
    return (
        <div>
            <img src={sociable1} className="w-full h-[200px] object-cover"/>
            <div className="p-8 pt-3">
                <div className="my-5" style={{ display: 'flex', alignItems: 'center', overflowX: 'scroll'}}>
                    <h1 className="text-4xl font-bold mb-0"> sociable </h1>
                    <div style={{ color: 'white', marginLeft: 'auto' }}>
                        <Social name="Request" link="mailto:npdullam@gmail.com"/>
                    </div>
                </div>                      
                <div className="flex mb-5 overflow-x-scroll">
                    <Tag>Node.js</Tag>
                    <Tag>Express.js</Tag>
                    <Tag>MongoDB</Tag>
                    <Tag>React Native</Tag>
                    <Tag>Expo</Tag>
                    <Tag>Socket.io</Tag>
                    <Tag>Azure</Tag>
                </div>
                <h6 className="mt-5"> A platform for students to explore what's active on their campus. </h6>
                <h3 className="text-xl font-bold mt-5 mb-2"> Description </h3>
                <p> College education can often be overwhelming and stressful with assignments and exams, amongst other tedious life situations. Social events allow for healthy releases of this stress and anxiety; however, it can be difficult to find these events since invitations are normally spread by word-of-mouth. sociable is designed to make taking a break from the stressful settings of college easier for Purdue students by being a unique central platform for popular social events taking place on and around Purdue’s campus. By allowing students to create and join these events individually or on the behalf of their organizations, sociable brings to the market a new, easy way for students to stay involved and socialize. As a capstone project for CS 407, we tasked ourselves to building sociable. </p>
                <h3 className="text-xl font-bold mt-5 mb-2"> Role |<span className="text-base opacity-50"> Scrum Master </span> </h3>
                <p> Working on sociable I served as the Scrum Master for the latter sprint of the project, working with a team of four other developers under SCRUM and Agile principles. We worked together to manage code reviews, pull requests, and hold our weekly standups for any notable changes made.</p>
                <h3 className="text-xl font-bold mt-5 mb-2"> Creating a Social Network </h3>
                <p> When working on what would prove to hold the fundamentals of a social network, we focused on two main points -- ease of scalability, and ease of access. For all schema under the project, we would held the first question on what could be expected of the collection under scale, and took our initial iterations from there. It was important to ensure that the platform had minimal hiccups, and could push the growth of the content, connections, and the baseline userbase -- all things that can grow disproportionately. While schema were an important aspect of scaling, or next step was infrastructure. While we didn't aim to deploy in excess, we planned around the use of Redis, and a reverse proxy, allowing for independent scaling of compute for content distribution (given our live features of the platform). </p>
                <h3 className="text-xl font-bold mt-5 mb-2"> Key Takeaways </h3>
                <p> Working on a native-first project was a new challenge for our group -- but by falling into eachothers strength, whether it be frontend, backend, or fullstack, we met our "MVP" effectively. </p>
            </div>
        </div>
    )
}

export default Sociable