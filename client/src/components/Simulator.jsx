import React, { Component, createRef, useEffect, useRef, useState } from 'react';
import { ReactComponent as faucet } from '../images/faucet.svg'
import styled from 'styled-components'

const Container = styled.canvas`
    height: 100%;
    width: 100%;
    position: relative;
    overflow-y: auto;
`

const Faucet = styled(faucet)`
    stroke: white;
    transition: opacity .2s ease-in;
    height: 30px;
    margin: 0px 0px 0px 2px;
`

const Simulator = (props) => {
    const [gravity, setGravity] = useState(true)
    const [collision, setCollision] = useState(true)
    const [maxParticles, setMaxParticles] = useState(20)
    const [rate, setRate] = useState(20)
    const [particles, setParticles] = useState([])

    const canvasRef = useRef()
    const containerRef = useRef()
    const particlesRef = useRef(particles)

    useEffect(() => {
        let interval = setInterval(draw, 10)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        particlesRef.current = particles
    }, [particles])

    const generateParticles = (amount) => {
        let render = []
        for (let i = 0; i < amount; i++) {
            if (render.length + particlesRef.current.length < maxParticles) {
                render.push(
                    {
                        radius: 3,
                        posX: window.innerWidth - 80,
                        posY: 560,
                        velocityX: Math.random() * (Math.round(Math.random()) ? 1 : -1) * .5,
                        velocityY: Math.random() * 1,
                        elasticity: .75,
                        mass: 1000,
                        nextX: 0,
                        nextY: 0
                    }   
                )
            }
        }

        return render
    }

    const draw = () => {
        if (!canvasRef.current) return
        let context = canvasRef.current.getContext("2d")
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        let render = [...particlesRef.current, ...generateParticles(rate)]
        render = updateParticles(render)
        render = wallCollisions(render, canvasRef.current)
        if (collision) render = unitCollisions(render)
        renderParticles(render, context)
        setParticles(render)
    }

    const updateParticles = (particles) => {
        for (let i = 0; i < particles.length; i++) {
            let particle = particles[i]
            particle.velocityY += gravity
            particle.nextX = particle.posX + particle.velocityX
            particle.nextY = particle.posY + particle.velocityY
        }

        return particles
    }

    const wallCollisions = (particles, canvas) => {
        for (let i = 0; i < particles.length; i++) {
            let particle = particles[i]

            if (particle.nextX+particle.radius > canvas.width) {
                particle.velocityX = -particle.velocityX * particle.elasticity;
                particle.nextX = canvas.width - particle.radius;
             } else if (particle.nextX-particle.radius < 0 ) {
                particle.velocityX = -particle.velocityX * particle.elasticity;
                particle.nextX =particle.radius;
             } else if (particle.nextY+particle.radius > canvas.height ) {
                particle.velocityY = -particle.velocityY * particle.elasticity;
                particle.nextY = canvas.height - particle.radius;
             }
        }

        return particles
    }

    const unitCollisions = (particles) => {
        for (let i = 0; i < particles.length; i++) {
            let particle = particles[i]
            for (let j = i + 1; j < particles.length; j++) {
                let collider = particles[j]
                if (areCollided(particle, collider)) {
                    let result = calcCollision(particle, collider)
                    particles[i] = result[0]
                    particles[j] = result[1]
                }
            }
        }

        return particles
    }

    const areCollided = (particle, collider) => {
        let dx = particle.nextX - collider.nextX
        let dy = particle.nextY - collider.nextY
        let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
        return distance <= (particle.radius + collider.radius)
    }

    const calcCollision = (particle, collider) => {
        var dx = particle.nextX - collider.nextX
        var dy = particle.nextY - collider.nextY

        var collisionAngle = Math.atan2(dy, dx)

        var speed1 = Math.sqrt(Math.pow(particle.velocityX, 2) + Math.pow(particle.velocityY, 2))
        var speed2 = Math.sqrt(Math.pow(collider.velocityX, 2) + Math.pow(collider.velocityY, 2))

        var direction1 = Math.atan2(particle.velocityY, particle.velocityX)
        var direction2 = Math.atan2(collider.velocityY, collider.velocityX)

        var velocityX_1 = speed1 * Math.cos(direction1 - collisionAngle)
        var velocityY_1 = speed1 * Math.sin(direction1 - collisionAngle)
        var velocityX_2 = speed2 * Math.cos(direction2 - collisionAngle)
        var velocityY_2 = speed2 * Math.sin(direction2 - collisionAngle)


        // Elastic Collision
        var final_velocityX_1 = ((particle.mass - collider.mass) * velocityX_1 + (collider.mass + collider.mass) * velocityX_2)/(particle.mass + collider.mass)
        var final_velocityX_2 = ((particle.mass + particle.mass) * velocityX_1 + (collider.mass - particle.mass) * velocityX_2)/(particle.mass + collider.mass)

        var final_velocityY_1 = velocityY_1
        var final_velocityY_2 = velocityY_2

        particle.velocityX = Math.cos(collisionAngle) * final_velocityX_1 + Math.cos(collisionAngle + Math.PI/2) * final_velocityY_1
        particle.velocityY = Math.sin(collisionAngle) * final_velocityX_1 + Math.sin(collisionAngle + Math.PI/2) * final_velocityY_1
        collider.velocityX = Math.cos(collisionAngle) * final_velocityX_2 + Math.cos(collisionAngle + Math.PI/2) * final_velocityY_2
        collider.velocityY = Math.sin(collisionAngle) * final_velocityX_2 + Math.sin(collisionAngle + Math.PI/2) * final_velocityY_2

        particle.nextX = (particle.nextX += particle.velocityX)
        particle.nextY = (particle.nextY += particle.velocityY)
        collider.nextX = (collider.nextX += collider.velocityX)
        collider.nextY = (collider.nextY += collider.velocityY)

        return [particle, collider]
    }

    const renderParticles = (particles, context) => {
        for (let i = 0; i < particles.length; i++) {
            let particle = particles[i]
            particle.posX = particle.nextX;
            particle.posY = particle.nextY;
            context.fillStyle =  "#FFFFFF";
            context.beginPath();
            context.arc(particle.posX,particle.posY,particle.radius,0,Math.PI*2,true);
            context.closePath();
            context.fill();
        }
    }

    return (
        <div ref={containerRef} style={{ position: 'relative', height: '100%', width: '100%' }}>
            {/*<p style={{ position: 'absolute', top: '10px', left: '10px', color: 'white', fontSize: '13px', fontFamily: 'Menlo' }}> fps: {fps} </p>*/}
            <Container ref={canvasRef} height={containerRef.current ? containerRef.current.getBoundingClientRect().height : 0} width={containerRef.current ? containerRef.current.getBoundingClientRect().width : 0}/>
            <Faucet style={{ position: 'absolute', top: '50%', right: '-2px' }}/>
        </div>
    )
}

export default Simulator;