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

            case 'reviewers': 

                dispatch({
                    type: 'REVIEWERLIST_SET_CURRENT_PAGE',
                    data: {page: val.page}
                });

                break;

            case 'singleReviewer': 

                dispatch({
                    type: 'SINGLE_REVIEWER_SET_CURRENT_PAGE',
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

            case 'reviewers': 
                   
                dispatch({
                    type: 'REVIEWERLIST_SET_DISPLAY_TYPE',
                    data: {type: val.type}
                });

                break;

        }
    }
}

/*
 * 
 */
export const updateSearchSetting = (val) => {

    return dispatch => {

        switch(val.store){

            case 'genres': 

                dispatch({
                    type: 'GENRELIST_UPDATE_SEARCH',
                    data: {
                        str: val.str
                    }
                });

                break;

            case 'movies': 

                dispatch({
                    type: 'MOVIELIST_UPDATE_SEARCH',
                    data: {
                        str: val.str
                    }
                });

                break;


            case 'reviewers': 

                dispatch({
                    type: 'REVIEWERLIST_UPDATE_SEARCH',
                    data: {
                        str: val.str
                    }
                });

                break;

            case 'singleReviewer': 

                dispatch({
                    type: 'SINGLE_REVIEWER_UPDATE_SEARCH',
                    data: {
                        str: val.str,
                        target: val.target === undefined?'primary':val.target
                    }
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

            case 'reviewers': 
                   
                dispatch({
                    type: 'REVIEWERLIST_UPDATE_SORTING',
                    data: {field: val.field}
                });

                break;


            case 'singleMovie': 

                dispatch({
                    type: 'SINGLE_MOVIE_UPDATE_REVIEWS_SORTING',
                    data: {field: val.field}
                });

                break;

            case 'singleReviewer': 

                dispatch({
                    type: 'SINGLE_REVIEWER_UPDATE_REVIEWS_SORTING',
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