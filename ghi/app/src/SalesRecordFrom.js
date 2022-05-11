import React from 'react';

class SalesRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vin: [],
            sales_rep: [],
            customer: [],
            price: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const newState = {}
        newState[event.target.id] = event.target.value;
        // console.log(event)
        this.setState(newState)
    }

    // As an example to reference
    // handleCustomerChange(event) {
    //     const value = event.target.value;
    //     this.setState({manufactuer: value})
    // }

    async componentDidMount() {
        const url = "http://localhost:8090/api/salesrecords/";
    
        const response = await fetch(url);
    
        if (response.ok) {
          const data = await response.json();
          this.setState({ sales_records: data.sales_records })
          }
        }

    render() {
        return (
            <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a new Sale Record</h1>
                <form onSubmit={this.handleSubmit} id="create-salesrecord-form">
                <div className="mb-3">
                    <select onChange={this.handleChange} value={this.state.vin} required className="form-select" id="vin">
                      <option value="">Choose a VIN number</option>
                      {this.state.vin.map(vin => {
                        return (
                          <option key={vin} value={vin}>{vin}</option>
                        )
                      })}
                    </select>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={this.handleChange} value={this.state.price} placeholder="price" type="text" id="price" className="form-control" />
                    <label htmlFor="price">Price</label>
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
        );
    }
}

export default SalesRecordForm;