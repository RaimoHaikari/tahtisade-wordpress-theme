import React from 'react';

import TablePresentation from "../movieList/TablePresentation/generalTable"

const reviews = () => {
    return (
        <div>
            <TablePresentation store="singleReviewer" />
        </div>
        
    );
};

export default reviews;