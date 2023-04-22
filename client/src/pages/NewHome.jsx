import React, { useEffect, useRef, useState } from "react"
import { Loading, Wave } from "../components"
import { FiArrowUpRight } from 'react-icons/fi'

import Communicode from "./Communicode"
import Sustainably from "./Sustainably"
import TravelingMerchant from "./TravelingMerchant"
import Zookeep from "./Zookeep"
import JavaARM from "./JavaARM"
import Sociable from "./Sociable"
import TrafficRL from "./TrafficRL"

import communicode1 from '../images/communicode1.jpeg'
import sustainably1 from '../images/Sustainably1.png'
import travelingMerchant1 from '../images/TravelingMerchant1.png'
import travelingMerchant2 from '../images/travelingmerchant2.png'
import zookeep1 from '../images/Zookeep1.jpeg'
import javaarm1 from '../images/javaarm1.png'

import Resume from "./Resume"
import { useHistory } from "react-router"

import styled from "styled-components"

const ArrowContainer = styled.div`
    animation-name: move;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;

    @keyframes move {
        0% {
            
            transform: translateX(100%);
        }

        100% {
            transform: translateX(-100%);
        }
    }
`
const descriptions = {
    zookeep: "An experimental project, seeking to test the integrations of information systems through an intuitive admin-level user experience",
    communicode: "Communicode connects developers with non-profits in need. I lead the backend integrations, ensuring the development of a product that connected our two diverse audiences.",
    sustainably: "Acting as a real-time weight loss servicer, Sustainably supports meal plan generation, coaching, tracking, recalibration, etc; while helping people make long-lasting fitness transformations.",
    traveling_merchant: "Trading virtual items and managing the logistics of virtual trades and transactions can be inherently difficult. Traveling Merchant was created to be the hub for any sales gone virtual.",
    java_arm: "A from-scratch compiler built to support a subset of Java for ARM."
}

const NewHome = (props) => {
    const [projectsOpen, setProjectsOpen] = useState(false)
    const [isResume, setIsResume] = useState(false)

    const containerRef = useRef()

    const history = useHistory()

    return (
        <div style={{ backgroundColor: '#111', height: '100dvh', overflow: 'hidden', color: '#999', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
            <Loading/>
            {/* Hero */}
            <div ref={containerRef} style={{ height: '100dvh' }}>
                <Wave scale={10} containerRef={containerRef}/>
                {/* Name banner */}
                <div style={{ padding: '4px 12px 8px 12px', position: 'absolute', bottom: '0px', width: '100%', backgroundColor: '#111'}}>
                    <h4 style={{ fontSize: '20px', marginBottom: '-5px' }}> Nicholas Dullam </h4>
                    <h4 style={{ fontSize: '16px', color: '#666', marginBottom: '3px' }}> Development Lead </h4>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {/* Socials */}
                        <div style={{ color: 'white' }}>
                            <Social link={"https://github.com/NicholasDullam"} name="Github"/>
                            <Social link={"https://www.linkedin.com/in/ndullam/"} name="LinkedIn"/>
                            <Social link={"https://stackoverflow.com/users/12109958/nicholas-dullam"} name="Stack"/>
                        </div>
                        {/* Nav */}
                        <div>
                            <NavElement label={'Resume'} onClick={() => {
                                setProjectsOpen(!projectsOpen)
                                setIsResume(true)
                            }}/>
                            <NavElement label={'Projects'} onClick={() => setProjectsOpen(!projectsOpen)}/>
                            <NavElement label={'Sandbox'} onClick={() => history.push('/sandbox')}/>
                        </div>
                    </div>
                </div>
            </div>
            <ProjectModal open={projectsOpen} resume={isResume} handleClose={() => {
                setProjectsOpen(false)
                setTimeout(() => setIsResume(false), 300)
            }}/>
        </div>
    )
}

const NavElement = (props) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div {...props} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={{ cursor: 'pointer', color: '#888' }}>
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'left',  borderRadius: '25px', transition: 'all 300ms ease', color: isHovered ? 'white' : '' }}>
                <div style={{ height: '0px', width: isHovered ? '50px' : '20px', borderBottom: '1px solid', transition: 'all 300ms ease' }}/>
                <p>{props.label}</p>
            </div>
        </div>
    )
}

