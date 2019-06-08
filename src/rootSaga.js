import { all } from 'redux-saga/effects';

import initiateDataFetch from './containers/Home/saga'; 

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
      initiateDataFetch()
    ])
  }