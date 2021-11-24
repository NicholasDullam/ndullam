import React, { Component } from 'react';
import { ReactComponent as menu } from '../images/menu.svg'
import styled from 'styled-components'

const Bar = styled.div`
    position: relative;
    height: 30px;
    padding: 30px 30px 15px 30px;
`

const Title = styled.span`
    font-size: 18px;
    font-family: Menlo;
    font-weight: bold;
    vertical-align: middle;
    float: left;
`

const Link = styled.span`
    margin-left: 30px;
    font-size: 15px;
    font-family: Menlo;
    font-weight: normal;
    vertical-align: middle;
    float: right;
`

const MenuContainer = styled.span`
    margin-left: 30px;
    font-size: 15px;
    font-family: Menlo;
    font-weight: normal;
    vertical-align: middle;
    float: right;
    padding: 5px 10px 5px 10px;
    border-radius: 15px;
    background-color: grey;
    opacity: .6;
`

const Menu = styled(menu)`
    vertical-align: middle;
    width: 20px;
    height: 20px;
    opacity: 1;
`

class Nav extends Component {
    render() {
        return (
            <Bar>
                <Title> dullam </Title>
                { window.innerWidth > 400 ? <span>
                    <Link> contact </Link>
                    <Link> projects </Link>
                    <Link> about </Link>
                </span> : <MenuContainer>
                    <Menu/>
                </MenuContainer> }
            </Bar>  
        );
    }
}

export default Nav;