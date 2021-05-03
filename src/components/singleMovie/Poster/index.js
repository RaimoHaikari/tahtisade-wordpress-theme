import React from 'react';

import {PosterImg} from "./elements"

const Poster = ({src, title}) => {

    return (
        <div style={{minWidth: "250px", margin: "10px"}}>
            <PosterImg 
                src={src}
            />
        </div>
    );
};

export default Poster;