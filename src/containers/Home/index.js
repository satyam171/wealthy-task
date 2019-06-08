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
import moment from 'moment';  

import { Calendar, Button, Icon } from 'antd';

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
    this.props.getData(); 
  }

  dateCellRender = (value) => {
    // formatting the date cell renderer
    const {data} = this.props; 
    let dates = data.map(item => item.date); 
    let item = {}; 
    let formattedDate = value.format('YYYY-MM-DD')
    for(let i = 0; i<data.length; i++){
      if(data[i].date === formattedDate){
        item = data[i]; 
        break; 
      }
    }
    if(item.stock_price) return <div>{item.stock_price} <Icon type="close-circle" /></div>
    else{
      if(dates.includes(value.format('YYYY-MM-DD')))
        return <Button>ADD</Button>
    }
  }

  handleData(){
    const {loading, data, error} = this.props; 
    if(loading) return <div>Loading ...</div>
    if(error) return <div>Error...</div>
    if(!data.length) return <div>Oops no data found!</div>
    return (
      <div>
        <Calendar 
        dateCellRender={this.dateCellRender}
        validRange={[moment(data[0].date), moment(data[data.length-1].date)]}
        />
      </div>
    )
  }

  render(){ 
    return (
      <Fragment>
        {this.handleData()}
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


