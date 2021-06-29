import React, {useRef, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {loadMockData} from "../../../reducers/genreListReducer"

import {select} from "d3";

import { D3Sunburst } from './D3Sunburst';
import {D3ZoomableSunburst} from './D3ZoomableSunburst'

import Countdown from "../../Countdown";

import {
    Container
} from "./elements";

const Sunburst = () => {

    const refElement = useRef(null);
    const visFunction = useRef(null);

    const dispatch = useDispatch();

    const {height, sunburstData, sunburstLoading, width} = useSelector(state => {

        let sunburst = state.genres.sunburst;

        return {
            sunburstData: sunburst.data,
            sunburstLoading: sunburst.loading,
            width: sunburst.width,
            height: sunburst.height,
        }
    });

    const initVis = () => {

        visFunction.current = D3ZoomableSunburst()
            .data(sunburstData)
            .height(height)
            .width(width)

        select(refElement.current)
            .call(visFunction.current)  
        
    }

    useEffect(() => {   

        if(sunburstData!==null){

            if(visFunction.current === null)
                initVis()
            //else
            //    updateDonut()

        }


    }, [sunburstData]);


    useEffect(() => {

        if(sunburstData === null){
            dispatch(loadMockData())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /*
            {
               (moviesLoading === true) || (genreNamesLoading === true)
               ? <Countdown />
               : visibleData === null
                    ? errorMsg()
                    : <GeneralTabs store="movies" />
           }

    */
    return (
        <>
            {
                sunburstLoading === true
                ? <Countdown />
                : sunburstData === null
                    ? null
                    : <Container>
                        <div id="sequence"></div>
                        <svg ref={refElement}></svg>
                      </Container>
            }
        </>
    );
};

export default Sunburst;