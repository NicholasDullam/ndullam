import styled from 'styled-components'

const Button = styled.div`
    transition: transform 300ms ease, background-color 300ms ease, color 300ms ease;
    background-color: black;
    cursor: pointer;
    text-decoration: none;
    box-shadow: 0 0px 20px 5px rgba(0,0,0,.08);
    border-radius: 25px;
    padding: 12px 18px 12px 18px;
    display: flex;
    color: white;
    &:hover {
        color: black;
        background-color: white;
        transform: scale(1.1);
    }
`

export default Button