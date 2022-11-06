import React from 'react'
import Brands from '../components/Brands';

import styled from 'styled-components';
import Sorting from '../components/Sorting';

function LeftBar() {
    return (
        <Container >
            <Sorting />
            <Brands />
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 296px;

    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 26px;
    color: #6F6F6F;
`

export default LeftBar;