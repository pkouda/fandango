import React, { Component } from "react";
import {Link} from 'react-router-dom';
import _ from 'lodash';
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import * as API from '../../api/API';
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import { tdar1, tdar2 } from "variables/Variables.jsx";
import {
    dataSales,
    optionsSales,
    responsiveSales,
    legendSales
} from "variables/Variables.jsx";

// Data for Pie Chart
var dataPie1 = {};
var dataPie2 = {};
var dataPie3 = {};
var legendPie1 = {
    types: ["info", "danger", "warning"]
};
/*var dataPie = {
  labels: ["40%", "20%", "40%"],
  series: [40, 20, 40,40, 20, 40,40, 20, 40,20]
}; */
var legendPie = {
    names: ["", "", ""],
    types: ["info", "danger", "warning"]
};


// Data for Bar Chart
var dataBar = {};
var dataBar2 = {};
var dataBar3 = {};
var dataBar4 = {};
/*var dataBar = {
  labels: ["Jan","Feb","Mar","Apr","Mai","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  series: [
    [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
    [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
  ]
}; */
var optionsBar = {
    seriesBarDistance: 10,
    axisX: {
        showGrid: false
    },
    height: "245px"
};
var responsiveBar = [
    [
        "screen and (max-width: 640px)",
        {
            seriesBarDistance: 5,
            axisX: {
                labelInterpolationFnc: function(value) {
                    return value[0];
                }
            }
        }
    ]
];
var legendBar = {
    names: ["Movie Rating"],
    types: ["info"]
};

var legendBar2 = {
    names: ["Clicks Per Page"],
    types: ["info"]
};
var legendBar3 = {
    names: ["click Per Movies"],
    types: ["info"]
};
var legendBar4 = {
    names: ["Less Seen Part of the Website"],
    types: ["info"]
};

class Dashboard extends Component {
    state = {
        total_movie:'',
        total_revenue:'',
        sold_tickets:'',
        registered_user:'',
        trackuser: [],
        track: {},
        moviehalllabels: [],
        moviehallseries: []
    }


    componentWillMount(){
        console.log("You are in Admin Dashboard componentwillmount");


        API.fetchUser()
            .then((res) => {
                console.log(res);

                if(!res.user){
                    this.props.history.push('/login')
                }

                API.check()
                    .then((response)=> {
                        console.log("response --->"+JSON.stringify(response));
                        if(response.code === 200){
                            //alert("check successful");

                            dataBar.labels = response.movies;
                            dataBar.series[0] = response.avg;

                            dataBar2.labels = response.pages;
                            dataBar2.series[0] = response.count;

                            dataBar3.labels = response.movieclick;
                            dataBar3.series[0] = response.mcount;

                            dataBar4.labels = response.pageslessseen;
                            dataBar4.series[0] = response.lesscount;

                            dataPie1.labels = response.labels4;
                            dataPie1.series = response.series4;

                            dataPie2.labels = response.labels3;
                            dataPie2.series = response.series3;

                            dataPie3.labels = response.labels2;
                            dataPie3.series = response.series2;
                            // tdar1 = response.tdar1;
                            // tdar2 = response.tdar2;
                            console.log(response.trackuser);
                            console.log(response.track);
                            console.log("Labels 1 ---->" + dataPie1.labels);
                            console.log("Labels 2 ---->" + dataPie2.labels);
                            console.log("Labels 3 ---->" + dataPie3.labels);
                            legendPie1.names = response.lables4;
                            //console.log("track"+response.track);
                            this.setState({
                                total_movie : response.total_movies,
                                trackuser: response.trackuser,
                                track: response.track,
                                registered_user: response.total_user,
                                sold_tickets: response.total_tickets,
                                total_revenue:response.total_rev
                            });


                        }
                    });

                // if(res.message){
                //     this.setState({
                //         message : res.message,
                //     })
                // }
                // else{
                //     this.props.history.push('/dashboard');
                // }


            });




    }
    createLegend(json) {
        var legend = [];
        for (var i = 0; i < json["names"].length; i++) {
            var type = "fa fa-circle text-" + json["types"][i];
            legend.push(<i className={type} key={i} />);
            legend.push(" ");
            legend.push(json["names"][i]);
        }
        return legend;
    }

