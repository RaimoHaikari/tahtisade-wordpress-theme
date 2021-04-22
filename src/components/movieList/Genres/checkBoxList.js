import React from 'react';

import {
    CONTAINER,
    LABEL,
    INPUT,
    SPAN
} from './elements';

const CheckBoxList = ({changeHanler, genres}) => {

    return (
        <CONTAINER>
            {
                genres.map(genre => {
                    return (
                        <LABEL key={genre.id}>{genre.name}
                            <INPUT 
                                type="checkbox" 
                                onChange={() => changeHanler(genre.id)}
                                checked={genre.display}
                            ></INPUT>
                            <SPAN />                            
                        </LABEL>
                    )
                })
            }
        </CONTAINER>
    );
};

export default CheckBoxList;