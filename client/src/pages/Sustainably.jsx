import React from 'react'
import { FiLink } from 'react-icons/fi'
import sustainably2 from '../images/sustainably2.png'
import { Button, Tag, Social } from '../components'

const Sustainably = (props) => {
    return (
        <div>
            <img src={sustainably2} style={{ width: '100%', height: '200px', objectFit: 'cover' }}/>
            <div className="p-8 pt-3">     
                <div className="my-5" style={{ display: 'flex', alignItems: 'center', overflowX: 'scroll'}}>
                    <h1 className="text-4xl font-bold mb-0"> Sustainably </h1>
                    <div style={{ color: 'white', marginLeft: 'auto' }}>
                        <Social name="Visit" link='https://app.stnbly.io/dashboard'/>
                    </div>
                </div>  
                <div className="flex mb-5 overflow-x-scroll">
                    <Tag>Heroku</Tag>
                    <Tag>AWS</Tag>
                    <Tag>MongoDB</Tag>
                    <Tag>Node.js</Tag>
                    <Tag>React.js</Tag>
                    <Tag>Express.js</Tag>
                    <Tag>Stripe</Tag>
                </div>
                <h6 className="mt-5"> A wellness-driven startup with an aim to help those on their fitness journey. </h6>
                <h3 className="text-xl font-bold mt-5 mb-2"> Description </h3>
                Sustainably is a SaaS web app geared towards helping people reach their fitness goal. It expands my client's personal training business into a more affordable and scalable method of giving his customers the tools necessary to get to where they want to be.
                <h3 className="text-xl font-bold mt-5 mb-2"> Role |<span className="text-base opacity-50"> Development Lead </span> </h3>
                At Sustainably, I continue to serve as the Development Lead, creating and managing our MVP while introducing various functional iterations as the company's matured. While programming the product in it's entirety, I designed an intuitive user experience for new and power users, while ensuring backend scalability and version control through a Github organization.
                <h3 className="text-xl font-bold mt-5 mb-2"> Creating a SaaS </h3>
                When developing Sustainably as my first paid-access model, it was important to note the efficacy of design. When creating the sign-up, the sign-in, even the in-app experiences, I drove the design towards increasing user interactions and overall retention; reducing churn through our subsequent functional iterations. 
                <h3 className="text-xl font-bold mt-5 mb-2"> Key Takeaways </h3>
                <p> Working at Sustainably was my first full-time experience managing an industry-level project, contracted for a client of mine. I realized that, despite entering a position without a mentor, learning and accelerating my skillset was possible; offering enough to create an MVP and a subsequent functional iteration to an active business. </p>
            </div>
        </div>
    )
}

export default Sustainably