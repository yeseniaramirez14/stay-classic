import React from 'react';


class TargetedRecords extends React.Component {
    constructor(props) {
        super(props)
        this.state = {           
            sales_records: []           
        };
    };

    async componentDidMount() {
        const url = "http://localhost:8090/api/salesrecords/";
        const response = await fetch(url);
        console.log(response)

        if (response.ok) {
            const data = await response.json();
            console.log(data)

            

            this.setState({sales_records: data.salesrecord})
            
        }
    }

    render() {
        return (
            <div>
                <h1>Targeted Sales Records</h1>
                <div className="mb-3">
                        <select onChange={this.handleChange} value={this.state.salesRep} required name="salesRep" id="salesRep" className="form-select">
                          <option value="">Choose a sales rep</option>
                          {console.log("test", this.state)}
                          {this.state.sales_records.map(salesrep => {
                            return (
                              <option key={salesrep.name} value={salesrep.name}>{salesrep.name}</option>
                            )
                          })}
                        </select>
                      </div>
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
            </div>
        );
    }
}


export default TargetedRecords;