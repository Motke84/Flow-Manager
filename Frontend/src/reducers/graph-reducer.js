import {
    FILL_GRAPH_ITEMS,
    SET_EDIT_MODE,
    SET_SAVE_MODE,
    GRAPH_LOADING
} from '../actions/graph-actions';



const INITIAL_STATE = {
    graphItems: {},
    isEditMode: false,
    isSaveMode: false,
    isGraphLoading: false
};



const graphReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FILL_GRAPH_ITEMS:

            return {
                ...state,
                graphItems: action.graphItems,
                isGraphLoading: false,
                isSaveMode:false
            };
        case SET_SAVE_MODE:

            return {
                ...state,
                isSaveMode: action.isSaveMode,
               // isGraphLoading: action.isSaveMode
            };
        case SET_EDIT_MODE:
            return {
                ...state,
                isEditMode: action.isEditMode
            };
        case GRAPH_LOADING:
            return {
                ...state,
                isGraphLoading: true,
                graphItems: undefined
            };
        default:
            return state;
    }
};

export default graphReducer;