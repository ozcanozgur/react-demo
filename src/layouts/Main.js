import React from 'react'
import Product from '../components/Product';
import ItemType from '../components/ItemType';

import { useSelector, useDispatch } from "react-redux";
import { setActiveItemType, itemsSelector } from "../features/items";

import styled from 'styled-components';

function Main(props) {

    const { error, loading, items } = props

    const dispatch = useDispatch();

    const { activeItemType } = useSelector(itemsSelector);

    const handleClick = (clickedItem) => {
        dispatch(setActiveItemType(clickedItem))
    }

    const renderItems = () => {
        var result = null;

        if (loading) return <strong>Loading please wait...</strong>;

        if (error) return <strong>Items not available at this time</strong>;

        if (items.length > 0) {
            return items.map((item, index) => <Product key={index} item={item} />);
        }
        return result;
    };

    const renderItemTypes = () => {
        let itemTypes = ["mug", "shirt"]
        return itemTypes.map((itemType, index) => <ItemType key={index} isActive={activeItemType === itemType} type={itemType} onClick={(clickedItem) => handleClick(clickedItem)} />)
    };

    return (
        <Container>
            <div>
                <p>Products</p>
            </div>
            <ItemTypeContainer>
                {renderItemTypes()}
            </ItemTypeContainer>
            <ProductContentContainer>
                {renderItems()}
            </ProductContentContainer>
        </Container>
    )
}

const Container = styled.div`
    height: 100%;
    width: 578px;
    margin: 0 10px 0 10px;

    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 26px;
    color: #6F6F6F;
`

const ItemTypeContainer = styled.div`
    display: flex;
    width: 100%;
    gap: 8px;
`

const ProductContentContainer = styled.div`
    display: flex;
    align-content: flex-start;
    padding: 24px;
    margin-top: 16px;
    height: 996px;
    width: 580px;
    background-color: #FFFFFF;
    flex-wrap: wrap;
    gap: 12px;
    row-gap: 20px;
    border-radius: 2px;
`

export default Main;