import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {
    Container,
    Input
} from "./elements"

import Togglable from "../../generalLayout/togglable"

import {updateMinNumbOfReviews} from '../../../reducers/reviewerListReducer'

const Slider = () => {

    const dispatch = useDispatch();
    const {min, value, max} = useSelector(state => state.reviewers.numberOfReviews);

    return (
        <Container>

            <div className="title">
                <span className="toLeft">Arvosteluja vähintään:</span>
                <span className="toRight">{value}</span>
            </div>

            <div className="field">

                <Input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    step="1"
                    onChange={(e) => dispatch(updateMinNumbOfReviews(parseInt(e.target.value)))}                    
                />

            </div>

            <div className="limits">
                <span className="min">{min}</span>
                <span className="max">{max}</span>
            </div>

        </Container>
    );
};

export default Slider;