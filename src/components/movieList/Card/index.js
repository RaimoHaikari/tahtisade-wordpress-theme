import React from 'react';

import {useSelector} from "react-redux";

import {
    BsFillStarFill,
    BsStarHalf
} from "react-icons/bs"

import {
    WRAPPER,
    CONTAINER,
    KONTTI,
    BANNER,
    PROFILEIMAGE,
    H1,
    P
} from "./elements"

const Card = () => {

    const {visibleMovies} = useSelector(state => state.movies);


    const drawCard = (movie) => {

        const {ensiIlta, id, img, nimi, averageOfReviews} = movie;
    
        const eiDate = new Date(ensiIlta);
        const strEI = `${eiDate.getDate()}.${eiDate.getMonth()+1}.${eiDate.getUTCFullYear()}`

        /*


        */
        return (
            <KONTTI 
                key={id}
                to={`/movies/${id}`}
                className="KuvaKontti"
            >
                <BANNER />
                <PROFILEIMAGE 
                    src={img}
                />
                <H1>{nimi}</H1>
                <P><span>Ensi-ilta</span>{strEI}</P>
                <P>{visualizeStars(averageOfReviews)}</P>
            </KONTTI>
        )
    }

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
    return (
        <WRAPPER className="kuvakeRapperi">
            { 
                visibleMovies 
                ? visibleMovies.map(movie => drawCard(movie))
                : null
            }
        </WRAPPER>
    );
};

export default Card;