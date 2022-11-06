import React from 'react'
import styled from 'styled-components'

function Footer() {
    return (
        <Container>
            <p>©2019 Market</p>
            <p>•</p>
            <p>Privacy Policy</p>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    margin-top: 50px;
    color: #1ea3ce;
`

export default Footer

