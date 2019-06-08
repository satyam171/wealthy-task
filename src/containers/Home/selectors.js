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

const makeSelectUpdateLoading = () =>
    createSelector(
      selectHome, 
      home => home.updateLoading
    )    

const makeSelectData = () =>
    createSelector(
      selectHome, 
      home => home.data
    )  
    
const makeSelectMaxProfit = () =>
    createSelector(
      selectHome, 
      home => home.maxProfit
    )      

const makeSelectError = () =>
    createSelector(
      selectHome, 
      home => home.error
    )    

const makeSelectUpdateError = () =>
    createSelector(
      selectHome, 
      home => home.updateError
    )    

export { 
  makeSelectLoading, 
  makeSelectUpdateLoading,
  makeSelectData, 
  makeSelectMaxProfit,
  makeSelectError,
  makeSelectUpdateError
};
