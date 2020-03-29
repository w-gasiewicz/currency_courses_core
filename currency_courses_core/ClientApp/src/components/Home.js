import React, { Component } from 'react';
import  Moment from 'react-moment';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    static renderCurrencyTable(forecasts) {
        return (
            //<table className='table table-striped' aria-labelledby="tabelLabel">
            //    <thead>
            //        <tr>
            //            <th>Data</th>
            //            <th>Kod</th>
            //            <th>Cena</th>
            //        </tr>
            //    </thead>
            //    <tbody>
            //        {forecasts.map(forecast =>
            //            <tr key={forecast.code}>
            //                <td><Moment format="YYYY-MM-DD">{forecast.date}</Moment></td>
            //                <td>{forecast.code}</td>
            //                <td>{forecast.value}</td>
            //            </tr>
            //        )}
            //    </tbody>
            //</table>
            <div>
                <ReactTable
                    data={forecasts}
                    filterable
                    defaultFilterMethod={(filter, row) =>
                        String(row[filter.id]) === filter.value}
                    columns={[
                        {
                            Header: "Name",
                            columns: [
                                {
                                    Header: "First Name",
                                    accessor: "firstName",
                                    filterMethod: (filter, row) =>
                                        row[filter.id].startsWith(filter.value) &&
                                        row[filter.id].endsWith(filter.value)
                                },
                                {
                                    Header: "Last Name",
                                    id: "lastName",
                                    accessor: d => d.lastName,
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ["lastName"] }),
                                    filterAll: true
                                }
                            ]
                        },
                        {
                            Header: "Info",
                            columns: [
                                {
                                    Header: "Age",
                                    accessor: "age"
                                },
                                {
                                    Header: "Over 21",
                                    accessor: "age",
                                    id: "over",
                                    Cell: ({ value }) => (value >= 21 ? "Yes" : "No"),
                                    filterMethod: (filter, row) => {
                                        if (filter.value === "all") {
                                            return true;
                                        }
                                        if (filter.value === "true") {
                                            return row[filter.id] >= 21;
                                        }
                                        return row[filter.id] < 21;
                                    },
                                    Filter: ({ filter, onChange }) =>
                                        <select
                                            onChange={event => onChange(event.target.value)}
                                            style={{ width: "100%" }}
                                            value={filter ? filter.value : "all"}
                                        >
                                            <option value="all">Show All</option>
                                            <option value="true">Can Drink</option>
                                            <option value="false">Can't Drink</option>
                                        </select>
                                }
                            ]
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
                <br />
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Wczytywanie...</em></p>
            : Home.renderCurrencyTable(this.state.forecasts);

        return (
            <div>
                <h1 id="tabelLabel" >Kursy walut</h1>
                <p>Sprawdü kursy walut.</p>
                {contents}
            </div>
        );
    }

    async populateWeatherData() {
        const response = await fetch('currency');
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }
}
