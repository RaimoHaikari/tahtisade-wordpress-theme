import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {
    init, updateSortingSetting
} from "../../../reducers/movieListReducer";

//import {Link} from 'react-router-dom';

import {BiSortDown, BiSortUp} from "react-icons/bi"

import {
    Table,
    THEAD,
    TR,
    TBODY,
    TH,
    TD
} from './elements';

const TablePresentation = () => {

    const dispatch = useDispatch();

    const {headers, message, visibleMovies, sortingField, sortingOrder} = useSelector(state => state.movies);

    const onSortingChange = (field)  => {

        dispatch(updateSortingSetting({field: field}));

    }

    useEffect(() => {
        dispatch(init())
    }, [])

    /*
    */
    return (
        <>
            <div>
                {message}
            </div>
            <Table>
                <THEAD>
                    <TR>
                    {
                            headers.map(header => {
                                return (
                                        <TH
                                            sortingField = {(sortingField && sortingField === header.field)}
                                            sortable = {header.sortable}
                                            key={header.field}
                                            onClick={() => header.sortable ? onSortingChange(header.field) :null}
                                        >
                                            {
                                                (sortingField && sortingField === header.field)
                                                ? (sortingOrder === 'asc')
                                                    ? <BiSortUp />
                                                    : <BiSortDown />
                                                : null
                                            }
                                            {header.name}
                                        </TH>
                                )
                            })
                    }
                    </TR>
                </THEAD>
                <TBODY>
                    {
                        visibleMovies.map(m => {
                            return (
                                <TR key={m.id}>
                                    <TD before="Nimi">{m.name}</TD>
                                    <TD before="Arvosteluja">{m.numberOfReviews}</TD>
                                    <TD before="Keskiarvo">{m.averageOfReviews}</TD>
                                </TR>
                            )
                        })
                    }
                </TBODY>
            </Table>
        </>
    );
};

/*
<TD before="Keskiarvo">{m.averageOfReviews}</TD>
*/

export default TablePresentation;