import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {
    useParams
} from "react-router-dom";

import {
    Container,
    InfoCardWrapper,
    Main,
    Aside
} from "../../components/generalLayout/singleItem/elements"

import Countdown from "../../components/Countdown"

import {
    doSomeThing
} from "../../reducers/singleReviewerReducer";

const SingleCritic = () => {

    const dispatch = useDispatch();

    const {data, loading} = useSelector(state => state.singleReviewer);

    const id = useParams().id;

    useEffect(() => {

        dispatch(doSomeThing(id))
        
    }, [])

    return (
        <Container>
        {
           (loading === true)
           ? <Countdown />
           : data === null
                ? null
                : <InfoCardWrapper>
                    <Aside>
                        Jotain kivaa
                    </Aside>
                    <Main>
                        {`Kriitikon ${id} tiedot esille`}
                    </Main>
                </InfoCardWrapper>
        }
        </Container>
    );
};

export default SingleCritic;