import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import BarChart from "./barChart";

import {
    Tooltip
} from "./elements"

import {
    H1,
    CONTAINER,
    TABLE,
    TBODY,
    TR,
    TD,
    SPAN
} from "../singleMovie/elements"

const GenreCard = () => {

    /* activeGenre*/
    const {name, total, nOfReviews, compName} = useSelector(state => {
        let d = state.singleGenre.activeGenre.data;
        let comp = state.singleGenre.compCenre.data

        return {
            ...d,
            compName: comp.name
        }

    });

    return (
        <CONTAINER>
            <H1>{name}</H1>
            <BarChart />

            <Tooltip id="singleGenreTooltip">
                <p><span id="singleGenreTooltipStarts">3</span>tähteä</p>
                <p>{name}<span id="singleGenreTooltipStartsActive">25</span>kpl</p>
                <p>{compName}<span id="singleGenreTooltipStartsComp">17</span>kpl</p>
            </Tooltip>

            <TABLE>
                <TBODY> 
                    <TR>
                        <TD className="movieCardTitle">Elokuvia yhteensä</TD>
                        <TD>{total}</TD>
                    </TR>
                    <TR>
                        <TD className="movieCardTitle">Arvosteluja yhteensä</TD>
                        <TD>{nOfReviews}</TD>
                    </TR>
                    <TR>
                        <TD className="movieCardTitle">Vertailuluokka</TD>
                        <TD>{compName}</TD>
                    </TR>
                </TBODY>
            </TABLE>   

        </CONTAINER>
    );
};

export default GenreCard;