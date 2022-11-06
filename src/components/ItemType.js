import React from 'react'
import styled from 'styled-components';

function ItemType(props) {
    return (
        <Button isActive={props.isActive} onClick={() => props.onClick(props.type)}><p>{props.type}</p></Button>
    )
}

const Button = styled.button`
    width: 60px;
    height: 30px;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    text-align: center;
    background-color: ${props => props.isActive ? "#1EA4CE" : "#F2F0FD"}; 
    color: ${props => props.isActive ? "#F2F0FD" : "#1EA4CE"}; 
    border-radius: 2px;

    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
    outline: none;
`

export default ItemType;