import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    animation-name: fade;
    animation-duration: 500ms;
    animation-iteration-count: 1;
    animation-delay: 2s;
    animation-fill-mode: forwards;

    @keyframes fade {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
        }
    }
`

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

const Loading = (props) => {
    return (
        <Container style={{ position: 'fixed', height: '100%', width: '100%', backgroundColor: 'black', zIndex: '5', top: '0px', left: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <svg style={{ width: '80px', height: '80px' }}> 
                <Square/>
                <Square y={'20px'} delay={750}/>
                <Square x={'20px'} delay={750}/>
            </svg>
        </Container>
    )
}

export default Loading