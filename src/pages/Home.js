import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Pagination from '../components/Pagination';
import LeftBar from '../layouts/LeftBar';
import RightBar from '../layouts/RightBar';
import Main from '../layouts/Main';

import { useDispatch, useSelector } from "react-redux";
import { fetchItems, itemsSelector } from "../features/items";
import Footer from '../components/Footer';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 105px 0 105px;
  background-color: #fafafa;
`;

function Home() {
    const [paginationInfo, setPaginationInfo] = useState({
        totalRecords: "",
        totalPages: "",
        pageLimit: "",
        currentPage: "",
        startIndex: "",
        endIndex: ""
    })

    const dispatch = useDispatch();
    const { loading, error, items, sortingBy, selectedBrands, activeItemType, allItemsLength } = useSelector(itemsSelector);

    useEffect(() => {
        dispatch(fetchItems(sortingBy, selectedBrands, activeItemType, paginationInfo));
    }, [dispatch, sortingBy, selectedBrands, activeItemType, paginationInfo]);

    const onChangePage = (data) => {
        setPaginationInfo({
            pageLimit: data.pageLimit,
            totalPages: data.totalPages,
            currentPage: data.page,
            startIndex: data.startIndex,
            endIndex: data.endIndex
        })
    }

    return (
        <>
            <Navbar />
            <AppWrapper>
                <AppContainer>
                    <LeftBar />
                    <Main items={items} loading={loading} error={error} />
                    <RightBar />
                </AppContainer>
                <PaginationContainer>
                    <Pagination totalRecords={allItemsLength}
                        pageLimit={16}
                        initialPage={1}
                        pagesToShow={10}
                        onChangePage={onChangePage} />
                </PaginationContainer>
                <Footer />
            </AppWrapper>
        </>
    );
}

const AppContainer = styled.div`
    display: flex;
    margin-top: 41px;
    max-width: 1232px;
`

const PaginationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    background-color: red;
`

export default Home;
