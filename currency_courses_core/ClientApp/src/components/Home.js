import React, { Component } from 'react';
import { Button, Form } from 'reactstrap';
import { MDBCol, MDBIcon, MDBRow, MDBInput } from "mdbreact";
import moment from 'moment';
import CurrencyTable from './CurrencyTable.js';
import './Home.css';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { values: [], loading: true, showForm: false, precision: 2, searchString: "", date: new Date() };
        this.onClick = this.onClick.bind(this);
        this.handlePrecision = this.handlePrecision.bind(this);
    }

    onClick() {
        if (!this.state.showForm)
            this.setState({ showForm: true });
        else
            this.setState({ showForm: false });
    }

    onClickSubmit() {
        console.log(this.state.precision.toString());//self.render();
    }

    renderForm() {
        var date = new Date();
        if (this.state.showForm == true) {
            return (
                <MDBCol >
                    <MDBInput type="number" min="0" max="6" v-model="number" valueDefault="2" label="IloúÊ miejsc po przecinku" onChange={this.handlePrecision} />
                    <div className="input-group md-form form-sm form-1 pl-0">
                        <div className="input-group-prepend">
                            <span className="input-group-text purple lighten-3" id="basic-text1">
                                <MDBIcon className="text-white" icon="search" />
                            </span>
                        </div>
                        <input className="form-control my-0 py-1" type="text" placeholder="Szukaj waluty" aria-label="Search" />
                    </div>
                    <div className="input-group md-form form-sm form-1 pl-0">
                        <input onChange={this.state.date = this.Date} className="form-control my-0 py-1" type="date" defaultValue={moment(date).format('YYYY-MM-DD')} />
                    </div>
                    <center>
                        <Button color="secondary" variant="light" type="submit" onClick={this.onClickSubmit}>Zatwierdü</Button>
                    </center>
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

    render() {
        const { showForm } = this.state;

        let table = <CurrencyTable state={this.state} />;
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
                {table}
            </div>
        );
    }
}
