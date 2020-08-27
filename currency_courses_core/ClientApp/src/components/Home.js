import React, { Component } from 'react';
import  Moment from 'react-moment';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import { MDBCol, MDBIcon, MDBRow, MDBInput } from "mdbreact";
import LoadingAnimation from './LoadingAnimation.js';
import './Home.css';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { values: [], loading: true, showForm: false, precision: 2, searchString: "" };
        this.onClick = this.onClick.bind(this);
        this.handlePrecision = this.handlePrecision.bind(this);
    }

    onClick() {
        if (!this.state.showForm)
            this.setState({ showForm: true });
        else
            this.setState({ showForm: false });
    }

    renderForm() {
        if (this.state.showForm == true) {
            return (
                <MDBCol >
                    <MDBInput type="number" min="0" max="6" v-model="number" valueDefault="2" label="Iloœæ miejsc po przecinku" onChange={this.handlePrecision} />
                    <div className="input-group md-form form-sm form-1 pl-0">
                        <div className="input-group-prepend">
                            <span className="input-group-text purple lighten-3" id="basic-text1">
                                <MDBIcon className="text-white" icon="search" />
                            </span>
                        </div>
                        <input className="form-control my-0 py-1" type="text" placeholder="Szukaj waluty" aria-label="Search" />
                    </div>
                    <Button variant="light" type="submit">Zatwierdz</Button>
                </MDBCol>
            );
        }
        else return (null);
    }
    handleSubmit(event) {
        event.preventDefault();
    }
    handlePrecision(event) {
        this.setState({
            precision: event.target.value
        })
    }
    componentDidMount() {
        this.populateData();
    }

    static renderCurrencyTable(values) {
        return (
            <table className='table table-dark table-hover' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Kod</th>
                        <th>Nazwa</th>
                        <th>Cena</th>
                    </tr>
                </thead>
                <tbody>
                    {values.map(forecast =>
                        <tr key={forecast.code}>
                            <td><Moment format="YYYY-MM-DD">{forecast.date}</Moment></td>
                            <td>{forecast.code}</td>
                            <td>{forecast.name}</td>
                            <td>{forecast.value}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            //<div>
            //    <ReactTable
            //        data={values}
            //        filterable
            //        defaultFilterMethod={(filter, row) =>
            //            String(row[filter.id]) === filter.value}
            //        columns={[
            //            {
            //                Header: "Name",
            //                columns: [
            //                    {
            //                        Header: "First Name",
            //                        accessor: "firstName",
            //                        filterMethod: (filter, row) =>
            //                            row[filter.id].startsWith(filter.value) &&
            //                            row[filter.id].endsWith(filter.value)
            //                    },
            //                    {
            //                        Header: "Last Name",
            //                        id: "lastName",
            //                        accessor: d => d.lastName,
            //                        filterMethod: (filter, rows) =>
            //                            matchSorter(rows, filter.value, { keys: ["lastName"] }),
            //                        filterAll: true
            //                    }
            //                ]
            //            },
            //            {
            //                Header: "Info",
            //                columns: [
            //                    {
            //                        Header: "Age",
            //                        accessor: "age"
            //                    },
            //                    {
            //                        Header: "Over 21",
            //                        accessor: "age",
            //                        id: "over",
            //                        Cell: ({ value }) => (value >= 21 ? "Yes" : "No"),
            //                        filterMethod: (filter, row) => {
            //                            if (filter.value === "all") {
            //                                return true;
            //                            }
            //                            if (filter.value === "true") {
            //                                return row[filter.id] >= 21;
            //                            }
            //                            return row[filter.id] < 21;
            //                        },
            //                        Filter: ({ filter, onChange }) =>
            //                            <select
            //                                onChange={event => onChange(event.target.value)}
            //                                style={{ width: "100%" }}
            //                                value={filter ? filter.value : "all"}
            //                            >
            //                                <option value="all">Show All</option>
            //                                <option value="true">Can Drink</option>
            //                                <option value="false">Can't Drink</option>
            //                            </select>
            //                    }
            //                ]
            //            }
            //        ]}
            //        defaultPageSize={10}
            //        className="-striped -highlight"
            //    />
            //    <br />
            //</div>
        );
    }

    render() {
        const { showForm } = this.state;

        let contents = this.state.loading
            ? <LoadingAnimation />
            : Home.renderCurrencyTable(this.state.values);
        return (
            <div>
                <h1 id="tabelLabel" >Kursy walut</h1>
                <MDBRow>
                    <MDBCol >
                        <p>Sprawdz kursy walut.</p>
                    </MDBCol >
                    <Button variant="light" onClick={this.onClick}>Ustawienia</Button>
                    <Form onSubmit={this.handleSubmit}>
                        {showForm && this.renderForm()}
                    </Form>
                </MDBRow>

                {contents}

            </div>
        );
    }

    async populateData() {
        const response = await fetch('currency');
        const data = await response.json();
        this.setState({ values: data, loading: false });
    }
}
