import React from 'react';

class CustomerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            address: '',
            phoneNumber: ''
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
        const url = "http://localhost:8090/api/customers/";
    
        const response = await fetch(url);
    
        if (response.ok) {
          const data = await response.json();
          this.setState({ customers: data.customers })
          }
        }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.phone_number = data.phoneNumber
        delete data.phoneNumber
        console.log(data)

        const customersURL = "http://localhost:8090/api/customers/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(customersURL, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();
            console.log(newCustomer)

            const cleared = {
                name: '',
                address: '',
                phoneNumber: ''
            };
            this.setState(cleared);
        }
    }

    render() {
        return (
            <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a new Customer</h1>
                <form onSubmit={this.handleSubmit} id="create-customer-form">
                  <div className="form-floating mb-3">
                    <input onChange={this.handleChange} value={this.state.name} placeholder="Name" required type="text" id="name" className="form-control" />
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleChange} value={this.state.address} placeholder="Address" required type="text" id="address" className="form-control" />
                    <label htmlFor="address">Address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleChange} value={this.state.phoneNumber} placeholder="Phone number" required type="text" id="phoneNumber" className="form-control" />
                    <label htmlFor="phoneNumber">Phone number</label>
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
        );
    }
}

export default CustomerForm;