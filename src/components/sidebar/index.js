import React from 'react';

import {
    CloseIcon,
    Icon,
    SidebarContainer,
    SidebarMenu,
    Linkki,
    SidebarWrapper,
} from "./sidebarElements";

/*
 *
 */
const Sidebar = ({isOpen, toggle}) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>

            <SidebarWrapper>
                <SidebarMenu>
                    <Linkki to='/movies'>
                        Elokuvat
                    </Linkki>
                    <Linkki to='/genres'>
                        Genret
                    </Linkki>
                    <Linkki to='/reviewers'>
                        Kriitikot
                    </Linkki>
                </SidebarMenu>

            </SidebarWrapper>


        </SidebarContainer>
    );
};

export default Sidebar;