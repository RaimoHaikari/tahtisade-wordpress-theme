import React from 'react';

import {
    LINKKI
} from "./elements"

import {
    BsFillStarFill,
    BsStarHalf
} from "react-icons/bs"

/*
*
*/
const visualizeStars = (avg) => {

    let val = [];

    for(let i = 0; i < Math.floor(avg); i ++)
        val.push(<BsFillStarFill />);

    if(avg % 1 >= 0.5)
        val.push(<BsStarHalf />);

    return val;
}

/*
 *
 */
const getSourceLink = (title, to) => {
    return (
        <LINKKI
            target="_blank"
            href={to}
        >
            {title}
        </LINKKI>
    )
}

export default {
    getSourceLink,
    visualizeStars
}