import React, {useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";

import {
    useParams
} from "react-router-dom";

import {
    Container,
    InfoCardWrapper,
    Main,
    Aside,
    Graph,
    PaginationAndSearch
} from "../../components/generalLayout/singleItem/elements"

import {
    initializeReviewer
} from "../../reducers/singleGenreReducer";

import Countdown from "../../components/Countdown";
import Togglable from "../../components/generalLayout/togglable"

import GenreCard from "../../components/SingleGenre"
import GenreList from "../../components/SingleGenre/genreList"
import Info from "../../components/SingleGenre/info"

const SingleGenre = () => {

    const dispatch = useDispatch();

    const {data, loading} = useSelector(state => state.singleGenre);

    const id = useParams().id;

    useEffect(() => {
        dispatch(initializeReviewer(id))
    }, [])

    /*
    */
    return (
        <Container>
        {
           (loading === true)
           ? <Countdown />
           : data === null
                ? null
                : <InfoCardWrapper>   

                    <Aside>
                        <Togglable buttonLabel="Vertailu">
                            <GenreList />
                        </Togglable>
                        
                    </Aside>    

                    <Main>
                        <GenreCard />
                    </Main>

                    <Graph>
                        <Info />
                    </Graph>

                </InfoCardWrapper>
        }
        </Container>
    );
};

export default SingleGenre;