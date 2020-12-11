import React, { Component } from 'react';
import { MDBCol, MDBIcon, MDBRow, MDBInput, MDBDropdownItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu } from "mdbreact";
import moment from 'moment';
import Select from 'react-select';
import  Strings  from '../SR/Strings.js'
    
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
        const strings = new Strings();
        const options = [
            { value: 'PolishZloty', label: strings.PolishZloty },
            { value: 'CanadianDollar', label: strings.CanadianDollar },
            { value: 'HongKongDollar', label: strings.HongKongDollar },
            { value: 'IcelandicKrone', label: strings.IcelandicKrone },
            { value: 'PhilipinePeso', label: strings.PhilipinePeso },
            { value: 'DanishKrone', label: strings.DanishKrone },
            { value: 'HungarianForint', label: strings.HungarianForint },
            { value: 'CzechKrone', label: strings.CzechKrone },
            { value: 'BritishPoundSterling', label: strings.BritishPoundSterling },
            { value: 'RomanianLeu', label: strings.RomanianLeu },
            { value: 'SwedishKrone', label: strings.SwedishKrone },
            { value: 'IndonesianRupee', label: strings.IndonesianRupee },
            { value: 'IndianRupee', label: strings.IndianRupee },
            { value: 'BrazilianReal', label: strings.BrazilianReal },
            { value: 'RussianRubel', label: strings.RussianRubel },
            { value: 'CroatianKuna', label: strings.CroatianKuna },
            { value: 'JapaneseYen', label: strings.JapaneseYen },
            { value: 'ThaiBaht', label: strings.ThaiBaht },
            { value: 'SwissFranc', label: strings.SwissFranc },
            { value: 'Euro', label: strings.Euro },
            { value: 'MalaysianRinggit', label: strings.MalaysianRinggit },
            { value: 'BulgarianLev', label: strings.BulgarianLev },
            { value: 'TurkishLira', label: strings.TurkishLira },
            { value: 'Juan', label: strings.Juan },
            { value: 'NorvegianKrone', label: strings.NorvegianKrone },
            { value: 'NewZelandDolar', label: strings.NewZelandDolar },
            { value: 'SouthAfricanRand', label: strings.SouthAfricanRand },
            { value: 'UnitedStatesDolar', label: strings.UnitedStatesDolar },
            { value: 'MexicanPeso', label: strings.MexicanPeso },
            { value: 'SingaporeDollar', label: strings.SingaporeDollar },
            { value: 'AustralianDollar', label: strings.AustralianDollar },
            { value: 'IsraeliShekel', label: strings.IsraeliShekel },
            { value: 'SouthKoreanWon', label: strings.SouthKoreanWon }]

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
                <Select placeholder={strings.picCurrency+'...'} options={options} />
            </div>
        );
    }
}
export default ChartsMenu;
