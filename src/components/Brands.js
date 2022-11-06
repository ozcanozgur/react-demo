import React, { useState } from 'react'
import styled from 'styled-components';

import { useDispatch, useSelector } from "react-redux";
import { setSelectedBrands, itemsSelector } from "../features/items";

function Brands() {

    const dispatch = useDispatch();

    const { brands, selectedBrands } = useSelector(itemsSelector);

    const [inputValue, setInputValue] = useState("");


    const _onChange = (item, index) => {
        const findIdx = selectedBrands.indexOf(item);
        console.log(index, item)
        if (findIdx > -1) {
            dispatch(setSelectedBrands(selectedBrands.filter(a => a !== item)));
        }
        else if (index == 0) {
            dispatch(setSelectedBrands([item]));
        }
        else {
            dispatch(setSelectedBrands([...selectedBrands, item]))
        }
    }

    const checkBoxes = () => {
        return Object.keys(brands).filter(brand => brand === '' || brand.includes(inputValue))
            .map((item, index) => (
                <CheckboxWrapper key={item}>
                    <label>
                        <input type="checkbox" checked={selectedBrands.includes(item)} onChange={() => _onChange(item, index)} />
                        <span>{item} ({brands[item]})</span>
                    </label>
                </CheckboxWrapper>
            ))
    }

    return (
        <Container >
            <p>Brands</p>
            <BrandsContainer >
                <div>
                    <SearchInput
                        type="text"
                        value={inputValue}
                        placeholder="Search brand"
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </div>
                <CheckBoxContainer>
                    {checkBoxes()}
                </CheckBoxContainer>
            </BrandsContainer>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    height: 286px;
    width: 296px;
    margin-top: 12px;
`

const BrandsContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: #FFFFFF;
    box-shadow: 0px 6px 24px rgba(93, 62, 188, 0.04);
    height: 256px;
    width: 296px;
    border-radius: 2px;
    margin-top: 12px;
    padding: 24px;
`
const SearchInput = styled.input`
    width: 248px;
    height: 48px;
    box-sizing: border-box;
    border: 2px solid #E0E0E0;
    border-radius: 2px;
    padding: 12px;
    &::placeholder{
        color: #A8A8A8;
    }
`

const CheckBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 149px;
    margin-top: 17px;
`

const CheckboxWrapper = styled.div`
    margin-bottom: 18px;

    &:last-child {
    border-bottom: none;
    margin-bottom: 0;  
    }
    label {
        cursor: pointer;
        display: flex;
        align-items: center;

        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;

        letter-spacing: 0.16px;

        color: #525252;

        input {
        width: 22px;
        height: 22px;
        color:red;
        box-shadow: 0px 1px 7px rgba(93, 56, 192, 0.4);
        border-radius: 2px;
        margin-right: 8px;
        outline: none;
        cursor: pointer;

        &:checked {
            background-color: #1EA4CE;
            position: relative;
            &::before{
                font-size: 1.5em;
                color: #fff;
                position: absolute;
                right: 2px;
                top: -2px;
            }
        }
    }
    }
    
`

export default Brands;