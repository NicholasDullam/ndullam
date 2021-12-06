import React from 'react'
import Communicode1 from '../images/communicode1.jpeg'
import { Tag } from '../components'

const Communicode = (props) => {
    return (
        <div style={{ color: 'white', fontFamily: 'Menlo' }}>
            <img src={Communicode1} style={{ width: '100%', height: '200px', objectFit: 'cover' }}/>
            <div style={{ padding: '30px', paddingTop: '10px' }}>
                <h1> Communicode </h1>
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <Tag> Python </Tag>
                    <Tag> Numpy </Tag>
                    <Tag> GCP </Tag>
                    <Tag> MongoDB </Tag>
                    <Tag> Redis </Tag>
                    <Tag> Node.js </Tag>
                    <Tag> React.js </Tag>
                    <Tag> Express.js </Tag>
                </div>
                <h6> Communicode connects developers with non-profits in need. I lead the backend integrations, ensuring the development of a product that connected our two diverse audiences. </h6>
                <h3> Description </h3>
                <p> Communicode was a start-up project that used machine learning to connect developers and designers with non-profit organizations in need of a digital update. Designers and developers would be matched with non-profit organizations based on their interests and skills, or they could browse projects posted by non-profits. </p>
                <h3> Role |<span style={{ opacity: '.7', fontSize: '14px' }}> Vice President of Engineering </span> </h3>
                At Communicode, I served as the Vice President of Engineering; overseeing integrations, server architectures, and ensuring the continuity of the backend development process as we expanded to an LLC. 
                <h3> Creating <i>Shapiro</i> </h3>
                <p> One of my major feats at Communicode was the development of a backend matching algorithm; namely, <i>Shapiro</i>. <i>Shapiro</i> was an algorithm, written in python, based upon the principles of k-nearest neighbors clustering with adaptions driven towards optimizing our user experience. </p>
                <h3> Key Takeaways </h3>
                <p> Working at Communicode was one of my first real-world application of what I've learned throughout my life programming. I had never been exposed to web development, nor an outside work environment before this point. What I learned here pushed me into where I am today, studying Computer Science, Data Science, and Applied Statistics at Purdue. </p>
            </div>
        </div>
    )
}

export default Communicode