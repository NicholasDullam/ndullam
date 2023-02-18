import React from 'react'
import styled from 'styled-components'
import { LoadingIcon } from '.'

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
            visibility: hidden;
        }
    }
`

const Loading = (props) => {
    return (
        <Container style={{ position: 'fixed', height: '100%', width: '100%', backgroundColor: 'black', zIndex: '1001', top: '0px', left: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <LoadingIcon size={20}/>
        </Container>
    )
}

export default Loading