const Social = (props) => {
    const [isHovered, setIsHovered] = useState(false)

    const containerRef = useRef()
    
    return (
        <div>
            <a onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} ref={containerRef} style={{ display: 'flex', position: 'relative' }} href={props.link} target="_blank"> 
                {props.name} 
                <FiArrowUpRight/>
                <span style={{ width: isHovered ? 'calc(100%)' : '0px', borderBottom: '1px solid white', height: '1px', position: 'absolute', bottom: '0px', left: '0px', transition: 'all 300ms ease' }}/> 
            </a>
        </div>
    )
}

const ProjectModal = (props) => {
    const [projectOpen, setProjectOpen] = useState(false)
    const [project, setProject] = useState(null)
    const [open, setOpen] = useState(null)

    const [height, setHeight] = useState(window.innerHeight / 3)
    const [scroll, setScroll] = useState(true)

    const contentRef = useRef()

    const handleResize = () => {
        setHeight(window.innerHeight / 3)
    }

    const handleScroll = (e) => {
        setScroll(e.target.scrollTop + window.innerHeight < (contentRef.current.children.length - 1) * height)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (props.open === false) {
            let id = setTimeout(() => setOpen(false), 300)
            return () => clearTimeout(id)
        } else {
            setOpen(props.open)
        }
    }, [props.open])

    const handleOpen = (component) => {
        setProject(component)
        setProjectOpen(true)
    }

    const handleClose = () => {
        if (projectOpen) {
            setProjectOpen(false)
            setTimeout(() => props.handleClose(), 300)
        } else {
            props.handleClose()
        }
    }

    const handleExit = () => {
        if (projectOpen) setProjectOpen(false)
        else props.handleClose()
    }



    return <div>
        <div onClick={handleClose} style={{ height: '100%', width: '100%', position: 'relative', backgroundColor: `rgba(0,0,0,${props.open ? '0.7' : '0'})`, visibility: open ? 'visible' : 'hidden', position: 'fixed', top: '0px', left: '0px', transition: 'all 300ms ease' }}/>
        <div style={{ position: 'fixed', overflow: 'hidden', right: '0px', top: '0px', height: '100%', width: '800px', maxWidth: '100%', backgroundColor: 'black', transform: ! props.open ? 'translateX(100%)' : null, transition: 'all 300ms ease' }}>
            <div style={{ position: 'absolute', top: '10px', left: '10px', color: 'white', zIndex: '3000', overflow: 'hidden', display: 'flex', alignItems: 'center', backgroundColor: '#000', padding: '4px 7px', borderRadius: '25px', cursor: 'pointer' }} onClick={handleExit}>
                <div style={{ width: '20px', height: '20px', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                    <ArrowContainer>
                        <FiArrowUpRight style={{ transform: 'rotate(-135deg)', color: 'white' }}/>
                    </ArrowContainer>
                </div>
                <p> exit </p>
            </div>
            <div style={{ position: 'absolute', bottom: '70px', right: '-13px', opacity: scroll && !props.resume ? '1' : '0', transform: 'rotate(-90deg)', color: 'white', zIndex: '1000', overflow: 'hidden', display: 'flex', alignItems: 'center',  padding: '4px 7px', borderRadius: '25px', cursor: 'pointer', transition: 'all 300ms ease', WebkitTransformOrigin: '50% 52%' }}>
                <div style={{ width: '20px', height: '20px', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                    <ArrowContainer>
                        <FiArrowUpRight style={{ transform: 'rotate(-135deg)', color: 'white' }}/>
                    </ArrowContainer>
                </div>
                <p> scroll </p>
            </div>
            <div ref={contentRef} className="snap-y scroll-smooth" style={{ overflowY: 'scroll', height: '100%' }} onScroll={handleScroll}>
                { props.resume ? <Resume/> : <>
                    <ProjectEntry description={descriptions.sustainably} height={height} active name="Sustainably" src={sustainably1} onClick={() => handleOpen(<Sustainably/>)}/>
                    <ProjectEntry description={descriptions.java_arm} height={height} active name="Java for ARM" src={javaarm1} onClick={() => handleOpen(<JavaARM/>)}/>
                    <ProjectEntry description={descriptions.sociable} height={height} active name="sociable" src={travelingMerchant2} onClick={() => handleOpen(<Sociable/>)}/>
                    <ProjectEntry description={descriptions.sociable} height={height} active name="Traffic Deep RL" src={travelingMerchant2} onClick={() => handleOpen(<TrafficRL/>)}/>
                    <ProjectEntry description={descriptions.traveling_merchant} height={height} date='12/21' name="Traveling Merchant" src={travelingMerchant2} onClick={() => handleOpen(<TravelingMerchant/>)}/>
                    <ProjectEntry description={descriptions.zookeep} height={height} date='12/21' name="Zookeep" src={zookeep1}  onClick={() => handleOpen(<Zookeep/>)}/>
                    <ProjectEntry description={descriptions.communicode} height={height} date='3/18' name="Communicode" src={communicode1}  onClick={() => handleOpen(<Communicode/>)}/>
                    <ProjectEntryModal component={project} open={projectOpen}/>
                </> }
            </div>
        </div> 
    </div>
}

const ProjectEntry = (props) => {
    const [isHovered, setIsHovered] = useState(false)
    const [contentHeight, setContentHeight] = useState(0)

    const containerRef = useRef()
    const contentRef = useRef()

    useEffect(() => {
        const dimensions = contentRef.current.getBoundingClientRect()
        if (isHovered) setContentHeight(dimensions.height)
        else setContentHeight(0)
    }, [isHovered])

    return <div className="snap-center" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={{ position: 'relative', cursor: 'pointer', borderBottom: '1px solid black' }} onClick={props.onClick}>
        <div style={{ backgroundColor: `rgba(0,0,0,${isHovered ? '.5' : '.8'})`, height: '100%', width: '100%', zIndex: '100', position: 'absolute', transition: 'all 300ms ease' }}/>
        <img src={props.src} style={{ width: '100%', height: props.height, objectFit: 'cover', backgroundColor: 'white' }}/>
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', zIndex: '101', color: 'white', overflow: 'hidden' }}>
            <p ref={containerRef} style={{ display: 'flex', position: 'relative' }}> 
                {props.name} 
                <FiArrowUpRight/>
                <span style={{ width: isHovered ? 'calc(100%)' : '0px', borderBottom: '1px solid white', height: '1px', position: 'absolute', bottom: '0px', left: '0px', transition: 'all 300ms ease' }}/> 
            </p>
            <div style={{ height: contentHeight, maxHeight: props.height, transition: 'all 300ms ease' }}>
                <p ref={contentRef} style={{ maxWidth: props.height, paddingTop: props.description?.length ? '10px' : '0px' }}>
                    { props.description }
                </p> 
            </div>   
        </div>
        <div className="flex items-center transition-all duration-300" style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: '101', display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}>
            <p> { props.active ? 'Active' : props.date } </p>
            { props.active ? <div style={{ position: 'relative' }}>
                <div style={{ height: '10px', width: '10px', borderRadius: '50%' }} className={`bg-green-400`}/>
                <div style={{ height: '10px', width: '10px', borderRadius: '50%', position: 'absolute', top: '0px', left: '0px' }} className={`bg-green-400 animate-ping`}/>
            </div> : null }
        </div>
    </div>
}

const ProjectEntryModal = (props) => {
    return <div style={{ position: 'fixed', zIndex: '2000', overflowY: 'scroll', overflowX: 'hidden', right: '0px', top: '0px', height: '100%', width: '800px', maxWidth: '100%', backgroundColor: 'black', transform: ! props.open ? 'translateX(100%)' : null, transition: 'all 300ms ease' }}>
        {props.component}
        {/* <h3 className="text-xl font-bold mt-5 mb-2 p-8"> Similar Projects </h3> */}
        {/* <ProjectEntry description={descriptions.sustainably} height={height} active name="Sustainably" src={sustainably1} onClick={() => handleOpen(<Sustainably/>)}/>
        <ProjectEntry description={descriptions.traveling_merchant} height={height} date='12/21' name="Traveling Merchant" src={travelingMerchant1} onClick={() => handleOpen(<TravelingMerchant/>)}/>
        <ProjectEntry description={descriptions.zookeep} height={height} date='12/21' name="Zookeep" src={zookeep1}  onClick={() => handleOpen(<Zookeep/>)}/> */}
    </div>
}

export default NewHome