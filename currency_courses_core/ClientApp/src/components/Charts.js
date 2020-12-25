import React, { Component } from 'react';
import ChartsMenu from './ChartsMenu.js';
import Chart from './Chart.js';
import './css/ChartStyles.css';

export class Charts extends Component {
    static displayName = Charts.name;

    render() {
        return (
            <div>
                <ChartsMenu />
                <div className='background'>
                    <Chart />
                </div>
            </div>
        );
    }
}
