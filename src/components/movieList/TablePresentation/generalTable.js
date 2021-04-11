import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";


import parse from 'html-react-parser';

import { updateSortingSetting } from "../../../reducers/sharedReducer";

//import {Link} from 'react-router-dom';

import {BiSortDown, BiSortUp} from "react-icons/bi"

import {
    TABLE,
    THEAD,
    TR,
    TBODY,
    TH,
    TD
} from './elements';

const GeneralTable = ({store}) => {

    const dispatch = useDispatch();

    const {headers,search, sortingField, sortingOrder, visibleData} = useSelector(state => state[store]);

    const onSortingChange = (field)  => {
        dispatch(updateSortingSetting({
            field: field,
            store: store
        }));
    }

    const emphasizeSearched = (str) => {
        let match = search;
        let replace = "<mark>"+match+"</mark>";
        let regexp = new RegExp(match, "gi");

        return parse(str.replace(regexp, replace))
    }

    const displayTable = () => {

        return (
            <TABLE>
                <THEAD>
                    <TR>
                    {
                            headers.map(header => {
                                return (
                                        <TH
                                            sortingField = {(sortingField && sortingField === header.field)}
                                            sortable = {header.sortable}
                                            key={header.field}
                                            onClick={() => header.sortable ?  onSortingChange(header.field) :null}
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
                        visibleData.map((m, index) => {

                            return (
                                <TR key={index}>
                                    {
                                        headers.map((header, index) => {  

                                            return (
                                                <TD before={header.name}>
                                                    {
                                                        search !== '' && header.searchable
                                                        ? emphasizeSearched(m[header.field])
                                                        : m[header.field]
                                                    }
                                                </TD>
                                            );
                                        })
                                    }
                                </TR>
                            )
                        })
                    }
                </TBODY>               
            </TABLE>   
        )
    }

    /*
     * return <TD before={header.name}>{m[header.field]}</TD>;
     */
    return (
        <>
            {
                displayTable()
            }
        </>
    );
};


export default GeneralTable;