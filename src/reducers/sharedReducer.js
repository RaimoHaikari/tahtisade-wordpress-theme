/*
 * Reduceri jonka avulla pidetään kirjaa onko äänestämisestä kertova viesti jo näkyvillä
 */
const initialState = {}


export const updateCurretPage = (val) => {

    return dispatch => {

        switch(val.store){

            case 'genres': 

                dispatch({
                    type: 'GENRELIST_SET_CURRENT_PAGE',
                    data: {page: val.page}
                });

                break;

            case 'movies': 

                dispatch({
                    type: 'MOVIELIST_SET_CURRENT_PAGE',
                    data: {page: val.page}
                });

                break;

        }
    }
}

/*
 * type: d.name
 * store: store
 */
export const updateDisplayType = (val) => {

    return dispatch => {

        switch(val.store){

            case 'genres': 

                dispatch({
                    type: 'GENRELIST_SET_DISPLAY_TYPE',
                    data: {type: val.type}
                });

                break;

            case 'movies': 
                   
                dispatch({
                    type: 'MOVIELIST_SET_DISPLAY_TYPE',
                    data: {type: val.type}
                });

                break;

        }
    }
}

export const updateSearchSetting = (val) => {

    return dispatch => {

        switch(val.store){

            case 'genres': 

                dispatch({
                    type: 'GENRELIST_UPDATE_SEARCH',
                    data: {str: val.str}
                });

                break;

            case 'movies': 

                dispatch({
                    type: 'MOVIELIST_UPDATE_SEARCH',
                    data: {str: val.str}
                });

                break;
            
        }
    }
}

/*
 * 
 */
export const updateSortingSetting = (val) => {

    return dispatch => {

        switch(val.store){

            case 'genres': 

                dispatch({
                    type: 'GENRELIST_UPDATE_SORTING',
                    data: {field: val.field}
                });

                break;

            case 'movies': 
                   
                dispatch({
                    type: 'MOVIELIST_UPDATE_SORTING',
                    data: {field: val.field}
                });

                break;

        }

    }
}


const sharedReducer = (state = initialState, action) => {

    switch(action.type){

        default:
          return state

    }    
}

export default sharedReducer;