import React from 'react';

import {
    Container,
    SearchIcon,
    Input
} from "./elements"

const Search = ({value, changeHandler}) => {

    return (
        <Container>
            <SearchIcon />
            <Input
                type="text"
                placeholder="Search"
                value={value}
                onChange={e => changeHandler(e.target.value)}
            />
        </Container>

    );

};

export default Search;