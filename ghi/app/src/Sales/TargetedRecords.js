import React from 'react';


class TargetedRecords extends React.Component {
    constructor(props) {
        super(props)
        this.state = {           
            sales_records: [],
            salesReps: [],         
        };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    };
    

    handleChange(event) {
        const newState = {}
        newState[event.target.id] = event.target.value;
        this.setState(newState)
    }


    
    async componentDidMount() {
        const salesUrl = "http://localhost:8090/api/salesreps/";
        const url = "http://localhost:8090/api/salesrecords/";
        const salesResponse = await fetch(salesUrl);
        const response = await fetch(url);
        console.log(response)

        if (response.ok && salesResponse.ok) {
            const saleData = await salesResponse.json();
            const data = await response.json();
            console.log(data)

            

            this.setState({
                sales_records: data.salesrecord,
                salesReps: saleData.salesrep,
            })
            
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.sales_rep = data.salesReps;        
        delete data.salesReps;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(fetchConfig);
          if (response.ok) {
            const newName = await response.json();
            console.log(newName)          
            const cleared = {
              salesRep: ''
            }
            this.setState(cleared);
          }
        }

    render() {
        return (
            <div>
                <h1>Targeted Sales Records</h1>
                <div className="mb-3">
                        <select onChange={this.handleChange} value={this.state.salesRep} required name="salesRep" id="salesRep" className="form-select">
                          <option value="">Choose a sales rep</option>
                          {this.state.salesReps.map(salesrep => {
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
                        if (this.state.salesRep === salesrecord.sales_rep){
                        
                        return (
                            <tr key={salesrecord.automobile}>
                                <td>{salesrecord.automobile}</td>
                                <td>{salesrecord.sales_rep}</td>
                                <td>{salesrecord.customer}</td>
                                <td>{salesrecord.price}</td>
                            </tr>
                        )
                    }
                    })}
                </tbody>
            </table>
            </div>
        );
    }
}


export default TargetedRecords;