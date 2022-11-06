import React from 'react'

import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { setSorting, itemsSelector } from "../features/items";

function Sorting() {

    const dispatch = useDispatch();
    const { sortingBy } = useSelector(itemsSelector);

    const setSelectedOption = (e) => {
        dispatch(setSorting(e))
    }

    return (
        <SortingContainer>
            <p>Sorting</p>
            <Form>
                <Radio>
                    <label>
                        <input type="radio" value="priceLowToHigh"
                            checked={sortingBy === 'priceLowToHigh'}
                            onChange={(e) => setSelectedOption(e.target.value)} />
                        Price Low to high
                    </label>
                </Radio>
                <Radio>
                    <label>
                        <input type="radio" value="priceHighToLow"
                            checked={sortingBy === 'priceHighToLow'}
                            onChange={(e) => setSelectedOption(e.target.value)} />
                        Price high to low
                    </label>
                </Radio>
                <Radio>
                    <label>
                        <input type="radio" value="newToOld"
                            checked={sortingBy === 'newToOld'}
                            onChange={(e) => setSelectedOption(e.target.value)} />
                        New to old
                    </label>
                </Radio>
                <Radio>
                    <label>
                        <input type="radio" value="oldToNow"
                            checked={sortingBy === 'oldToNow'}
                            onChange={(e) => setSelectedOption(e.target.value)} />
                        Old to new
                    </label>
                </Radio>
            </Form>
        </SortingContainer>
    )
}

const SortingContainer = styled.div`
    position: relative;
    height: 226px;
    width: 296px;
`
const Form = styled.form`
    position: relative;
    background-color: #FFFFFF;
    box-shadow: 0px 6px 24px rgba(93, 62, 188, 0.04);
    height: 184px;
    width: 296px;
    border-radius: 2px;
    padding: 24px;
    margin-top: 12px;
`

const Radio = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;

    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
`

export default Sorting;