    render() {
        var data = _.zip(this.state.trackuser,this.state.track);
        return (
            <div className="content">
                <Grid fluid>
                    {/* ///////////////////////////////////////////       Row  -  1 */}
                    <Row>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-wallet text-success" />}
                                statsText="Total Revenue"
                                statsValue={this.state.total_revenue}
                                statsIcon={<i className="fa fa-calendar-o" />}
                                statsIconText="Till Last day"
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-film text-warning" />}
                                statsText="Total Movies"
                                statsValue={this.state.total_movie}
                                statsIcon={<i className="fa fa-refresh" />}
                                statsIconText="Running Now"
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                                statsText="Sold Tickets"
                                statsValue={this.state.sold_tickets}
                                statsIcon={<i className="fa fa-clock-o" />}
                                statsIconText="Till Today"
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-users text-info" />}
                                statsText="Register Users"
                                statsValue={this.state.registered_user}
                                statsIcon={<i className="fa fa-clock-o" />}
                                statsIconText="Till Now"
                            />
                        </Col>
                    </Row>

                    {/* ///////////////////////////////////////////       Row  -  2 */}
                    <Row>
                        <Col md={4}>
                            <Card
                                statsIcon="fa fa-clock-o"
                                title="Revenue By Movie Hall"
                                category="Revenue"
                                stats="Data till date"
                                content={
                                    <div
                                        id="chartPreferences"
                                        className="ct-chart ct-perfect-fourth"
                                    >
                                        <ChartistGraph data={dataPie1} type="Pie" />
                                    </div>
                                }
                                legend={
                                    <div className="legend">{this.createLegend(legendPie)}</div>
                                }
                            />
                        </Col>
                        <Col md={4}>
                            <Card
                                statsIcon="fa fa-clock-o"
                                title="Revenue by City"
                                category="Revenue"
                                stats="Data till today"
                                content={
                                    <div
                                        id="chartPreferences"
                                        className="ct-chart ct-perfect-fourth"
                                    >
                                        <ChartistGraph data={dataPie2} type="Pie" />
                                    </div>
                                }
                                legend={
                                    <div className="legend">{this.createLegend(legendPie)}</div>
                                }
                            />
                        </Col>
                        <Col md={4}>
                            <Card
                                statsIcon="fa fa-clock-o"
                                title="Revenue of Movie per Year"
                                category="Revenue"
                                stats="Data till today"
                                content={
                                    <div
                                        id="chartPreferences"
                                        className="ct-chart ct-perfect-fourth"
                                    >
                                        <ChartistGraph data={dataPie3} type="Pie" />
                                    </div>
                                }
                                legend={
                                    <div className="legend">{this.createLegend(legendPie)}</div>
                                }
                            />
                        </Col>
                    </Row>

                    {/* ///////////////////////////////////////////       Row  -  3 */}
                    <Row>
                        <Col md={6}>
                            <Card
                                id="chartActivity"
                                title="All Movie Rating"
                                category="Rating given by Registered Users"
                                stats="Data information Realtime"
                                statsIcon="fa fa-check"
                                content={
                                    <div className="ct-chart">
                                        <ChartistGraph
                                            data={dataBar}
                                            type="Bar"
                                            options={optionsBar}
                                            responsiveOptions={responsiveBar}
                                        />
                                    </div>
                                }
                                legend={
                                    <div className="legend">{this.createLegend(legendBar)}</div>
                                }
                            />
                        </Col>

                        <Col md={6}>
                            <Card
                                id="chartActivity"
                                title="Click Per Pages"
                                category="Every Page click counts"
                                stats="Data information Realtime"
                                statsIcon="fa fa-check"
                                content={
                                    <div className="ct-chart">
                                        <ChartistGraph
                                            data={dataBar2}
                                            type="Bar"
                                            options={optionsBar}
                                            responsiveOptions={responsiveBar}
                                        />
                                    </div>
                                }
                                legend={
                                    <div className="legend">{this.createLegend(legendBar2)}</div>
                                }
                            />
                        </Col>
                    </Row>


                    {/* ///////////////////////////////////////////       Row  -  4 */}
                    <Row>
                        <Col md={6}>
                            <Card
                                id="chartActivity"
                                title="click Per Movies"
                                category="Track the Click on Movie By Users"
                                stats="Data information Realtime"
                                statsIcon="fa fa-check"
                                content={
                                    <div className="ct-chart">
                                        <ChartistGraph
                                            data={dataBar3}
                                            type="Bar"
                                            options={optionsBar}
                                            responsiveOptions={responsiveBar}
                                        />
                                    </div>
                                }
                                legend={
                                    <div className="legend">{this.createLegend(legendBar3)}</div>
                                }
                            />
                        </Col>

                        <Col md={6}>
                            <Card
                                id="chartActivity"
                                title="Less seen Pages of the Websites"
                                category="Every Page click counts"
                                stats="Data information Realtime"
                                statsIcon="fa fa-check"
                                content={
                                    <div className="ct-chart">
                                        <ChartistGraph
                                            data={dataBar4}
                                            type="Bar"
                                            options={optionsBar}
                                            responsiveOptions={responsiveBar}
                                        />
                                    </div>
                                }
                                legend={
                                    <div className="legend">{this.createLegend(legendBar4)}</div>
                                }
                            />
                        </Col>
                    </Row>


                </Grid>

                {console.log("After ZIP: ",data)}
                {/*{console.log("After ZIP: ",_.zipObject(this.state.trackuser,this.state.track))}*/}
                {data.map(function(user, index){
                    return <div className="list-group"><p className="list-group-item d-inline p-2 bg-dark text-white" key = {index}><span> <Link to ="#">{user[0]}</Link></span> :  {user[1].join(' -->')+'.'}</p></div>
                })}

            </div>
        );
    }
}

export default Dashboard;

/*      <tbody>
            <tr>
                  <td><div className="bg-info w-100 mr-5"> User Tacking </div></td>
            </tr>
            <tr>
            {this.state.trackuser.map(function(user, index){
                  return <Col lg={2} sm={3}><StatsCard statsText={user}/></Col>
            })}
        </tr>
      </tbody>
  </table>*/