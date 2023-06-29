import React, {Component} from "react";
import {Grid, Row, Col, Table} from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import {tdar1, tdar2} from "variables/Variables.jsx";
import * as API from '../../api/API';

const thArray = ["Movie Name", "Total Revenue"];
var tdArray1 = [];
var tdArray2 = [];
const tdArray = [
    ["Dakota Rice", "$36,738"],
    ["Minerva Hooper", "$23,789"],
    ["Sage Rodriguez", "$56,142"],
    ["Philip Chaney", "$38,735"],
    ["Doris Greene", "$63,542"],
    ["Mason Porter", "$78,615"]
];

class TableList extends Component {
    state = {
        movierev: '',
        moviehallrev: ''
    }

    componentWillMount() {
        console.log("You are in Table List componentwillmount");


        API.fetchUser()
            .then((res) => {
                console.log(res);

                if (!res.user) {
                    this.props.history.push('/login')
                }

                API.getRevenue()
                    .then((response) => {
                        console.log(response);
                        tdArray1 = response.movierev;
                        tdArray2 = response.moviehallrev;
                        this.setState({
                            movierev: response.movierev,
                            moviehallrev: response.moviehallrev
                        });
                    });

            });


    }

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Revenue By Movie"
                                category="Here is a subtitle for this table"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <Table striped hover>
                                        <thead>
                                        <tr>
                                            {thArray.map((prop, key) => {
                                                return <th key={key}>{prop}</th>;
                                            })}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {tdArray2.map((prop, key) => {
                                            return (
                                                <tr key={key}>
                                                    {prop.map((prop, key) => {
                                                        return <td key={key}>{prop}</td>;
                                                    })}
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </Table>
                                }
                            />
                        </Col>

                        <Col md={12}>
                            <Card
                                title="Revenue By Movie Hall"
                                category=""
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <Table hover>
                                        <thead>
                                        <tr>
                                            {thArray.map((prop, key) => {
                                                return <th key={key}>{prop}</th>;
                                            })}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {tdArray1.map((prop, key) => {
                                            return (
                                                <tr key={key}>
                                                    {prop.map((prop, key) => {
                                                        return <td key={key}>{prop}</td>;
                                                    })}
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </Table>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default TableList;
