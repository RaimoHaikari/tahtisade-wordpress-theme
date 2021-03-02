import React from 'react';

import {
    Container,
    ContentWrap,
    Main,
    Aside
} from "../../components/generalLayout/elements"

import Movies from "../../components/movieList"

const MovieList = () => {
    return (
        <>
            <Container>
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