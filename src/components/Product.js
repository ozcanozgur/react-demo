import React from 'react'
import styled from 'styled-components';

import { useDispatch } from "react-redux";
import { addBasket } from "../features/items";


function Product(props) {
    const { item } = props;

    const dispatch = useDispatch();

    return (
        <ProductBox>
            <ImageBox>
                <InnerImageBox>
                    <img src='https://picsum.photos/92'></img>
                </InnerImageBox>
            </ImageBox>
            <Salary>
                ₺ <Price>{item.price}</Price>
            </Salary>
            <Title> {item.name}</Title>
            <Add><button onClick={() => dispatch(addBasket(item))} > Add </button></Add>
        </ProductBox>
    )
}

const ProductBox = styled.div`
    height: 225px;
    width: 124px;
`
const ImageBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 124px;
    width: 124px;
    border: 1.17666px solid #F3F0FE;
    border-radius: 12px;

    img{
        height: 92px;
        width: 92px;
    }
`
const InnerImageBox = styled.div`
    height: 92px;
    width: 92px;
    background-color: #C4C4C4;
`

const Salary = styled.div`
    margin-top: 8px;
    width: 124px;
    color: #1ea3ce;
    font-size: 14px;
    font-family: Helvetica;
    line-height: 20px;
    white-space: pre-wrap;
`

const Price = styled.div`
    display: contents;
    color: #1ea3ce;
    font-size: 14px;
    font-weight: 700;
    font-family: 'Open Sans';
    line-height: 20px;
`
const Title = styled.div`
    width: 124px;
    height: 40px;
    margin: 0px 0px 8px 0px;
    color: #191919;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Open Sans';
    line-height: 20px;
`
const Add = styled.div`
    width: 124px;
    height: 22px;
    background-color: #1ea3ce;
    border-radius: 2px;

    button{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        

        color: #ffffff;
        font-size: 12px;
        font-weight: 600;
        font-family: Open Sans;
        line-height: 20px;
        white-space: nowrap;
        border-radius: 2px;
    }
`

export default Product;