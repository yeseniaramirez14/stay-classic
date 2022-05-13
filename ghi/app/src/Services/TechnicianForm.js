import React from 'react';

class TechnicianForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            employeeNumber: '',
            successfulSubmit: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        const newState = {}
        newState[event.target.id] = event.target.value;
        this.setState(newState)
    }


    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.employee_number = data.employeeNumber
        delete data.employeeNumber
        delete data.technicians
        delete data.successfulSubmit;
        console.log(data)

        const technicianURL = "http://localhost:8080/api/technicians/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = await fetch(technicianURL, fetchConfig);
        if (response.ok) {
            const newService = await response.json();
            console.log(newService)
            this.state.successfulSubmit = true;

            const cleared = {
                name: '',
                employeeNumber: '',
            };
            this.setState(cleared);
        }
    }

    render() {
      let formClasses = '';
      let alertClasses = 'alert alert-success d-none mb-0'

      if (this.state.successfulSubmit) {
        formClasses='d-none';
        alertClasses='alert alert-success mb-0'
      }
        return (
            <div className="row">
              <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                  <h1>Create a New Technician</h1>
                  <form onSubmit={this.handleSubmit} id="create-technician-form" className={formClasses}>
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
                  <div className={alertClasses} id="success-message">
                  You have created a new technician. 
                </div>
                </div>
              </div>
            </div>
        );
    }
}

export default TechnicianForm;