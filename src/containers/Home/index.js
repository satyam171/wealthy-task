/**
 *
 * ProductListing
 *
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';  

import { Calendar, Button } from 'antd';

import {
  makeSelectLoading, 
  makeSelectData, 
  makeSelectError, 
} from './selectors';

import {
  getData, 
  updateData
} from './actions'; 

class Home extends Component { 

  componentDidMount(){
    // this.props.getData(); 
  }

  dateCellRender(value) {
    return (
      <Button type="primary">ADD</Button>
    );
  }

  render(){ 
    return (
      <Fragment>
        <Calendar dateCellRender={this.dateCellRender}/>
      </Fragment>
    )
  }

}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading : makeSelectLoading(),
  data : makeSelectData(), 
  error : makeSelectError()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getData : () => dispatch(getData()), 
    updateData : (stock) => dispatch(updateData(stock))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(Home);


