import React, { Component } from 'react';
import ChartsMenu from './ChartsMenu.js';
import Chart from './Chart.js';

export class Charts extends Component {
    static displayName = Charts.name;

    render() {
        return (
            <div>
                <ChartsMenu />
                <Chart />
            </div>
        );
    }
}
