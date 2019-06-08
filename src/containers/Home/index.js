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

import { Calendar, Button, Modal, InputNumber, message, Layout, Icon, Card } from 'antd';

import {
  makeSelectLoading, 
  makeSelectUpdateLoading,
  makeSelectData, 
  makeSelectError, 
  makeSelectUpdateError,
  makeSelectMaxProfit
} from './selectors';

import {
  getData, 
  updateData
} from './actions'; 

const AntIcon = <Icon type="loading" style={{ fontSize: 12 }} spin />;

const { Header, Footer, Sider, Content } = Layout;

const error = () => {
  message.error('This is a message of error');
};

class Home extends Component { 

  state = { 
    visible: false, 
    updatedStockPrice: 0, 
    currentClickedDeletedId : ''
  };

  componentDidMount(){
    this.props.getData(); 
  }

  componentDidUpdate(prevProps){
    const {updateLoading, updateError} = this.props; 
    if((updateLoading !== prevProps.updateLoading) && (!updateLoading && !updateError)){
      this.setState({visible : false}); 
    }
    if((updateError !== prevProps.updateError) && updateError){
      error(); // pop the error message
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleDelete(item){
    let updatedStock = {...item, stock_price : undefined}; 
    this.setState({currentClickedDeletedId : item.id}, ()=>{
      this.props.updateData(updatedStock); 
    }) 
  }

  handleOk = item => {
    let updatedStock = {...item, stock_price : this.state.updatedStockPrice}; 
    this.props.updateData(updatedStock); 
  };

  priceChange = (value) => {
    this.setState({updatedStockPrice : value}); 
  }
  
  dateCellRender = (value) => {
    // formatting the date cell renderer
    const {data, updateLoading} = this.props; 
    let dates = data.map(item => item.date); 
    let item = {}; 
    let formattedDate = value.format('YYYY-MM-DD')
    for(let i = 0; i<data.length; i++){
      if(data[i].date === formattedDate){
        item = data[i]; 
        break; 
      }
    }
    if(item.stock_price) return (
      <div>
        {item.stock_price} 
        {updateLoading && item.id === this.state.currentClickedDeletedId ? 
        <Icon type="loading" style={{ fontSize: 24 }} spin /> :  
        <Button onClick={() => this.handleDelete(item)} type="primary" icon="close-circle" />
        }
        </div>
    )
    else{
      if(dates.includes(value.format('YYYY-MM-DD')))
        return (
          <div>
            <Button onClick={this.showModal}>ADD</Button>
            <Modal
            title="Add stock price"
            visible={this.state.visible}
            onOk={(e) => this.handleOk(item)}
            confirmLoading={this.props.updateLoading}
            onCancel={this.handleCancel}
          >
            <InputNumber defaultValue={0} onChange={this.priceChange} />
          </Modal>
          </div>
        )
    }
  }

  handleData(){
    const {loading, data, error, maxProfit} = this.props; 
    if(loading) return <div>Loading ...</div>
    if(error) return <div>Error...</div>
    if(!data.length) return <div>Oops no data found!</div>
    return (
      <Layout>
      <Header>Wealthy Task</Header>
      <Layout>
        <Content>
          <Calendar 
          dateCellRender={this.dateCellRender}
          validRange={[moment(data[0].date), moment(data[data.length-1].date)]}
          />
        </Content>
        <Sider>
          <Card title="Maximum Profit" bordered={false} style={{ width: '100%' }}>
            <p>{maxProfit}</p>
          </Card>
        </Sider>
      </Layout>
      <Footer>Footer</Footer>
      </Layout>
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
  updateLoading : makeSelectUpdateLoading(), 
  data : makeSelectData(), 
  maxProfit : makeSelectMaxProfit(), 
  error : makeSelectError(),
  updateError : makeSelectUpdateError()
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


