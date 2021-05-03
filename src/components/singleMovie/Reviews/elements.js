import styled from 'styled-components';

/*
 * https://css-tricks.com/responsive-data-tables/
    border-collapse: collapse; 

    width: 100%;
    table-layout: fixed;
    font-size: 0.9em;


    overflow: hidden;
 */
export const TABLE = styled.table`
    width: 100%; 
    border-collapse: collapse; 

    @media screen and (max-width: 800px){
        display:block;
    }
`;

/*
 *	thead tr { 
		position: absolute;
		top: -9999px;
		left: -9999px;
	}
 */
export const THEAD = styled.thead`

    @media screen and (max-width: 800px){
        display:block;

        &:last-child {
            padding-bottom: .5em;
        }
    }
`;

export const TR = styled.tr`

    &:nth-of-type(odd) { 
        background-color: ${props => props.theme.bgSecondary};
    }

    @media screen and (max-width: 800px){

        display:block;
        border: 1px solid red;

        ${THEAD} & {
            position: absolute;
            top: -9999px;
            left: -9999px;           
        }
    }
`;





export const TH = styled.th`

    padding: 6px; 
    border: 1px solid #ccc; 
    text-align: left;

    background-color: ${props => props.theme.backgroundColor};
    color: white; 
    font-weight: bold; 

    @media screen and (max-width: 800px){
        display:block;
    }
`;

export const TBODY = styled.tbody`

    @media screen and (max-width: 800px){
        display:block;
    }
`;

export const TD = styled.td.attrs(props => {

    console.log("Props", props);
    
    return {
    // we can define static props
    type: "text",
  
    // or we can define dynamic ones
    size: props.size || "1em",

    label: props.lbl,
  }})`

    padding: 6px; 
    border: 1px solid #ccc; 
    text-align: left;

    @media screen and (max-width: 800px){
        display:block;

		border: none;
		border-bottom: 1px solid #eee; 
		position: relative;
		padding-left: 50%; 

        &:before { 
            /* Now like a table header */
            position: absolute;
            /* Top/left values mimic padding */
            top: 6px;
            left: 6px;
            width: 45%; 
            padding-right: 10px; 
            white-space: nowrap;
        }

        &:nth-of-type(1):before { content: "First Name"; }
        &:nth-of-type(2):before { content: "Last Name"; }
	    &:nth-of-type(3):before { content: "Job Title"; }

    }

`;

