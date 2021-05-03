import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {
    useParams
} from "react-router-dom"

import {
    Container,
    InfoCardWrapper,
    Main,
    Aside
} from "../../components/generalLayout/singleItem/elements"

import MovieCard from "../../components/singleMovie";
import Poster from "../../components/singleMovie/Poster";
import Reviews from "../../components/singleMovie/Reviews";

import Countdown from "../../components/Countdown"

import {
    doSomeThing,
    initializeMovie
} from "../../reducers/singleMovieReducer";

const Movie = () => {

    const dispatch = useDispatch();

    const {data, headers, loading, visibleData} = useSelector(state => state.singleMovie);

    const id = useParams().id;

    useEffect(() => {

        dispatch(initializeMovie(id))
        
    }, [])

    /*
            <InfoCardWrapper>
                <Aside>
                    <Poster />
                </Aside>
                <Main>
                    <MovieCard />
                    <Reviews />
                </Main>
            </InfoCardWrapper>
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
                            <Poster 
                                src={data.img}
                                title={data.nimi}
                            />
                        </Aside>
                        <Main>
                            <MovieCard 
                                actors={data.actors}
                                directors={data.directors}
                                distributors={data.distributors}
                                externalLinks={data.externalLinks}
                                genre={data.genre}
                                releaseDate={data.ensiIlta}                                
                                title={data.nimi}
                                writers={data.writers}
                            />
                            <Reviews
                                headers={headers}
                                stars={data.stars}
                                tomatoes={visibleData}
                            />
                        </Main>
                    </InfoCardWrapper>
           }
        </Container>
    );
};

/*
                                actors={data.actors}
                                directors={data.directors}
                                distributors={data.distributors}
                                ensiIlta={data.ensiIlta}
                                genres={data.genres}


*/

export default Movie;