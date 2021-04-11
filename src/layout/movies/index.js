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
} from "../../components/generalLayout/elements"

import Movies from "../../components/movieList";
import Pagination from "../../components/movieList/Pagination/GeneralPagination";
import Search from "../../components/DT/Search";

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
                        Tähän työkalut
                    </Aside>
                </ContentWrap>

            </Container>
        </>
    );
};

export default MovieList;