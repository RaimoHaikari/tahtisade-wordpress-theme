import React from 'react';
import {useDispatch} from "react-redux";

import {
    updateSearchSetting
} from "../../reducers/sharedReducer";

import {
    Aside,
    Container,
    ContentWrap,
    Main,
    PaginationAndSearch
} from "../../components/generalLayout/itemList/elements"

import Movies from "../../components/movieList";
import Pagination from "../../components/movieList/Pagination/GeneralPagination";
import Search from "../../components/DT/Search";
import Genres from "../../components/movieList/Genres"

/*
 * @todo: dispatch siirrettävä layout -tasolta komponettitasolle
 */
const MovieList = () => {

    const dispatch = useDispatch();

    /*
    *
    */
    return (
        <>
            <Container>

                <PaginationAndSearch>
                    <Pagination 
                        store="movies"
                    />
                    <Search 
                        onSearch={(val) => dispatch(updateSearchSetting({
                            store: 'movies',
                            str: val
                        }))}
                    />
                </PaginationAndSearch>

                <ContentWrap>
                    <Main>
                        <Movies />
                    </Main>
                    <Aside>
                        <Genres />
                    </Aside>
                </ContentWrap>

            </Container>
        </>
    );
};

export default MovieList;