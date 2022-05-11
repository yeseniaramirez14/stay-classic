import React from 'react';

class SalesRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vins: [],
            salesReps: [],
            customers: [],
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
        const vinsURL = "http://localhost:8090/api/salesrecords/";
        const salesrepsURL = "http://localhost:8090/api/salesrecords/";
        const customersURL = "http://localhost:8090/api/salesrecords/";

        const response = await fetch(url);
    
        if (response.ok) {
          const data = await response.json();
          this.setState({ salesrecords: data.salesrecords })
          }
        }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.date_time = data.dateTime
        delete data.dateTime
        delete data.technicians
        console.log(data)

        const serviceURL = "http://localhost:8090/api/salesrecords/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(serviceURL, fetchConfig);
        if (response.ok) {
            const newService = await response.json();
            console.log(newService)

            const cleared = {
                vin: '',
                customer: '',
                dateTime: '',
                reason: '',
            };
            this.setState(cleared);
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
                      <select onChange={this.handleChange} value={this.state.vins} required className="form-select" id="vin">
                        <option value="">Choose a VIN number</option>
                        {this.state.vin.map(vin => {
                          console.log(vin)
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