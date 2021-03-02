/*
 * Reduceri jonka avulla pidetään kirjaa onko äänestämisestä kertova viesti jo näkyvillä
 */
const initialState = {
    running: false,
    id: null
}


const timerReducer = (state = initialState, action) => {

    switch(action.type){

        case 'TIMER_START':

            let id = action.data.id;

            return {
                running: true,
                id: id       
            };

        case 'TIMER_CLEAR':

            return initialState;

        default:
          return state

    }    
}

export default timerReducer;