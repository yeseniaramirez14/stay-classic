import React from 'react';

class SalesRecordList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sales_records: []
        };
        

    };

    async componentDidMount() {
        const url = "http://localhost:8090/api/salesrecords/";
        const response = await fetch(url);
        console.log(`this is the response: ${response}`)
        console.log(response)

        if (response.ok) {
            const data = await response.json();
            console.log(data)

            this.setState({ sales_records: data.sales_records})
        }
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Automobile</th>
                        <th>Sales Rep</th>
                        <th>Customer</th>
                        <th>Sale Price</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.sales_records.map(sales_record => {
                        console.log(this.state.sales_records)
                        console.log(sales_record.id)
                        return (
                            <tr key={sales_record.vin}>
                                <td>{sales_record.vin}</td>
                                <td>{sales_record.sales_rep.name}</td>
                                <td>{sales_record.customer.name}</td>
                                <td>{sales_record.price}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        );
    }
}

export default SalesRecordList;