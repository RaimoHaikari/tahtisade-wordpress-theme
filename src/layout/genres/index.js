import React from 'react';
import {useDispatch} from "react-redux";

import {
    Aside,
    Container,
    ContentWrap,
    Main,
    PaginationAndSearch
} from "../../components/generalLayout/itemList/elements"

import GenreList from "../../components/genreList";
import Pagination from "../../components/movieList/Pagination/GeneralPagination";
import Search from "../../components/DT/Search";

import {updateSearchSetting} from "../../reducers/sharedReducer"

/*
 *onSearch={(val) => dispatch(updateSearchSetting({str: val}))}
 */
const Genres = () => {

    const dispatch = useDispatch()

    return (
        <Container>
            
            <PaginationAndSearch>
                <Pagination 
                    store="genres"
                />
                <Search 
                    onSearch={(val) => dispatch(updateSearchSetting({
                        store: 'genres',
                        str: val
                    }))}
                />
            </PaginationAndSearch>
            <ContentWrap>
                <Main>
                    <GenreList />
                </Main>
                <Aside>
                    Tähän työkalut
                </Aside>
            </ContentWrap>

        </Container>
    );
};

export default Genres;