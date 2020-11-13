import React, { Component } from 'react';
import { MDBCol, MDBIcon, MDBRow, MDBInput } from "mdbreact";
import moment from 'moment';

export class ChartsMenu extends Component {
    static displayName = ChartsMenu.name;

    constructor(props) {
        super(props);
        this.state = { values: [], loading: true, showForm: false, precision: 2, searchString: "", date: moment(new Date()).format('YYYY-MM-DD') };
        //this.onClick = this.onClick.bind(this);
        //this.handlePrecision = this.handlePrecision.bind(this);
        //this.handleDate = this.handleDate.bind(this);
        //this.handleSearchString = this.handleSearchString.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        var date = new Date();
        return (
            <div>
                <MDBInput type="number" min="0" max="6" v-model="number" valueDefault="2" label="Miejsca po przecinku" onChange={this.handlePrecision} />
                <div className="input-group md-form form-sm form-1 pl-0">
                    <div className="input-group-prepend">
                        <span className="input-group-text purple lighten-3" id="basic-text1">
                            <MDBIcon className="text-white" icon="search" />
                        </span>
                    </div>
                    <input onChange={this.handleSearchString} className="form-control my-0 py-1" type="text" placeholder="Szukaj waluty" aria-label="Search" />
                </div>
                <div className="input-group md-form form-sm form-1 pl-0">
                    <input onChange={this.handleDate} className="form-control my-0 py-1" type="date" defaultValue={moment(date).format('YYYY-MM-DD')} value={this.state.Date} />
                </div>
            </div>
        );
    }
}
export default ChartsMenu;
