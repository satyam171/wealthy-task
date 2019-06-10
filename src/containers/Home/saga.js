/**
 * Gets the text from the dummy api
 */
 
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { GET_DATA, UPDATE_DATA } from './constants';
import { 
  getDataSuccess, 
  getDataError,
  updateDataSuccess, 
  updateDataError
} from './actions';

import { makeSelectData } from './selectors'; 

import request from '../../utils/request';

/**
 * Text request/response handler
 */

function getMaximumProfit(data){
  // logic to calculate the maximum profit 
  let buyDate = ''; 
  let sellDate = ''; 
  let n = data.length; 
  let max_diff = Number(data[1].stock_price) - Number(data[0].stock_price); 
  let min_element = Number(data[0].stock_price);  
  if(data[0].stock_price) { buyDate = sellDate = data[0].date; } 
  let minObj = {};  
  for(let i = 1; i<n; i++){
    if(!data[i].stock_price) continue;
    else{
      if(isNaN(max_diff)) max_diff = 0; // adding a small check because the comparison cannot be done with NaN
      if(isNaN(min_element)) min_element = Number(data[i].stock_price);
      let curr = Number(data[i].stock_price); 
      if(curr - min_element >= max_diff){
        max_diff = curr - min_element; 
        sellDate = data[i].date; 
        buyDate = minObj.date; 
      }
      if (curr <= min_element) {
        min_element = curr;
        minObj = data[i]; 
      }
    }   
  }
  return {
    mProfit : isNaN(max_diff) ? 0 : max_diff*10, 
    buyDate, 
    sellDate
  }
} 

export function* getDataFromApi(){
 
  const requestURL = `https://airtable-server.herokuapp.com/get-stock-prices`;

  try {
    // Call our request helper (see 'utils/request')
    let response = yield call(request, requestURL);
    // sort on the basis of date
    response.sort(function(a,b){
      return new Date(a.date) - new Date(b.date);
    });
    // dispatching the success data
    yield put(getDataSuccess(response, getMaximumProfit(response)));
  } catch (err) {
    yield put(getDataError(err));
  }
}

export function* updateDataFromApi(action){
  const { stock } = action;  
  const requestURL = `https://airtable-server.herokuapp.com/update-record`;

  let options = {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id : stock.id, 
      date : stock.date, 
      stock_price : stock.stock_price
    }), // body data type must match "Content-Type" header
}

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, options);
    let data = yield select(makeSelectData());
    data = data.map(item => {
      if(item.id === response.id) return response; 
      else return item; 
    })
    data.sort(function(a,b){
      return new Date(a.date) - new Date(b.date);
    });
    // dispatching the updated data
    yield put(updateDataSuccess(data, getMaximumProfit(data)));
  } catch (err) {
    yield put(updateDataError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* initiateDataFetch() {
  yield takeLatest(GET_DATA, getDataFromApi);
  yield takeLatest(UPDATE_DATA, updateDataFromApi);
}