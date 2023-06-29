import React, {Component} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';



class SimpleBarChart extends Component{

    render () {
        const data = [
            {moviehall: "Townie3", TotalAmount: 11}
            ];
        console.log("movies",this.props.movie);

        return (
            <BarChart width={600} height={300} data={data}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="2 2"/>
                <XAxis dataKey="moviehall"/>
                <YAxis />
                <Tooltip/>
                <Legend />
                <Bar dataKey="TotalAmount" fill="#82ca9d" />
            </BarChart>
        );
    }
}

export default SimpleBarChart;