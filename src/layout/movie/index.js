import React from 'react';

import {
    useParams
} from "react-router-dom"

const Movie = () => {

    const id = useParams().id;

    return (
        <div>
            {
                `Valitun elokuvan tiedot: ${id}`
            }
        </div>
    );
};

export default Movie;