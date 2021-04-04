import React from 'react';
import {useDispatch} from "react-redux";

import {
    updateSearchSetting
} from "../../reducers/movieListReducer";

import {
    Aside,
    Container,
    ContentWrap,
    Main,
    PaginationAndSearch
} from "../../components/generalLayout/elements"

import Movies from "../../components/movieList";
import Pagination from "../../components/movieList/Pagination";
import Search from "../../components/DT/Search";

/*
 * @todo: dispatch siirrettävä layout -tasolta komponettitasolle
 */
const MovieList = () => {

    const dispatch = useDispatch();

    /*
                    <Pagination />
                    <Search 
                        onSearch={(val) => dispatch(updateSearchSetting({str: val}))}
                    />
    */
    return (
        <>
            <Container>

                <PaginationAndSearch className="PaginationAndSearch">
                    <Pagination />
                    <Search 
                        onSearch={(val) => dispatch(updateSearchSetting({str: val}))}
                    />
                </PaginationAndSearch>

                <ContentWrap className="KontettiWrapperi">
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