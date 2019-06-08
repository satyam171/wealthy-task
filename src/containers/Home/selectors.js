import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the home state domain
 */

const selectHome = state =>
  state.homeReducer || initialState;

/**
 * Default selector used by HomeListing
 */

const makeSelectLoading = () =>
    createSelector(
      selectHome, 
      home => home.loading
    )

const makeSelectData = () =>
    createSelector(
      selectHome, 
      home => home.data
    )     

const makeSelectError = () =>
    createSelector(
      selectHome, 
      home => home.error
    )    

export { 
  makeSelectLoading, 
  makeSelectData, 
  makeSelectError
};
