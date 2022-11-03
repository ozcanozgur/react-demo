import React from 'react'
import styled from 'styled-components'

function Footer() {
    return (
        <Container className='Footer'>
            <p>©2019 Market</p>
            <p>•</p>
            <p>Privacy Policy</p>
        </Container>
    )
}

const Container = styled.div`
display: flex;
    position: fixed;
    bottom: 0;
    color: #1ea3ce;
`

export default Footer

