import React, { Component } from 'react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

export default class Chart extends Component {
    render() {
        return (
        <div style={{marginTop : '20px'}}>
            <LineChart
                width={600}
                height={300}
                data={this.props.data}
                margin={{
                top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="stock_price" stroke="#8884d8" />
            </LineChart>
            )
        </div>
        )
    }
}
