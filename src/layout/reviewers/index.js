import React from 'react';
import {useDispatch} from "react-redux";

import {
    Aside,
    Container,
    ContentWrap,
    Main,
    PaginationAndSearch
} from "../../components/generalLayout/itemList/elements";

import ReviewerList from "../../components/reviewerList";
import Pagination from "../../components/movieList/Pagination/GeneralPagination";
import Search from "../../components/DT/Search";

import Toolbar from '../../components/reviewerList/toolbar';

import {updateSearchSetting} from "../../reducers/sharedReducer"

const Reviewers = () => {

    const dispatch = useDispatch()

    /*
                <Pagination 
                    store="reviewers"
                />
    */
    return (
        <Container>
            
            <PaginationAndSearch>

                <Pagination 
                    store="reviewers"
                />

                <Search 
                    onSearch={(val) => dispatch(updateSearchSetting({
                        store: 'reviewers',
                        str: val
                    }))}
                />

            </PaginationAndSearch>

            <ContentWrap>
                <Main>
                    <ReviewerList />
                </Main>
                <Aside>
                    <Toolbar />
                </Aside>
            </ContentWrap>

        </Container>
    );
};

export default Reviewers;