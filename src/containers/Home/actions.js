/*
 *
 * Home actions
 *
 */

import { 
  GET_DATA, 
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
  UPDATE_DATA, 
  UPDATE_DATA_SUCCESS, 
  UPDATE_DATA_ERROR
} from './constants';

/**
 * Load the data, this action starts the request saga
 * 
 * @return {object} An action object with a type of GET_DATA
 */
export function getData() {
  return {
    type: GET_DATA
  };
}

/**
 * Dispatched when the data is loaded by the request saga
 *
 * @param  {array} The data that was returned from the api
 * @param  {number} The max profit obj
 * @return {object} An action object with a type of GET_DATA_SUCCESS passing the data
 */
export function getDataSuccess(data, maxProfit) {
  return {
    type: GET_DATA_SUCCESS,
    data,
    maxProfit
  };
}

/**
 * Dispatched when loading the data fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GET_DATA_ERROR passing the error
 */
export function getDataError(error) {
  return {
    type: GET_DATA_ERROR,
    error
  };
}

// ########################################################
// Update Actions

/**
 * Update the data, this action starts the request saga
 * @param  {object} The stock object containing the updated price
 * @return {object} An action object with a type of UPDATE_DATA
 */
export function updateData(stock) {
  return {
    type: UPDATE_DATA,
    stock
  };
}

/**
 * Dispatched when the data is updated by the request saga
 *
 * @param  {array} The updated data array
 * @param  {number} The max profit obj
 * @return {object} An action object with a type of UPDATE_DATA_SUCCESS passing the data
 */
export function updateDataSuccess(data, maxProfit) {
  return {
    type: UPDATE_DATA_SUCCESS,
    data, 
    maxProfit
  };
}

/**
 * Dispatched when updating the data fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of UPDATE_DATA_ERROR passing the error
 */
export function updateDataError(error) {
  return {
    type: UPDATE_DATA_ERROR,
    error
  };
}