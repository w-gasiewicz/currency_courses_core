import React, { Component } from 'react';
import Moment from 'react-moment';
import LoadingAnimation from './LoadingAnimation.js';
import './CurrencyTable.css';

const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};

const ProductTable = (props) => {
    const { items, requestSort, sortConfig } = useSortableData(props.products);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    return (
        <table className='table table-dark table-hover' aria-labelledby="tabelLabel">
            <caption>Tabela kursów walut na wybrany dzień</caption>
            <thead>
                <tr>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort('date')}
                            className={getClassNamesFor('date')}
                        >
                            Data
            </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort('code')}
                            className={getClassNamesFor('code')}
                        >
                            Kod
            </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort('name')}
                            className={getClassNamesFor('name')}
                        >
                            Nazwa
            </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort('value')}
                            className={getClassNamesFor('value')}
                        >
                            Wartość
            </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr key={item.code}>
                        <td><Moment format="YYYY-MM-DD">{item.date}</Moment></td>
                        <td>{item.code}</td>
                        <td>{item.name}</td>
                        <td>{item.value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export class CurrencyTable extends Component { 

    constructor(props) {
        super(props);
        this.state = { values: [], loading: true, showForm: false, precision: 2, searchString: "" };
    }

    componentDidMount() {
        this.populateData();
    }
        
    render() {
        let contents = this.state.loading

        if (contents)
            return (< LoadingAnimation />);

        return (
            <div className="Test"> <ProductTable
                products = {this.state.values}
            />
        </div>
    );
    }

    async populateData() {
        const response = await fetch('currency');
        const data = await response.json();
        this.setState({ values: data, loading: false });
    }
}
export default CurrencyTable;
