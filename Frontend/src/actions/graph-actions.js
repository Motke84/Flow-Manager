export const FILL_GRAPH_ITEMS = 'FILL_GRAPH_ITEMS';
export const SET_EDIT_MODE = 'SET_EDIT_MODE';
export const SET_SAVE_MODE = 'SET_SAVE_MODE';
export const GRAPH_LOADING = 'GRAPH_LOADING';

export const fillGraphItems = (flowItems) => (dispatch) => {
    dispatch({
        type: FILL_GRAPH_ITEMS,
        graphItems: flowItems
    });
};


export const setEditMode = (editMode) => (dispatch) => {
    dispatch({
        type: SET_EDIT_MODE,
        isEditMode: editMode
    });
};

export const setSaveMode = (saveMode) => (dispatch) => {
    dispatch({
        type: SET_SAVE_MODE,
        isSaveMode: saveMode
    });
};

export const setGraphLoading= (isGraphLoading) => (dispatch) => {
    dispatch({
        type: GRAPH_LOADING,
        isGraphLoading
    });
};

