import React from 'react';

import TablePresentation from "../../movieList/TablePresentation/generalTable"

import {
    TABLE,
    THEAD,
    TR,
    TH,
    TBODY,
    TD
} from "./elements"

/*
 * <TablePresentation store="singleMovie" />


 */
const Reviews = ({headers, stars, tomatoes}) => {

    return (
        <TablePresentation store="singleMovie" />
    );
};

/*
<TABLE>
            <THEAD>
                <TR>
                    {
                        headers.map((h, i) => {
                            return(
                                <TH key={i}>{h.name}</TH>
                            )
                        })
                    }
                </TR>
            </THEAD>
            <TBODY>
                {
                    tomatoes.map((s, i) => {
                        return (
                            <TR key={i}>
                                <TD lbl="Nimi">{s.name}</TD>
                                <TD lbl="Linkki">{s.link}</TD>
                                <TD lbl="Tähtiä">{s.stars}</TD>
                            </TR>
                        )
                    })
                }
            </TBODY>
        </TABLE>

*/

export default Reviews;