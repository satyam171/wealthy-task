/*
 *
 * Home reducer
 *
 */
import produce from 'immer';
import { 
  GET_DATA_SUCCESS, 
  GET_DATA, 
  GET_DATA_ERROR,
  UPDATE_DATA, 
  UPDATE_DATA_SUCCESS, 
  UPDATE_DATA_ERROR
} from './constants';

export const initialState = {
  loading: false,
  data: [],
  error: false,
  updateLoading: false, 
  updateError: false,
  maxProfit: {}
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_DATA:
        draft.loading = true;
        draft.error = false;
        break;

      case GET_DATA_SUCCESS:
        draft.loading = false;
        draft.data = action.data;
        draft.maxProfit = action.maxProfit; 
        draft.error = false; 
        break;

      case GET_DATA_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;

        case UPDATE_DATA:
        draft.updateLoading = true;
        draft.updateError = false;
        break;

      case UPDATE_DATA_SUCCESS:
        draft.updateLoading = false;
        draft.data = action.data;
        draft.maxProfit = action.maxProfit;
        draft.updateError = false; 
        break;

      case UPDATE_DATA_ERROR:
        draft.updateLoading = false;
        draft.updateError = action.error;
        break;  
    }
  });

export default homeReducer;

