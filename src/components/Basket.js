import React from 'react'
import plus from '../assets/plus.svg';
import minus from '../assets/minus.svg';

import { useSelector, useDispatch } from "react-redux";
import { addBasket, removeBasket, itemsSelector } from "../features/items";

import styled from 'styled-components';

function Basket() {

    const dispatch = useDispatch();
    const { basketItems, totalPrice } = useSelector(itemsSelector);

    const renderBasketItems = () => {
        var result = (<p>Basket Empty, Please Add Product</p>);

        if (basketItems.length > 0) {
            return basketItems.map((item, index) => (<React.Fragment key={index}>
                <BasketItem>
                    <ItemInfo>
                        <ItemName>{item.name}</ItemName>
                        <ItemPrice>₺{item.price}</ItemPrice>
                    </ItemInfo>
                    <ItemCounter>
                        <button onClick={() => dispatch(removeBasket(item))}><img src={minus} /></button>
                        <div>{item.qty}</div>
                        <button onClick={() => dispatch(addBasket(item))}><img src={plus} /></button>
                    </ItemCounter>
                </BasketItem>
                <Seperator />
            </React.Fragment>))
        }
        return result;



    }
    return (
        <Container>
            {renderBasketItems()}
            <TotalPrice>
                <div> <ItemPrice>₺{totalPrice.toFixed(2)}</ItemPrice></div>
            </TotalPrice>
        </Container>
    )
}

const Container = styled.div`
    width: 296px;
    max-height: 500px;
    overflow-y: auto;
    border: solid #1EA4CE 10px;
    padding: 20px;
    background-color: white;
`
const BasketItem = styled.div`
    display: flex;
    justify-content: space-between;
    height: 40px;
`

const ItemInfo = styled.div`
    height: 50px;
    width: 100px;
`
const ItemCounter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 74px;
    height: 32px;

    button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 30px;
        width: 50px;
        background-color: transparent;
        background-repeat: no-repeat;
        border: none;
        cursor: pointer;
        overflow: hidden;
        outline: none;
    }

    div {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #1EA4CE;
        height: 32px;
        width: 100%;
        color: white;
    }
`

const ItemName = styled.p`
    display: inline-block;
    width: 114px;
    height: 18.4px;
    align-self: stretch;
    color: #191919;
    font-size: 14px;
    font-family: 'Open Sans';
    font-style: normal;
    line-height: 18px;
    letter-spacing: 0.16px;
    font-weight: 400;
`

const ItemPrice = styled.p`
    width: 45px;
    height: 18.4px;
    color: #1ea3ce;
    font-size: 14px;
    font-weight: 600;
    font-family: Open Sans;
    line-height: 18px;
    letter-spacing: 0.16px;
    margin-top: 4px;
`

const Seperator = styled.div`
    margin-top: 18px;
    border-top: 1px solid #F4F4F4;
    margin-bottom: 18px;
`
const TotalPrice = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 16px;

    div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 92px;
        height: 51px;
        border: solid;
        border-color: #1ea3ce;
        background-color: #ffffff;
    }
`

export default Basket;