import React from 'react'
import styled from 'styled-components'

const Square = styled.rect`
    width: 20px;
    height: 20px;
    fill: white;

    transform: scale(1);

    animation-name: grow;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-delay: ${props => props.delay || 0}ms;

    @keyframes grow {
        from {
            transform: scale(1);
            opacity: .5;
            border-radius: 0px;
        }

        50% {
            transform: scale(2);
            opacity: 1;
            border-radius: 2px;
        }

        to {
            transform: scale(1);
            opacity: .5;
            border-radius: 0px;
        }
    }
`

const LoadingIcon = (props) => {
    return (
        <svg style={{ width: '80px', height: '80px' }}> 
            <Square/>
            <Square y={'20px'} delay={750}/>
            <Square x={'20px'} delay={750}/>
        </svg>
    )
}

export default LoadingIcon