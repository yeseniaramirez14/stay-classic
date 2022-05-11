import React from 'react';

class SalesRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vin: [],
            sales_rep: [],
            customer: [],
            price: "",
            reason: '',
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
                technicians: [],
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
                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
        );
    }
}

export default SalesRecordForm;