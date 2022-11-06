import React from 'react'
import Basket from '../components/Basket';

import styled from 'styled-components';

function RightBar() {
    return (
        <RightSideBar>
            <Basket />
        </RightSideBar>
    )
}

const RightSideBar = styled.div`
 width: 296px;
`
export default RightBar;