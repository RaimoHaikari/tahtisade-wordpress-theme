import React, {useState} from 'react';

import {BiSortDown, BiSortUp} from "react-icons/bi";

import './header.css';

const Header = ({headers, onSorting}) => {

    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSorftingOrder] = useState("asc")

    const onSortingChange = (field)  => {

        const order = ((field === sortingField) && (sortingOrder === "asc")) ? "desc" : "asc";

        setSortingField(field);
        setSorftingOrder(order);

        onSorting(field, order);
    }

    return (
        <thead>
            <tr>
                {
                    headers.map(({name, field, sortable}) => {

                        let a = sortable?"font-weight-bold pointer": "font-weight-light";
                        let b = (sortingField && sortingField === field)?"dataTable-active-sorting-field":"";

                        let className  =  b.length === 0?`${a}`:`${a} ${b}`;

                        return(
                            <th
                                className = {className}
                                onClick={() => sortable ? onSortingChange(field) :null}
                                key={field}
                            >

                                {name}
                                {
                                    sortingField && sortingField === field && 
                                        sortingOrder==="asc" 
                                        ? <BiSortDown />
                                        : <BiSortUp />
                                }
                            </th>
                        )
                    })
                }
            </tr>
        </thead>
    );

};

export default Header;