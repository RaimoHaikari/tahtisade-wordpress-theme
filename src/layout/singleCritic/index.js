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
    PaginationAndSearch
} from "../../components/generalLayout/singleItem/elements"

import Reviews from "../../components/singleReviewer/reviews";
import Colleagues from "../../components/singleReviewer/Colleaques";

import Pagination from "../../components/movieList/Pagination/GeneralPagination"
import Search from "../../components/DT/Search"

import Countdown from "../../components/Countdown";

import Togglable from "../../components/generalLayout/togglable"

import {
    doSomeThing,
    initializeReviewer
} from "../../reducers/singleReviewerReducer";

import {updateSearchSetting} from "../../reducers/sharedReducer"

const SingleCritic = () => {

    const dispatch = useDispatch();

    const {data, loading} = useSelector(state => state.singleReviewer);

    const id = useParams().id;

    useEffect(() => {

        dispatch(initializeReviewer(id))
        
    }, [])

    return (
        <Container>
        {
           (loading === true)
           ? <Countdown />
           : data === null
                ? null
                : <InfoCardWrapper>            
                    
                    <Main>

                        <PaginationAndSearch>
                            <Pagination  store="singleReviewer" />
                            <Search 
                                onSearch={(val) => dispatch(updateSearchSetting({
                                    store: 'singleReviewer',
                                    str: val
                                }))}
                            />
                        </PaginationAndSearch>

                        <Reviews />
                    </Main>

                    <Aside>
                        <Togglable buttonLabel="Vertailu">
                            <Colleagues />
                        </Togglable>
                    </Aside>


                </InfoCardWrapper>
        }
        </Container>
    );
};

export default SingleCritic;