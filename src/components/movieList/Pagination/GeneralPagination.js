import React, {useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {
    updateCurretPage
} from "../../../reducers/sharedReducer";

import {
    BsFillCaretLeftFill,
    BsFillCaretRightFill
} from "react-icons/bs"

import {
    Container,
    UL,
    LI,
    SPAN
} from "./elements";

/*

*/
const Pagination = ({store}) => {

    const dispatch = useDispatch();

    const {currentPage, paginationLinks} = useSelector(state => state[store]);

    const paginationItems = useMemo(() => {

        const pages = [];

        for(let i = 0; i < paginationLinks.length; i++){

            pages.push(
                <LI 
                    key={paginationLinks[i].index}
                    className={paginationLinks[i].className}
                    onClick={() => dispatch(updateCurretPage({
                        'store':store,
                        'page': paginationLinks[i].index
                    }))}
                >
                    <SPAN>{paginationLinks[i].label}</SPAN>
                </LI>                
            )
        }

        return pages;

    },[currentPage, paginationLinks])

    /*

    */
    return (
        <Container className="paginationContainer">
            <UL>
                {paginationItems}
            </UL>
        </Container>
    );
};

export default Pagination;