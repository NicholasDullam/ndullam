import React from 'react'
import { FiLink } from 'react-icons/fi'
import sustainably1 from '../images/Sustainably1.png'
import { Button, Tag } from '../components'

const Sustainably = (props) => {
    return (
        <div>
            <img src={sustainably1} style={{ width: '100%', height: '200px', objectFit: 'cover' }}/>
            <div style={{ padding: '30px', paddingTop: '10px' }}>
                <div className="mt-3 mb-2" style={{ display: 'flex', alignItems: 'center', overflowX: 'scroll'}}>
                    <h1 className="text-4xl font-bold mb-0"> Sustainably </h1>
                    <a href={'https://app.stnbly.io/dashboard'} target={'_blank'} className="flex items-center transform rounded-3xl no-underline py-3 px-4 bg-black hover:text-black hover:bg-white hover:scale-110 shadow-md transition-all duration-300 ml-auto m-1.5">
                        <FiLink style={{ marginRight: '8px' }}/>
                        <p style={{ margin: '0px', textDecoration: 'none', highlight: 'none'  }}> Visit </p>
                    </a>
                </div>
                <div style={{ display: 'flex', marginBottom: '20px', overflowX: 'scroll' }}>
                    <Tag> Heroku </Tag>
                    <Tag> AWSS3 </Tag>
                    <Tag> MongoDB </Tag>
                    <Tag> Node.js </Tag>
                    <Tag> React.js </Tag>
                    <Tag> Express.js </Tag>
                    <Tag> Stripe </Tag>
                </div>
                <h6 className="mt-5"> Acting as a real-time weight loss servicer, Sustainably supports meal plan generation, coaching, tracking, recalibration, etc; while helping people make long-lasting fitness transformations. </h6>
                <h3 className="text-xl font-bold mt-5 mb-2"> Description </h3>
                Sustainably is a SaaS web app geared towards helping clients lose weight. It served as the expansion of my client's personal training business (Justin Bauer Fitness) into a more affordable and scalable method of getting people to reach their fitness goal. 
                <h3 className="text-xl font-bold mt-5 mb-2"> Role |<span className="text-base opacity-50"> Development Lead </span> </h3>
                At Sustainably, I served as the Development Lead, creating and managing our MVP while introducing various functional iterations as the company matured. While programming the product in it's entirety, I designed an intuitive user experience for new and power users, while ensuring backend scalability and version control through a Github organization.
                <h3 className="text-xl font-bold mt-5 mb-2"> Creating a SaaS </h3>
                When developing Sustainably as my first paid-access model, it was important to note the efficacy of design. When creating the sign-up, the sign-in, even the in-app experiences, I drove the design towards increasing user interactions and overall retention; reducing churn through our subsequent functional iterations. 
                <h3 className="text-xl font-bold mt-5 mb-2"> Key Takeaways </h3>
                <p> Working at Sustainably was my first full-time experience managing an industry-level project, contracted for a client of mine. I realized that, despite entering a position without a mentor, learning and accelerating my skillset was possible; offering enough to create an MVP and a subsequent functional iteration to an active business. </p>
            </div>
        </div>
    )
}

export default Sustainably