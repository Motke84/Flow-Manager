import {
  OPEN_SNACKBAR
} from '../actions/app.js';

import {
    GET_FLOW_ITEMS, SAVE_FLOW_ITEMS,GOT_FLOW_ITEMS, FLOW_ERROR

  } from '../actions/top-day-actions';
  import { createSelector } from 'reselect';
  
  const INITIAL_STATE = {
    flowItems: {},
    error: '',
    isRefreshLoading: false,
    isSaveLoading: false,
    isGraphLoading: false,
    date: ''
  };
  
  const topDayReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_FLOW_ITEMS:

        return {
          ...state,         
          isGraphLoading: true,
          isRefreshLoading: true,
          date: action.date,
        };

      case GOT_FLOW_ITEMS:

        return {
          ...state,
          flowItems: action.flowItems,
          isRefreshLoading: false,
          isGraphLoading: false,
          isSaveLoading: false,
        }; 

      case SAVE_FLOW_ITEMS:
        
        return {
          ...state,
          flowItems: action.flowItems,
          isSaveLoading: true
        };
      case FLOW_ERROR:
        return {
          ...state,
          isRefreshLoading: false,
          isGraphLoading: false,
          isSaveLoading: false
        };
      default:
        return state;
    }
  };

  export default topDayReducer;
  
  // Per Redux best practices, the shop data in our store is structured
  // for efficiency (small size and fast updates).
  //
  // The _selectors_ below transform store data into specific forms that
  // are tailored for presentation. Putting this logic here keeps the
  // layers of our app loosely coupled and easier to maintain, since
  // views don't need to know about the store's internal data structures.
  //
  // We use a tiny library called `reselect` to create efficient
  // selectors. More info: https://github.com/reduxjs/reselect.
  
 