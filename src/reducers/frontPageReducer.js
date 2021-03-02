const initialState = {
    data: ["yksi","kaksi","kolme"]
}

const frontPageReducer = (state = initialState, action) => {

    switch(action.type) {
        default:
            return state;
    }
}

export default frontPageReducer;