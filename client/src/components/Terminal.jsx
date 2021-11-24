import React, { Component } from 'react';
import { ReactComponent as frame } from '../images/frame.svg'
import styled from 'styled-components'

const Container = styled.div`
    background-color: #000000;
    min-width: 200px;
    margin-top: 20px;
    height: 250px;
    padding: 25px;
    border-radius: 25px;
    position: relative;
    overflow-y: auto;
`

const TerminalWindow = styled.p`
    color: white;
    font-size: 13px;
    font-family: Menlo;
    margin-bottom: 2px;
    margin-top: 2px;
    &::-webkit-scrollbar {
        display: none;
    }
    &:hover {
        cursor: default;
    }
`

const Cursor = styled(frame)`
    stroke: white;
    transition: opacity .2s ease-in;
    height: 12px;
    margin: 0px 0px 0px 2px;
    opacity: ${props => Math.floor(props.time / 1000) % 2 ? '1' : '0' };
`

const Input = styled.input`
    border: none;
    background-color: none;
`

class Terminal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: new Date(),
            statementBufferTime: 2000,
            typeTime: 70,
            statementSwitching: false,
            statements: [
                {
                    initial: "./shell",
                    current: "",
                    index: 0,
                    prefix: "nicholasdullam@MacBook-Pro ~ % ",
                    typed: true, 
                    active: true,
                    complete: false
                },
                {
                    initial: "echo Hello World",
                    current: "",
                    index: 0,
                    prefix: "myshell> ",
                    typed: true, 
                    active: false,
                    complete: false,
                },                
                {
                    initial: "echo Hello World",
                    current: "",
                    index: 0,
                    prefix: "myshell> ",
                    typed: true, 
                    active: false,
                    complete: false,
                },                
                {
                    initial: "echo Hello World",
                    current: "",
                    index: 0,
                    prefix: "myshell> ",
                    typed: true, 
                    active: false,
                    complete: false,
                },                
                {
                    initial: "echo Hello World",
                    current: "",
                    index: 0,
                    prefix: "myshell> ",
                    typed: true, 
                    active: false,
                    complete: false,
                },                {
                    initial: "echo Hello World",
                    current: "",
                    index: 0,
                    prefix: "myshell> ",
                    typed: true, 
                    active: false,
                    complete: false,
                },                {
                    initial: "echo Hello World",
                    current: "",
                    index: 0,
                    prefix: "myshell> ",
                    typed: true, 
                    active: false,
                    complete: false,
                },{
                    initial: "echo Hello World",
                    current: "",
                    index: 0,
                    prefix: "myshell> ",
                    typed: true, 
                    active: false,
                    complete: false,
                },{
                    initial: "echo Hello World",
                    current: "",
                    index: 0,
                    prefix: "myshell> ",
                    typed: true, 
                    active: false,
                    complete: false,
                },{
                    initial: "echo Hello World",
                    current: "",
                    index: 0,
                    prefix: "myshell> ",
                    typed: true, 
                    active: false,
                    complete: false,
                },{
                    initial: "echo Hello World",
                    current: "",
                    index: 0,
                    prefix: "myshell> ",
                    typed: true, 
                    active: false,
                    complete: false,
                },{
                    initial: "echo Hello World",
                    current: "",
                    index: 0,
                    prefix: "myshell> ",
                    typed: true, 
                    active: false,
                    complete: false,
                },{
                    initial: "echo Hello World",
                    current: "",
                    index: 0,
                    prefix: "myshell> ",
                    typed: true, 
                    active: false,
                    complete: false,
                },{
                    initial: "echo Hello World",
                    current: "",
                    index: 0,
                    prefix: "myshell> ",
                    typed: true, 
                    active: false,
                    complete: false,
                },{
                    initial: "echo Hello World",
                    current: "",
                    index: 0,
                    prefix: "myshell> ",
                    typed: true, 
                    active: false,
                    complete: false,
                },{
                    initial: "echo Hello World",
                    current: "",
                    index: 0,
                    prefix: "myshell> ",
                    typed: true, 
                    active: false,
                    complete: false,
                },{
                    initial: "echo Hello World",
                    current: "",
                    index: 0,
                    prefix: "myshell> ",
                    typed: true, 
                    active: false,
                    complete: false,
                },{
                    initial: "echo Hello World",
                    current: "",
                    index: 0,
                    prefix: "myshell> ",
                    typed: true, 
                    active: false,
                    complete: false,
                }
            ]
        }

        this.readingInterval = setInterval(this.read, 50)
    }

    getActiveStatement = () => {
        for (let i = 0; i < this.state.statements.length; i++) {
            if (this.state.statements[i].active) return { ...this.state.statements[i], key: i }
        }

        return null
    }

    getUncomplete = () => {
        for (let i = 0; i < this.state.statements.length; i++) {
            if (!this.state.statements[i].complete) return { ...this.state.statements[i], key: i }
        }

        return null
    }

    typeHandler = () => {
        let statement = this.getActiveStatement()
        let statements = this.state.statements
        statement.current = statement.current + statement.initial[statement.index++]
        statements[statement.key] = statement
        this.setState({ statements })
        this.statementSwitching = undefined
    }

    switchHandler = () => {
        let statement = this.getActiveStatement()
        let statements = this.state.statements
        statement = { ...statement, active: statement.key === this.state.statements.length - 1, complete: true }
        statements[statement.key] = statement
        this.setState({ statements }, () => {
            let statement = this.getUncomplete()
            if (statement) {
                statements = this.state.statements
                statement = { ...statement, active: true }
                statements[statement.key] = statement
                this.setState({ statements })
            }
        })

        this.statementSwitching = undefined
    }

    read = () => {
        let statement = this.getActiveStatement()
        if (!statement || statement.complete) return
        else {
            if (statement.typed && statement.current !== statement.initial && !this.statementSwitching) {
                this.statementSwitching = setTimeout(this.typeHandler, this.state.typeTime)
            } else if (!this.statementSwitching) {
                this.statementSwitching = setTimeout(this.switchHandler, this.state.statementBufferTime)
            }
        }
    }

    componentDidMount() {
        this.clock = setInterval(this.tick, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.clock)
    }

    tick = () => { 
        this.setState({ time: new Date() })
    }

    handleKeyPress = (event) => {
        if (event.target.key === 'Enter') this.handleSubmit(event.target.value)
    }

    handleSubmit = (value) => {
        console.log(value)
    }

    render() {
        return (
            <Container>
                { this.state.statements.map((statement) => {
                    return statement.complete || statement.active ? <TerminalWindow> {statement.prefix + statement.current} {statement.active ? <Cursor time={this.state.time}/> : null} </TerminalWindow> : null
                })}
            </Container>
        );
    }
}

export default Terminal;