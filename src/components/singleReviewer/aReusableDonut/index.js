import React, {useRef, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {select} from "d3";

import {updateableDonutChart}  from './updateableDonut'

import {
    setEmphasizedMovies
} from "../../../reducers/singleReviewerReducer"

import {
    CONTAINER
} from "./elements"

import './aReusableDonut.css';

const ReusableD3Donut = () => {
//export default function ReactComponent({data, handler}){

    const [width, setWidth] = useState(500);
    const [height, setHeight] = useState(500);
    const [category, setCategory] = useState('val');
    const [cornerRadius, setCornerRadius] = useState(10);   // sets how rounded the corners are on each slice
    const [padAngle, setPadAngle] = useState(0.015);        // effectively dictates the gap between slices
    const [variable, setVariable] = useState('lkm');    
    const [transTime, setTranstime] = useState(750)

    const dispatch = useDispatch();

    const refElement = useRef(null);
    const visFunction = useRef(null);

    const {shares, zoomed} = useSelector(state => {


        return {
            ...
            state.singleReviewer.shares
        }
    });

    /*
     * Alustetaan d3 komponentti
     */ 
    function initVis() {

        visFunction.current = updateableDonutChart()
            .zoomed(zoomed)
            .data(shares)
            .height(height)
            .width(width)
            .cornerRadius(cornerRadius)
            .transTime(transTime)
            .padAngle(padAngle)
            .variable(variable)
            .category(category)
            .callBack((a) => dispatch(setEmphasizedMovies(a)))

        select(refElement.current)
            .call(visFunction.current)  
        
    }

    const updateDonut = () => {

        visFunction.current
            .zoomed(zoomed)
            .data(shares)
    }

    useEffect(() => {   

        if(shares && shares.length){

            if(visFunction.current === null)
                initVis()
            else
                updateDonut()

        }

        return () => {
            console.log('useEffect data cleanup')
        }

    }, [shares]);

    /*
     *
     */
    return (
        <CONTAINER>
            <div ref={refElement}></div>
        </CONTAINER>
    )

}

export default ReusableD3Donut;