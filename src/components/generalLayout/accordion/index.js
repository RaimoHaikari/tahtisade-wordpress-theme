import React from 'react';

import {
    ACCORDION,
    ITEM,
    Q,
    A,
    OpenIcon,
    CloseIcon
} from "./elements"

const Accordion = () => {
    return (
        <ACCORDION>

            <ITEM id="q1">
                <Q to="q1">
                    How often?
                    <OpenIcon />
                    <CloseIcon />
                </Q>
                <A>Jaakko kulta, Jaakko kulta, herää jo kellojasi soita. Tänään koodaminen on kyllä vaikeaa, kun ei keskittymiskyky toimi</A>
            </ITEM>

            <ITEM id="q2">
                <Q to="q2">
                    Would you consider?
                    <OpenIcon />
                    <CloseIcon />
                </Q>
                <A>Jaakko kulta, Jaakko kulta, herää jo</A>
            </ITEM>

        </ACCORDION>
    );
};

export default Accordion;