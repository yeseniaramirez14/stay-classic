import React from 'react';


class TargetedRecords extends React.Component {
    constructor(props) {
        super(props)
        this.state = {           
            sales_records: []           
        };
    };

    handleChange(event) {
        const newState = {}
        newState[event.target.id] = event.target.value;
        this.setState(newState)
    }



    async handleRepChangeSubmit(event) {
        event.preventDefault();
        const repchangeURL = `http://localhost:8090/salesreps/`
        const fetchConfig = {
            method: "get"
        };
        const response = await fetch(repchangeURL, fetchConfig)
    }

    
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
                          {this.state.sales_records.map(salesrecord => {
                            return (
                              <option key={salesrecord.sales_rep} value={salesrecord.sales_rep}>{salesrecord.sales_rep}</option>
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