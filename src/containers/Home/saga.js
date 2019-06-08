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
  let max = -1; 
  let n = data.length; 
  for(let i = 0; i<n-1; i++){
    for(let j = i+1; j<n; j++){
      let diff = Number(data[j].stock_price) - Number(data[i].stock_price); 
      if(diff >= max) max = diff; 
    }
  }
  return max*10; 
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
    // dispatching the updated data
    yield put(updateDataSuccess(data, getMaximumProfit(response)));
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