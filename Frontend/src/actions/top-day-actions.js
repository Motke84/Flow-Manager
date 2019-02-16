import axios from 'axios';

export const GET_FLOW_ITEMS = 'GET_FLOW_ITEMS';
export const SAVE_FLOW_ITEMS = 'SAVE_FLOW_ITEMS';
export const GOT_FLOW_ITEMS = 'GOT_FLOW_ITEMS';
export const FLOW_ERROR = 'FLOW_ERROR';

import {
    showSnackbar
} from '../actions/app.js';


import { setSaveMode, FILL_GRAPH_ITEMS } from '../actions/graph-actions';

export const getAllFlowItems = (date) => (dispatch) => {


    dispatch({
        type: GET_FLOW_ITEMS,
        date
    });

    let flowItems;
    //https://moti-m-weather-api.herokuapp.com/getFlow
    axios({
        url: `${process.env.SERVER_PATH}/GetFlow/${date}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            // "Content-Type": "application/json",
            // "Accept": "application/json"
        },
        compress: false
    }).then(function (response) {

        let flowItems;
        let action = GOT_FLOW_ITEMS;

        flowItems = response.data;

        if (response.data == "An unexpected error has occurred.") {
            dispatch(showSnackbar("Error In Server", true));
            action = FLOW_ERROR;
        }
        else {
            dispatch(showSnackbar("Success", false));
            flowItems = response.data;
        }

        dispatch({
            type: action,
            flowItems
        });

        dispatch({
            type: FILL_GRAPH_ITEMS,
            graphItems: flowItems
        });
    }).catch(function (error) {

        dispatch(showSnackbar("Error In Server", true));

        dispatch({
            type: FLOW_ERROR,
            flowItems
        });

        dispatch({
            type: FILL_GRAPH_ITEMS,
            graphItems: {}
        });
    });

};


export const saveFlowItems = (flowItems) => (dispatch) => {


    console.log('saveFlowItems');

    axios({
        url: `${process.env.SERVER_PATH}/SaveFlow`,
        method: 'POST',
        data: flowItems,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            // "Content-Type": "application/json",
            // "Accept": "application/json"
        },
        body: flowItems,
        compress: false
    }).then(function (response) {

        dispatch(showSnackbar("Success", false));

        dispatch({
            type: GOT_FLOW_ITEMS,
            flowItems
        });

        dispatch({
            type: FILL_GRAPH_ITEMS,
            graphItems: flowItems
        });

    }).catch(function (error) {
        dispatch(showSnackbar("Error In Server2", true));

        dispatch({
            type: FLOW_ERROR,
            flowItems
        });

        dispatch({
            type: FILL_GRAPH_ITEMS,
            graphItems: {}
        });
    });

};

