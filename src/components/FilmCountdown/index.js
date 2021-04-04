import React from 'react';

import {
    Container,
    BOX,
    IBOX,
    CIRCLE,
    NIDDLE,
    NUMBER
} from './elements'

/*

*/
const FilmCountdown = () => {
    return (
        <Container>
        <BOX>
            <CIRCLE 
                className="circle1"
            />
            <CIRCLE 
                className="circle2"
            />
            <NIDDLE />
            <NUMBER>
                <div>10</div>
                <div>9</div>
                <div>8</div>
                <div>7</div>
                <div>6</div>
                <div>5</div>
                <div>4</div>
                <div>3</div>
                <div>2</div>
                <div>1</div>
            </NUMBER>
        </BOX>
    </Container>
    );
};
/*
       <Container>
            <BOX>
                <CIRCLE 
                    className="circle1"
                />
                <CIRCLE 
                    className="circle2"
                />
                <NIDDLE />
                <NUMBER>
                    <div>10</div>
                    <div>9</div>
                    <div>8</div>
                    <div>7</div>
                    <div>6</div>
                    <div>5</div>
                    <div>4</div>
                    <div>3</div>
                    <div>2</div>
                    <div>1</div>
                </NUMBER>
            </BOX>
        </Container>

*/

export default FilmCountdown;