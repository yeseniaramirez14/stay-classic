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

            

            this.setState({sales_records: data.salesrecord})
            
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
                    {this.state.sales_records.map(salesrecord => {
                        return (
                            <tr key={salesrecord.automobile}>
                                <td>{salesrecord.automobile}</td>
                                <td>{salesrecord.sales_rep}</td>
                                <td>{salesrecord.customer}</td>
                                <td>{salesrecord.price}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        );
    }
}

export default SalesRecordList;