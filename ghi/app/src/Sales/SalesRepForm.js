import React from 'react';

class SalesRepForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            employeeNumber: '',
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

    async componentDidMount() {
        const url = "http://localhost:8090/api/salesreps/";
    
        const response = await fetch(url);
    
        if (response.ok) {
          const data = await response.json();
          this.setState({ salesreps: data.salesreps })
          }
        }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.employee_number = data.employeeNumber
        delete data.employeeNumber
        delete data.salesreps
        console.log(data)

        const sales_repsURL = "http://localhost:8090/api/salesreps/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(sales_repsURL, fetchConfig);
        if (response.ok) {
            const newsales_rep = await response.json();
            console.log(newsales_rep)

            const cleared = {
                name: '',
                employeeNumber: '',
            };
            this.setState(cleared);
        }
    }

    render() {
        return (
            <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a new Sales Rep</h1>
                <form onSubmit={this.handleSubmit} id="create-salesrep-form">
                  <div className="form-floating mb-3">
                    <input onChange={this.handleChange} value={this.state.name} placeholder="Name" required type="text" id="name" className="form-control" />
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleChange} value={this.state.employeeNumber} placeholder="Employee number" required type="text" id="employeeNumber" className="form-control" />
                    <label htmlFor="employeeNumber">Employee number</label>
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
        );
    }
}

export default SalesRepForm;