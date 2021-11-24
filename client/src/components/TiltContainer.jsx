import React, { Component } from 'react';
import styled from 'styled-components'

const Title = styled.h6`
    color: white;
    position: absolute;
    bottom: 5px;
    left: 25px;
    font-size: 15px;
    font-family: Menlo;
`

const Container = styled.div`
    transform: ${props => props.transform ? props.transform : 'null'};
    transition: all .1s;
    margin: auto;
`

class TiltContainer extends Component {
    constructor(props) {
        super(props)
        this.container = React.createRef()
        this.state = {
            visible: false
        }
    }

    handleMove = (e) => {
        if (!this.container.current) return
        let element = this.container.current

        const height = element.clientHeight
        const width = element.clientWidth

        let rect = element.getBoundingClientRect()
        let offsetX = e.clientX - rect.left
        let offsetY = e.clientY - rect.top

        const xVal = offsetX
        const yVal = offsetY

        const yRotation = 10 * ((xVal - width / 2) / width)
        const xRotation = -10 * ((yVal - height / 2) / height)
        const string = 'perspective(1000px) scale(1.08) rotateX(' + (xRotation < 4 ? (xRotation > -4 ? xRotation : -4) : 4) + 'deg) rotateY(' + (yRotation < 4 ? (yRotation > -4 ? yRotation : -4 ) : 4) + 'deg)'
        this.setState({ transform: string })
    }

    isInViewport = () => {
        let el = this.container.current
        if (!el) return false
        let rect = el.getBoundingClientRect()
        let vWidth = window.innerWidth || document.documentElement.clientWidth
        let vHeight = window.innerHeight || document.documentElement.clientHeight
        let efp = (x, y) => { return document.elementFromPoint(x, y) }

        if (rect.right < 0 || rect.bottom < 0 || rect.left > vWidth || rect.top > vHeight) return false
        let ret = el.contains(efp(rect.left, rect.top)) || el.contains(efp(rect.right, rect.top)) || el.contains(efp(rect.left, rect.bottom)) || el.contains(efp(rect.right, rect.bottom))
        if (ret) this.setState({ visible: ret })
        return ret
    }

    render() {
        return (
            <Container ref={this.container} onMouseMove={this.handleMove} onMouseLeave={() => this.setState({ transform: undefined, hover: false })} onMouseEnter={() => this.setState({ hover: true })} transform={this.state.transform}>
                { this.props.children }
                { this.state.hover ? <Title> Communicode </Title> : null }
            </Container>
        );
    }
}

export default TiltContainer;