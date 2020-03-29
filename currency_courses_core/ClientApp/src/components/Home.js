import React, { Component } from 'react';
import  Moment from 'react-moment';
import ReactTable from "react-table";

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
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Kod</th>
                        <th>Cena</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(forecast =>
                        <tr key={forecast.code}>
                            <td><Moment format="YYYY-MM-DD">{forecast.date}</Moment></td>
                            <td>{forecast.code}</td>
                            <td>{forecast.value}</td>
                        </tr>
                    )}
                </tbody>
            </table>
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
