import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import Togglable from "../../generalLayout/togglable"
import Slider from "../slider"

const Toolbar = () => {

    const dispatch = useDispatch()

    const {data} = useSelector(state => state.reviewers);

    return (
        <>
        {
            data
            ?  <Togglable buttonLabel="Arvostelujen määrä">
                    <Slider />
                </Togglable>
            : "Lista puuttuu"
        }
        </>
    );
};

export default Toolbar;