import React, {useEffect} from 'react';
import { useHistory } from "react-router-dom";
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
    let history = useHistory();

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

    const rowCliked = (d) => {

        if(d.productPage){
            history.push(d.productPage);
        }
    }

    //console.log(visibleData)

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
                        visibleData.map((m, i) => {

                            return (
                                <TR 
                                    className={m.productPage?'linkToDetails':null}
onClick={() => rowCliked(m)}
                                    key={i}>
                                    {
                                        headers.map((header, index) => {  

                                            return (
                                                <TD before={header.name} key={index}>
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

/*

                <TBODY>
                    {
                        visibleData.map((m, i) => {

                            return (
                                <TR 
                                    className={m.productPage?'linkToDetails':null}
onClick={() => rowCliked(m)}
                                    key={i}>
                                    {
                                        headers.map((header, index) => {  

                                            return (
                                                <TD before={header.name} key={index}>
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
*/

export default GeneralTable;